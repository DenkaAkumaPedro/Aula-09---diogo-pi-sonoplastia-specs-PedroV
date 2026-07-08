# Sonoplastia — Cloudflare Workers

Projeto para servir o conteúdo do site "Sonoplastia 2026" via Cloudflare Workers.

Passos rápidos:

1. Instale dependências:

```bash
npm install
```

2. Gere o JSON de conteúdo a partir da pasta `DATA/`:

```bash
npm run build-content
```

Isso criará `src/content.json` que o Worker usa.

3. Gerar arquivo único para publicação no painel Cloudflare (copy/paste):

```bash
npm run inline-worker
```

Isso cria `dist/worker.inlined.js`. Abra esse arquivo e copie o conteúdo para o editor de Workers no painel Cloudflare (Workers → Create a Service → Quick Edit). Esse método evita a necessidade do `wrangler.toml` ou R2 — o `content.json` fica embutido no script.

4. Publicação manual pelo painel Cloudflare:

- Acesse o painel Cloudflare → Workers → Create a Service → Start from scratch.
- Abra o editor (Quick Edit) e cole o conteúdo de `dist/worker.inlined.js`.
- Salve e teste com o botão "Save and Deploy".

Observações:
- Assets (imagens/áudio) são referenciados por caminho relativo (ex.: `images/...` ou `sounds/...`). Para que os URLs funcionem no ambiente de produção, publique a pasta `DATA/images` e `DATA/sounds` em um servidor estático ou Cloudflare Pages (recomendado). No painel Cloudflare você pode criar um Pages site apontando para o mesmo repositório e servir `/images` e `/sounds` a partir de `https://<your-pages>.pages.dev/images/...`.
- Alternativa sem Pages: abra `dist/worker.inlined.js` e inicie `content` com URLs absolutas apontando para onde você hospedará as imagens/áudios.

Se preferir que eu gere um workflow GitHub Actions que publique automaticamente via API (sem `wrangler.toml`), posso preparar esse arquivo também — basta me autorizar e me dizer o nome do Worker.
