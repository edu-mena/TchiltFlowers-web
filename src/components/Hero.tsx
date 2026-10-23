import { useEffect, useMemo, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { images, type ImageKey } from '../data/images'
import { hero, manifesto, type Place } from '../data/site'
import { whatsappLink } from '../lib/helpers'
import { useFinePointer, useIsDesktop, useViewport } from '../lib/media'
import { scrollToId } from '../lib/scroll'
import { Drop, Frame, Img, RevealHeading, ease } from './Base'

type Pointer = { x: MotionValue<number>; y: MotionValue<number> }

/**
 * Desktop: o hero fica fixo durante o scroll. As fotos dispersam-se, a jarra cresce
 * até uma janela à esquerda e o manifesto aparece à direita.
 * Telemóvel ou movimento reduzido: hero simples, seguido do manifesto numa secção própria.
 */
export function Hero() {
  const isDesktop = useIsDesktop()
  const reduce = useReducedMotion()

  if (isDesktop && !reduce) return <PinnedHero />
  return (
    <>
      <SimpleHero isDesktop={isDesktop} />
      <Manifesto />
    </>
  )
}

function PinnedHero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const pointer = usePointer(useFinePointer())
  const { width: vw, height: vh } = useViewport()

  const copyOpacity = useTransform(p, [0, 0.16], [1, 0])
  const copyY = useTransform(p, [0, 0.16], ['0vh', '-6vh'])
  const copyScale = useTransform(p, [0, 0.16], [1, 0.96])
  const copyVisibility = useTransform(copyOpacity, (o) => (o < 0.02 ? 'hidden' : 'visible'))

  // A jarra começa como uma das fotos espalhadas e cresce até à janela final.
  const focus = images[hero.focus]
  const start = hero.photos.find((photo) => photo.image === hero.focus)!.desktop
  const ratio = focus.width / focus.height
  const finalWidth = Math.min(440, vw * 0.34, vh * 0.64 * ratio)
  const startWidth = Math.min((vw * start.w) / 100, focus.width)
  const fScale = useTransform(p, [0.04, 0.5], [startWidth / finalWidth, 1])
  const fX = useTransform(p, [0.04, 0.5], [`${start.x - 28}vw`, '0vw'])
  const fY = useTransform(p, [0.04, 0.5], [`${start.y - 50}vh`, '0vh'])
  const fRotate = useTransform(p, [0.04, 0.5], [start.rot, 0])
  const manifestoOpacity = useTransform(p, [0.42, 0.52], [0, 1])

  return (
    <section ref={ref} id="inicio" className="hero hero--pinned" aria-labelledby="hero-title">
      {/* Marcadores de cor: branco no início, framboesa a partir de 1/4 do scroll, quando chega o manifesto */}
      <div className="tone-marker" data-tone="white" style={{ top: 0, height: '100vh' }} aria-hidden="true" />
      <div className="tone-marker" data-tone="raspberry" style={{ top: '100vh', bottom: 0 }} aria-hidden="true" />
      <div className="hero__stage">

        {hero.photos
          .filter((photo) => photo.image !== hero.focus)
          .map((photo, i) => (
            <ScatterPhoto
              key={photo.image}
              image={photo.image}
              label={photo.label}
              place={photo.desktop}
              index={i}
              progress={p}
              pointer={pointer}
              spread={42}
              range={[0, 0.48]}
              fade={[0.2, 0.46]}
            />
          ))}

        <motion.div className="hero__focus" style={{ width: finalWidth, x: fX, y: fY, scale: fScale, rotate: fRotate }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease, delay: 0.6 }}
          >
            <Frame variant="mat">
              <Img image={focus} priority />
            </Frame>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__copy"
          style={{ opacity: copyOpacity, y: copyY, scale: copyScale, visibility: copyVisibility }}
        >
          <HeroCopy />
        </motion.div>

        <motion.div className="hero__manifesto" style={{ opacity: manifestoOpacity }}>
          <ManifestoText progress={p} range={[0.5, 0.9]} />
        </motion.div>
      </div>
    </section>
  )
}

function SimpleHero({ isDesktop }: { isDesktop: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const still = useMotionValue(0)
  const progress = reduce ? still : scrollYProgress

  const photos = isDesktop
    ? hero.photos.map((photo) => ({ image: photo.image, label: photo.label, place: photo.desktop }))
    : hero.photos.flatMap((photo) =>
        photo.mobile ? [{ image: photo.image, label: photo.label, place: photo.mobile }] : [],
      )

  return (
    <section ref={ref} id="inicio" className="hero hero--simple" data-tone="white" aria-labelledby="hero-title">
      {photos.map((photo, i) => (
        <ScatterPhoto
          key={photo.image}
          image={photo.image}
          label={photo.label}
          place={photo.place}
          index={i}
          progress={progress}
          pointer={{ x: still, y: still }}
          spread={22}
          range={[0, 1]}
          fade={[0.45, 1]}
        />
      ))}
      <div className="hero__copy">
        <HeroCopy />
      </div>
    </section>
  )
}

function HeroCopy() {
  return (
    <>
      <RevealHeading as="h1" id="hero-title" className="hero__title" lines={hero.title} onMount delay={0.8} />
      <motion.p
        className="hero__lede"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 1.2 }}
      >
        {hero.lede}
      </motion.p>
      <motion.div
        className="hero__actions"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 1.35 }}
      >
        <a className="btn" href={whatsappLink(hero.ctaMessage)} target="_blank" rel="noopener">
          <span>Encomendar no WhatsApp</span>
        </a>
        <a
          className="link"
          href="#servicos"
          onClick={(e) => {
            e.preventDefault()
            scrollToId('servicos')
          }}
        >
          Ver serviços
        </a>
      </motion.div>
    </>
  )
}

