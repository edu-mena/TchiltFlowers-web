// Fotos públicas do Instagram @flowers.tchily, recortadas para tirar texto e marcas de água.
// São de baixa resolução (330–640px de largura): nunca as mostrar a ecrã inteiro.
// Para acrescentar uma foto: põe o ficheiro em public/images/, junta a chave a ImageKey
// e uma entrada em `images`. A galeria e a fita de imagens usam todas as entradas, por esta ordem.

export type ImageKey =
  | 'jarra'
  | 'floristaCheirar'
  | 'mesa'
  | 'peonias'
  | 'caixa'
  | 'arranjo'
  | 'floristaRetrato'
  | 'lirios'
  | 'floristaCaixa'

export type SiteImage = {
  key: ImageKey
  src: string
  alt: string
  width: number
  height: number
  /** object-position usado quando a imagem é recortada */
  focus?: string
  tags: Array<'flores' | 'produto' | 'evento' | 'florista'>
}

const src = (file: string) => `${import.meta.env.BASE_URL}images/${file}`

export const images: Record<ImageKey, SiteImage> = {
  jarra: {
    key: 'jarra',
    src: src('jarra-rosas-rosa.jpg'),
    alt: 'Arranjo de rosas cor-de-rosa e gipsófila numa jarra de porcelana rosa e dourada',
    width: 512,
    height: 640,
    tags: ['flores', 'produto'],
  },
  floristaCheirar: {
    key: 'floristaCheirar',
    src: src('florista-a-cheirar.jpg'),
    alt: 'A florista da Tchily Flowers a cheirar um arranjo de lírios e crisântemos',
    width: 360,
    height: 570,
    focus: '50% 60%',
    tags: ['florista'],
  },
  mesa: {
    key: 'mesa',
    src: src('mesa-tulipas.jpg'),
    alt: 'Mesa de evento decorada com tulipas laranja e gipsófila',
    width: 640,
    height: 480,
    tags: ['evento', 'flores'],
  },
  peonias: {
    key: 'peonias',
    src: src('peonias-rosa.jpg'),
    alt: 'Peónias cor-de-rosa em grande plano',
    width: 360,
    height: 360,
    tags: ['flores', 'produto'],
  },
  caixa: {
    key: 'caixa',
    src: src('caixa-rosa-delphinium.jpg'),
    alt: 'Caixa de flores cor-de-rosa com laço, com delfínios azuis, lírios e rosas',
    width: 330,
    height: 500,
    focus: '50% 40%',
    tags: ['produto', 'flores'],
  },
  arranjo: {
    key: 'arranjo',
    src: src('arranjo-lirio-rosa.jpg'),
    alt: 'Arranjo com lírio rosa, lírio branco, cravo laranja e orquídeas, com um cartão',
    width: 485,
    height: 365,
    focus: '60% 50%',
    tags: ['produto', 'flores'],
  },
  floristaRetrato: {
    key: 'floristaRetrato',
    src: src('florista-retrato.jpg'),
    alt: 'Retrato da florista da Tchily Flowers, de blazer cor-de-rosa',
    width: 360,
    height: 435,
    focus: '45% 30%',
    tags: ['florista'],
  },
  lirios: {
    key: 'lirios',
    src: src('buque-lirios-brancos.jpg'),
    alt: 'Lírios brancos, rosas brancas e crisântemos verdes, com uma joaninha numa pétala',
    width: 360,
    height: 345,
    tags: ['flores', 'produto'],
  },
  floristaCaixa: {
    key: 'floristaCaixa',
    src: src('florista-caixa-rosa.jpg'),
    alt: 'A florista ao lado de uma caixa de flores cor-de-rosa com delfínios',
    width: 360,
    height: 390,
    tags: ['florista', 'produto'],
  },
}

export const allImages: SiteImage[] = Object.values(images)
