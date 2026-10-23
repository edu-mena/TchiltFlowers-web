import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { images } from '../data/images'
import { finalCta, hero, howTo, testimonials, type Place } from '../data/site'
import { whatsappLink } from '../lib/helpers'
import { useIsDesktop } from '../lib/media'
import { Frame, ImageReveal, Img, RevealHeading, ease } from './Base'

export function HowToOrder() {
  return (
    <section id="como-encomendar" className="section how" data-tone="white" aria-labelledby="como-title">
      <div className="container">
        <div className="section-head">
          <RevealHeading id="como-title" lines={howTo.title} />
        </div>

        <ol className="steps">
          {howTo.steps.map((step, i) => (
            <motion.li
              key={step.text}
              className="step"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease, delay: i * 0.08 }}
            >
              <span className="step__num" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <p className="step__text">{step.text}</p>
                <ImageReveal image={images[step.image]} className="step__img" delay={0.15} />
              </div>
            </motion.li>
          ))}
        </ol>

        <dl className="info">
          {howTo.info.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const count = testimonials.items.length

  useEffect(() => {
    if (paused || reduce) return
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % count), 7000)
    return () => window.clearTimeout(timer)
  }, [index, paused, reduce, count])

  return (
    <section
      id="testemunhos"
      className="section testimonials"
      data-tone="wine"
      aria-labelledby="testemunhos-title"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="container testimonials__grid">
        <RevealHeading id="testemunhos-title" lines={testimonials.title} />

        <div>
          {/* Todas as citações ocupam a mesma célula: a altura é a da maior, sem saltos. */}
          <div className="testimonials__stage">
            {testimonials.items.map((t, i) => (
              <motion.blockquote
                key={t.name}
                className="quote"
                aria-hidden={i !== index}
                initial={false}
                animate={{ opacity: i === index ? 1 : 0, y: i === index ? 0 : 10 }}
                transition={{ duration: 0.7, ease, delay: i === index ? 0.25 : 0 }}
              >
                <p>“{t.quote}”</p>
                <cite>
                  {t.name}, {t.occasion}
                </cite>
              </motion.blockquote>
            ))}
          </div>
          <div className="testimonials__controls">
            <button className="link" onClick={() => setIndex((index - 1 + count) % count)}>
              Anterior
            </button>
            <span className="testimonials__count" aria-live="polite">
              {index + 1} / {count}
            </span>
            <button className="link" onClick={() => setIndex((index + 1) % count)}>
              Seguinte
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function FinalCta() {
  const ref = useRef<HTMLElement>(null)
  const isDesktop = useIsDesktop()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const photos = isDesktop
    ? finalCta.photos.map((photo) => ({ image: photo.image, label: photo.label, place: photo.desktop }))
    : finalCta.photos.flatMap((photo) =>
        photo.mobile ? [{ image: photo.image, label: photo.label, place: photo.mobile }] : [],
      )

  return (
    <section ref={ref} id="encomendar" className="final" data-tone="peony" aria-labelledby="final-title">
      {photos.map((photo, i) => (
        <DriftPhoto
          key={photo.image}
          image={images[photo.image]}
          label={photo.label}
          place={photo.place}
          index={i}
          progress={scrollYProgress}
        />
      ))}
      <div className="final__copy">
        <RevealHeading id="final-title" lines={finalCta.title} />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
        >
          <a className="btn" href={whatsappLink(hero.ctaMessage)} target="_blank" rel="noopener">
            <span>Encomendar no WhatsApp</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

type DriftProps = {
  image: (typeof images)[keyof typeof images]
  label?: string
  place: Place
  index: number
  progress: MotionValue<number>
}

/** Foto solta que flutua e acompanha o scroll, como eco do hero. */
function DriftPhoto({ image, label, place, index, progress }: DriftProps) {
  const reduce = useReducedMotion()
  const y = useTransform(progress, [0, 1], [`${place.depth * 60}px`, `${place.depth * -60}px`])

  return (
    <motion.div
      className="drift"
      style={{ left: `${place.x}%`, top: `${place.y}%`, width: `min(${place.w}vw, ${image.width}px)`, y: reduce ? 0 : y }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease, delay: index * 0.08 }}
      >
        <motion.div
          animate={{ y: [0, -6, 0, 6, 0] }}
          transition={{ duration: 7 + index, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Frame label={label} style={{ rotate: `${place.rot}deg` }}>
            <Img image={image} alt="" />
          </Frame>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
