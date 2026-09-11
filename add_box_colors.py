import re

filepath = 'assets/css/fretboard.css'
with open(filepath, 'r') as f:
    content = f.read()

colors = {
    1: "#3b82f6",
    2: "#10b981",
    3: "#f59e0b",
    4: "#8b5cf6",
    5: "#ec4899"
}

css_to_add = "\n      /* Scale Box Colors */\n"

# Add single box colors
for i in range(1, 6):
    css_to_add += f"      .box-{i} {{ background: {colors[i]}; }}\n"

# Add two-box gradient colors (overlap)
for i in range(1, 6):
    next_i = (i % 5) + 1
    # e.g., box-1-2
    css_to_add += f"      .box-{i}-{next_i} {{ background: linear-gradient(135deg, {colors[i]} 50%, {colors[next_i]} 50%); }}\n"
    # also reversed just in case: box-2-1
    css_to_add += f"      .box-{next_i}-{i} {{ background: linear-gradient(135deg, {colors[next_i]} 50%, {colors[i]} 50%); }}\n"

# Ensure root note border is applied properly for boxed notes
# If a dot has a box class AND is a root note, it should get a red border.
css_to_add += """
      /* Root note overrides for boxed dots */
      .finger-dot.root-note-dot[class*="box-"] {
        border: 3px solid #ef4444;
      }
"""

if '/* Scale Box Colors */' not in content:
    with open(filepath, 'w') as f:
        f.write(content + css_to_add)
