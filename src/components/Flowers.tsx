import { images } from '../data/images'
import { flowers } from '../data/site'
import { FadeIn, ImageReveal, RevealHeading } from './Base'

/** Índice botânico: cada flor com a sua foto, sempre visível. */
export function Flowers() {
  return (
    <section id="flores" className="section flowers" data-tone="wine" aria-labelledby="flores-title">
      <div className="container">
        <div className="section-head">
          <RevealHeading id="flores-title" lines={flowers.title} />
          <FadeIn>
            <p className="lede">{flowers.lede}</p>
          </FadeIn>
        </div>

        <ul className="specimens">
          {flowers.items.map((flower, i) => (
            <li key={flower.name} className="specimen">
              <ImageReveal
                image={images[flower.image]}
                focus={flower.focus}
                className="specimen__img"
                delay={(i % 3) * 0.08}
              />
              <h3 className="specimen__name">{flower.name}</h3>
              <p className="specimen__meaning">{flower.meaning}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
