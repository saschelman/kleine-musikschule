import re

filepath = 'assets/css/fretboard.css'
with open(filepath, 'r') as f:
    content = f.read()

# Add width: max-content; and margin: 0 auto; to .fretboard-grid
old_css = """      .fretboard-grid {
        display: grid;
        grid-template-columns: 60px repeat(var(--fret-count, 15), 85px);
        gap: 0;
        min-width: calc(60px + (var(--fret-count, 15) * 85px));
        position: relative;
        background: linear-gradient(180deg, #f5ecd9 0%, #d5c3aa 100%);
      }"""

new_css = """      .fretboard-grid {
        display: grid;
        grid-template-columns: 60px repeat(var(--fret-count, 15), 85px);
        gap: 0;
        min-width: calc(60px + (var(--fret-count, 15) * 85px));
        width: max-content;
        margin: 0 auto;
        position: relative;
        background: linear-gradient(180deg, #f5ecd9 0%, #d5c3aa 100%);
      }"""

content = content.replace(old_css, new_css)

with open(filepath, 'w') as f:
    f.write(content)
