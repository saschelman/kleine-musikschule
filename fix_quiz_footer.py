import re

filepath = 'blog/quiz-musiker.html'
with open(filepath, 'r') as f:
    content = f.read()

# Replace footer safely
old_footer_regex = r'<footer id="footer">.*?</footer>'

new_footer = """<footer id="footer">
        <div class="inner">
          <div class="footer-columns">
            <div class="footer-col">
              <h3>Navigation</h3>
              <ul>
                <li><a href="../index.html">Home</a></li>
                <li><a href="../überuns.html">Über mich</a></li>
                <li><a href="../kurse.html">Kurse</a></li>
                <li><a href="../preise.html">Preise</a></li>
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
                <li><a href="../faq.html">FAQ</a></li>
                <li><a href="../kontakt.html">Kontakt</a></li>
                <li><a href="../datenschutz.html">Datenschutz</a></li>
                <li><a href="../impressum.html">Impressum</a></li>
              </ul>
            </div>
          </div>
          <ul class="copyright">
            <li>&copy; Kleine Musikschule Karlsruhe</li>
          </ul>
        </div>
      </footer>"""

content = re.sub(old_footer_regex, new_footer, content, flags=re.DOTALL)

# Add cache busters to css and js
content = re.sub(r'href="../assets/css/([^"]*?)(?:\?v=[0-9-]*)?"', r'href="../assets/css/\1?v=20260911-14"', content)
content = re.sub(r'src="../assets/js/([^"]*?)(?:\?v=[0-9-]*)?"', r'src="../assets/js/\1?v=20260911-14"', content)

with open(filepath, 'w') as f:
    f.write(content)
