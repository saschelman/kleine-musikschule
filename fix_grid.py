import re

filepath = 'assets/css/fretboard.css'
with open(filepath, 'r') as f:
    content = f.read()

# Replace the 15 hardcodings with CSS variables
content = content.replace("grid-template-columns: 60px repeat(15, 85px);", "grid-template-columns: 60px repeat(var(--fret-count, 15), 85px);")
content = content.replace("min-width: 1200px;", "min-width: calc(60px + (var(--fret-count, 15) * 85px));")

content = content.replace("grid-template-columns: 30px repeat(15, 50px);", "grid-template-columns: 30px repeat(var(--fret-count, 15), 50px);")
content = content.replace("min-width: 700px;", "min-width: calc(30px + (var(--fret-count, 15) * 50px));")

with open(filepath, 'w') as f:
    f.write(content)

