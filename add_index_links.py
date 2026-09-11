import re

filepath = 'index.html'
with open(filepath, 'r') as f:
    content = f.read()

# We need to insert the two new columns after the "Welcher Typ von Musiker bin ich?" column
old_html = r"""                  <p style="flex-grow: 1; margin-bottom: 0; color: rgba\(26, 26, 26, 0\.9\);">
                    Mach mein Quiz und finde heraus, ob du ein kreativer Improvisator, strukturierter Perfektionist oder
                    vielseitiger Allrounder bist.
                  </p>
                  <ul class="actions" style="margin-top: 2em; margin-bottom: 0">
                    <li><a href="blog/quiz-musiker.html" class="button next">Quiz starten</a></li>
                  </ul>
                </div>
              </div>"""

new_html = """                  <p style="flex-grow: 1; margin-bottom: 0; color: rgba(26, 26, 26, 0.9);">
                    Mach mein Quiz und finde heraus, ob du ein kreativer Improvisator, strukturierter Perfektionist oder
                    vielseitiger Allrounder bist.
                  </p>
                  <ul class="actions" style="margin-top: 2em; margin-bottom: 0">
                    <li><a href="blog/quiz-musiker.html" class="button next">Quiz starten</a></li>
                  </ul>
                </div>
              </div>
              
              <div class="col-6 col-12-medium" style="margin-top: 2em">
                <div
                  style="
                    background: rgba(240, 173, 78, 0.85);
                    color: #1a1a1a;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                    padding: 2em;
                    border-radius: 8px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                  "
                >
                  <h3 style="color: #1a1a1a; font-weight: 700;">Gitarren-Akkorde Übersicht</h3>
                  <p style="flex-grow: 1; margin-bottom: 0; color: rgba(26, 26, 26, 0.9);">
                    Finde jeden Gitarren-Akkord sofort. Mit unserem interaktiven Griffbrett siehst du sofort, wo du deine Finger platzieren musst.
                  </p>
                  <ul class="actions" style="margin-top: 2em; margin-bottom: 0">
                    <li><a href="blog/gitarren-akkorde-ubersicht.html" class="button next">Zu den Akkorden</a></li>
                  </ul>
                </div>
              </div>
              
              <div class="col-6 col-12-medium" style="margin-top: 2em">
                <div
                  style="
                    background: rgba(255, 159, 67, 0.85);
                    color: #1a1a1a;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                    padding: 2em;
                    border-radius: 8px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                  "
                >
                  <h3 style="color: #1a1a1a; font-weight: 700;">Skalen & Tonleitern (Interaktiv)</h3>
                  <p style="flex-grow: 1; margin-bottom: 0; color: rgba(26, 26, 26, 0.9);">
                    Lerne alle wichtigen Skalen wie die Pentatonik auf dem ganzen Griffbrett. Inklusive farblicher Markierung der Lagen (CAGED-System).
                  </p>
                  <ul class="actions" style="margin-top: 2em; margin-bottom: 0">
                    <li><a href="blog/gitarren-skalen-ubersicht.html" class="button next">Zu den Skalen</a></li>
                  </ul>
                </div>
              </div>"""

content = re.sub(old_html, new_html, content)

with open(filepath, 'w') as f:
    f.write(content)
