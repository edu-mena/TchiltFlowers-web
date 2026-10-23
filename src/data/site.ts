import type { ImageKey } from './images'

// Conteúdo do site. Os textos marcados com MOCK são simulados:
// confirmar com a Tchily Flowers antes de publicar.

export type Place = { x: number; y: number; w: number; rot: number; depth: number }

export const site = {
  name: 'Tchily Flowers',
  city: 'Luanda, Angola',
  tagline: 'Flores para a alma, um presente de Deus para quem ama.',
  instagram: { handle: '@flowers.tchily', url: 'https://www.instagram.com/flowers.tchily/' },
  whatsapp: {
    // formato 244XXXXXXXXX. Vazio: todos os botões usam o link da bio.
    number: '',
    fallbackUrl: 'https://wa.me/message/LK27W776ENEJK1',
  },
  founderName: '', // MOCK: por confirmar
  hours: 'Segunda a sábado, das 8h às 19h', // MOCK
  credit: { name: 'Eduardo Baptista', url: 'https://eduardomena.vercel.app' },
}

export const nav = [
  { id: 'servicos', label: 'Serviços' },
  { id: 'flores', label: 'Flores' },
  { id: 'florista', label: 'A florista' },
  { id: 'contacto', label: 'Contacto' },
]

// x/y em % do ecrã (centro da foto), w em vw, rot em graus, depth = intensidade do parallax
export const hero = {
  title: ['Flores para', 'a *alma*.'],
  lede: 'Buquês, arranjos e flores para eventos em Luanda, feitos à mão e entregues com cuidado.',
  ctaMessage: 'Olá! Gostaria de fazer uma encomenda.',
  focus: 'jarra' as ImageKey,
  photos: [
    { image: 'peonias', label: 'Peónias', desktop: { x: 13, y: 24, w: 12, rot: -4, depth: 0.6 }, mobile: { x: 16, y: 20, w: 30, rot: -4, depth: 0 } },
    { image: 'floristaCaixa', desktop: { x: 33, y: 14, w: 8, rot: 5, depth: 0.9 } },
    { image: 'floristaRetrato', desktop: { x: 67, y: 15, w: 7.5, rot: -4, depth: 0.7 } },
    { image: 'caixa', label: 'Caixa rosa', desktop: { x: 87, y: 26, w: 10.5, rot: 3, depth: 1 }, mobile: { x: 86, y: 22, w: 24, rot: 4, depth: 0 } },
    { image: 'mesa', desktop: { x: 4, y: 58, w: 13, rot: 4, depth: 0.4 }, mobile: { x: 55, y: 15, w: 30, rot: -2, depth: 0 } },
    { image: 'floristaCheirar', desktop: { x: 97, y: 60, w: 9.5, rot: -3, depth: 0.7 }, mobile: { x: 88, y: 80, w: 22, rot: 3, depth: 0 } },
    { image: 'lirios', label: 'Lírios brancos', desktop: { x: 19, y: 82, w: 12, rot: 2, depth: 0.8 }, mobile: { x: 16, y: 82, w: 30, rot: 2, depth: 0 } },
    { image: 'jarra', desktop: { x: 50, y: 89, w: 10, rot: -2, depth: 0.3 } },
    { image: 'arranjo', desktop: { x: 80, y: 82, w: 15, rot: -2, depth: 0.5 }, mobile: { x: 54, y: 92, w: 34, rot: -3, depth: 0 } },
  ] as Array<{ image: ImageKey; label?: string; desktop: Place; mobile?: Place }>,
}

// {chave} insere uma pequena imagem oval no meio da frase
export const manifesto = {
  text: 'Escolhemos cada flor {peonias} à mão, para celebrar, consolar {lirios} e lembrar {arranjo} quem se ama.',
}