type ScatterProps = {
  image: ImageKey
  label?: string
  place: Place
  index: number
  progress: MotionValue<number>
  pointer: Pointer
  /** distância (vw/vh) que a foto percorre ao dispersar */
  spread: number
  range: [number, number]
  fade: [number, number]
}

function ScatterPhoto({ image, label, place, index, progress, pointer, spread, range, fade }: ScatterProps) {
  const img = images[image]
  const dx = place.x - 50
  const dy = place.y - 50
  const len = Math.hypot(dx, dy) || 1

  const x = useTransform(progress, range, ['0vw', `${(dx / len) * spread}vw`])
  const y = useTransform(progress, range, ['0vh', `${(dy / len) * spread}vh`])
  const opacity = useTransform(progress, fade, [1, 0])
  const px = useTransform(pointer.x, (v) => v * -18 * place.depth)
  const py = useTransform(pointer.y, (v) => v * -18 * place.depth)

  return (
    <motion.div
      className="scatter"
      style={{ left: `${place.x}%`, top: `${place.y}%`, width: `min(${place.w}vw, ${img.width}px)`, x, y, opacity }}
    >
      <motion.div style={{ x: px, y: py }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: `${(50 - place.x) * 0.8}vw`, y: `${(50 - place.y) * 0.8}vh` }}
          animate={{ opacity: 1, scale: 1, x: '0vw', y: '0vh' }}
          transition={{ duration: 1.2, ease, delay: 0.15 + index * 0.07 }}
        >
          <motion.div
            animate={{ y: [0, -6, 0, 6, 0] }}
            transition={{ duration: 6 + (index % 5), repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
          >
            <Frame label={label} style={{ rotate: `${place.rot}deg` }}>
              <Img image={img} priority={index < 4} />
            </Frame>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/** Posição do rato normalizada (-1 a 1), suavizada. */
function usePointer(enabled: boolean): Pointer {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spring = { stiffness: 60, damping: 20, mass: 0.6 }
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  useEffect(() => {
    if (!enabled) return
    const onMove = (e: PointerEvent) => {
      x.set((e.clientX / window.innerWidth) * 2 - 1)
      y.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled, x, y])

  return { x: sx, y: sy }
}

/* ---------- Manifesto ---------- */

type Token = { word: string } | { image: ImageKey }

/** Frase que se revela palavra a palavra, com imagens ovais que crescem no meio do texto. */
function ManifestoText({ progress, range, still = false }: { progress: MotionValue<number>; range: [number, number]; still?: boolean }) {
  const tokens = useMemo<Token[]>(
    () =>
      manifesto.text.split(' ').map((part) => {
        const match = part.match(/^\{(\w+)\}$/)
        return match ? { image: match[1] as ImageKey } : { word: part }
      }),
    [],
  )
  const [a, b] = range
  const step = (b - a) / tokens.length

  return (
    <p className="manifesto__text">
      {tokens.map((token, i) => {
        const start = a + step * i
        const end = Math.min(b, start + step * 3)
        return 'image' in token ? (
          <Oval key={i} image={token.image} progress={progress} start={start} end={end} still={still} />
        ) : (
          <Word key={i} progress={progress} start={start} end={end} still={still} text={token.word} />
        )
      })}
    </p>
  )
}

type PieceProps = { progress: MotionValue<number>; start: number; end: number; still: boolean }

function Word({ text, progress, start, end, still }: PieceProps & { text: string }) {
  const opacity = useTransform(progress, [start, end], [0.24, 1])
  return (
    <>
      <motion.span style={still ? undefined : { opacity }}>{text}</motion.span>{' '}
    </>
  )
}

function Oval({ image, progress, start, end, still }: PieceProps & { image: ImageKey }) {
  const width = useTransform(progress, [start, end], ['0em', '1.9em'])
  return (
    <>
      <motion.span className="oval" style={{ width: still ? '1.9em' : width }} aria-hidden="true">
        <Img image={images[image]} alt="" />
      </motion.span>{' '}
    </>
  )
}

function Manifesto() {
  const textRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: textRef, offset: ['start 0.85', 'end 0.55'] })

  return (
    <section className="manifesto section" data-tone="raspberry" aria-label="Manifesto">
      <div className="container manifesto__grid">
        <div className="manifesto__img">
          <Drop rotate={-1.5}>
            <Frame variant="mat">
              <Img image={images[hero.focus]} />
            </Frame>
          </Drop>
        </div>
        <div ref={textRef}>
          <ManifestoText progress={scrollYProgress} range={[0, 1]} still={!!reduce} />
        </div>
      </div>
    </section>
  )
}
