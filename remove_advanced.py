import re

filepath = 'blog/gitarren-skalen-ubersicht.html'
with open(filepath, 'r') as f:
    content = f.read()

# Pattern to remove the advanced-chords-wrapper and the advanced-toggle completely
pattern = r'<div class="advanced-chords-wrapper">.*?<div class="advanced-toggle">\s*<button class="advanced-btn" id="advancedToggle">\s*<span>Advanced ▼</span>\s*</button>\s*</div>'

content = re.sub(pattern, '', content, flags=re.DOTALL)

with open(filepath, 'w') as f:
    f.write(content)
