'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { site } from '@/data/site';
import { asset, waLink } from '@/lib/format';

const SLIDES = [
  {
    image: '/hero/colour-range.jpg',
    eyebrow: 'Armaghan Store · Urdu Bazar, Lahore',
    title: 'All Colours, Honest Prices',
    text: 'Boski, wash & wear and pure cotton — the full colour range at the counter and online, delivered across Pakistan.',
    cta: { label: 'Shop now', href: '/#shop' },
  },
  {
    image: '/hero/slide-bosky.jpg',
    eyebrow: 'Boski · Original 12 Pound',
    title: 'Boski — Winter & Summer',
    text: 'Original 12 pound Boski that stays cool in summer and carries through winter. Rs 3,000 only.',
    cta: { label: 'Buy Boski', href: '/products/boski-winter-summer' },
  },
  {
    image: '/hero/slide-cotton.jpg',
    eyebrow: 'Wash & Wear · Pure Cotton',
    title: 'Wash & Wear from Rs 2,400',
    text: 'Winter-weight wash & wear at Rs 2,400, premium at Rs 3,300 and 100% pure cotton at Rs 3,300 — all colours available.',
    cta: { label: 'View wash & wear', href: '/collection/wash-wear' },
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next) => {
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      className="hero-slider"
      aria-roledescription="carousel"
      aria-label="Featured collections"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((slide, i) => (
        <div key={slide.title} className={`slide${i === index ? ' active' : ''}`} aria-hidden={i !== index}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="slide-img" src={asset(slide.image)} alt="" />
          <div className="slide-overlay" />
          <div className="container">
            <div className="slide-copy">
              <span className="eyebrow">{slide.eyebrow}</span>
              <h1>{slide.title}</h1>
              <p>{slide.text}</p>
              <div className="btn-row">
                <Link className="btn btn-lg" href={slide.cta.href}>
                  {slide.cta.label}
                </Link>
                <a
                  className="btn btn-outline btn-lg"
                  href={waLink(`Assalam o Alaikum ${site.name}! I want to order: ${slide.title}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button type="button" className="slider-arrow prev" aria-label="Previous slide" onClick={() => go(index - 1)}>
        ‹
      </button>
      <button type="button" className="slider-arrow next" aria-label="Next slide" onClick={() => go(index + 1)}>
        ›
      </button>

      <div className="slider-dots">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.title}
            type="button"
            className={`slider-dot${i === index ? ' active' : ''}`}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </section>
  );
}
