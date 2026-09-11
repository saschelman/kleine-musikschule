const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '../blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));

const styleRegex = /<style>[\s\S]*?\/\*\s*Blog Content Styling\s*\*\/[\s\S]*?<\/style>/i;

const oldPromoRegex = /<p style="margin-top: 0\.5em; font-size: 0\.98em; color: rgba\(255, 255, 255, 0\.9\)">[\s\S]*?<\/p>/i;
const newPromoBox = `<div class="promo-box">
              <div class="promo-box-icon">🎸</div>
              <div class="promo-box-text">
                <p>
                  Mobile Musikschule (Karlsruhe, Neureut, Linkenheim, Pfinztal, Weingarten, Rheinstetten & Umgebung):<br>
                  <strong>Gitarrenunterricht, Ukulele & Bass</strong> – <a href="../kontakt.html">Jetzt kostenlose Probestunde vereinbaren.</a>
                </p>
              </div>
            </div>`;

let updatedCount = 0;

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Remove old inline <style> block
  if (styleRegex.test(content)) {
    content = content.replace(styleRegex, '');
  }

  // 2. Inject external stylesheet link if missing
  const stylesheetLink = '<link rel="stylesheet" href="../assets/css/blog-post.css" />';
  if (!content.includes(stylesheetLink)) {
    // Insert after main.min.css
    content = content.replace(
      /(<link rel="stylesheet" href="\.\.\/assets\/css\/main\.min\.css\?v=[^"]*" \/>)/,
      `$1\n    ${stylesheetLink}`
    );
  }

  // 3. Replace the plain CTA paragraph with the new glassmorphism promo box
  if (oldPromoRegex.test(content)) {
    content = content.replace(oldPromoRegex, newPromoBox);
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Polished ${file}`);
    updatedCount++;
  } else {
    console.log(`➖ Skipped ${file} (already polished)`);
  }
}

console.log(`\n🎉 Blog polish complete! Updated ${updatedCount} posts.`);
