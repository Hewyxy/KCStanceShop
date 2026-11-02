import { useEffect } from "react";

const SITE_URL = "https://kcstanceshop.com";
const DEFAULT_IMAGE = `${SITE_URL}/gallery/shop.jpg`;

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

export default function SEO({ title, description, noIndex = false }) {
  useEffect(() => {
    const url = new URL(window.location.href);
    const pathname = url.pathname === "/" ? "/" : url.pathname.replace(/\/+$/, "");
    const canonicalUrl = `${SITE_URL}${pathname}`;

    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", noIndex ? "noindex,follow" : "index,follow");
    setMeta("property", "og:type", "website");
    setMeta("property", "og:site_name", "KCSTANCESHOP");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", DEFAULT_IMAGE);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", DEFAULT_IMAGE);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [description, noIndex, title]);

  return null;
}
