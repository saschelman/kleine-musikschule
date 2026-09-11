import os

replacements = {
    '#667eea': '#ff9f43',
    '102, 126, 234': '255, 159, 67',
    '#764ba2': '#e07a5f',
    '118, 75, 162': '224, 122, 95'
}

def update_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content
    for old, new in replacements.items():
        new_content = new_content.replace(old, new)

    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root or 'backend' in root:
        continue
    for file in files:
        if file.endswith('.html') or file.endswith('.css') or file.endswith('.scss') or file.endswith('.js'):
            update_file(os.path.join(root, file))

