'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { site } from '@/data/site';
import { asset, waLink } from '@/lib/format';

const SLIDES = [
  {
    image: '/hero/slide-bosky.jpg',
    eyebrow: 'Wholesale & retail fabric',
    title: 'Galaxy of Premium Attires',
    text: 'Roman Bosky, Patal Cotton, China Silk & more — 200+ qualities for gents and ladies, only at Armaghan Store.',
    cta: { label: 'Shop now', href: '/#shop' },
  },
  {
    image: '/hero/slide-cotton.jpg',
    eyebrow: 'Patal Cotton · 100% pure',
    title: 'Authentic Cotton You Can Afford',
    text: '100% pure Patal cotton — breathable, honest fabric at Rs 2,350 only. Delivered anywhere in Pakistan.',
    cta: { label: 'Buy Patal Cotton', href: '/products/patal-cotton-pure' },
  },
  {
    image: '/products/embroidered-bosky-1.jpg',
    eyebrow: 'Hand-Made Embroidery',
    title: 'Hand-Embroidered Bosky',
    text: 'Exquisite hand embroidery on premium Bosky fabric, crafted in Pakistan — wedding, Eid and formal wear.',
    cta: { label: 'View the design', href: '/products/hand-made-embroidery-bosky' },
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
