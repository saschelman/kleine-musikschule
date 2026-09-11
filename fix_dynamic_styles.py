import re

filepath = 'blog/gitarren-akkorde-ubersicht.html'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace('background: linear-gradient(180deg, #333 0%, #2a2a2a 100%);', 'background: linear-gradient(180deg, #f5ecd9 0%, #d5c3aa 100%);')
content = content.replace('border-right: 2px solid #555;', 'border-right: 2px solid #a39171;')
content = content.replace('background: #2a2a2a;', 'background: transparent;')
content = content.replace('background: rgba(255, 255, 255, 0.15);', 'background: rgba(0, 0, 0, 0.3);')

with open(filepath, 'w') as f:
    f.write(content)
