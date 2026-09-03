import datetime

dates = [
    (2026, 10, 12),
    (2026, 10, 19),
    (2026, 11, 2),
    (2026, 11, 9),
    (2026, 11, 16),
    (2026, 11, 23),
    (2026, 11, 30),
    (2026, 12, 7),
    (2026, 12, 14),
    (2026, 12, 21),
]

ics_content = """BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Kleine Musikschule Karlsruhe//Les Petits Amis//DE
"""

for y, m, d in dates:
    dtstart = f"{y}{m:02d}{d:02d}T093000"
    dtend = f"{y}{m:02d}{d:02d}T100000"
    ics_content += f"""BEGIN:VEVENT
SUMMARY:Musikkurs - Les Petits Amis
DTSTART;TZID=Europe/Berlin:{dtstart}
DTEND;TZID=Europe/Berlin:{dtend}
LOCATION:Welfenstraße 30a, 76137 Karlsruhe
DESCRIPTION:Kleine Musikschule Karlsruhe - Les Petits Amis
END:VEVENT
"""

ics_content += "END:VCALENDAR\n"

with open("les-petits-amis-termine.ics", "w", encoding="utf-8") as f:
    f.write(ics_content)
