import { useEffect, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { hero, nav, site } from '../data/site'
import { whatsappLink } from '../lib/helpers'
import { scrollToId } from '../lib/scroll'
import { WhatsAppIcon, Wordmark, ease } from './Base'

export function Footer() {
  const goTo = (id: string) => (e: MouseEvent) => {
    e.preventDefault()
    scrollToId(id)
  }

  return (
    <footer id="contacto" className="footer">
      <div className="container">
        <Wordmark size="xl" />
        <div className="footer__grid">
          <div>
            <h2 className="footer__label">Encomendas</h2>
            <a className="link" href={whatsappLink(hero.ctaMessage)} target="_blank" rel="noopener">
              WhatsApp
            </a>
            <br />
            <a className="link" href={site.instagram.url} target="_blank" rel="noopener">
              Instagram {site.instagram.handle}
            </a>
          </div>
          <div>
            <h2 className="footer__label">Onde estamos</h2>
            <p>{site.city}</p>
          </div>
          <div>
            <h2 className="footer__label">Horário</h2>
            <p>{site.hours}</p>
          </div>
        </div>
        <div className="footer__bottom">
          <nav className="footer__nav" aria-label="Rodapé">
            {nav.map((item) => (
              <a key={item.id} className="link" href={`#${item.id}`} onClick={goTo(item.id)}>
                {item.label}
              </a>
            ))}
          </nav>
          <p>
            © {new Date().getFullYear()} {site.name}
            <span aria-hidden="true"> · </span>
            Feito por{' '}
            <a className="link link--line" href={site.credit.url} target="_blank" rel="noopener">
              {site.credit.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

/** Botão de WhatsApp para telemóvel: aparece depois do hero e some no fim da página. */
export function FloatingWhatsApp() {
  const { scrollY } = useScroll()
  const [pastHero, setPastHero] = useState(false)
  const [atEnd, setAtEnd] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => setPastHero(y > window.innerHeight * 0.8))

  useEffect(() => {
    const visible = new Set<Element>()
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target)
        else visible.delete(entry.target)
      }
      setAtEnd(visible.size > 0)
    })
    ;['encomendar', 'contacto'].forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <AnimatePresence>
      {pastHero && !atEnd && (
        <motion.a
          className="fab"
          href={whatsappLink(hero.ctaMessage)}
          target="_blank"
          rel="noopener"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease }}
        >
          <WhatsAppIcon />
          <span>Encomendar</span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
