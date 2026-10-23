# Prompt — Website Tchily Flowers (frontend)

Cria o frontend do website da **Tchily Flowers**, uma florista em Luanda, Angola. É um site estático de uma página (one-page) com âncoras, mobile-first, em português de Angola. **É só frontend:** não há backend, API, base de dados nem formulários. Todas as encomendas e contactos passam por links de WhatsApp. O objectivo é dar à marca uma presença elegante fora do Instagram e levar o visitante a encomendar.

O resultado tem de parecer feito por um estúdio de design editorial, não por uma IA. O design é muito limpo, calmo e fluido. As fotografias são a protagonista. A animação serve as imagens e nunca chama atenção para si própria.

---

## 1. Sobre a marca (factos reais do Instagram @flowers.tchily)

- Nome: **Tchily Flowers**. Florista em Luanda, com conta verificada no Instagram.
- **Logótipo:** é só o nome "Tchily Flowers", em texto (wordmark). Não há símbolo nem ícone.
- Frase da marca: **"Flores para a alma, um presente de Deus para quem ama."** O tom é afectuoso, próximo e com uma nota de fé.
- A dona aparece nos vídeos da marca: escolhe flores, monta arranjos e fala directamente com os clientes. Uma frase dela: *"Declare um dia fantástico e isso vai acontecer."*
- **Encomendas:** só por WhatsApp, através do link `https://wa.me/message/LK27W776ENEJK1`.
- **Serviços** (destaques do Instagram): Buquê Express, Noivas, Eventos, Ass. Floral, Condolências, datas especiais (Dia dos Namorados, 8 de Março), nascimentos (buquês com balão personalizado), Atendimento e Feedback.
- **Flores e produtos que aparecem nas fotos:** peónias rosa ("lote especial", por encomenda), lírios brancos e rosa, rosas rosa, brancas e creme, cravos, delfínios azuis, gipsófila, orquídeas, crisântemos verdes, tulipas, caixas de flores cor-de-rosa com laço, arranjos em jarra e mesas decoradas para eventos.

Não inventes números, prémios, anos de experiência nem contagens de clientes.

---

## 2. Stack técnica

- **React + TypeScript + Vite**, com build estático (`npm run build` gera ficheiros para alojar em qualquer servidor). Se a ferramenta só suportar Next.js, usa Next.js App Router com `output: 'export'`.
- **Tailwind CSS** com os design tokens abaixo, definidos como variáveis CSS.
- **Motion** (`motion/react`) para animações, `useScroll`/`useTransform` para efeitos ligados ao scroll, e `layoutId` para transições partilhadas.
- **Lenis** para scroll suave. Mantém o scroll nativo: nada de scroll-jacking que bloqueie a página.
- Todo o texto, os contactos, os serviços e os produtos ficam em `src/content/site.ts`, e todas as imagens num manifesto em `src/content/images.ts`. Para mudar conteúdo, não deve ser preciso mexer nos componentes.
- Componentes pequenos e reutilizáveis: `Wordmark`, `Reveal`, `ImageReveal`, `ParallaxImage`, `ScatterHero`, `HoverImageList`, `ProductRail`, `Gallery`, `Lightbox`, `WhatsAppButton`.

---

## 3. Direcção visual

### Paleta: rosa e branco (sem néon)

As cores da marca são combinações de rosa e branco. Define estes tokens em `:root`:

```
--white:  #FFFCFB   fundo principal, branco com um toque rosado
--blush:  #FBEFF0   rosa muito claro, fundo alternado
--petal:  #F4D3D9   rosa-peónia, fundos de destaque e placeholders
--rose:   #E3A3B1   rosa médio, só decorativo (linhas, detalhes); nunca para texto
--berry:  #A8395F   framboesa, acento: botão principal, links, hover (contraste AA sobre --white e --blush)
--wine:   #3A1B26   vinho profundo, secções escuras e footer (texto em --blush por cima)
--ink:    #2A1F22   texto principal
--line:   rgba(42, 31, 34, 0.12)   linhas finas
```

- A cor dominante é o branco, com o rosa em camadas suaves. `--berry` aparece pouco: botões, links e um ou outro detalhe.
- Nada de rosa-choque, néon, gradientes vistosos, glow, texto em gradiente, sombras pesadas nem glassmorphism.

### Logótipo (wordmark)

