'use client';

import { useEffect } from 'react';

// ---------------------------------------------------------------------------
// Reads the domain straight out of the browser's address bar and applies it to
// everything that has to be absolute:
//
//   * <link rel="canonical">
//   * <meta property="og:url">, og:image and twitter:image
//   * every JSON-LD block marked data-live-url (schema.org URLs)
//
// Why: the site is static and pre-rendered, so at build time we can only know
// the address the CI workflow passes in. If the shop is later opened on a
// custom domain, through a preview URL or a mirror, those tags would otherwise
// still point at the old host. Reading window.location makes the page
// self-correcting without a rebuild.
//
// Only URLs that start with the build origin are rewritten, so external
// references such as https://schema.org/InStock are never touched.
//
// Crawlers that run JavaScript (Google, Bing) pick up the corrected values.
// Crawlers that do not (WhatsApp, Facebook previews) use the build-time values,
// which the GitHub Pages workflow fills in correctly — see README → SEO.
// ---------------------------------------------------------------------------

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function absolute(value, origin) {
  if (!value) return value;
  if (value.startsWith('/')) return origin + value;
  return value;
}

/** Swap only the build origin for the live one — nothing else. */
function swapOrigin(node, from, to) {
  if (Array.isArray(node)) {
    // Arrays can hold bare URL strings (e.g. Product.image), so handle both.
    node.forEach((child, i) => {
      if (typeof child === 'string' && from && child.startsWith(from)) {
        node[i] = to + child.slice(from.length);
      } else if (child && typeof child === 'object') {
        swapOrigin(child, from, to);
      }
    });
    return node;
  }
  if (node && typeof node === 'object') {
    Object.keys(node).forEach((key) => {
      const value = node[key];
      if (typeof value === 'string' && from && value.startsWith(from)) {
        node[key] = to + value.slice(from.length);
      } else if (value && typeof value === 'object') {
        swapOrigin(value, from, to);
      }
    });
  }
  return node;
}

export default function LiveSeo({ buildOrigin = '', basePath = '' }) {
  useEffect(() => {
    const origin = window.location.origin.replace(/\/+$/, '');
    // The live site root keeps the deploy base path (e.g. /armaghan-store on a
    // GitHub Pages project site), because that is where the files really live.
    const liveRoot = (origin + (basePath || '')).replace(/\/+$/, '');
    const url = origin + window.location.pathname;
    const from = (buildOrigin || '').replace(/\/+$/, '');

    setLink('canonical', url);
    setMeta('property', 'og:url', url);
    setMeta('name', 'twitter:url', url);

    ['og:image', 'twitter:image'].forEach((key) => {
      const attr = key.startsWith('og:') ? 'property' : 'name';
      const el = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (!el) return;
      const value = el.getAttribute('content') || '';
      if (from && value.startsWith(from)) {
        el.setAttribute('content', liveRoot + value.slice(from.length));
      } else {
        el.setAttribute('content', absolute(value, liveRoot));
      }
    });

    if (from && from !== liveRoot) {
      document.querySelectorAll('script[type="application/ld+json"][data-live-url]').forEach((el) => {
        try {
          const data = JSON.parse(el.textContent || '{}');
          swapOrigin(data, from, liveRoot);
          el.textContent = JSON.stringify(data);
        } catch {
          /* malformed block — leave it alone */
        }
      });
    }
  }, [buildOrigin, basePath]);

  return null;
}
