import { useEffect } from 'react'
import { MotionConfig, useReducedMotion } from 'motion/react'
import { FinalCta, HowToOrder, Testimonials } from './components/Closing'
import { Flowers } from './components/Flowers'
import { FloatingWhatsApp, Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Products } from './components/Products'
import { Services } from './components/Services'
import { About, Florist } from './components/Story'
import { useIsDesktop } from './lib/media'
import { startSmoothScroll } from './lib/scroll'
import { useSectionTone } from './lib/tone'

export function App() {
  const isDesktop = useIsDesktop()
  const reduce = useReducedMotion()
  // o layout do hero e dos produtos muda com o ecrã: voltar a observar as secções
  useSectionTone(`${isDesktop}-${reduce}`)

  useEffect(() => startSmoothScroll(), [])

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#conteudo">
        Saltar para o conteúdo
      </a>
      <Header />
      <main id="conteudo" className="page">
        <Hero />
        <Services />
        <Products />
        <Flowers />
        <Florist />
        <About />
        <Gallery />
        <HowToOrder />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </MotionConfig>
  )
}