- "Tchily Flowers" em **Newsreader itálico**, peso 400, letter-spacing -0.01em, cor `--ink` (ou `--blush` sobre fundos escuros). É o mesmo estilo de serif itálica que a marca já usa nas fotos.
- Cria um componente `Wordmark` com tamanhos `sm` (header), `lg` (footer) e `xl` (o footer em ecrã grande pode usar o nome a toda a largura).
- Favicon: a letra "T" em Newsreader itálico, em `--berry` sobre `--blush`.

### Tipografia

- Títulos: **Newsreader** (Google Fonts), pesos 300 a 400, com o itálico para uma palavra de ênfase por título, no máximo.
- Texto: **Hanken Grotesk**, pesos 400 e 500.
- Escala fluida: H1 `clamp(3rem, 8vw, 7.5rem)` com line-height 0.95 e letter-spacing -0.02em; H2 `clamp(2.25rem, 5vw, 4.5rem)`; corpo 17px com line-height 1.6; parágrafos com 60ch no máximo.
- Os títulos são curtos (de 2 a 7 palavras) e são o primeiro elemento de cada secção. **Não há nada por cima deles.**

### Layout

- Grelha de 12 colunas no desktop, com gutter de 24px e largura máxima de 1440px. No telemóvel, margens laterais de 16px e nenhum scroll horizontal da página.
- Respiração generosa: padding vertical das secções `clamp(6rem, 14vh, 11rem)`.
- Composições assimétricas e editoriais: imagens ao lado de pouco texto, alinhamentos deslocados e imagens a sobrepor-se ligeiramente. Evita centrar tudo, excepto o hero.
- Imagens sem moldura e sem sombra, com cantos rectos ou um raio de 2px no máximo.

---

## 4. Imagens (fotografias reais da marca)

As fotografias estão em `public/images/` e vêm do Instagram da marca. **Usa só estas imagens.** Não uses bancos de imagens nem imagens geradas.

| Ficheiro | Tamanho | O que mostra | Onde usar |
|---|---|---|---|
| `jarra-rosas-rosa.jpg` | 512×640 | Arranjo de rosas rosa e gipsófila numa jarra de porcelana rosa e dourada | Imagem central do hero (a que cresce), produtos |
| `peonias-rosa.jpg` | 360×360 | Grande plano de peónias rosa | Hero, manifesto, índice de flores |
| `caixa-rosa-delphinium.jpg` | 330×500 | Caixa de flores cor-de-rosa com laço: delfínios azuis, lírios rosa e rosas | Hero, produtos, galeria |
| `buque-lirios-brancos.jpg` | 360×345 | Lírios brancos, rosas brancas e crisântemos verdes, com uma joaninha | Hero, manifesto, produtos, índice de flores |
| `arranjo-lirio-rosa.jpg` | 485×365 | Arranjo com lírio rosa, lírio branco, cravo laranja, orquídeas e cartão | Hero, produtos, galeria |
| `mesa-tulipas.jpg` | 640×480 | Mesa de evento com tulipas laranja e gipsófila sobre toalha vermelha | Serviço Eventos, galeria |
| `florista-a-cheirar.jpg` | 360×570 | A florista a cheirar um arranjo de lírios e crisântemos | Secção "A florista", hero |
| `florista-caixa-rosa.jpg` | 360×390 | A florista ao lado da caixa de flores rosa | Secção "A florista", galeria |
| `florista-retrato.jpg` | 360×435 | Retrato da florista com blazer rosa | Secção "A florista" |

**Regras para estas imagens (importante):**

- As fotos têm **baixa resolução** (entre 330 e 640px de largura). **Nunca as mostres a ecrã inteiro nem esticadas:** limita cada imagem a cerca de 1.5× a sua largura original (no máximo 560px de largura em CSS). O design tem de funcionar com imagens de tamanho médio e pequeno, em composições soltas. É isso que dá o ar editorial.
- Define sempre `width` e `height` e usa `object-fit: cover` com `object-position` para enquadrar o motivo. Pode haver recortes diferentes da mesma foto em secções diferentes, desde que a mesma foto nunca apareça duas vezes no mesmo ecrã.
- Escreve um `alt` descritivo em português para cada imagem, a partir da tabela.
- O manifesto `images.ts` tem os campos `src`, `alt`, `width`, `height`, `focus` (object-position) e `tags` (`flores`, `produto`, `evento`, `florista`). **Adicionar mais fotos tem de ser só acrescentar entradas ao manifesto:** a galeria e a fita de imagens usam todas as entradas automaticamente.
- `loading="lazy"` em todas as imagens excepto as do hero, que levam `fetchpriority="high"` na imagem central.

