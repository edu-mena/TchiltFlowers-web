import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useReducedMotion } from 'motion/react'
import { allImages, type SiteImage } from '../data/images'
import { gallery, site } from '../data/site'
import { trapFocus } from '../lib/helpers'
import { lockScroll } from '../lib/scroll'
import { Img, RevealHeading, clipReveal, ease, useRevealTrigger } from './Base'

// Posições na grelha de 12 colunas (desktop). O padrão repete-se se houver mais fotos.
const layout = [
  { col: '1 / span 4', mt: '0vh' },
  { col: '6 / span 3', mt: '16vh' },
  { col: '10 / span 3', mt: '4vh' },
  { col: '2 / span 3', mt: '-6vh' },
  { col: '6 / span 4', mt: '8vh' },
  { col: '11 / span 2', mt: '0vh' },
  { col: '1 / span 3', mt: '6vh' },
  { col: '5 / span 3', mt: '-4vh' },
  { col: '9 / span 4', mt: '10vh' },
]

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null)
  const [origin, setOrigin] = useState<number | null>(null)
  const trigger = useRevealTrigger(0.2)

  const open = (i: number) => {
    setOrigin(i)
    setIndex(i)
  }

  return (
    <section id="galeria" className="section gallery" data-tone="white" aria-labelledby="galeria-title">
      <div className="container">
        <div className="gallery__head">
          <RevealHeading id="galeria-title" lines={gallery.title} />
          <a className="link link--line" href={site.instagram.url} target="_blank" rel="noopener">
            Ver mais no Instagram
          </a>
        </div>

        <ul className="gallery__grid">
          {allImages.map((image, i) => {
            const spot = layout[i % layout.length]
            return (
              <motion.li
                key={image.key}
                className="gallery__item"
                style={{ '--col': spot.col, '--mt': spot.mt, maxWidth: image.width * 1.3 } as CSSProperties}
                {...trigger}
              >
                <motion.button
                  className="gallery__btn"
                  onClick={() => open(i)}
                  aria-label={`Ampliar: ${image.alt}`}
                  variants={clipReveal((i % 3) * 0.08)}
                >
                  <motion.div layoutId={`gallery-${i}`} className="gallery__frame">
                    <Img image={image} />
                  </motion.div>
                </motion.button>
              </motion.li>
            )
          })}
        </ul>
      </div>

      <Ribbon />

      <AnimatePresence>
        {index !== null && (
          <Lightbox
            items={allImages}
            index={index}
            origin={origin}
            onIndex={setIndex}
            onClose={() => setIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

type LightboxProps = {
  items: SiteImage[]
  index: number
  origin: number | null
  onIndex: (i: number) => void
  onClose: () => void
}

function Lightbox({ items, index, origin, onIndex, onClose }: LightboxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const [direction, setDirection] = useState(0)
  const item = items[index]

  const go = (step: number) => {
    setDirection(step)
    onIndex((index + step + items.length) % items.length)
  }

  const keys = useRef({ go, onClose })
  keys.current = { go, onClose }

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    lockScroll(true)
    closeButton.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') keys.current.onClose()
      else if (e.key === 'ArrowRight') keys.current.go(1)
      else if (e.key === 'ArrowLeft') keys.current.go(-1)
      else if (e.key === 'Tab') trapFocus(e, ref.current)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      lockScroll(false)
      previous?.focus({ preventScroll: true })
    }
  }, [])

  // Mostra a foto no tamanho original, sem a esticar.
  const width = `min(${Math.round(item.width * 1.2)}px, 88vw, calc(74vh * ${item.width / item.height}))`

  return (
    <motion.div
      ref={ref}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Galeria"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease }}
    >
      <div className="lightbox__backdrop" onClick={onClose} />
      <button ref={closeButton} className="lightbox__close link" onClick={onClose}>
        Fechar
      </button>

      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        <motion.figure
          key={index}
          className="lightbox__figure"
          style={{ width }}
          initial={index === origin ? false : { opacity: 0, x: direction * 48 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -48 }}
          transition={{ duration: 0.5, ease }}
          drag
          dragSnapToOrigin
          dragElastic={0.5}
          onDragEnd={(_, info) => {
            if (info.offset.y > 120) onClose()
            else if (info.offset.x < -80) go(1)
            else if (info.offset.x > 80) go(-1)
          }}
        >
          <motion.div layoutId={index === origin ? `gallery-${index}` : undefined} className="lightbox__frame">
            <Img image={item} priority />
          </motion.div>
          <figcaption>{item.alt}</figcaption>
        </motion.figure>
      </AnimatePresence>

      <div className="lightbox__bar">
        <button className="link" onClick={() => go(-1)}>
          Anterior
        </button>
        <span className="lightbox__count">
          {index + 1} / {items.length}
        </span>
        <button className="link" onClick={() => go(1)}>
          Seguinte
        </button>
      </div>
    </motion.div>
  )
}

/** Fita de imagens que desliza devagar. Pode ser arrastada e pausa no hover. */
function Ribbon() {
  const reduce = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const half = useRef(0)
  const paused = useRef(false)
  const x = useMotionValue(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (trackRef.current) half.current = trackRef.current.scrollWidth / 2
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const wrap = (value: number) => {
    const h = half.current
    if (!h) return value
    if (value <= -h) return value + h
    if (value > 0) return value - h
    return value
  }

  useAnimationFrame((_, delta) => {
    if (reduce || paused.current) return
    x.set(wrap(x.get() - delta * 0.03))
  })

  return (
    <div
      className="ribbon"
      onPointerEnter={(e) => {
        if (e.pointerType === 'mouse') paused.current = true
      }}
      onPointerLeave={() => {
        paused.current = false
      }}
      aria-hidden="true"
    >
      <motion.div
        ref={trackRef}
        className="ribbon__track"
        style={{ x, touchAction: 'pan-y' }}
        onPanStart={() => {
          paused.current = true
        }}
        onPan={(_, info) => x.set(wrap(x.get() + info.delta.x))}
        onPanEnd={(e) => {
          if ((e as PointerEvent).pointerType !== 'mouse') paused.current = false
        }}
      >
        {[...allImages, ...allImages].map((image, i) => (
          <Img key={i} image={image} alt="" />
        ))}
      </motion.div>
    </div>
  )
}
