import re

filepath = 'assets/js/faq-bubbles.js'
with open(filepath, 'r') as f:
    content = f.read()

# Remove the border-radius override for expanded bubbles so they stay circles
content = content.replace("border-radius: 24px !important;", "border-radius: 50% !important;")

with open(filepath, 'w') as f:
    f.write(content)
