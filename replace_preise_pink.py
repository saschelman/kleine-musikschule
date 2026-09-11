import re

filepath = 'preise.html'
with open(filepath, 'r') as f:
    content = f.read()

# Replace pink colors with orange
content = content.replace('#ec8d81', '#ff9f43')

# Replace the pricing card background and border to be solid white and orange
content = re.sub(
    r'background: rgba\(236, 141, 129, 0\.1\);.*?/\*.*?\*/',
    r'background: #ffffff; /* Solid white */\n        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);',
    content
)
content = re.sub(
    r'border: 2px solid rgba\(236, 141, 129, 0\.25\);',
    r'border: 2px solid rgba(255, 159, 67, 0.3);',
    content
)
content = re.sub(
    r'background: rgba\(236, 141, 129, 0\.8\);',
    r'background: #ff9f43;',
    content
)

# For the map border and button
content = content.replace('rgba(236, 141, 129, 0.3)', 'rgba(255, 159, 67, 0.3)')
content = content.replace('rgba(236, 141, 129, 0.35)', 'rgba(255, 159, 67, 0.35)')
content = content.replace('rgba(236, 141, 129, 0.6)', 'rgba(255, 159, 67, 0.6)')
content = content.replace('rgba(236, 141, 129, 0.12)', 'rgba(255, 159, 67, 0.12)')
content = content.replace('rgba(236, 141, 129, 0.08)', 'rgba(255, 159, 67, 0.08)')

with open(filepath, 'w') as f:
    f.write(content)

print("Updated preise.html")
