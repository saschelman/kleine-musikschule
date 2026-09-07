#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re

# Pfad zur Datei relativ zum Skript-Verzeichnis bestimmen
script_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(script_dir, "blog", "10-tipps-zum-dranbleiben.html")

# Datei einlesen
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Strategie: Alle <h3> (für Tipps 4-10 und die beiden Abschnitte) durch content-box Struktur ersetzen
# und dann alle </h3> durch </h4> ändern

# Step 1: Ersetze alle <h3> mit content-box Struktur
# Pattern: "            <h3>" -> "            </div>\n\n            <div class=\"content-box\">\n              <h4>"
content = re.sub(
    r'            <h3>',
    r'            </div>\n\n            <div class="content-box">\n              <h4>',
    content
)

# Step 2: Ersetze alle </h3> durch </h4>
content = re.sub(
    r'</h3>',
    r'</h4>',
    content
)

# Step 3: Entferne den ersten </div> der Reihe, der zu früh kommt 
# (das ist der </div> nach Tipp 3, der automatisch hinzugefügt wurde)
# Wir wollen, dass Tipp 3 noch in seiner content-box bleibt
# Finde das Pattern: </p> gefolgt von </div>, wo die content-box von Tipp 3 noch offen sein sollte

# Die content-box von Tipp 3 endet mit: "            </p>" nach "gleiche Uhrzeit."
# Danach sollte direkt KEIN </div> stehen, sondern erst nach den Tipps 4-10

# Suche nach der Stelle wo Tipp 3 Box schließen soll (vor der <hr>)
# Ersetze: </p>\n\n            <div class="content-box"> (das wäre Tipp 4)
# durch: </p>\n            </div>\n\n            <div class="content-box">

# Aber wir müssen zuerst die Position von Tipp 3 finden
# Nach "gleiche Uhrzeit." kommt </p>, dann sollte </div> stehen, dann <hr>

content = re.sub(
    r'(Uhrzeit\.\n            </p>)\n(            </div>\n\n            <div class="content-box">)',
    r'\1\n            </div>\n\n\2',
    content
)

# Step 4: Sicherstellen, dass am Ende (nach der "Vorlagen & Helfer" ul) der letzte content-box geschlossen wird
# Nach </ul> von "Vorlagen & Helfer" sollte </div> stehen, bevor <div class="box"> kommt

# Suche: </ul> (von "Vorlagen & Helfer") mit mehreren Leerzeilen, dann <div class="box">
# Ersetze mit: </ul>, dann </div>, dann <div class="box">

content = re.sub(
    r'(            </ul>)\n\n(            <div class="box">)',
    r'\1\n            </div>\n\n\2',
    content,
    count=1  # Nur die LETZTE ul vor dem box-div (das ist "Vorlagen & Helfer")
)

# Step 5: Cleanup - entferne doppelte </div>, falls entstanden
content = re.sub(
    r'</div>\n            </div>',
    r'</div>',
    content
)

# Datei speichern
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ Datei erfolgreich transformiert!")
print("✓ Alle h3 Tags wurden in content-box h4 umgewandelt")
print("✓ Struktur mit korrekten Einrückungen beibehalten")
print(f"✓ Datei gespeichert: {file_path}")
