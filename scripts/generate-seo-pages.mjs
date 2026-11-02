import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const outputDirectory = join(process.cwd(), "dist");
const siteUrl = "https://kcstanceshop.com";
const socialImage = `${siteUrl}/gallery/shop.jpg`;

const pages = [
  {
    path: "services",
    title: "Vehicle Wrap, Window Tint & Suspension Services | KCSTANCESHOP",
    description:
      "Explore vehicle wraps, window tint, suspension installations, and exterior upgrades at KCSTANCESHOP in Olathe, KS, serving the Kansas City area.",
  },
  {
    path: "gallery",
    title: "Custom Vehicle Wraps & Stance Gallery | KCSTANCESHOP",
    description:
      "See custom wraps, window tint, suspension, and exterior projects completed by KCSTANCESHOP in Olathe, Kansas. Browse our vehicle restyling gallery.",
  },
  {
    path: "about",
    title: "About KCSTANCESHOP | Olathe Vehicle Restyling Shop",
    description:
      "Meet KCSTANCESHOP, an automotive restyling shop in Olathe, KS serving Kansas City with custom vehicle wraps, window tint, suspension, and exterior upgrades.",
  },
  {
    path: "quote",
    title: "Request a Vehicle Restyling Quote | KCSTANCESHOP",
    description:
      "Request a quote for vehicle wraps, window tint, suspension, or exterior upgrades from KCSTANCESHOP in Olathe, KS. Tell us about your vehicle and project.",
  },
];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function updateMeta(html, attribute, key, content) {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const tagPattern = new RegExp(
    `<meta\\s+(?=[^>]*\\b${attribute}="${escapedKey}")[^>]*>`,
    "i",
  );
  const match = html.match(tagPattern);
  const escapedContent = escapeHtml(content);

  if (!match) {
    return html.replace(
      "</head>",
      `    <meta ${attribute}="${key}" content="${escapedContent}" />\n  </head>`,
    );
  }

  const updatedTag = match[0].replace(
    /content="[^"]*"/i,
    `content="${escapedContent}"`,
  );
  return html.replace(tagPattern, updatedTag);
}

function makePageHtml(template, page) {
  const canonicalUrl = `${siteUrl}/${page.path}`;
  let html = template.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${escapeHtml(page.title)}</title>`,
  );

  html = updateMeta(html, "name", "description", page.description);
  html = updateMeta(html, "property", "og:title", page.title);
  html = updateMeta(html, "property", "og:description", page.description);
  html = updateMeta(html, "property", "og:url", canonicalUrl);
  html = updateMeta(html, "property", "og:image", socialImage);
  html = updateMeta(html, "name", "twitter:title", page.title);
  html = updateMeta(html, "name", "twitter:description", page.description);
  html = updateMeta(html, "name", "twitter:image", socialImage);

  const canonicalTag = /<link\s+rel="canonical"[^>]*>/i;
  if (canonicalTag.test(html)) {
    html = html.replace(canonicalTag, `<link rel="canonical" href="${canonicalUrl}" />`);
  } else {
    html = html.replace(
      "</head>",
      `    <link rel="canonical" href="${canonicalUrl}" />\n  </head>`,
    );
  }

  return html;
}

const template = await readFile(join(outputDirectory, "index.html"), "utf8");

for (const page of pages) {
  const pageDirectory = join(outputDirectory, page.path);
  await mkdir(pageDirectory, { recursive: true });
  await writeFile(
    join(pageDirectory, "index.html"),
    makePageHtml(template, page),
    "utf8",
  );
}
