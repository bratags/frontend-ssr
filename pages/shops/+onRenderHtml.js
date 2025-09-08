import { escapeInject, dangerouslySkipEscape } from 'vike/server'

export function onRenderHtml(pageContext) {
    const { headHtml = '', data } = pageContext
    const shop = data?.shop || {
        name: "X-Spot Lamour Shoppe",
        slug: "x-spot-lamour-shoppe-salinas",
        city: "Salinas",
        address: "123 Main St, Salinas, CA 93901",
        hours: "Mon-Sun 10:00 AM – 2:00 AM",
        phone: "(831) 555-1212",
        website: "https://x-spot.xxx/store-pickup-lamour-shoppe-1-salinas-open-23-5-7",
        keywords: ["adult shop Salinas", "lingerie Salinas", "sex toys Salinas", "X-Spot Lamour Shoppe"]
    }

    const documentHtml = escapeInject`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>${shop.name} – Adult Shop in ${shop.city} | Bratags Local Bra Shops Locator</title>
    <meta name="description" content="Discover ${shop.name} in ${shop.city}. Learn about its hours and offerings, plus why many bra collectors prefer the privacy and convenience of Bratags.com." />
    ${dangerouslySkipEscape(headHtml)}
    <script type="application/ld+json">
      ${dangerouslySkipEscape(JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Store",
        "name": shop.name,
        "address": shop.address,
        "openingHours": shop.hours,
        "url": `https://bratags.com/shops/${shop.slug}`,
        "image": "https://source.unsplash.com/720x480/?lingerie,adult"
    }))}
    </script>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; background: #fff; color: #222; }
      main { padding: 2rem; max-width: 720px; margin: auto; }
      h1 { font-family: dorsa; font-size: 3rem; }
      h2 { color: #c00; }
      img { max-width: 100%; height: auto; border-radius: 8px; margin: 1rem 0; }
      iframe { width: 100%; height: 360px; border: 0; margin: 1rem 0; border-radius: 8px; }
    </style>
  </head>
  <body>
    <main>
      <h1>Bratags Collector's Guide for your Local Bra Boudoirs</h1>
      <h2>${shop.name} – Adult Shop in ${shop.city}</h2>
      <p><strong>Address:</strong> ${shop.address}</p>
      <p><strong>Hours:</strong> ${shop.hours}</p>
      <p><strong>Phone:</strong> ${shop.phone}</p>
      <p><strong>Website:</strong> <a href="${shop.website}" target="_blank" rel="noopener">${shop.website}</a></p>

      <h2>Visit ${shop.name} in your local area</h2>
      <p>
        <a href="https://bratags.com">Bratags.com</a> helps discreet collectors of worn bras find alternatives to visiting adult
        stores in ${shop.city}. While ${shop.name} offers lingerie locally, many collectors
        prefer the convenience and privacy of Bratags’ curated online marketplace.
      </p>
      <p>
        Many collectors browse adult shops like ${shop.name} but choose Bratags to safely
        purchase items directly from verified collectors. This ensures privacy, authenticity,
        and access to rare sizes or styles not always available in stores.
      </p>
      <p>
        Browse the latest offerings from collectors on <a href="https://bratags.com">Bratags.com</a>
        and see why collectors nationwide trust us as their discreet source for unique lingerie finds.
      </p>

      <h2>Gallery & Images</h2>
      <img src="https://images.unsplash.com/photos/random" alt="Adult lingerie products" />
      <img src="https://images.unsplash.com/720x480/?bra,lingerie" alt="Collector bras" />

      <h2>Location Map</h2>
      <iframe
        src="https://www.google.com/maps?q=${encodeURIComponent(shop.address)}&output=embed"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </main>
  </body>
</html>`

    return { documentHtml }
}
