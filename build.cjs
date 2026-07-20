const fs = require("fs");
const path = require("path");

const root = __dirname;
const dist = path.join(root, "dist");
const files = ["index.html", "bazi.html", "ziwei.html", "deep.html", "compat.html", "styles.css", "robots.txt", "sitemap.xml", "NOTICE.md"];
const assetFiles = ["main.v2.js", "deep.v2.js", "compat.v3.js", "profiles.js", "ziwei.js", "ziwei.v2.js", "ziwei.v3.js", "vendor-lunar.js", "vendor-iztro.js", "hero-celestial.png"];

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
fs.mkdirSync(path.join(dist, "assets"), { recursive: true });

for (const file of files) {
  fs.copyFileSync(path.join(root, file), path.join(dist, file));
}

for (const file of assetFiles) {
  fs.copyFileSync(path.join(root, "assets", file), path.join(dist, "assets", file));
}
