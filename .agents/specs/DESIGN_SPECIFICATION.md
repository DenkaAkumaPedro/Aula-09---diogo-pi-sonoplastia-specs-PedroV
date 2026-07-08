# Especificação de Design e Identidade Visual

> Nota: Com Astro, o CSS permanece visualmente idêntico. A única mudança é a **arquitetura dos estilos**:
> - Design tokens (`:root`) e reset → `src/styles/global.css`
> - Estilos de cada seção → `<style>` scoped no respectivo componente `.astro`
> - Astro scoped styles são prefixados automaticamente (`data-astro-*`), eliminando conflitos
> - Não há mudança nos valores de design, breakpoints, ou comportamento visual
>
> **Atualizado em:** Julho de 2026 — inclui a cor complementar `#52260d` (usada em estados de hover
> para reforço de contraste) e overrides pontuais de hover em botões específicos, definidos durante
> a rodada de revisão visual do preview.

## Sistema de Design (Design Tokens)

### Cores

```css
/* Backgrounds */
--bg-primary:   #0d3952;  /* Roxo escuro profundo */
--bg-secondary: #1b647a;  /* Roxo médio */
--bg-card:      #288ea8;  /* Roxo claro para cards */

/* Marca */
--primary:       #4bcadb;  /* Roxo vibrante */
--primary-hover: #5fe6f0;  /* Roxo hover */
--secondary:     #56ddc0;  /* Azul médio */
--accent:        #72f0ca;  /* Ciano (cor de destaque) */

/* Texto */
--text-primary:   #FFFFFF;  /* Branco */
--text-secondary: #D9C9F0;  /* Lilás claro */
--text-muted:     #BBA5DA;  /* Lilás acinzentado */

/* Bordas */
--border: rgb(0, 0, 0)

/* Botões */
--btn-primary-bg:   #1088FF;  /* Azul do CTA */
--btn-primary-text: #FFFFFF;
--btn-secondary-bg:   #72D9F0;  /* Ciano */
--btn-secondary-text: #2D0D52;  /* Roxo escuro */

/* Estados */
--success: #2ECC71;
--warning: #F39C12;
--danger:  #FF6B6B;

/* Cor complementar (hover) */
--complement:      #52260d;              /* Marrom quente — reforça contraste no hover */
--complement-soft: rgba(82, 38, 13, 0.35);

/* Utilitários */
--shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
--radius: 24px;
--radius-sm: 16px;
--max: 1180px;
```

### Fundo

- Gradiente linear vertical: `--bg-primary` (0%) → `--bg-secondary` (50%) → `--bg-primary` (100%)
- Cards com gradiente sutil: `rgba(255, 255, 255, 0.06)` → `rgba(255, 255, 255, 0.03)`

### Tipografia

- **Font-family**: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- **Headings**: letter-spacing negativo, sem serifa
- **Hero title**: `clamp(2.4rem, 8vw, 5.5rem)`, line-height `0.95`, letter-spacing `-0.05em`
- **Section titles**: `clamp(1.5rem, 4vw, 2.4rem)`, line-height `1.05`, letter-spacing `-0.04em`
- **Corpo**: `1rem` (padrão), `line-height: 1.6`

## Estados de Hover (Cor Complementar)

A cor `--complement` (`#52260d`) foi adotada como padrão de reforço de contraste para a maioria dos
estados de hover do site. Existem também **três exceções pontuais**, com cores próprias definidas
caso a caso (documentadas na tabela abaixo).

### Regra geral (`--complement`)

Aplicada — como fundo sólido + borda + sombra — nos seguintes elementos ao passar o mouse:

| Elemento | Comportamento no hover |
|---|---|
| Link "Rede Daora" (header) | Fundo `--complement`, borda `--complement`, sombra marrom |
| Card do Coletivo (`.team-card`) | Borda `--complement`, sombra marrom, leve tingimento de fundo |
| Item da Galeria (`.gallery-item`) | Contorno (`box-shadow`) de `3px` em `--complement` ao redor da imagem |
| Botão fechar dos modais (`.modal-close`) | Fundo e borda `--complement`, rotação `90deg` |
| Botão Play do player (`.play-btn`) | Gradiente `--complement` → `#2f1508` |
| Ícones de volume/mute (`.icon-btn`) | Fundo circular `--complement` |
| Toggle "Letra" (`.lyrics-toggle`) | Fundo e borda `--complement` |
| Botões de navegação do Lightbox (`.nav-circle`) | Fundo e borda `--complement` |
| Links do rodapé (`.footer-links a`) | Sublinhado na cor `--complement` |
| Botão secundário genérico (`.btn-secondary`) | Fundo e borda `--complement` *(comportamento padrão da classe; ver exceção abaixo para "Visitar Rede Daora")* |

### Contatos do artista (`.contact-pill`) — exceção: contorno apenas

Os botões de **Telefone**, **E-mail** e **SoundCloud** (seção Sobre) usam `--complement` **apenas
como contorno** no hover — o fundo do botão permanece translúcido/neutro, sem preencher com a cor:

```css
.contact-pill:hover{
  background: rgba(255,255,255,0.04);
  border-color: var(--complement);
  box-shadow: 0 0 0 1px var(--complement);
  color: var(--text-primary);
  transform: translateY(-2px);
}
```

### Botão "Ouça o Single" (Hero CTA) — cor própria, sem `--complement`

Mantém o estilo **original** do `.btn-primary` do design system (gradiente `#1088FF → #0070E0`),
mas recebeu um hover customizado, distinto da regra geral:

