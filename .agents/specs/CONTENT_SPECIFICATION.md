# Especificação de Conteúdo

> Nota: Com Astro, o conteúdo é gerenciado via **Content Collections** em `src/content/`.
> Os textos e metadados abaixo estão espalhados em arquivos Markdown com frontmatter,
> validados pelos schemas Zod em `src/content/config.ts`.
> 
> **Mapeamento:**
> - Conteúdo do `index.html` → `src/content/artista/`, `src/content/equipe/`, `src/content/galeria/`, `src/content/ficha-tecnica/`, `src/content/footer.md`
> - Conteúdo de `termos.html` → `src/content/paginas/termos-de-uso.md`
> - Conteúdo de `privacidade.html` → `src/content/paginas/politica-privacidade.md`
> - Assets estáticos (imagens, áudio) → `public/images/` e `public/sounds/`

## Textos do Site

### Hero

- **Eyebrow**: `Lançamento Especial`
- **Título**: `A poesia de Clóvis Ribeiro`
- **Descrição**: 
  > O novo single **"Todos os Meses"**, do cantor e compositor Clóvis Ribeiro, celebra a entrega artística e a maturidade técnica da turma de Sonoplastia da [Rede Daora](https://rededaora.imelc.com.br/). Uma produção fonográfica única que une a sensibilidade musical do artista com a precisão dos alunos na captação, mixagem e masterização em estúdio.
- **CTA**: `Ouça o Single`

### Sobre (O Artista)

- **Eyebrow**: `O Artista`
- **Título**: `Clovis Ribeiro traz a voz, a poesia e a bagagem de quem vive a música.`
- **Parágrafo 1**:
  > O single conta com a voz marcante e a composição de **Clovis Ribeiro**. Cantor, compositor, radialista, escritor, jornalista e diretor musical do Grupo Cultura e Vida na Terceira Idade na Casa de Cultura do Butantã, ele traz uma sensibilidade única que acolhe a técnica.
- **Parágrafo 2**:
  > A música atravessa a estética do estúdio com personalidade própria: íntima na interpretação, ampla na produção e precisa na finalização. É um release que traduz maturidade sonora e cuidado editorial em cada detalhe.

### Contatos do Artista

| Tipo | Valor |
|---|---|
| Telefone | (11) 99202-5160 |
| E-mail | toqueclovisribeiro@yahoo.com.br |
| SoundCloud | https://soundcloud.com/clovisribeiroband2014 |

### Coletivo (Equipe)

- **Eyebrow**: `O Coletivo & Rede Daora`
- **Título**: `Quem fez o som acontecer.`
- **Descrição**:
  > Estudantes do curso de sonoplastia que atuaram de forma conjunta em todas as etapas de gravação, mixagem e masterização do single, sob a condução e orientação do arte-educador **Jhonny Magi**. Aqui, as trajetórias individuais se somam em uma entrega técnica coletiva.

#### Membros

| Nome | Idade | Ocupação | Bio |
|---|---|---|---|
| Akin Labi Mendes | 28 anos | DJ e Produtor Musical (AK1N) | Curador musical e cultural, produtor de eventos e festas, técnico de som e estudando sonoplastia |
| Albert Jonnes Carrer | 34 anos | Músico e Compositor | Já tocou em várias bandas e eventos por São Paulo e Brasil |
| Walmor Carvalho | — | Jornalista e Fotógrafo | Formação em produção audiovisual, dedicou parte da carreira acompanhando música e cultura, agora estuda os detalhes técnicos da produção musical |

### Galeria

- **Eyebrow**: `Galeria do Processo`
- **Título**: `Registro Visual das Sessões`
- **Descrição**: `Instantes capturados durante as sessões de ensaio, captação de voz e instrumentação no estúdio de gravação com Clovis Ribeiro.`

#### Imagens da Galeria

| Arquivo | Alt Text |
|---|---|
| `galeria-clovis-guitar.png` | Clóvis Ribeiro tocando guitarra elétrica no estúdio de gravação |
| `galeria-clovis-violao2.png` | Clóvis Ribeiro dedilhando violão durante ensaio no estúdio |
| `galeria-clovis-voz2.png` | Clóvis Ribeiro cantando próximo ao microfone de estúdio |
| `galeria-geral-clovis-baixo.png` | Clóvis Ribeiro tocando contrabaixo elétrico no estúdio |
| `galeria-geral-clovis-voz.png` | Plano médio de Clóvis Ribeiro cantando no estúdio de gravação |
| `galeria-geral-mesa-equipamentos.jpeg` | Mesa de som e equipamentos periféricos no estúdio da Rede Daora |

### Ficha Técnica

- **Eyebrow**: `Ficha técnica`
- **Título**: `Créditos e Infraestrutura Técnica`

#### Instrumentos e Músicos

| Categoria | Detalhes |
|---|---|
| **Vocais** | Vocal Principal: Clóvis Ribeiro; Vocais de Apoio: Clóvis Ribeiro, Albert Jonnes |
| **Violões** | Clóvis Ribeiro — Di Giorgio Vintage |
| **Guitarra** | Clóvis Ribeiro — Stratocaster Custom; Amplificação: Giannini U 75G 1974; Efeito: Trêmolo Analógico Giannini 70's |
| **Baixo** | Clóvis Ribeiro — Custom (Corpo Jennifer / Braço Giannini) |
| **Percussão** | Bongô: Clóvis Ribeiro; Chocalho: Albert Jonnes |

#### Equipamento & Produção

| Categoria | Detalhes |
|---|---|
| **Produção Técnica** | Gravação, Mix e Master: Akin Labi Mendes, Albert Jonnes Carrer e Walmor Carvalho; Arte-Educador: Jhonny Magi |
| **Gravadores de Fita** | Tascam 424 (Anos 90), CCE 3 Head (Anos 80) |
| **Microfones** | Shure SH 55, AKG P 120, AKG P 3S, Leson SM58 |
| **Mixer** | Soundvoice MS16EUX |

### Letra da Música — "Todos os Meses"

```
Começar tudo de novo
De janeiro a janeiro.
Fevereiro é carnaval,
Águas de março abril em maio.
Junho e julho é São João,
São Pedro e Santo Antonio.
Agosto para todos os Santos,
Há santos para os desgostos.
Setembro primaveril,
Brisa fresca do amor
Outubro e novembro
Me lembro demais.
Dezembro são todos iguais,
Dezembro são todos fatais,
Dezembro são todos Natais
```

### Rodapé

- **Texto do projeto**: 
  > Iniciativa dedicada à produção, captação, mixagem e masterização do single **"Todos os Meses"** de **Clóvis Ribeiro**, desenvolvida em colaboração com os alunos do curso de Sonoplastia da Rede Daora.
- **Desenvolvedor**: 
  > Desenvolvido por **Diogo M.** para o curso de Programação Web da **Rede Daora** (Polo Butantã).
- **Créditos**:
  > Textos do site por **Renato Ricco** (Arte-educador de Programação Web) • Imagens por **Jhonny Magi** (Arte-educador de Sonoplastia).
- **Ano**: 2026

## Assets de Mídia

### Imagens

As imagens ficam em `public/images/` e são referenciadas nos componentes `.astro` com caminho absoluto `/images/...`.

| Arquivo | Uso | Dimensões (aprox.) |
|---|---|---|
| `public/images/hero-clovis-violao.png` | Hero + Album Art do Player | Paisagem |
| `public/images/Clovis Ribeiro.png` | Seção Sobre (artista) | Retrato |
| `public/images/Akin Labi Mendes.jpeg` | Card do realizador | Quadrado (cortado em círculo) |
| `public/images/Albert Jonnes Carrer.jpeg` | Card do realizador | Quadrado (cortado em círculo) |
| `public/images/Walmor Carvalho.jpeg` | Card do realizador | Quadrado (cortado em círculo) |
| `public/images/galeria-clovis-guitar.png` | Galeria | Paisagem |
| `public/images/galeria-clovis-violao2.png` | Galeria | Paisagem |
| `public/images/galeria-clovis-voz2.png` | Galeria | Paisagem |
| `public/images/galeria-geral-clovis-baixo.png` | Galeria | Paisagem |
| `public/images/galeria-geral-clovis-voz.png` | Galeria | Paisagem |
| `public/images/galeria-geral-mesa-equipamentos.jpeg` | Galeria | Paisagem |
| `public/images/clovis-violao.png` | (não usada diretamente) | — |
| `public/images/clovis-voz1.png` | (não usada diretamente) | — |

### Áudio

| Arquivo | Conteúdo | Formato |
|---|---|---|
| `public/sounds/clovis-demo.mp3` | Single "Todos os Meses" — Clóvis Ribeiro | MP3 |

### Fonte de Conteúdo

Os textos e biografias estão nos arquivos Markdown dentro de `src/content/` (ver `src/content/artista/`, `src/content/equipe/`, etc.). Os schemas de validação estão em `src/content/config.ts`.
