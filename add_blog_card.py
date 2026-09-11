import re

filepath = 'blog.html'
with open(filepath, 'r') as f:
    content = f.read()

old_block = r"""              <div class="blog-card">
                <a href="blog/gitarren-akkorde-ubersicht.html">
                  <img src="images/gitarre.jpg" alt="Gitarren-Akkorde Übersicht" class="blog-card-img" />
                </a>
                <div class="blog-card-content">
                  <h3>
                    <a href="blog/gitarren-akkorde-ubersicht.html" style="border: none">
                      Akkord-Übersicht \(Interaktiv\)
                    </a>
                  </h3>
                  <p>Alle wichtigen Akkorde mit Grifftabellen. Wähle eine Tonart und sieh sofort die Griffweise.</p>
                  <a href="blog/gitarren-akkorde-ubersicht.html" class="button small">Zu den Akkorden</a>
                </div>
              </div>"""

new_block = """              <div class="blog-card">
                <a href="blog/gitarren-akkorde-ubersicht.html">
                  <img src="images/gitarre.jpg" alt="Gitarren-Akkorde Übersicht" class="blog-card-img" />
                </a>
                <div class="blog-card-content">
                  <h3>
                    <a href="blog/gitarren-akkorde-ubersicht.html" style="border: none">
                      Akkord-Übersicht (Interaktiv)
                    </a>
                  </h3>
                  <p>Alle wichtigen Akkorde mit Grifftabellen. Wähle eine Tonart und sieh sofort die Griffweise.</p>
                  <a href="blog/gitarren-akkorde-ubersicht.html" class="button small">Zu den Akkorden</a>
                </div>
              </div>
              
              <div class="blog-card">
                <a href="blog/gitarren-skalen-ubersicht.html">
                  <img src="images/pic10.jpg" alt="Gitarren-Skalen Übersicht" class="blog-card-img" />
                </a>
                <div class="blog-card-content">
                  <h3>
                    <a href="blog/gitarren-skalen-ubersicht.html" style="border: none">
                      Skalen & Tonleitern (Interaktiv)
                    </a>
                  </h3>
                  <p>Lerne die wichtigsten Gitarren-Skalen (wie Pentatonik) auf dem kompletten Griffbrett.</p>
                  <a href="blog/gitarren-skalen-ubersicht.html" class="button small">Zu den Skalen</a>
                </div>
              </div>"""

content = re.sub(old_block, new_block, content)

with open(filepath, 'w') as f:
    f.write(content)