---

## 5. Movimento e micro-transições

Tokens de movimento:

```
--ease-out:    cubic-bezier(0.22, 1, 0.36, 1)
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)
micro-interacções: 200–300ms
reveals de texto:  700–900ms, stagger de 70ms
reveals de imagem: 1100–1400ms
```

- **Reveal de texto:** os títulos entram linha a linha por máscara (cada linha sobe de dentro de um contentor com `overflow: hidden`). Os parágrafos fazem fade com translateY de 24px para 0. Disparam quando 15–20% do elemento está visível, e só uma vez.
- **Reveal de imagem:** clip-path `inset(100% 0 0 0)` para `inset(0)`, com a imagem interior a ir de scale 1.15 para 1 ao mesmo tempo.
- **Parallax:** subtil (entre -8% e 8%), só nas imagens que estão soltas na composição.
- **Hover em imagens:** scale de 1.03 dentro do contentor, em 600ms.
- **Links:** um sublinhado fino cresce da esquerda para a direita.
- **Botões:** o botão principal tem fundo `--berry` e texto `--white`. No hover, o fundo escurece ligeiramente e o texto desliza 2px. Nada de saltos.
- **Header:** transparente sobre o hero. Depois do hero fica com fundo `--white` e uma linha fina por baixo. Esconde-se ao descer e reaparece ao subir.
- Anima apenas `transform`, `opacity` e `clip-path`. Usa `will-change` só durante a animação.
- **`prefers-reduced-motion`:** desliga parallax, flutuação, secções fixas (pin) e o scroll horizontal fixo. Fica só um fade de opacidade de 200ms.

### Transições entre secções (muito importante)

As secções não têm cortes duros nem divisórias. A passagem de uma para a outra tem de ser contínua:

1. **Cor de fundo contínua:** uma camada de fundo fixa interpola a cor conforme a secção visível (`--white` → `--blush` → `--white` → `--petal` → `--wine` → `--white` → `--blush`). A mudança acontece durante o scroll e nunca de forma brusca.
2. **Imagens-ponte:** em pelo menos duas passagens, uma imagem começa no fim de uma secção e termina na seguinte, sobrepondo-se ao limite entre as duas.
3. **Hero → Manifesto:** ver o ponto 6.1.
4. Proibido: divisórias em onda, blobs, linhas decorativas a separar secções.

---

## 6. Estrutura da página

### 6.0 Header

`Wordmark` à esquerda. Ao centro ou à direita, os links Serviços, Flores, A florista e Contacto. À direita, o botão "Encomendar". No telemóvel, um menu que abre em ecrã inteiro sobre `--blush`, com fade e os links grandes em serif a entrar com stagger.

### 6.1 Hero: imagens soltas e espalhadas

- Fundo `--white`. Por cima, **as 9 fotografias espalhadas livremente pelo ecrã**, como pétalas largadas numa mesa.
- Tamanhos variados (de 9vw a 18vw no desktop, nunca acima de 300px), rotações ligeiras (entre -5° e 5°) e algumas imagens a sair parcialmente pelas bordas. A composição é assimétrica e nada simétrica. Fica livre uma zona central de cerca de 40% da largura por 30% da altura, para o texto. `jarra-rosas-rosa.jpg` fica perto do centro, ligeiramente abaixo do texto.
- Texto centrado e curto:
  - H1: **"Flores para a alma."** (com "alma" em itálico)
  - Linha de apoio: "Buquês, arranjos e flores para eventos em Luanda, feitos à mão e entregues com cuidado."
  - Botão principal: "Encomendar no WhatsApp". Link secundário: "Ver serviços".
