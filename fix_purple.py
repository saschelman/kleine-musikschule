import re

filepath = 'blog/quiz-musiker.html'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace('#a855f7', '#ff9f43')
content = content.replace('#6366f1', '#f0ad4e')
content = content.replace('rgba(168, 85, 247, 0.1)', 'rgba(255, 159, 67, 0.1)')
content = content.replace('rgba(168, 85, 247, 0.3)', 'rgba(255, 159, 67, 0.3)')

with open(filepath, 'w') as f:
    f.write(content)
