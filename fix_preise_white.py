filepath = 'preise.html'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace('color: rgba(255,255,255,0.9);', 'color: rgba(26,26,26,0.9);')
content = content.replace('color: rgba(255,255,255,0.85);', 'color: rgba(26,26,26,0.85);')

with open(filepath, 'w') as f:
    f.write(content)
