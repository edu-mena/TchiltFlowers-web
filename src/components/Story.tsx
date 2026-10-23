import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { images } from '../data/images'
import { about, florist, site } from '../data/site'
import { Drop, FadeIn, Frame, Img, Parallax, RevealHeading, ease } from './Base'

// rotação de cada polaroid, por ordem
const polaroidTilt = [-2.5, 2, -1]

export function Florist() {
  return (
    <section id="florista" className="section florist" data-tone="white" aria-labelledby="florista-title">
      <div className="container florist__grid">
        {/* Três polaroids sobrepostas, cada uma com uma velocidade de parallax diferente.
            A terceira desce para a secção seguinte e faz a ponte entre as duas. */}
        <div className="florist__photos">
          {florist.photos.map((photo, i) => (
            <Parallax
              key={photo.image}
              className={`florist__photo florist__photo--${'abc'[i]}`}
              amount={[5, -9, 14][i]}
            >
              <Drop rotate={polaroidTilt[i]} delay={i * 0.12}>
                <Frame variant="polaroid" label={photo.caption}>
                  <Img image={images[photo.image]} />
                </Frame>
              </Drop>
            </Parallax>
          ))}
        </div>

        <div className="florist__text">
          <RevealHeading id="florista-title" lines={florist.title} />
          <FadeIn>
            <p className="florist__body">{florist.text}</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <blockquote className="florist__quote">
              <p>“{florist.quote}”</p>
              <cite>{site.founderName || 'A florista'}</cite>
            </blockquote>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

export function About() {
  const imageRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06])

  return (
    <section id="sobre" className="section about" data-tone="raspberry" aria-labelledby="sobre-title">
      <div className="container">
        <div className="about__top">
          <RevealHeading id="sobre-title" lines={about.title} />
          {/* Foto sozinha sobre cor: em passe-partout, como um quadro na parede */}
          <div ref={imageRef} className="about__image">
            <Drop rotate={1.5}>
              <Frame variant="mat">
                <motion.div style={reduce ? undefined : { scale }}>
                  <Img image={images[about.image]} />
                </motion.div>
              </Frame>
            </Drop>
          </div>
        </div>

        <dl className="statements">
          {about.statements.map((s, i) => (
            <FadeIn key={s.label} className="statement" delay={i * 0.08}>
              <dt>{s.label}</dt>
              <dd>{s.text}</dd>
            </FadeIn>
          ))}
        </dl>

        <ul className="values">
          {about.values.map((v, i) => (
            <motion.li
              key={v.name}
              className="value"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease, delay: i * 0.08 }}
            >
              <h3>{v.name}</h3>
              <p>{v.text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
