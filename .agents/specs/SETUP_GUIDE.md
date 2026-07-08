# Guia de Setup e Deploy (Astro)

## Pré-requisitos

- **Node.js** 18+ (recomendado 20+)
- **npm** 9+ (ou pnpm/yarn)
- Editor com suporte a TypeScript + `.astro` (VS Code com extensão Astro oficial)

## Desenvolvimento Local

1. Clone o repositório:
   ```bash
   git clone https://github.com/rdricco/diogo-pi-sonoplastia.git
   cd diogo-pi-sonoplastia
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   O servidor Astro roda em `http://localhost:4321` com HMR (hot module replacement) — alterações em `.astro`, `.md`, `.css` e `.js` são refletidas automaticamente.

## Comandos

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia servidor de desenvolvimento com HMR |
| `npm run build` | Gera build estático em `dist/` |
| `npm run preview` | Serve o build localmente para testes |

## Estrutura para Criar do Zero

Para recriar o projeto do zero com Astro:

```bash
npm create astro@latest sonoplastia-2026 -- --template basics
cd sonoplastia-2026
npm install @astrojs/vercel
npx astro add vercel
```

Estrutura resultante:

```
projeto/
├── src/
│   ├── pages/               # Rotas (.astro)
│   ├── components/          # Componentes reutilizáveis
│   ├── layouts/             # Layouts compartilhados
│   ├── styles/              # CSS global
│   ├── scripts/             # JS cliente
│   └── content/             # Content Collections (markdown)
├── public/
│   ├── images/              # 13 imagens
│   └── sounds/              # clovis-demo.mp3
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── vercel.json
└── .gitignore
```

## Deploy no Vercel

### Setup do Adapter

O `@astrojs/vercel` já deve estar configurado em `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';

export default defineConfig({
  output: 'static',
  adapter: vercel(),
});
```

### Via CLI

```bash
npm run build
npx vercel --prod
```

### Via Git (auto-deploy)

1. Crie um repositório no GitHub
2. Conecte-o ao Vercel (vercel.com/import)
3. O Vercel detecta automaticamente o framework **Astro** (não configure como "Other")
4. A cada push para o branch principal, o Vercel executa `npm run build` e faz deploy

### Configuração do `vercel.json`

```json
{
  "version": 2,
  "cleanUrls": true
}
```

- `cleanUrls`: remove extensão `.html` das URLs
- Com o adapter do Vercel, as rotas do Astro são mapeadas automaticamente

## Personalização

### Para substituir o artista/equipe

1. **Imagens**: substitua os arquivos em `public/images/` mantendo os mesmos nomes, ou atualize os caminhos nos componentes `.astro`
2. **Texto**: edite os arquivos Markdown em `src/content/` (cada collection tem seu diretório)
3. **Áudio**: substitua `public/sounds/clovis-demo.mp3` pelo novo arquivo
4. **Letra**: atualize o frontmatter de `src/content/artista/musica.md`
5. **Contatos**: edite os campos no frontmatter de `src/content/artista/index.md`

### Para modificar o esquema de cores

Edite as variáveis CSS em `src/styles/global.css`:

```css
:root {
  --bg-primary: #2D0D52;     /* Fundo escuro */
  --bg-secondary: #4E1B7A;   /* Fundo médio */
  --primary: #8F4BDB;        /* Cor primária */
  --accent: #72D9F0;         /* Cor de destaque */
  --btn-primary-bg: #1088FF; /* Cor do botão CTA */
}
```

## Checklist de Verificação

- [ ] `npm run build` finaliza sem erros
- [ ] Navegação por teclado (Tab, Enter, Escape, setas)
- [ ] Modais abrem e fecham corretamente
- [ ] Player de áudio reproduz, pausa, faz seek
- [ ] Volume e mute funcionam
- [ ] Letra expande e recolhe
- [ ] Lightbox navega por todas as imagens
- [ ] Links externos abrem em nova aba
- [ ] Páginas de termos e privacidade acessíveis
- [ ] Skip link funcional
- [ ] Responsivo em mobile, tablet, desktop
- [ ] `noindex, nofollow` presente em todas as páginas
- [ ] Conteúdo das collections Astro corresponde ao esperado