export const services = {
  title: ['Para cada', '*momento*.'],
  lede: 'Do buquê de última hora ao casamento inteiro. Diga-nos a ocasião e tratamos do resto.',
  // MOCK: descrições simuladas a partir dos destaques do Instagram
  items: [
    {
      name: 'Buquê Express',
      description: 'Buquês montados no próprio dia e entregues em Luanda. Para quando a vontade de oferecer flores não pode esperar.',
      image: 'lirios',
    },
    {
      name: 'Noivas',
      description: 'O buquê da noiva, as lapelas, as mesas e os detalhes da cerimónia, pensados em conjunto consigo.',
      image: 'jarra',
    },
    {
      name: 'Eventos',
      description: 'Decoração floral para aniversários, jantares, eventos de empresa e celebrações em família.',
      image: 'mesa',
    },
    {
      name: 'Nascimentos',
      description: 'Arranjos e balões personalizados com o nome do bebé, para receber quem chega.',
      image: 'caixa',
    },
    {
      name: 'Condolências',
      description: 'Arranjos e coroas de flores para homenagear com respeito e carinho.',
      image: 'lirios',
      focus: '20% 80%',
    },
    {
      name: 'Datas especiais',
      description: 'Dia dos Namorados, 8 de Março e todos os dias que pedem flores.',
      image: 'arranjo',
    },
  ] as Array<{ name: string; description: string; image: ImageKey; focus?: string }>,
}

export const products = {
  title: ['Prontos a', '*oferecer*.'],
  lede: 'Uma selecção do que fazemos todas as semanas. Cada peça é montada no dia da entrega.',
  // MOCK: preços simulados, em kwanzas. null = "Por encomenda"
  items: [
    { name: 'Caixa de Flores Rosa', description: 'Delfínios, lírios e rosas numa caixa com laço.', price: 45000, image: 'caixa' },
    { name: 'Buquê de Lírios Brancos', description: 'Lírios, rosas brancas e crisântemos verdes.', price: 30000, image: 'lirios' },
    { name: 'Peónias', description: 'Lotes especiais, só por encomenda.', price: null, image: 'peonias' },
    { name: 'Arranjo em Jarra', description: 'Rosas e gipsófila numa jarra de porcelana.', price: 60000, image: 'jarra' },
    { name: 'Arranjo Lírio & Orquídea', description: 'Lírio rosa, orquídeas, cravo e rosas creme.', price: 38000, image: 'arranjo' },
  ] as Array<{ name: string; description: string; price: number | null; image: ImageKey }>,
}

export const flowers = {
  title: ['As nossas', '*flores*.'],
  lede: 'Cada flor diz uma coisa. Nós ajudamos a escolher a certa.',
  // uma foto diferente por flor, recortada na zona onde essa flor aparece
  items: [
    { name: 'Peónia', meaning: 'Prosperidade e romance', image: 'peonias', focus: '50% 50%' },
    { name: 'Lírio', meaning: 'Pureza e admiração', image: 'lirios', focus: '72% 50%' },
    { name: 'Rosa', meaning: 'Amor', image: 'jarra', focus: '50% 20%' },
    { name: 'Delfínio', meaning: 'Leveza e alegria', image: 'caixa', focus: '50% 25%' },
    { name: 'Orquídea', meaning: 'Elegância', image: 'arranjo', focus: '92% 50%' },
    { name: 'Tulipa', meaning: 'Um novo começo', image: 'mesa', focus: '30% 50%' },
  ] as Array<{ name: string; meaning: string; image: ImageKey; focus: string }>,
}

export const florist = {
  title: ['Escolhidas', 'flor a *flor*.'],
  // MOCK: texto simulado, a substituir pela história real
  text: 'Por trás de cada arranjo da Tchily Flowers há uma florista que escolhe, corta e monta tudo à mão, em Luanda. Do buquê do dia a um casamento inteiro, o cuidado é o mesmo.',
  quote: 'Declare um dia fantástico e isso vai acontecer.',
  // polaroids de bastidores, com legenda curta
  photos: [
    { image: 'floristaCheirar', caption: 'Primeiro, o perfume.' },
    { image: 'floristaRetrato', caption: 'À porta da loja.' },
    { image: 'floristaCaixa', caption: 'Caixa rosa de domingo.' },
  ] as Array<{ image: ImageKey; caption: string }>,
}

