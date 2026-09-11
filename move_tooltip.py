import re

filepath = 'assets/css/fretboard.css'
with open(filepath, 'r') as f:
    content = f.read()

# Replace bottom: -30px; with top: calc(100% + 8px);
content = re.sub(r'bottom: -30px;', r'top: calc(100% + 8px); bottom: auto;', content)

with open(filepath, 'w') as f:
    f.write(content)
