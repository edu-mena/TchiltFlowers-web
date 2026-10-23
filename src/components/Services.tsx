import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { images } from '../data/images'
import { services } from '../data/site'
import { whatsappLink } from '../lib/helpers'
import { FadeIn, Img, RevealHeading, WhatsAppIcon, ease } from './Base'

/**
 * Serviços em acordeão. Tocar num serviço só abre os detalhes;
 * o WhatsApp abre apenas no botão, para ninguém sair do site sem querer.
 */
export function Services() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="servicos" className="section services" data-tone="white" aria-labelledby="servicos-title">
      <div className="container services__grid">
        <div className="services__intro">
          <RevealHeading id="servicos-title" lines={services.title} />
          <FadeIn>
            <p className="lede">{services.lede}</p>
          </FadeIn>
        </div>

        <ul className="service-list">
          {services.items.map((item, i) => {
            const isOpen = open === i
            return (
              <motion.li
                key={item.name}
                className="service"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease, delay: i * 0.05 }}
              >
                <h3>
                  <button
                    className="service__head"
                    aria-expanded={isOpen}
                    aria-controls={`servico-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="service__name">{item.name}</span>
                    <span className="service__icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`servico-${i}`}
                      className="service__panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease }}
                    >
                      <div className="service__body">
                        <Img
                          image={images[item.image]}
                          className="service__img"
                          style={item.focus ? { objectPosition: item.focus } : undefined}
                        />
                        <div className="service__text">
                          <p>{item.description}</p>
                          <a
                            className="btn btn--sm"
                            href={whatsappLink(`Olá! Gostaria de saber mais sobre ${item.name}.`)}
                            target="_blank"
                            rel="noopener"
                          >
                            <WhatsAppIcon />
                            <span>Pedir pelo WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
