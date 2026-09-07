import sys

with open('/Users/sasch/kleine-musikschule/kurse.html', 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = '        <div class="inner">\n          <header class="major">\n            <h1>Kursanmeldung</h1>'
end_marker = '        </div>\n      </section>\n\n      <footer id="footer">'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    new_content = content[:start_idx] + '''        <div class="inner">
          <header class="major">
            <h1>Meine Musikkurse</h1>
          </header>
          <div class="content">
            <p>
              In meinen Kursen entdecken wir gemeinsam die wunderbare Welt der Musik.
              Egal ob für die ganz Kleinen oder für größere Kinder – hier wird gesungen, 
              getanzt, bewegt und gelacht. Wir lernen spielerisch neue Klänge und Instrumente kennen 
              und erleben zusammen tolle musikalische Abenteuer!
            </p>
          </div>
        </div>
      </section>

      <div id="main">
        <section id="one">
          <div class="inner">
            <header class="major">
              <h2>Aktuelle Kurse</h2>
            </header>

            <div class="course-overview">
              <div class="course-info-box">
                <div class="course-info-head">
                  <span class="course-info-kicker">Musikkurs</span>
                  <h3>Ein tierisches Orchester (4–6 Jahre)</h3>
                </div>

                <div class="course-info-section">
                  <p>
                    7-wöchiger Projektkurs für Kinder von 4 bis 6 Jahren mit
                    spielerischem Kennenlernen von Klängen, Dschungel-Safari und einem tollen Abschlusskonzert.
                  </p>
                  <ul class="actions">
                    <li><a href="kursanmeldung.html" class="button primary">Details & Voranmeldung</a></li>
                  </ul>
                </div>
              </div>

              <div class="course-info-box">
                <div class="course-info-head">
                  <span class="course-info-kicker">Mini-Kurs</span>
                  <h3>Ein tierisches Orchester (2,5–3 Jahre)</h3>
                </div>

                <div class="course-info-section">
                  <p>
                    Die Mini-Ausgabe unseres tierischen Orchesters! Gemeinsam mit einer Bezugsperson tauchen
                    die Kleinsten in erste musikalische Erfahrungen ein.
                  </p>
                  <ul class="actions">
                    <li><a href="kursanmeldung.html" class="button primary">Details & Voranmeldung</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <hr style="margin: 4em 0" />

            <header class="major">
              <h2>Kurse vor Ort gesucht?</h2>
            </header>
            <p>
              Du suchst noch einen Kursleiter für musikalische Früherziehung in deiner Stadt? 
              Oder in deiner Kita? Melde dich gerne bei mir, und wir besprechen gemeinsam die Möglichkeiten!
            </p>
            <ul class="actions">
              <li><a href="kontakt.html" class="button">Jetzt anfragen</a></li>
            </ul>
''' + end_marker

    with open('/Users/sasch/kleine-musikschule/kurse.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Updated kurse.html successfully.")
else:
    print(f"Could not find markers. start_idx={start_idx}, end_idx={end_idx}")