```css
#open-player:hover{
  background: #10ffff;
  color: #000000;             /* inclui o ícone de play, via currentColor */
  box-shadow: 0 12px 28px rgba(16,255,255,0.5);
}
```

| Estado | Fundo | Texto |
|---|---|---|
| Normal | Gradiente `#1088FF → #0070E0` | `#FFFFFF` |
| Hover | `#10ffff` | `#000000` |

### Botão "Voltar ao topo" (`#back-to-top`) — cor própria, sem `--complement`

```css
.top-btn:hover{
  background: #1010ff;
  border-color: #1010ff;
  color: var(--text-primary);
}
```

### Botão "Visitar Rede Daora" (`#visit-daora-btn`) — inversão de cores

Único botão do site com comportamento de **inversão**: no hover, fundo e texto trocam de lugar
entre si (não usa `--complement`):

```css
/* Normal */
background: var(--btn-secondary-bg);   /* #72D9F0 */
color: var(--btn-secondary-text);      /* #2D0D52 */

/* Hover — cores invertidas */
#visit-daora-btn:hover{
  background: var(--btn-secondary-text); /* #2D0D52 */
  color: var(--btn-secondary-bg);        /* #72D9F0 */
  border-color: var(--btn-secondary-text);
}
```

### Botões

- **Primário**: fundo gradiente azul (`#1088FF` → `#0070E0`), borda `999px`, padding `.95rem 1.2rem`, sombra azul
- **Secundário**: fundo ciano (`#72D9F0`), texto roxo escuro, borda `1px solid var(--border)`
- **Hover (regra geral)**: `translateY(-2px)`, sombra intensificada, cor de fundo trocada para `--complement`, transição `180ms`
- **Exceções de hover**: ver tabela acima ("Ouça o Single", "Voltar ao topo", "Visitar Rede Daora")

## Layout

### Container

```css
width: min(calc(100% - 2rem), var(--max));
margin-inline: auto;
```

### Hero

- Grid de 2 colunas em desktop (`1.15fr 0.85fr`)
- 1 coluna em mobile
- Imagem com overlay gradiente e filtro `saturate(0.95) contrast(1.08) brightness(0.95)`

### Seções

- Padding vertical: `1.5rem` (mobile), `2rem` (720px+), `2.4rem` (1024px+)
- Cards com padding: `1.5rem` / `2rem` / `2.2rem`

### Grids Responsivos

| Componente | Mobile | 720px+ |
|---|---|---|
| Hero | 1 coluna | 2 colunas |
| Realizadores | 1 coluna | 3 colunas |
| Galeria | 1 coluna | 3 colunas |
| Ficha Técnica | 1 coluna | 2 colunas |
| Footer | 1 coluna | 3 colunas (1.5fr 1fr 1fr) |

### Breakpoints

- `600px`: ajuste de padding em tabelas
- `720px`: grids de 2-3 colunas
- `768px`: footer grid
- `1024px`: hero maior, padding expandido

## Header (Sticky)

- `position: sticky; top: 0; z-index: 50`
- `backdrop-filter: blur(18px)` com fundo semi-transparente
- Borda inferior sutil
- Marca: bolinha gradiente (roxo → azul) + texto "Sonoplastia 2026"
- Link externo "Rede Daora" alinhado à direita
- Hover do link: fundo/borda `--complement` (`#52260d`)

## Footer

- Fundo `rgba(45, 13, 82, 0.4)` com `backdrop-filter: blur(12px)`
- Grid de 3 colunas (768px+)
- Card de desenvolvedor com borda e sombra
- Botão "Voltar ao topo" — hover em `#1010ff`
- Botão "Visitar Rede Daora" — hover com cores invertidas
- Links para Termos e Privacidade — hover com sublinhado em `--complement`

## Modais

### Player de Áudio
- Overlay escuro com `backdrop-filter: blur(12px)`
- Card central: largura `480px` max, gradiente roxo, borda sutil
- Arte do álbum: `80x80px`, borda ciano com glow
- Botão de fechar: hover em `--complement` (`#52260d`)
- Botão Play: hover em gradiente `--complement`
- Transições: opacidade `0.3s`, transform `scale`

### Lightbox
- Overlay escuro `rgba(15, 5, 27, 0.96)` com `backdrop-filter: blur(8px)`
- Imagem: `max-height: 70vh`, borda arredondada, sombra
- Botões de navegação: círculos semi-transparentes, hover em `--complement`
- Mobile: navegação na parte inferior
- Transições: opacidade `0.3s`, transform `scale`

## Galeria

- Grid de 3 colunas (720px+)
- Aspect ratio `4/3`
- Hover: escala `1.04`, remove grayscale, contorno `3px` em `--complement`
- Filtro padrão: `grayscale(15%) contrast(1.05)`

## Cards de Realizadores

- Centralizados, texto alinhado ao centro
- Fotos: `110x110px`, `border-radius: 50%`, borda roxa com glow
- Hover: `translateY(-4px)`, borda `--complement`, sombra marrom
- Transição: `200ms`

## Player de Áudio Customizado

### Progress Bar
- Altura: `6px`, border-radius: `999px`
- Thumb: `14x14px`, ciano com glow
- Background gradiente dinâmico via JS

### Volume Slider
- Largura: `80px`, altura: `4px`
- Thumb: `10x10px`

### Play Button
- `54x54px`, gradiente azul, sombra, `scale(1.08)` + gradiente `--complement` no hover

### Letra
- Expansão: `max-height` animada (`0` → `220px`)
- `mask-image` linear gradient para fade nas bordas
- Scroll customizado (`4px`, ciano semi-transparente)
- Botão de toggle: hover em `--complement`
