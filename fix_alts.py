from bs4 import BeautifulSoup
import os

files_to_fix = ['kurse.html', 'kursanmeldung.html', 'kursanmeldung-les-petits-amis.html']

for file in files_to_fix:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    soup = BeautifulSoup(content, 'html.parser')
    changed = False
    for img in soup.find_all('img'):
        if not img.get('alt') or len(img.get('alt').strip()) == 0:
            img['alt'] = "Kleine Musikschule Karlsruhe - Bild"
            changed = True
            
    if changed:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(str(soup))
            
