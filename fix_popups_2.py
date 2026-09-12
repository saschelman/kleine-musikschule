import re

files = [
    'kontakt.html',
    'kursanmeldung.html',
    'kursanmeldung-les-petits-amis.html'
]

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace popup bg
    content = re.sub(
        r'const bgColor = type === "success" \? "#1c1c1c" : "#1c1c1c";',
        'const bgColor = type === "success" ? "#ffffff" : "#ffffff";',
        content
    )
    
    # Text color
    content = re.sub(
        r'color: #1a1a1a;',
        'color: #111111;',
        content
    )
    
    # Replace the button definition completely
    button_regex = r'<button onclick="this\.parentElement\.parentElement\.remove\(\)" style="[^"]*" onmouseover="[^"]*" onmouseout="[^"]*">Okay</button>'
    replacement = r'<button onclick="this.parentElement.parentElement.remove()" class="button primary" style="margin-top: 1em;">Okay</button>'
    content = re.sub(button_regex, replacement, content, flags=re.DOTALL)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

