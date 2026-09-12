import os
import re

files_to_canonical = [
    '404.html',
    'agb-kurs.html',
    'kursanmeldung.html',
    'medien-einwilligung.html',
    'kursanmeldung-les-petits-amis.html',
    'kurse.html'
]

base_url = "https://www.kleine-musikschule.de/"

for file in files_to_canonical:
    if not os.path.exists(file):
        continue
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    canonical_tag = f'<link rel="canonical" href="{base_url}{file}" />'
    
    if '<head>' in content and 'rel="canonical"' not in content:
        # Insert after <head>
        content = content.replace('<head>', f'<head>\n    {canonical_tag}', 1)
        
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

# Add title to kurse.html
with open('kurse.html', 'r', encoding='utf-8') as f:
    content = f.read()

if '<title>' not in content and '<head>' in content:
    content = content.replace('<head>', '<head>\n    <title>Unsere Musikkurse in Karlsruhe | Kleine Musikschule</title>', 1)
    
with open('kurse.html', 'w', encoding='utf-8') as f:
    f.write(content)
    