// MOCK: rascunho a validar com o cliente
export const about = {
  title: ['Flores com', '*intenção*.'],
  image: 'lirios' as ImageKey,
  statements: [
    { label: 'Missão', text: 'Transformar sentimentos em flores, com frescura, cuidado e pontualidade em cada entrega.' },
    {
      label: 'Visão',
      text: 'Ser a florista de confiança das famílias de Luanda em todos os momentos que importam, do primeiro buquê à última homenagem.',
    },
  ],
  values: [
    { name: 'Cuidado', text: 'Cada flor é escolhida e preparada à mão.' },
    { name: 'Frescura', text: 'Flores frescas, preparadas no próprio dia.' },
    { name: 'Pontualidade', text: 'A flor certa, no momento certo.' },
    { name: 'Fé e amor', text: 'Flores para a alma, um presente de Deus para quem ama.' },
  ],
}

export const gallery = {
  title: ['Do nosso', '*dia a dia*.'],
}

export const howTo = {
  title: ['Encomendar é', '*simples*.'],
  steps: [
    { text: 'Escolha o arranjo ou conte-nos a ocasião.', image: 'arranjo' },
    { text: 'Fale connosco no WhatsApp.', image: 'floristaRetrato' },
    { text: 'Nós preparamos e entregamos.', image: 'caixa' },
  ] as Array<{ text: string; image: ImageKey }>,
  // MOCK: informação prática simulada
  info: [
    { label: 'Entregas', value: 'Em toda a cidade de Luanda. A taxa depende da zona.' },
    { label: 'Horário', value: site.hours },
    { label: 'Antecedência', value: 'Buquê Express no próprio dia. Noivas e eventos com, pelo menos, duas semanas.' },
    { label: 'Pagamento', value: 'Transferência bancária, Multicaixa Express ou numerário.' },
  ],
}

// MOCK: testemunhos simulados. Substituir pelo feedback real dos destaques do Instagram.
export const testimonials = {
  title: ['Palavras de quem', '*recebeu*.'],
  items: [
    { quote: 'O buquê chegou à hora certa e ainda mais bonito do que nas fotos. A minha mãe nem queria acreditar.', name: 'Joana', occasion: 'aniversário' },
    { quote: 'Trataram das flores do nosso casamento com uma calma que nos deu paz. Ficou tudo perfeito.', name: 'Mariana e Paulo', occasion: 'casamento' },
    { quote: 'Pedi de manhã, chegou à tarde. Simples assim.', name: 'Edson', occasion: 'Buquê Express' },
    { quote: 'Num momento difícil, fizeram um arranjo com muito respeito e carinho. Não esqueço.', name: 'Família Neto', occasion: 'condolências' },
  ],
}

export const finalCta = {
  title: ['Há sempre uma flor', 'para dizer o que *sente*.'],
  photos: [
    { image: 'peonias', desktop: { x: 12, y: 24, w: 11, rot: -4, depth: 0.6 }, mobile: { x: 16, y: 13, w: 30, rot: -4, depth: 0.4 } },
    { image: 'caixa', desktop: { x: 87, y: 22, w: 9.5, rot: 3, depth: 1 }, mobile: { x: 85, y: 15, w: 24, rot: 3, depth: 0.6 } },
    { image: 'jarra', label: 'Rosas em jarra', desktop: { x: 31, y: 9, w: 7.5, rot: 4, depth: 0.4 } },
    { image: 'lirios', desktop: { x: 18, y: 90, w: 12, rot: 2, depth: 0.8 }, mobile: { x: 18, y: 89, w: 30, rot: 2, depth: 0.5 } },
    { image: 'arranjo', label: 'Lírio e orquídea', desktop: { x: 80, y: 95, w: 15, rot: -2, depth: 0.5 }, mobile: { x: 76, y: 95, w: 36, rot: -2, depth: 0.7 } },
  ] as Array<{ image: ImageKey; label?: string; desktop: Place; mobile?: Place }>,
}
