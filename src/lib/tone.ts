import { useEffect, useState } from 'react'

export type Tone = 'white' | 'peony' | 'raspberry' | 'wine'

/**
 * Lê o data-tone da secção que está a meio do ecrã e põe-no no <html>.
 * O CSS muda o fundo, o texto e os botões em conjunto, com transição.
 */
export function useSectionTone(layoutKey: unknown) {
  const [tone, setTone] = useState<Tone>('white')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setTone((entry.target as HTMLElement).dataset.tone as Tone)
        }
      },
      { rootMargin: '-48% 0px -51% 0px' },
    )
    document.querySelectorAll('[data-tone]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [layoutKey])

  useEffect(() => {
    document.documentElement.dataset.tone = tone
  }, [tone])
}
