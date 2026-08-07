import os
import re

root_dir = '/Users/sasch/kleine-musikschule/'
count = 0

for root, dirs, files in os.walk(root_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            new_content = content
            
            # Fix navigation links: change >Kurse</a> href from kursanmeldung.html to kurse.html
            new_content = re.sub(r'href="([^"]*)kursanmeldung\.html">Kurse</a>', r'href="\g<1>kurse.html">Kurse</a>', new_content)
            
            # Fix index.html grid link for "Musikkurs für Kinder"
            if file == 'index.html':
                new_content = new_content.replace('href="kursanmeldung.html" class="link">Musikkurs für Kinder', 'href="kurse.html" class="link">Musikkurs für Kinder')

            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                count += 1
                print(f"Updated links in {filepath}")

print(f"Total updated: {count}")
