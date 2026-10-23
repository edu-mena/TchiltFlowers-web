import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { hero, nav, site } from '../data/site'
import { trapFocus, whatsappLink } from '../lib/helpers'
import { lockScroll, scrollToId } from '../lib/scroll'
import { WhatsAppIcon, Wordmark, ease } from './Base'

export function Header() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  // Transparente sobre o hero; esconde-se ao descer e volta ao subir.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    const heroEl = document.getElementById('inicio')
    const heroEnd = heroEl ? heroEl.offsetTop + heroEl.offsetHeight - 80 : window.innerHeight
    setSolid(y > heroEnd)
    setHidden(y > previous && y > 160)
  })

  const goTo = (id: string) => (e: MouseEvent) => {
    e.preventDefault()
    setMenuOpen(false)
    lockScroll(false)
    scrollToId(id)
  }

  const closeMenu = () => {
    setMenuOpen(false)
    menuButton.current?.focus()
  }

  return (
    <>
      <motion.header
        className={`header${solid ? ' is-solid' : ''}`}
        animate={{ y: hidden && !menuOpen ? '-100%' : '0%' }}
        transition={{ duration: 0.45, ease }}
      >
        <div className="container header__inner">
          <a href="#inicio" onClick={goTo('inicio')} aria-label="Tchily Flowers, voltar ao início">
            <Wordmark />
          </a>
          <nav className="header__nav" aria-label="Principal">
            {nav.map((item) => (
              <a key={item.id} className="link" href={`#${item.id}`} onClick={goTo(item.id)}>
                {item.label}
              </a>
            ))}
            <a className="btn btn--sm" href={whatsappLink(hero.ctaMessage)} target="_blank" rel="noopener">
              <span>Encomendar</span>
            </a>
          </nav>
          <button
            ref={menuButton}
            className="header__menu-btn link"
            aria-expanded={menuOpen}
            aria-controls="menu"
            onClick={() => setMenuOpen(true)}
          >
            Menu
          </button>
        </div>
      </motion.header>

      <AnimatePresence>{menuOpen && <MobileMenu onClose={closeMenu} goTo={goTo} />}</AnimatePresence>
    </>
  )
}

function MobileMenu({ onClose, goTo }: { onClose: () => void; goTo: (id: string) => (e: MouseEvent) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    lockScroll(true)
    closeButton.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current()
      else if (e.key === 'Tab') trapFocus(e, ref.current)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      lockScroll(false)
    }
  }, [])

  return (
    <motion.div
      id="menu"
      ref={ref}
      className="menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease }}
    >
      <div className="menu__top">
        <Wordmark />
        <button ref={closeButton} className="link" onClick={onClose}>
          Fechar
        </button>
      </div>
      <nav className="menu__nav" aria-label="Menu">
        {nav.map((item, i) => (
          <motion.a
            key={item.id}
            href={`#${item.id}`}
            onClick={goTo(item.id)}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.06 }}
          >
            {item.label}
          </motion.a>
        ))}
      </nav>
      <div className="menu__foot">
        <a className="btn" href={whatsappLink(hero.ctaMessage)} target="_blank" rel="noopener">
          <WhatsAppIcon />
          <span>Encomendar no WhatsApp</span>
        </a>
        <a className="link" href={site.instagram.url} target="_blank" rel="noopener">
          Instagram {site.instagram.handle}
        </a>
      </div>
    </motion.div>
  )
}
