import { Fragment } from 'react'
import { site } from '../data/site'

/** Converte *palavra* em itálico. */
export function rich(text: string) {
  return text
    .split(/(\*[^*]+\*)/)
    .map((part, i) =>
      part.length > 2 && part.startsWith('*') && part.endsWith('*') ? (
        <em key={i}>{part.slice(1, -1)}</em>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    )
}

export function whatsappLink(message?: string) {
  const number = site.whatsapp.number.replace(/\D/g, '')
  if (!number) return site.whatsapp.fallbackUrl
  return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`
}

export function formatKz(value: number) {
  return `Kz ${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
}

/** Mantém o foco do teclado dentro de um diálogo. */
export function trapFocus(event: KeyboardEvent, root: HTMLElement | null) {
  if (!root) return
  const focusable = root.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
  if (!focusable.length) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}
