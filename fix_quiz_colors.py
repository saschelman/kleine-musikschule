import re
import os

filepath = 'blog/quiz-musiker.html'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace('#76c2df', '#ff9f43') # light blue -> vibrant orange
content = content.replace('#4fa8ca', '#e07a5f') # darker blue -> burnt orange
content = content.replace('#f0a39c', '#ffb16b') # pale red -> light orange
content = content.replace('#de7f76', '#f39c12') # red -> dark orange
content = content.replace('#85ceb0', '#ffcc80') # green -> pale orange
content = content.replace('#58ac8b', '#e67e22') # dark green -> deep orange

with open(filepath, 'w') as f:
    f.write(content)
