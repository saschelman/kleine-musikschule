import os

replacements = {
    '#9bf1ff': '#ff9f43',
    '#8ae0ee': '#ffb16b',
    '155, 241, 255': '255, 159, 67',
    '#6fc3df': '#ff9f43',
    '111, 195, 223': '255, 159, 67'
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
        if file.endswith('.html') or file.endswith('.css') or file.endswith('.scss'):
            update_file(os.path.join(root, file))

