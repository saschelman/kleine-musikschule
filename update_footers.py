import os
import re

new_footer = """      <footer id="footer">
        <div class="inner">
          <div class="footer-columns">
            <div class="footer-col">
              <h3>Navigation</h3>
              <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="überuns.html">Über mich</a></li>
                <li><a href="kurse.html">Kurse</a></li>
                <li><a href="preise.html">Preise</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h3>Social Media</h3>
              <ul class="icons">
                <li>
                  <a
                    href="https://www.instagram.com/kleine_musikschule_karlsruhe/"
                    class="icon brands alt fa-instagram"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span class="label">Instagram</span>
                  </a>
                </li>
              </ul>
            </div>
            <div class="footer-col">
              <h3>Rechtliches</h3>
              <ul>
                <li><a href="faq.html">FAQ</a></li>
                <li><a href="kontakt.html">Kontakt</a></li>
                <li><a href="datenschutz.html">Datenschutz</a></li>
                <li><a href="impressum.html">Impressum</a></li>
              </ul>
            </div>
          </div>
          <ul class="copyright">
            <li>&copy; Kleine Musikschule Karlsruhe</li>
          </ul>
        </div>
      </footer>"""

def update_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Use regex to find and replace the footer block
    # We look for <footer id="footer"> up to </footer>
    # including newlines
    pattern = re.compile(r'^\s*<footer id="footer">.*?</footer>\s*', re.MULTILINE | re.DOTALL)
    
    # If the file contains the footer, replace it
    if pattern.search(content):
        # We need to compute relative paths if the file is in a subdirectory like blog/
        # but the original links were just href="index.html" etc. Wait, blog/ links need ../
        # If the file is in a subdirectory, adjust the links.
        depth = filepath.count('/') - 1 # e.g. ./index.html -> 0, ./blog/post.html -> 1
        adjusted_footer = new_footer
        if depth > 0:
            prefix = '../' * depth
            adjusted_footer = adjusted_footer.replace('href="', f'href="{prefix}')
            adjusted_footer = adjusted_footer.replace('href="../https://', 'href="https://')
        
        new_content = pattern.sub('\n' + adjusted_footer + '\n\n', content)
        if new_content != content:
            with open(filepath, 'w') as f:
                f.write(new_content)
            print(f"Updated footer in {filepath}")

for root, dirs, files in os.walk('.'):
    # Exclude node_modules, .git, etc.
    if 'node_modules' in root or '.git' in root or 'assets' in root or 'backend' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            update_file(os.path.join(root, file))

