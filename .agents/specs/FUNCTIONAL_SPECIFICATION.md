# Especificação Funcional — Componentes e Comportamento (Astro)

## Mapeamento Componente ↔ Arquivo

| # | Seção | Componente Astro | Fonte de Dados |
|---|---|---|---|
| 1 | Header (Sticky) | `Header.astro` | Hardcoded no componente |
| 2 | Hero | `Hero.astro` | `src/content/artista/index.md` |
| 3 | Sobre (Artista) | `About.astro` | `src/content/artista/index.md` |
| 4 | Coletivo (Equipe) | `Team.astro` | `src/content/equipe/*.md` |
| 5 | Galeria + Lightbox | `Gallery.astro` + `Lightbox.astro` | `src/content/galeria/imagens.yaml` |
| 6 | Ficha Técnica | `TechSpecs.astro` | `src/content/ficha-tecnica/creditos.md` |
| 7 | Player de Áudio (Modal) | `AudioPlayer.astro` | `src/content/artista/musica.md` |
| 8 | Footer | `Footer.astro` | `src/content/footer.md` |
| 9 | Páginas Legais | `termos.astro` / `privacidade.astro` | `src/content/paginas/*.md` |
| — | Layout Base | `BaseLayout.astro` | — |

## 1. Header Fixo (Sticky Header) — `Header.astro`

### Comportamento
- Fixo no topo da página `position: sticky`
- `backdrop-filter: blur(18px)` com fundo semi-transparente
- Exibe marca "Sonoplastia 2026" à esquerda com bolinha decorativa gradiente
- Exibe link "Rede Daora" à direita (abre em nova aba)
- Hover do link: fundo/borda na cor complementar `#52260d`

### Acessibilidade
- `aria-label="Projeto fonográfico"` na marca
- `aria-hidden="true"` no link externo

### Astro
- Componente puro (sem interatividade cliente)
- Renderizado no servidor, incluído em `BaseLayout.astro`

## 2. Hero Section — `Hero.astro`

### Elementos
- Eyebrow "Lançamento Especial" com bolinha pulsante (CSS `box-shadow`)
- Título, descrição e CTA vindos de `src/content/artista/index.md`
- Botão CTA "Ouça o Single" com ícone play
- Hover do botão: fundo `#10ffff`, texto (e ícone) `#000000` — cor customizada, distinta do padrão do site

### Interação
- Clique no botão "Ouça o Single": abre o modal do player de áudio
- Botão possui `aria-haspopup="dialog"` e `aria-controls="audio-modal"`

### Astro
- Componente servidor (estático)
- Dados injetados via frontmatter do Astro: `await getCollection('artista')`
- Botão CTA referencia o `id` do `AudioPlayer.astro`

## 3. Seção "Sobre" (Artista) — `About.astro`

### Layout
- Duas colunas em desktop: foto (esquerda) + texto (direita)
- Uma coluna em mobile
- Abaixo do texto: contatos do artista (telefone, e-mail, SoundCloud)

### Contatos
- Ícones SVG inline (phone, mail, musical note)
- Links: `tel:`, `mailto:`, `https://soundcloud.com/...`
- Hover: fundo permanece translúcido/neutro; a cor complementar `#52260d` aparece **apenas como
  contorno** (`border-color` + `box-shadow` de 1px), sem preencher o botão; `translateY(-2px)`

### Astro
- Componente servidor
- Dados de `src/content/artista/index.md` (frontmatter: `contacts`, `aboutImage`, `aboutText`)

## 4. Seção "Coletivo" (Realizadores) — `Team.astro`

### Cards (3)
- Layout: 3 colunas em desktop, 1 em mobile
- Cada card contém:
  - Foto circular `110x110px` com borda roxa e glow
  - Nome
  - Info (idade + ocupação)
  - Bio
- Hover: `translateY(-4px)`, borda na cor complementar `#52260d` (com sombra marrom e leve tingimento de fundo)

### Astro
- Componente servidor
- Itera sobre `getCollection('equipe')` ordenado por `order`
- Cada membro é um arquivo `.md` em `src/content/equipe/`

## 5. Galeria com Lightbox — `Gallery.astro` + `Lightbox.astro`

### Grade (`Gallery.astro`)
- 6 imagens em grid de 3 colunas (desktop) / 1 coluna (mobile)
- Aspect ratio `4:3`
- Filtro `grayscale(15%)` — hover: `grayscale(0%)`, `scale(1.04)`, contorno de `3px` na cor complementar `#52260d` ao redor da imagem

