import fs from "fs";

import { getAllProducts } from "./services/productsService.js";
const validPages = [
  {
    path: "/",
    title: "Shop",
    changeFrequency: "daily",
    priority: 1.0,
  },
  {
    path: "/about",
    title: "About",
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    path: "/contact",
    title: "Contact",
    changeFrequency: "daily",
    priority: 0.9,
  },
];

// generate sitemap and place it in the public folder
const generateSitemap = async () => {
  const URL = "https://www.mrredash.com";

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  validPages.forEach((page) => {
    sitemap += `<url>`;
    sitemap += `<loc>${URL}${page.path}</loc>`;
    sitemap += `<lastmod>${new Date().toISOString()}</lastmod>`;
    sitemap += `<changefreq>${page.changeFrequency}</changefreq>`;
    sitemap += `<priority>${page.priority}</priority>`;
    sitemap += `</url>`;
  });

  // dynamic pages

  // get all products

  const products = await getAllProducts(1);

  for (let i = 0; i < products.length; i++) {
    // for each product, generate a sitemap with different variations like color

    if (!products[i].colors) {
      sitemap += `<url>`;
      sitemap += `<loc>${URL}/product/${products[i].id}</loc>`;
      sitemap += `<lastmod>${new Date().toISOString()}</lastmod>`;
      sitemap += `<changefreq>daily</changefreq>`;
      sitemap += `<priority>0.8</priority>`;
      sitemap += `</url>`;
      continue;
    }
    for (let j = 0; j < products[i].colors.length; j++) {
      let urlProductName = products[i].name.replace(/ /g, "-");
      sitemap += `<url>`;
      sitemap += `<loc>${URL}/product/${urlProductName}/${products[i].colors[j]}</loc>`;
      sitemap += `<lastmod>${new Date().toISOString()}</lastmod>`;
      sitemap += `<changefreq>daily</changefreq>`;
      sitemap += `<priority>0.7</priority>`;
      sitemap += `</url>`;
    }
  }

  sitemap += `</urlset>`;

  fs.writeFileSync("public/sitemap.xml", sitemap.toString());
};

generateSitemap();
