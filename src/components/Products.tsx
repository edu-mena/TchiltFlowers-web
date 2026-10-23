import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { images } from '../data/images'
import { products } from '../data/site'
import { formatKz, whatsappLink } from '../lib/helpers'
import { useIsDesktop } from '../lib/media'
import { Arrow, FadeIn, Img, RevealHeading, ease } from './Base'

type Product = (typeof products.items)[number]

/** Desktop: a secção fica fixa e o scroll vertical move a faixa na horizontal. Telemóvel: swipe nativo. */
export function Products() {
  const isDesktop = useIsDesktop()
  const reduce = useReducedMotion()
  return isDesktop && !reduce ? <PinnedRail /> : <SwipeRail />
}

function PinnedRail() {
  const ref = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const distanceRef = useRef(0)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return
    const measure = () => {
      distanceRef.current = Math.max(0, track.scrollWidth - window.innerWidth)
      setDistance(distanceRef.current)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, (v) => -v * distanceRef.current)

  return (
    <section
      ref={ref}
      id="produtos"
      className="rail rail--pinned"
      data-tone="peony"
      style={{ height: `calc(100vh + ${distance}px)` }}
      aria-labelledby="produtos-title"
    >
      <div className="rail__sticky">
        <motion.div ref={trackRef} className="rail__track" style={{ x }}>
          <div className="rail__intro">
            <RevealHeading id="produtos-title" lines={products.title} />
            <FadeIn>
              <p>{products.lede}</p>
            </FadeIn>
          </div>
          {products.items.map((item, i) => (
            <ProductCard key={item.name} item={item} index={i} />
          ))}
        </motion.div>
        <div className="rail__progress" aria-hidden="true">
          <motion.span style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </section>
  )
}

function SwipeRail() {
  return (
    <section id="produtos" className="section rail rail--swipe" data-tone="peony" aria-labelledby="produtos-title">
      <div className="container rail__intro">
        <RevealHeading id="produtos-title" lines={products.title} />
        <FadeIn>
          <p>{products.lede}</p>
        </FadeIn>
      </div>
      <div className="rail__track">
        {products.items.map((item, i) => (
          <ProductCard key={item.name} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}

function ProductCard({ item, index }: { item: Product; index: number }) {
  return (
    <motion.article
      className="product"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease, delay: (index % 3) * 0.08 }}
    >
      <div className="product__media">
        <Img image={images[item.image]} />
      </div>
      <h3 className="product__name">{item.name}</h3>
      <p className="product__desc">{item.description}</p>
      <div className="product__meta">
        <span className="product__price">{item.price ? formatKz(item.price) : 'Por encomenda'}</span>
        <a
          className="product__cta"
          href={whatsappLink(`Olá! Gostaria de encomendar: ${item.name}.`)}
          target="_blank"
          rel="noopener"
          aria-label={`Pedir ${item.name} no WhatsApp`}
        >
          <span className="link">Pedir este</span>
          <Arrow />
        </a>
      </div>
    </motion.article>
  )
}
