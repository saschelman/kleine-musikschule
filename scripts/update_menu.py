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

            if '<nav id="menu">' in content and '>Kurse</a>' not in content:
                # Determine relative path prefix by finding instrumente.html
                match = re.search(r'href="([^"]*)instrumente\.html"', content)
                prefix = match.group(1) if match else ''

                def replacer(m):
                    nav_start = m.group(0)
                    new_link = f'          <li><a href="{prefix}kursanmeldung.html">Kurse</a></li>\n'
                    return nav_start + new_link

                new_content = re.sub(r'(<nav id="menu">\s*<ul class="links"[^>]*>\n)', replacer, content, count=1)
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    count += 1
                    print(f"Updated {filepath} (prefix '{prefix}')")

print(f"Total updated: {count}")
