# Especificação Técnica e Arquitetura

## Arquitetura Geral

**Astro Static Site Generator** — output estático gerado a partir de componentes `.astro`, com conteúdo gerenciado por Content Collections (Markdown + frontmatter + Zod). Build gera HTML/CSS/JS puro na pasta `dist/`.

## Stack Técnica

| Camada | Tecnologia |
|---|---|
| **Framework** | AstroJS (static output) |
| **Linguagem** | TypeScript (componentes, config, schemas) |
| **Estilos** | CSS com scoped styles do Astro + CSS global (design tokens) |
| **Scripts cliente** | Vanilla JS ES6 em arquivos `.js` separados |
| **Conteúdo** | Astro Content Collections (Markdown + YAML + Zod schemas) |
| **Deploy** | Vercel via `@astrojs/vercel` (adapter) ou output estático |

## Páginas (Rotas)

### 1. `src/pages/index.astro`
Página principal composta pelos componentes:
- `BaseLayout` (layout shell)
- `Hero`
- `About`
- `Team`
- `Gallery`
- `TechSpecs`
- `AudioPlayer` (modal, lazy)
- `Lightbox` (modal, lazy)

### 2. `src/pages/termos.astro`
Termos de Uso — renderizado via `BaseLayout` + conteúdo estático ou vindo de `src/content/paginas/termos-de-uso.md`.

### 3. `src/pages/privacidade.astro`
Política de Privacidade (LGPD) — mesma estrutura de `termos.astro`.

## Configuração de Projeto

### `astro.config.mjs`
```js
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  output: 'static',
  adapter: vercel(),
});
```

### `tsconfig.json`
```json
{
  "extends": "astro/tsconfigs/base",
  "compilerOptions": {
    "strict": true
  }
}
```

### `vercel.json`
```json
{
  "version": 2,
  "cleanUrls": true
}
```
- `cleanUrls`: remove a extensão `.html` das URLs automaticamente
- O Vercel detecta automaticamente o framework Astro via `package.json`

### `.gitignore`
```
node_modules/
dist/
.astro/
.vercel
```

### `package.json`
```json
{
  "name": "sonoplastia-2026",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "devDependencies": {
    "astro": "^5.0.0",
    "@astrojs/vercel": "^8.0.0",
    "typescript": "^5.0.0"
  }
}
```

## HTML (Estrutura Gerada)

```
<body>
  <a class="skip-link">Pular para o conteúdo</a>
  <Header />                       <!-- componente Header.astro -->
  <main id="conteudo">
    <Hero />                       <!-- seção hero com CTA -->
    <About />                      <!-- seção sobre o artista -->
    <Team />                       <!-- cards da equipe -->
    <Gallery />                    <!-- galeria de imagens -->
    <TechSpecs />                  <!-- ficha técnica -->
    <Footer />                     <!-- componente Footer.astro -->
  </main>
  <AudioPlayer />                  <!-- modal do player (client:load) -->
  <Lightbox />                     <!-- modal da galeria (client:load) -->
</body>
```

### Metadados
- Gerenciados no `<Head>` do `BaseLayout.astro`
- `charset="UTF-8"`, `viewport`, `robots: noindex, nofollow`
- Título SEO e description por página (via props do layout)

## CSS

### Arquitetura
| Arquivo | Escopo | Conteúdo |
|---|---|---|
| `src/styles/global.css` | Global (importado no layout) | Design tokens (`:root`), reset, utilitários, estilos base |
| `src/layouts/BaseLayout.astro` | `<style>` scoped | Estilos do layout (container, main, skip-link) |
| `src/components/*.astro` | `<style>` scoped por componente | Estilos específicos de cada seção |

### Metodologia
- **CSS custom properties (variáveis)** definidas em `global.css` como design tokens
- **Scoped styles do Astro** (automaticamente prefixados com `data-astro-*` )
- Nomes de classes descritivos (BEM-like)
- Gradientes sutis em backgrounds e cards
- Transições suaves (`180ms` a `300ms`)
- Reset básico: `* { box-sizing: border-box }`, `body { margin: 0 }`, `:root` com tokens

### Responsividade
- Mobile-first
- Breakpoints: `600px`, `720px`, `768px`, `1024px`
- Uso extensivo de `clamp()` para fontes fluidas
- Grid layouts com `minmax(0, 1fr)`