- **Entrada:** as imagens partem do centro, com scale 0.92 e opacidade 0, e espalham-se até às suas posições com stagger, durante cerca de 1.2s. A seguir, o texto revela-se linha a linha.
- **Em repouso:** cada imagem flutua ±6px em ciclos de 6 a 10s, com durações diferentes para não sincronizarem.
- **Ponteiro (desktop):** parallax por camadas. Cada imagem tem uma profundidade e move-se entre 4 e 20px no sentido contrário ao cursor.
- **Scroll (transição principal):** o hero fica fixo durante cerca de 150vh.
  - As outras imagens dispersam-se para fora do ecrã e o texto reduz e desvanece.
  - `jarra-rosas-rosa.jpg` endireita a rotação e cresce até uma janela vertical de `min(480px, 38vw)` de largura.
  - Enquanto isso, o fundo passa de `--white` para `--blush` e a janela desliza para a esquerda. A frase do Manifesto entra à direita.
  - Tem de ser perfeitamente suave e contínuo.
- **Telemóvel:** 6 imagens mais pequenas, sem secção fixa e sem parallax de ponteiro. Fica apenas um parallax leve de scroll e a dispersão.

### 6.2 Manifesto

Uma frase grande em serif, que se revela linha a linha, com **3 pequenas imagens ovais embutidas no meio do texto** (`peonias-rosa`, `buque-lirios-brancos`, `arranjo-lirio-rosa`):

> "Escolhemos cada flor [imagem] à mão, para celebrar [imagem], consolar e lembrar [imagem] quem se ama."

As imagens embutidas crescem de largura 0 até ao tamanho final quando a linha entra no ecrã.

### 6.3 Serviços: lista com imagem que segue o cursor

Uma lista vertical com linhas finas entre itens. Cada item tem o nome grande em serif, uma frase curta à direita e uma seta subtil. No desktop, ao passar o rato numa linha, aparece uma imagem flutuante (com cerca de 280px) que segue o cursor com inércia e troca com crossfade entre itens. No telemóvel, a imagem aparece pequena dentro de cada item.

- **Buquê Express:** "Buquês prontos para hoje, entregues em Luanda." (`buque-lirios-brancos`)
- **Noivas:** "O buquê, as lapelas e os detalhes do grande dia." (`jarra-rosas-rosa`)
- **Eventos:** "Mesas e espaços decorados com flores." (`mesa-tulipas`)
- **Nascimentos:** "Flores e balões personalizados para receber quem chega." (`caixa-rosa-delphinium`)
- **Condolências:** "Arranjos e coroas para homenagear com respeito." (`buque-lirios-brancos`, outro recorte)
- **Datas especiais:** "Dia dos Namorados, Dia da Mulher e todos os dias que pedem flores." (`arranjo-lirio-rosa`)

Cada item abre o WhatsApp com uma mensagem pré-preenchida, por exemplo: "Olá! Gostaria de saber mais sobre Noivas."

### 6.4 Produtos: faixa horizontal

- O fundo continua em `--white`.
- **Desktop:** a secção fica fixa e o scroll vertical move uma faixa horizontal de produtos. Uma barra fina de progresso em `--berry` acompanha o movimento.
- **Telemóvel:** faixa com swipe nativo e scroll-snap.
- Cartão de produto sem caixa: imagem com proporção 4:5 e no máximo 420px de largura, nome em serif, uma linha de descrição, "Sob consulta" no lugar do preço e o link "Pedir este".
- Produtos (nomes provisórios no `site.ts`):

| Produto | Imagem |
|---|---|
| Caixa de Flores Rosa | `caixa-rosa-delphinium` |
| Buquê de Lírios Brancos | `buque-lirios-brancos` |
| Peónias, por encomenda | `peonias-rosa` |
| Arranjo em Jarra | `jarra-rosas-rosa` |
| Arranjo Lírio & Orquídea | `arranjo-lirio-rosa` |

- Os preços, quando existirem, são em kwanzas, no formato `Kz 25.000`.

### 6.5 As nossas flores: índice botânico

- Fundo em transição para `--petal`.
- Uma lista grande, em serif, das flores que a marca usa, cada uma com o seu significado:
  - Peónia: prosperidade e romance
  - Lírio: pureza e admiração
  - Rosa: amor
  - Cravo: afecto
  - Delfínio: leveza e alegria
  - Gipsófila: delicadeza
  - Orquídea: elegância
  - Tulipa: um novo começo
- No desktop, o hover mostra a fotografia correspondente junto ao nome, usando um recorte da foto onde essa flor aparece (por exemplo, `focus` no cravo laranja de `arranjo-lirio-rosa`). No telemóvel, cada flor abre como um acordeão suave com a imagem e o significado.

### 6.6 A florista

