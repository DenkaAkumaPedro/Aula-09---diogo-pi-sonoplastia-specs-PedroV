# Especificação Geral do Projeto

## Nome do Projeto

**Sonoplastia 2026 — "Todos os Meses" (Clóvis Ribeiro)**

## Resumo

Landing page de lançamento do single "Todos os Meses", do cantor e compositor Clóvis Ribeiro, gravado em parceria com o curso de Sonoplastia da Rede Daora. O site funciona como portfólio/página de apresentação tanto para os alunos de sonoplastia quanto para o aluno de programação web (Diogo M.) que o desenvolveu. Projeto educacional, sem fins comerciais.

## Público-Alvo

- Avaliadores e professores do curso de Programação Web da Rede Daora
- Avaliadores e professores do curso de Sonoplastia da Rede Daora
- O artista Clóvis Ribeiro e sua rede de contatos
- Comunidade da Rede Daora (Polo Butantã)

## Funcionalidades Principais

1. Hero section com chamada para ouvirem o single
2. Seção "Sobre" com biografia do artista e contatos
3. Seção "Coletivo" com cards dos alunos de sonoplastia
4. Galeria de imagens das sessões de gravação com lightbox
5. Ficha técnica com instrumentos/músicos e equipamentos/produção
6. Player de áudio customizado em modal com letra expansível
7. Rodapé com links para termos de uso e política de privacidade
8. Páginas de Termos de Uso e Política de Privacidade (LGPD)
9. Acessibilidade: skip link, ARIA labels, navegação por teclado

## Tecnologias

- **AstroJS** (static site generator, output estático)
- **TypeScript** (código tipado nos componentes e collections)
- **CSS3** (variáveis customizadas, Flexbox, Grid, sem frameworks CSS)
- **JavaScript vanilla** (ES6, sem bibliotecas JS externas)
- **Astro Content Collections** (conteúdo gerenciado via Markdown + frontmatter + Zod)
- **SVG inline** (para ícones)
- **HTML5 `<audio>`** com player customizado
- **Vercel** (deploy estático via `@astrojs/vercel` ou output `static`)

## Dependências

O projeto utiliza **npm e Node.js** como toolchain de build:

| Dependência | Função |
|---|---|
| `astro` | Framework principal (static site generator) |
| `@astrojs/vercel` | Adapter para deploy no Vercel |
| `typescript` | Suporte a TS no ambiente de desenvolvimento |

Todas as dependências são **devDependencies** — o build final é HTML/CSS/JS puro, sem runtime JS no cliente (exceto scripts de interatividade do player e lightbox).

## Pessoas Envolvidas

| Papel | Nome |
|---|---|
| Desenvolvedor | Diogo M. (aluno Programação Web) |
| Arte-Educador (Programação Web) | Renato Ricco |
| Arte-Educador (Sonoplastia) | Jhonny Magi |
| Fotografia | Jhonny Magi |
| Artista | Clóvis Ribeiro |
| Alunos Sonoplastia | Akin Labi Mendes, Albert Jonnes Carrer, Walmor Carvalho |

## Estrutura de Arquivos (Astro)

```
.
├── src/
│   ├── pages/                     # Rotas da aplicação
│   │   ├── index.astro            # Página principal
│   │   ├── termos.astro           # Termos de Uso
│   │   └── privacidade.astro      # Política de Privacidade
│   ├── layouts/
│   │   └── BaseLayout.astro       # Layout compartilhado (header + footer)
│   ├── components/                # Componentes .astro reutilizáveis
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Team.astro
│   │   ├── Gallery.astro
│   │   ├── TechSpecs.astro
│   │   ├── Footer.astro
│   │   ├── AudioPlayer.astro
│   │   └── Lightbox.astro
│   ├── styles/
│   │   └── global.css             # Design tokens + resets globais
│   ├── scripts/                   # JavaScript de interatividade (cliente)
│   │   ├── player.js
│   │   └── lightbox.js
│   └── content/                   # Content Collections (Astro)
│       ├── config.ts              # Schemas Zod para validação
│       ├── artista/
│       │   ├── index.md
│       │   └── musica.md
│       ├── equipe/
│       │   ├── coletivo.md
│       │   ├── akin-labi-mendes.md
│       │   ├── albert-jonnes-carrer.md
│       │   └── walmor-carvalho.md
│       ├── galeria/
│       │   ├── index.md
│       │   └── imagens.yaml
│       ├── ficha-tecnica/
│       │   └── creditos.md
│       ├── paginas/
│       │   ├── termos-de-uso.md
│       │   └── politica-privacidade.md
│       └── footer.md
├── public/                        # Arquivos estáticos servidos na raiz
│   ├── images/                    # 13 imagens
│   │   ├── hero-clovis-violao.png
│   │   ├── Clovis Ribeiro.png
│   │   ├── Akin Labi Mendes.jpeg
│   │   ├── Albert Jonnes Carrer.jpeg
│   │   ├── Walmor Carvalho.jpeg
│   │   ├── galeria-*.png          # 6 imagens de galeria
│   │   └── clovis-*.png           # 2 imagens extras
│   └── sounds/
│       └── clovis-demo.mp3        # Single demo
├── astro.config.mjs               # Configuração do Astro (adapter Vercel)
├── tsconfig.json                  # Configuração TypeScript
├── package.json                   # Dependências npm
├── vercel.json                    # Configuração de deploy Vercel
├── .gitignore                     # node_modules, dist, .astro
└── DATA/                          # (opcional) fonte original do conteúdo — backup
```

## Repositório

- GitHub: `https://github.com/rdricco/diogo-pi-sonoplastia.git`
- Vercel: auto-deploy a partir do branch principal
