import re

filepath = 'assets/css/fretboard.css'
with open(filepath, 'r') as f:
    content = f.read()

# Reduce padding on .fretboard
content = re.sub(r'padding: 2\.5em 2em;', r'padding: 1.5em 2em;', content)

# Reduce height of .fret (Desktop)
content = re.sub(r'height: 65px;', r'height: 48px;', content)

# Reduce height of .fret (Mobile)
content = re.sub(r'height: 40px;', r'height: 35px;', content)

with open(filepath, 'w') as f:
    f.write(content)