## JavaScript

### Arquitetura
| Arquivo | Carregamento | Funcionalidade |
|---|---|---|
| `src/scripts/player.js` | `client:load` no componente `AudioPlayer.astro` | Player de áudio (play, pause, seek, volume, mute, lyrics) |
| `src/scripts/lightbox.js` | `client:load` no componente `Lightbox.astro` | Galeria modal (navegação, keyboard, fechamento) |
| Ícones SVG | Inline nos componentes `.astro` | Renderizados no servidor, sem JS |

### Estratégia de Interatividade
- Astro renderiza HTML/CSS estático no servidor
- Componentes com interatividade (`AudioPlayer`, `Lightbox`) usam `<script>` com `client:load`
- Scripts são bundlados pelo Astro (code-splitting automático)
- Sem frameworks JS — vanilla JS puro

### Funcionalidades Implementadas

1. **Audio Player** (modal)
   - Abrir/fechar modal com backdrop click e Escape
   - Play/Pause com toggle de ícones
   - Progress bar com seek
   - Volume slider com mute toggle
   - Letra expansível com toggle
   - Formatação de tempo (`mm:ss`)

2. **Lightbox Gallery**
   - Abrir ao clicar em imagem da galeria
   - Navegação: botões prev/next + setas do teclado
   - Fechar: botão X, overlay click, Escape
   - Atualização dinâmica de src e alt

3. **Acessibilidade Dinâmica**
   - `aria-hidden` toggle em modais
   - `aria-expanded` no botão de letra
   - `aria-label` descritivos
   - Foco gerenciado manualmente

4. **Sliders Customizados**
   - Função `updateSliderBackground()` para gradiente dinâmico no track
   - Suporte cross-browser (`-webkit-` e `-moz-`)

5. **Voltar ao Topo**
   - Pode ficar inline no Footer.astro ou em script separado

### Tratamento de Áudio
```javascript
// Estados
audioElement.volume = 0.8;  // volume inicial

// Eventos
'play'       → trocar ícone para pause
'pause'      → trocar ícone para play
'timeupdate' → atualizar progresso e tempo decorrido
'loadedmetadata' → exibir duração total

// Sliders
'input'      → seek no progresso / ajuste de volume
```

### Formatos de Imagem
- `.png` (10 imagens)
- `.jpeg` (3 imagens)

### Formato de Áudio
- `.mp3` (1 arquivo: `clovis-demo.mp3`)

## Content Collections (Gerenciamento de Conteúdo)

### Estrutura
O conteúdo do site é gerenciado via Astro Content Collections em `src/content/`:
- `artista/` — biografia, hero, música, contatos
- `equipe/` — membros da equipe
- `galeria/` — imagens e descrições
- `ficha-tecnica/` — créditos técnicos
- `paginas/` — termos de uso e política de privacidade
- `footer.md` — conteúdo do rodapé

### Schemas (Zod)
Definidos em `src/content/config.ts` com validação de tipos.

### Uso nos Componentes
```astro
---
import { getCollection } from 'astro:content';
const artista = await getCollection('artista');
const equipe = await getCollection('equipe');
---
```

## Performance

- Build estático gera HTML pré-renderizado (zero processamento no servidor)
- Scripts JS são code-splitted por página/componente
- Imagens otimizadas via ImgBot (commits anteriores)
- Astro minifica HTML, CSS e JS no build
- Fontes do sistema (zero font loading externo)
- CSS scoped elimina vazamento de estilos

## Compatibilidade de Navegadores

- Chrome, Firefox, Safari, Edge (versões recentes)
- `-webkit-` prefixes para sliders
- `backdrop-filter` para efeito glassmorphism
- Saída compatível com ES modules (modern browsers)

## Acessibilidade (a11y)

- Skip link: `Pular para o conteúdo`
- ARIA: `aria-hidden`, `aria-label`, `aria-expanded`, `aria-controls`, `aria-describedby`, `aria-haspopup`, `role="dialog"`
- Navegação por teclado: Escape, setas, Tab
- `font-variant-numeric: tabular-nums` para tempos do player
- HTML semântico: `<header>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<footer>`
- Foco visível no skip link
