import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "www.keycdn.com",
      "miro.medium.com",
      "media.licdn.com",
      "techcanvass.com",
      "towardsdatascience.com",
      "redwerk.com",
      "img.youtube.com",
      "images.squarespace-cdn.com",
      "app.enginprogram.org",
      "images.yourstory.com",
      "static-assets.codecademy.com",
      "kajabi-storefronts-production.kajabi-cdn.com",
      "i.ytimg.com",
      "encrypted-tbn0.gstatic.com",
      "slidemodel.com",
    ],
  },
};

// Disable locale-based URL prefixes (e.g. /en or /uk)
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
