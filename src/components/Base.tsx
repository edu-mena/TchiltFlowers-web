import type { CSSProperties, ImgHTMLAttributes, ReactNode } from 'react'
import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'motion/react'
import type { SiteImage } from '../data/images'
import { rich } from '../lib/helpers'

export const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

type ImgProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'width' | 'height'> & {
  image: SiteImage
  priority?: boolean
}

export function Img({ image, priority, alt, style, ...rest }: ImgProps) {
  return (
    <img
      src={image.src}
      alt={alt ?? image.alt}
      width={image.width}
      height={image.height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      draggable={false}
      style={{ objectPosition: image.focus, ...style }}
      {...rest}
    />
  )
}

export function Wordmark({ size = 'sm' }: { size?: 'sm' | 'xl' }) {
  return <span className={`wordmark wordmark--${size}`}>Tchily Flowers</span>
}

type FrameProps = {
  /**
   * print: prova fotográfica (margem fina) para as fotos espalhadas.
   * polaroid: margem inferior larga, para as fotos de bastidores.
   * mat: passe-partout (margem larga com filete), para fotos sozinhas sobre cor.
   */
  variant?: 'print' | 'polaroid' | 'mat'
  label?: string
  className?: string
  style?: CSSProperties
  children: ReactNode
}

/** Moldura de papel para as fotos que funcionam como objectos soltos. */
export function Frame({ variant = 'print', label, className, style, children }: FrameProps) {
  return (
    <figure className={`frame frame--${variant}${label ? ' has-label' : ''} ${className ?? ''}`} style={style}>
      <div className="frame__window">{children}</div>
      {label && <figcaption className="frame__label">{label}</figcaption>}
    </figure>
  )
}

/** Entrada de uma foto emoldurada: sobe e assenta na rotação final, como se fosse pousada. */
export function Drop({ children, rotate = 0, delay = 0 }: { children: ReactNode; rotate?: number; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: rotate + 4 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.1, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

const headingTags = { h1: motion.h1, h2: motion.h2, h3: motion.h3 }

type HeadingProps = {
  lines: string[]
  as?: keyof typeof headingTags
  id?: string
  className?: string
  delay?: number
  /** anima ao carregar a página em vez de quando entra no ecrã */
  onMount?: boolean
}

/** Título que entra linha a linha, por máscara. */
export function RevealHeading({ lines, as = 'h2', id, className, delay = 0, onMount = false }: HeadingProps) {
  const Tag = headingTags[as] as typeof motion.h2
  const parent: Variants = { hidden: {}, shown: { transition: { staggerChildren: 0.07, delayChildren: delay } } }
  const child: Variants = { hidden: { y: '110%' }, shown: { y: '0%', transition: { duration: 0.9, ease } } }
  const trigger = onMount ? { animate: 'shown' } : { whileInView: 'shown', viewport: { once: true, amount: 0.3 } }

  return (
    <Tag id={id} className={className} variants={parent} initial="hidden" {...trigger}>
      {lines.map((line, i) => (
        <span className="line-mask" key={i}>
          <motion.span className="line" variants={child}>
            {rich(line)}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

export function FadeIn({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

/** Variantes do reveal de imagem: máscara de baixo para cima e ligeiro zoom-out. */
export const clipReveal = (delay = 0): Variants => ({
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  shown: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.2, ease, delay } },
})

export const zoomOut = (delay = 0): Variants => ({
  hidden: { scale: 1.15 },
  shown: { scale: 1, transition: { duration: 1.4, ease, delay } },
})

/**
 * Props para o elemento que observa a entrada no ecrã. Tem de ser um elemento
 * sem clip-path: um alvo totalmente recortado nunca conta como visível.
 */
export function useRevealTrigger(amount = 0.25) {
  const reduce = useReducedMotion()
  return {
    initial: reduce ? false : ('hidden' as const),
    whileInView: 'shown',
    viewport: { once: true, amount },
  }
}

type RevealProps = { image: SiteImage; className?: string; focus?: string; delay?: number }

export function ImageReveal({ image, className, focus, delay = 0 }: RevealProps) {
  const trigger = useRevealTrigger()

  return (
    <motion.figure className={`reveal-img ${className ?? ''}`} {...trigger}>
      <motion.div className="reveal-img__clip" variants={clipReveal(delay)}>
        <motion.div variants={zoomOut(delay)}>
          <Img image={image} style={focus ? { objectPosition: focus } : undefined} />
        </motion.div>
      </motion.div>
    </motion.figure>
  )
}

/** Desloca o conteúdo ligeiramente com o scroll (amount em % da própria altura). */
export function Parallax({ children, amount = 8, className }: { children: ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${amount}%`, `${-amount}%`])

  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  )
}
