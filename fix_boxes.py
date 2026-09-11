import re

filepath = 'blog/gitarren-akkorde-ubersicht.html'
with open(filepath, 'r') as f:
    content = f.read()

# Delete the other two boxes
old_boxes = r"""            <div class="chord-tips">
              <h3>💡 Tipps zum Üben</h3>
.*?
            <div class="content-box">
              <h3>📚 4-Wochen Trainingsplan</h3>
.*?
              </ul>
            </div>"""

content = re.sub(old_boxes, "", content, flags=re.DOTALL)

# Update the legend box HTML
old_legend = r"""            <div class="chord-tips">
              <h3>📝 Wie liest man das Griffbrett\?</h3>
              <p>
                <strong>Weiße Punkte mit Zahlen:</strong>
                Zeigen wo du deine Finger platzieren sollst \(1=Zeigefinger, 2=Mittelfinger, 3=Ringfinger, 4=Kleiner
                Finger\)
                <br />
                <strong>O \(Grün\):</strong>
                Leere Saite - spielen ohne Finger aufzulegen
                <br />
                <strong>X \(Rot\):</strong>
                Diese Saite nicht spielen
                <br />
                <strong>Saiten:</strong>
                Von oben nach unten: E, B, G, D, A, E \(dünn nach dick\)
              </p>
            </div>"""

new_legend = """            <div class="legend-box">
              <h3>📝 Wie liest man das Griffbrett?</h3>
              <ul class="legend-list">
                <li>
                  <span class="legend-icon finger-icon">1</span>
                  <span><strong>Orange Punkte mit Zahlen:</strong> Zeigen, wo du deine Finger platzierst (1=Zeigefinger, 2=Mittelfinger, 3=Ringfinger, 4=Kleiner Finger)</span>
                </li>
                <li>
                  <span class="legend-icon open-icon">O</span>
                  <span><strong>Grünes O:</strong> Leere Saite (Saite anschlagen, aber keinen Finger auflegen)</span>
                </li>
                <li>
                  <span class="legend-icon muted-icon">X</span>
                  <span><strong>Rotes X:</strong> Diese Saite wird nicht gespielt oder abgedämpft</span>
                </li>
                <li>
                  <span class="legend-icon strings-icon">E</span>
                  <span><strong>Saiten:</strong> Von oben nach unten gelesen: E, B, G, D, A, E (von der dünnsten zur dicksten Saite)</span>
                </li>
              </ul>
            </div>"""

content = re.sub(old_legend, new_legend, content)

with open(filepath, 'w') as f:
    f.write(content)
