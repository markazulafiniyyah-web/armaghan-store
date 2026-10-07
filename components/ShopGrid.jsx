'use client';

import { useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';

const SORTS = [
  { id: 'featured', label: 'Featured first' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'name', label: 'Name: A–Z' },
];

export default function ShopGrid({ products }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('featured');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(products.map((p) => p.category)))],
    [products],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      const matchesCategory = category === 'All' || p.category === category;
      const matchesQuery =
        !q ||
        [p.name, p.fabric, p.category, p.short, ...(p.colors || [])]
          .join(' ')
          .toLowerCase()
          .includes(q);
      return matchesCategory && matchesQuery;
    });

    list = [...list].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'name') return a.name.localeCompare(b.name);
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.price - b.price;
    });

    return list;
  }, [products, query, category, sort]);

  return (
    <section className="section" id="shop">
      <div className="section-head">
        <div>
          <h2 className="section-title">Shop the shelf</h2>
          <p className="section-sub">
            Every colour and size below is counted separately — what you see is what is on the shelf right now.
          </p>
        </div>
        <div className="filters">
          <label className="search">
            <span className="visually-hidden">Search products</span>
            <input
              type="search"
              value={query}
              placeholder="Search fabric, colour or item…"
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <label className="select">
            <span className="visually-hidden">Sort products</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="chips">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className={`chip ${category === c ? 'active' : ''}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="empty">
          Nothing matched “{query}”. Try another fabric name or colour, or ask us on WhatsApp — we may have it in
          the shop but not on the site yet.
        </p>
      ) : (
        <div className="grid products">
          {visible.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