### Lightbox (`Lightbox.astro` — modal interativo)
- **Abrir**: clique em qualquer imagem da galeria
- **Conteúdo**: imagem ampliada + caption (alt text)
- **Navegação**: 
  - Botões "Anterior" e "Próximo"
  - Setas do teclado `ArrowLeft` / `ArrowRight`
- **Fechar**: botão X, overlay click, Escape
- **Transição**: opacidade `0.3s`, imagem `scale(0.95 → 1)`
- **Loop**: navegação cíclica
- **Overflow**: `body overflow hidden` enquanto aberto

### Astro
- `Gallery.astro`: servidor (renderiza grid estático)
- `Lightbox.astro`: **cliente** (`client:load`) com script `lightbox.js`
- Dados das imagens vêm de `src/content/galeria/imagens.yaml`
- Script de interatividade em `src/scripts/lightbox.js`

## 6. Ficha Técnica — `TechSpecs.astro`

### Duas colunas
1. **Instrumentos e Músicos**
2. **Equipamento & Produção**

### Cada item técnico:
- Fundo semi-transparente `rgba(255,255,255,0.06)`
- Categoria em uppercase (cor ciano)
- Detalhes em texto secundário

### Astro
- Componente servidor
- Dados de `src/content/ficha-tecnica/creditos.md`

## 7. Player de Áudio (Modal) — `AudioPlayer.astro`

### Abertura
- Clique no botão "Ouça o Single"
- Foco vai para o botão Play
- `body overflow: hidden`

### Fechamento
- Botão X, overlay click, Escape
- Ao fechar: pausa o áudio, reseta overflow

### Funcionalidades do Player

| Controle | Comportamento |
|---|---|
| **Play/Pause** | Alterna entre play e pause; troca ícone SVG; trata erro |
| **Progress Bar** | `input type="range"`; `timeupdate`; seek; gradiente dinâmico |
| **Time Display** | `m:ss`; `tabular-nums` |
| **Volume Slider** | range min 0 max 1 step 0.05; volume inicial 0.8 |
| **Mute Toggle** | Alterna mudo; restaura último volume |
| **Letra (Lyrics)** | Toggle expande/contrai `max-height`; `aria-expanded` |

### Astro
- **Cliente** (`client:load`) — interatividade via `<script>` em `src/scripts/player.js`
- Dados de áudio e letra de `src/content/artista/musica.md`
- Modal é incluído no final do `body` (fora do `<main>`) no `BaseLayout.astro`

## 8. Footer — `Footer.astro`

### Grid (3 colunas em desktop)
1. **Sobre o Projeto**
2. **Privacidade & Termos**
3. **Desenvolvimento**: card com créditos + botão "Visitar Rede Daora"

### Botão "Voltar ao Topo"
- `window.scrollTo({ top: 0, behavior: 'smooth' })`
- Hover: fundo e borda em `#1010ff`

### Botão "Visitar Rede Daora" (card de Desenvolvimento)
- Hover: **inversão de cores** — fundo e texto trocam de lugar entre si (`#72D9F0` ↔ `#2D0D52`)

### Astro
- Componente servidor
- Conteúdo de `src/content/footer.md`
- "Voltar ao Topo" pode ser inline `<script>` no próprio componente

## 9. Páginas Legais — `termos.astro` / `privacidade.astro`

### Estrutura
- Usam `BaseLayout.astro` (herdam Header e Footer)
- Card centralizado (max-width `800px`)
- Conteúdo vindo de `src/content/paginas/termos-de-uso.md` e `src/content/paginas/politica-privacidade.md`

### Astro
```astro
---
// src/pages/termos.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';
const [pagina] = await getCollection('paginas', ({ slug }) => slug === 'termos-de-uso');
---
<BaseLayout title="Termos de Uso">
  <article class="legal-card">
    <Content />
  </article>
</BaseLayout>
```

## 10. Acessibilidade Geral

- Skip link "Pular para o conteúdo" (visível no foco) — no `BaseLayout.astro`
- `role="dialog"` nos modais — `AudioPlayer.astro` e `Lightbox.astro`
- `aria-hidden="true/false"` — gerenciado via JS nos scripts cliente
- Foco gerenciado via JS
- Keyboard: Escape fecha modais, setas navegam lightbox
- `aria-label` em todos os controles interativos