- Fundo `--white`. Composição assimétrica com as três fotos da florista (`florista-a-cheirar`, `florista-retrato`, `florista-caixa-rosa`), em tamanhos diferentes e ligeiramente sobrepostas, com parallax subtil entre elas.
- Título: **"Escolhidas flor a flor."**
- Um parágrafo curto (placeholder no `site.ts`): quem é, como começou e o cuidado em cada arranjo. O campo `founderName` fica vazio até o cliente o preencher. Se estiver vazio, o texto não mostra nenhum nome.
- A citação dela, em serif itálico: *"Declare um dia fantástico e isso vai acontecer."*

### 6.7 Missão, visão e valores

- O fundo transita para `--wine` e o texto passa a `--blush`.
- **Missão:** uma frase grande, com uma imagem média ao lado que faz zoom lento ligado ao scroll (scale de 1 para 1.06).
  > "Transformar sentimentos em flores, com frescura, cuidado e pontualidade em cada entrega."
- **Visão:**
  > "Ser a florista de confiança das famílias de Luanda em todos os momentos que importam, do primeiro buquê à última homenagem."
- **Valores:** 4 blocos em texto, cada um com título em serif e uma frase. Sem ícones. Entram com stagger.
  - **Cuidado:** "Cada flor é escolhida e preparada à mão."
  - **Frescura:** "Flores frescas, preparadas no próprio dia."
  - **Pontualidade:** "A flor certa, no momento certo."
  - **Fé e amor:** "Flores para a alma, um presente de Deus para quem ama."
- *Missão, visão e valores são um rascunho a validar com o cliente. Ficam editáveis no `site.ts`.*

### 6.8 Galeria

- O fundo volta a `--white`.
- Grelha editorial assimétrica com todas as imagens do manifesto, mantendo as proporções originais e sem esticar. As imagens ficam desencontradas em altura e algumas sobrepõem-se ligeiramente. Não é um masonry uniforme.
- Ao clicar numa imagem, abre um lightbox com transição partilhada (`layoutId`): a imagem cresce do sítio onde estava, até ao seu tamanho original (sem a esticar), sobre um fundo `--blush` a 96%. Navegação por setas, teclado e swipe, e fecho com Esc ou arrastando para baixo no telemóvel.
- No fim da galeria, o link "Ver mais no Instagram" para `https://www.instagram.com/flowers.tchily/`.
- A seguir, uma **fita de imagens** a deslizar lentamente na horizontal, com imagens pequenas (cerca de 200px), que se pode arrastar e que pausa no hover.

### 6.9 Como encomendar

- Fundo `--white`. Três passos em texto, com números grandes em serif `--rose` e uma imagem pequena ao lado, sem ícones:
  1. "Escolha o arranjo ou conte-nos a ocasião."
  2. "Fale connosco no WhatsApp."
  3. "Nós preparamos e entregamos."
- Informação prática, com placeholders no `site.ts`: zonas de entrega em Luanda, horário de atendimento, antecedência para noivas e eventos, formas de pagamento.

### 6.10 Testemunhos

- Fundo `--blush`. Uma citação de cada vez, grande e em serif, com o nome do cliente e a ocasião (por exemplo, "Ana, casamento"). Muda com crossfade a cada 7s, pausa no hover e tem controlo manual discreto ("Anterior" e "Seguinte" em texto).
- Sem estrelas, sem avatares e sem carrossel com bolinhas. Os textos são placeholders, para substituir pelo feedback real que a marca publica no Instagram.

### 6.11 Chamada final

- Fundo `--blush`. É um eco do hero: 4 ou 5 fotos espalhadas e soltas, com flutuação lenta.
- Ao centro, o título **"Há sempre uma flor para dizer o que sente."** e o botão "Encomendar no WhatsApp".

### 6.12 Footer

Fundo `--wine`, texto `--blush`.

- O `Wordmark` em tamanho grande.
- Contactos (WhatsApp e Instagram @flowers.tchily), "Luanda, Angola" e horário.
- Links de navegação e "© 2026 Tchily Flowers".

### Botão flutuante (só no telemóvel)

Depois do hero, aparece um botão discreto em forma de pílula, no canto inferior direito, em `--berry` com o ícone do WhatsApp e o texto "Encomendar". Some na secção da chamada final, para não duplicar o botão.

---

## 7. WhatsApp

