import re

files = [
    'kontakt.html',
    'kursanmeldung.html',
    'kursanmeldung-les-petits-amis.html'
]

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # The colors to change in popup.style.cssText:
    # background: ${bgColor}; -> background: #ffffff;
    # color: #1a1a1a; -> color: #111111;
    
    # We want to change the popup background from dark to light.
    # Wait, in kontakt.html it was:
    # const bgColor = type === "success" ? "#1c1c1c" : "#1c1c1c";
    content = re.sub(
        r'const bgColor = type === "success" \? "#1c1c1c" : "#1c1c1c";',
        'const bgColor = type === "success" ? "#ffffff" : "#ffffff";',
        content
    )
    
    # And the text color in popup
    content = re.sub(
        r'color: #1a1a1a;',
        'color: #111111;',
        content
    )
    
    # And the button:
    # background: #ffffff; -> background: transparent; 
    # color: #1c1c1c; -> color: #111111;
    # It's better to just give the button the class "button primary" and remove inline styles
    button_regex = r'<button onclick="this\.parentElement\.parentElement\.remove\(\)" style="[^"]*">OK</button>'
    replacement = r'<button onclick="this.parentElement.parentElement.remove()" class="button primary" style="margin-top: 1em;">OK</button>'
    content = re.sub(button_regex, replacement, content, flags=re.DOTALL)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

