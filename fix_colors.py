import os
import glob

def replace_colors(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content.replace('color: rgba(255, 255, 255,', 'color: rgba(26, 26, 26,')
    new_content = new_content.replace('color: #fff', 'color: #1a1a1a')
    new_content = new_content.replace('color: white', 'color: #1a1a1a')
    new_content = new_content.replace('border: 1px solid rgba(255, 255, 255,', 'border: 1px solid rgba(26, 26, 26,')
    new_content = new_content.replace('border: 2px solid rgba(255, 255, 255,', 'border: 2px solid rgba(26, 26, 26,')
    new_content = new_content.replace('border-color: rgba(255, 255, 255,', 'border-color: rgba(26, 26, 26,')
    new_content = new_content.replace('border-bottom: 1px solid rgba(255, 255, 255,', 'border-bottom: 1px solid rgba(26, 26, 26,')
    new_content = new_content.replace('border-top: 1px solid rgba(255, 255, 255,', 'border-top: 1px solid rgba(26, 26, 26,')

    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html') or file.endswith('.css'):
            replace_colors(os.path.join(root, file))