- No `site.ts` há um campo `whatsappNumber` (formato internacional, `244XXXXXXXXX`).
- Se esse campo estiver preenchido, todos os botões usam `https://wa.me/<número>?text=<mensagem codificada>`, com uma mensagem própria por produto ou serviço.
- Enquanto estiver vazio, todos os botões usam `https://wa.me/message/LK27W776ENEJK1`.
- Os links abrem num novo separador, com `rel="noopener"`.

---

## 8. O que é proibido (anti-"AI slop")

- **Eyebrows:** nada de etiquetas pequenas em maiúsculas por cima dos títulos ("SOBRE NÓS", "— OS NOSSOS SERVIÇOS"), nem numeração de secções ("01 / 02").
- Rosa-choque, néon ou cores saturadas, gradientes, texto em gradiente, glow, glassmorphism, `backdrop-blur` em cartões.
- Emojis na interface, ícones decorativos (grelhas de ícone + título + texto), brilhos ✨, corações.
- Grelhas de 3 cartões iguais, contadores ("+500 clientes"), badges "Novo", pílulas e tags por todo o lado.
- Cartões arredondados com sombra; divisórias em onda ou blob.
- Animações com bounce ou elásticas, efeito de máquina de escrever, texto a "baralhar", carrosséis automáticos com bolinhas, cursor personalizado que substitui a seta, parallax em tudo.
- Frases genéricas: "Descubra a magia", "Uma experiência única", "Bem-vindo ao mundo de…", "Transformamos sonhos em realidade", "Elevamos…".
- Lorem ipsum, imagens de banco ou geradas, avaliações com 5 estrelas, avatares.
- Imagens esticadas para lá da resolução, ou a ecrã inteiro.
- As fontes Inter, Poppins e Montserrat; toggle de modo escuro.

---

## 9. Texto (copywriting)

Português de Angola, com frases curtas e concretas e um tom caloroso. Trata o visitante por "você", usando construções neutras. Mantém os termos da marca: "Buquê Express", "Noivas", "Condolências". Usa os títulos e textos deste prompt tal como estão.

---

## 10. Qualidade, desempenho e acessibilidade

- A maioria das visitas virá do Instagram, no telemóvel e com dados móveis. Testa a 360px de largura.
- Lighthouse no telemóvel: Performance ≥ 90 e Acessibilidade ≥ 95. LCP abaixo de 2.5s em 4G. JavaScript abaixo de 200KB (gzip).
- Contraste AA em todo o texto, foco visível em todos os elementos interactivos, lightbox e menu navegáveis por teclado e com o foco preso enquanto estão abertos, `lang="pt-AO"`, HTML semântico (`header`, `main`, `section` com `aria-labelledby`, `footer`).
- Animações em pausa fora do ecrã. Nada de layout shift durante as animações.
- SEO:
  - `<title>`: "Tchily Flowers | Florista em Luanda: Buquês, Noivas e Eventos"
  - meta description
  - Open Graph com `jarra-rosas-rosa.jpg`
  - JSON-LD `Florist` com `areaServed: Luanda` e `sameAs` para o Instagram

---

## 11. Critérios de aceitação

- [ ] O hero tem as 9 fotos espalhadas, o texto centrado e curto, a entrada animada, a flutuação, o parallax de ponteiro e a transição por scroll em que a jarra cresce até uma janela e o fundo passa a rosa.
- [ ] Todas as secções do ponto 6 existem, por esta ordem, e passam de uma para a outra sem cortes, com a cor de fundo contínua e as imagens-ponte.
- [ ] A paleta é rosa e branco, com `--berry` e `--wine` só como acentos e fundos escuros.
- [ ] O logótipo é o wordmark "Tchily Flowers" em Newsreader itálico.
- [ ] Só são usadas as fotos de `public/images/`, nunca esticadas para lá de cerca de 1.5× o tamanho original.
- [ ] Nenhum item da lista do ponto 8 aparece no site.
- [ ] Todo o conteúdo e todas as imagens vêm de `site.ts` e `images.ts`. Acrescentar uma foto ao manifesto faz com que ela apareça na galeria e na fita de imagens.
- [ ] Todos os botões de encomenda abrem o WhatsApp correctamente.
- [ ] `prefers-reduced-motion` é respeitado.
- [ ] Funciona bem de 360px a 1920px, sem scroll horizontal da página.
