'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { site } from '@/data/site';
import { useCart } from '@/lib/cart';
import { waLink } from '@/lib/format';

const NAV = [
  { href: '/', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/refund-policy', label: 'Returns & Refunds' },
  { href: '/privacy-policy', label: 'Privacy' },
];

export default function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>
            Free delivery over <strong>Rs {site.freeDeliveryOver.toLocaleString('en-PK')}</strong> · Cash on Delivery available
          </span>
          <a
            href={waLink(`Assalam o Alaikum ${site.name}, I have a question about your fabric.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="topbar-wa"
          >
            WhatsApp {site.phoneDisplay}
          </a>
        </div>
      </div>

      <header className="header">
        <div className="container header-inner">
          <Link href="/" className="brand" aria-label={`${site.name} home`}>
            <span className="brand-mark" aria-hidden="true">
              AS
            </span>
            <span className="brand-text">
              <strong>{site.name}</strong>
              <small>Kapra &amp; Fabric · {site.city}</small>
            </span>
          </Link>

          <nav className="nav" aria-label="Main">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className={isActive(item.href) ? 'active' : ''}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <a
              className="btn btn-wa btn-sm header-wa"
              href={waLink(`Assalam o Alaikum ${site.name}!`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Order on WhatsApp
            </a>
            <Link href="/cart" className="cart-btn" aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}>
              <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" focusable="false">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4h2.2l2.1 10.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L20.5 7H6.1"
                />
                <circle cx="9.6" cy="19.4" r="1.5" fill="currentColor" />
                <circle cx="17.4" cy="19.4" r="1.5" fill="currentColor" />
              </svg>
              <span className="cart-label">Cart</span>
              {count > 0 && <span className="cart-count">{count}</span>}
            </Link>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden="true">{open ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {open && (
          <nav className="mobile-nav" aria-label="Mobile">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/cart">Cart ({count})</Link>
          </nav>
        )}
      </header>
    </>
  );
}
