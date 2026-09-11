const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '../blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));

const localKeywords = "Gitarrenunterricht Karlsruhe, Musikschule Pfinztal, Gitarrenlehrer Neureut, Gitarrenunterricht Linkenheim, Weingarten, Rheinstetten, mobiler Musiklehrer, Musikunterricht zuhause";

const ctaRegex1 = /<p style="margin-top: 0\.5em; font-size: 0\.98em; color: rgba\(255, 255, 255, 0\.9\)">[\s\S]*?<\/p>/;
const newCta = `<p style="margin-top: 0.5em; font-size: 0.98em; color: rgba(255, 255, 255, 0.9)">
              Mobile Musikschule (Karlsruhe, Neureut, Linkenheim, Pfinztal, Weingarten, Rheinstetten & Umgebung):
              <strong>Gitarrenunterricht, Ukulele & Bass</strong>
              –
              <a href="../kontakt.html">Jetzt kostenlose Probestunde</a>
              vereinbaren.
            </p>`;

let updatedCount = 0;

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Update the Keywords
  // Match <meta name="keywords" content="..." />
  content = content.replace(/<meta\s+name="keywords"\s+content="([^"]*)"\s*\/>/i, (match, p1) => {
    // If the local keywords are not already in there, append them
    if (!p1.includes("Neureut")) {
      return `<meta name="keywords" content="${p1}, ${localKeywords}" />`;
    }
    return match; // already there
  });

  // 2. Update the CTA paragraph
  if (ctaRegex1.test(content)) {
    content = content.replace(ctaRegex1, newCta);
  }

  // 3. For gitarrenunterricht-karlsruhe-vorteile.html, update specific text paragraphs too
  if (file === 'gitarrenunterricht-karlsruhe-vorteile.html') {
    content = content.replace(
      "Karlsruhe (Stadt & Umgebung), Pfinztal, Weingarten und Rheinstetten",
      "Karlsruhe, Neureut, Linkenheim, Pfinztal, Weingarten, Rheinstetten und Umgebung"
    );
    content = content.replace(
      "Pfinztal, Weingarten oder Rheinstetten",
      "Neureut, Linkenheim, Pfinztal, Weingarten oder Rheinstetten"
    );
    content = content.replace(
      "Pfinztal, Weingarten und Rheinstetten",
      "Neureut, Linkenheim, Pfinztal, Weingarten und Rheinstetten"
    );
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated ${file}`);
    updatedCount++;
  } else {
    console.log(`➖ Skipped ${file} (no changes needed)`);
  }
}

console.log(`\n🎉 SEO Polish complete! Updated ${updatedCount} blog posts.`);
