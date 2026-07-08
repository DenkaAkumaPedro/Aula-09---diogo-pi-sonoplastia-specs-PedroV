import content from './content.json' assert { type: 'json' };

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function mdToHtml(md) {
  if (!md) return '';
  // If the content entry is an object with pre-rendered HTML, use it
  if (typeof md === 'object' && md.html) return md.html;
  // If it's a raw markdown string, do a minimal conversion (fallback)
  const lines = String(md).split(/\r?\n/);
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) { out.push(''); continue; }
    if (/^#\s+/.test(line)) { out.push(`<h1>${escapeHtml(line.replace(/^#\s+/, ''))}</h1>`); continue; }
    if (/^##\s+/.test(line)) { out.push(`<h2>${escapeHtml(line.replace(/^##\s+/, ''))}</h2>`); continue; }
    if (/^-\s+/.test(line)) {
      const items = [line.replace(/^-\s+/, '')];
      let j = i + 1;
      while (j < lines.length && /^-\s+/.test(lines[j].trim())) { items.push(lines[j].trim().replace(/^-\s+/, '')); j++; }
      i = j - 1;
      out.push('<ul>' + items.map(it => `<li>${escapeHtml(it)}</li>`).join('') + '</ul>');
      continue;
    }
    out.push(`<p>${escapeHtml(line)}</p>`);
  }
  return out.join('\n');
}

function renderPage(title, bodyHtml) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <meta name="robots" content="noindex, nofollow" />
  <style>
    :root{--bg:#f7f9fc;--card:#ffffff;--accent:#0b74de;--muted:#6b7280}
    html,body{height:100%}
    body{font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;margin:0;background:var(--bg);color:#0f172a}
    .container{max-width:1100px;margin:28px auto;padding:28px;background:linear-gradient(180deg, rgba(255,255,255,0.9), var(--card));border-radius:12px;box-shadow:0 8px 30px rgba(2,6,23,0.08)}
    header{display:flex;align-items:center;gap:18px}
    .brand{font-weight:700;font-size:20px}
    .hero{display:grid;grid-template-columns:1fr 320px;gap:20px;align-items:start}
    .hero-main h2{margin:0 0 8px 0;font-size:28px}
    .meta{color:var(--muted);font-size:14px}
    .player{background:#f3f4f6;padding:12px;border-radius:10px}
    .gallery{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-top:12px}
    .thumb{width:100%;height:100px;object-fit:cover;border-radius:8px;display:block}
    a.cta{display:inline-block;margin-top:12px;padding:10px 14px;background:var(--accent);color:#fff;border-radius:8px;text-decoration:none}
    footer{margin-top:18px;color:var(--muted);font-size:13px}
    @media(max-width:720px){.hero{grid-template-columns:1fr}}
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="brand">Sonoplastia 2026</div>
      <nav style="margin-left:auto"><a href="/" style="margin-right:12px">Início</a><a href="/termos" style="margin-right:12px">Termos</a><a href="/privacidade">Privacidade</a></nav>
    </header>
    <main>
      ${bodyHtml}
    </main>
    <footer>&copy; 2026 Sonoplastia — Rede Daora</footer>
  </div>
</body>
</html>`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/+$/, '') || '/';

    // Home
    if (pathname === '/' || pathname === '/index.html') {
      const artistEntry = content['artista/index.md'] || '';
      const artistMdRaw = (typeof artistEntry === 'object' && artistEntry.raw) ? artistEntry.raw : (typeof artistEntry === 'string' ? artistEntry : '');
      const titleMatch = (artistMdRaw.match(/^#\s+(.+)$/m) || [null, 'Sonoplastia 2026']);
      const title = titleMatch[1];
      const descriptionEntry = content['artista/musica.md'] || '';
      const description = (typeof descriptionEntry === 'object' && descriptionEntry.html) ? descriptionEntry.html : (typeof descriptionEntry === 'string' ? escapeHtml(descriptionEntry) : '');
      // build gallery thumbnails
      const galleryList = [];
      for (const k of Object.keys(content)) {
        const v = content[k];
        if (typeof v === 'string') {
          const low = v.toLowerCase();
          if ((low.endsWith('.png') || low.endsWith('.jpg') || low.endsWith('.jpeg') || low.endsWith('.webp')) && low.includes('galeria')) {
            galleryList.push(v);
          }
        }
      }
      // fallback: any images under images/
      if (galleryList.length === 0) {
        for (const k of Object.keys(content)) {
          const v = content[k];
          if (typeof v === 'string') {
            const low = v.toLowerCase();
            if (low.startsWith('images/') && (low.endsWith('.png') || low.endsWith('.jpg') || low.endsWith('.jpeg') || low.endsWith('.webp'))) {
              galleryList.push(v);
            }
          }
        }
      }

      const soundsAvailable = Object.keys(content).find(k => k.startsWith('sounds/') || k.includes('/sounds/'));
      const audioSrc = soundsAvailable ? '/' + (typeof content[soundsAvailable] === 'string' ? content[soundsAvailable] : soundsAvailable) : null;

      const galleryHtml = galleryList.slice(0,6).map(img => `<img class="thumb" src="/${img}" alt="Galeria"/>`).join('');

      const html = renderPage(title, `
        <section class="hero">
          <div class="hero-main">
            <h2>${escapeHtml(title)}</h2>
            <div class="meta">${description}</div>
            <p><a class="cta" href="/api/content">Ver Conteúdo (JSON)</a></p>
          </div>
          <aside>
            <div class="player">
              ${audioSrc ? `<audio controls src="${escapeHtml(audioSrc)}" style="width:100%"></audio>` : '<div style="color:var(--muted)">Áudio não disponível</div>'}
              <div style="margin-top:8px;font-size:13px;color:var(--muted)">Ouça o single</div>
            </div>
          </aside>
        </section>
        <section style="margin-top:18px">
          <h3>Galeria</h3>
          <div class="gallery">${galleryHtml || '<div style="color:var(--muted)">Nenhuma imagem de galeria encontrada.</div>'}</div>
        </section>
        <section style="margin-top:18px">
          <h3>Links</h3>
          <p><a href="/termos">Termos de uso</a> • <a href="/privacidade">Política de privacidade</a></p>
        </section>
      `);
      return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8' } });
    }

    // API: full content
    if (pathname === '/api/content') {
      return new Response(JSON.stringify(content), { headers: { 'content-type': 'application/json; charset=utf-8' } });
    }

    // API: specific page
    if (pathname.startsWith('/api/page/')) {
      const slug = pathname.replace('/api/page/', '');
      let key = '';
      if (slug === 'termos') key = 'paginas/termos-de-uso.md';
      if (slug === 'privacidade') key = 'paginas/politica-privacidade.md';
      const md = content[key] || null;
      return new Response(JSON.stringify({ slug, markdown: md }), { headers: { 'content-type': 'application/json; charset=utf-8' } });
    }

    // Static pages: termos and privacidade
    if (pathname === '/termos' || pathname === '/termos/') {
      const md = content['paginas/termos-de-uso.md'] || '# Termos de Uso\n\nConteúdo não disponível.';
      const html = renderPage('Termos de Uso', mdToHtml(md));
      return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8' } });
    }

    if (pathname === '/privacidade' || pathname === '/privacidade/') {
      const md = content['paginas/politica-privacidade.md'] || '# Política de Privacidade\n\nConteúdo não disponível.';
      const html = renderPage('Política de Privacidade', mdToHtml(md));
      return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8' } });
    }

    return new Response('Not found', { status: 404 });
  }
};
