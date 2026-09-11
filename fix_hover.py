import re

filepath = 'blog/gitarren-skalen-ubersicht.html'
with open(filepath, 'r') as f:
    content = f.read()

style_override = """    <style>
      /* Hover-Tooltips deaktivieren, da die Noten bei den Skalen direkt auf den Punkten stehen */
      .fretboard-grid .finger-dot::after {
        display: none !important;
      }
    </style>
  </head>"""

content = content.replace("  </head>", style_override)

with open(filepath, 'w') as f:
    f.write(content)
