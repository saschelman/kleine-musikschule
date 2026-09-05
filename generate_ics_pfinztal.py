import datetime

dates = [
    (2026, 10, 12),
    (2026, 10, 19),
    (2026, 10, 26),
    (2026, 11, 2),
    (2026, 11, 9),
    (2026, 11, 16),
    (2026, 11, 23),
    (2026, 11, 30),
    (2026, 12, 7),
    (2026, 12, 14),
]

ics_content = """BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Kleine Musikschule Karlsruhe//Musikkurs Pfinztal//DE
"""

for y, m, d in dates:
    dtstart = f"{y}{m:02d}{d:02d}T153000"
    dtend = f"{y}{m:02d}{d:02d}T160000"
    ics_content += f"""BEGIN:VEVENT
SUMMARY:Musikkurs für Kinder (Pfinztal)
DTSTART;TZID=Europe/Berlin:{dtstart}
DTEND;TZID=Europe/Berlin:{dtend}
LOCATION:Dieselstrasse 1, 76327 Pfinztal
DESCRIPTION:Kleine Musikschule Karlsruhe - Musikkurs für Kinder (Pfinztal)
END:VEVENT
"""

ics_content += "END:VCALENDAR\n"

with open("pfinztal-termine.ics", "w", encoding="utf-8") as f:
    f.write(ics_content)
