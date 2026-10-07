export default function JsonLd({ data, id, live = true }) {
  return (
    <script
      type="application/ld+json"
      id={id}
      // LiveSeo rewrites the origin inside these blocks with the domain from the
      // browser's address bar, so the markup is correct on any host.
      data-live-url={live ? '1' : undefined}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
