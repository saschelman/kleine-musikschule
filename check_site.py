import os
import re

# Find all HTML files
html_files = []
for root, _, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            html_files.append(os.path.join(root, file))

issues = []

# Regex to find links and assets
href_re = re.compile(r'href=["\'](.*?)["\']')
src_re = re.compile(r'src=["\'](.*?)["\']')

for html_file in html_files:
    dir_path = os.path.dirname(html_file)
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check links
    links = href_re.findall(content)
    for link in links:
        if link.startswith('http') or link.startswith('mailto:') or link.startswith('tel:') or link.startswith('#') or link == '':
            continue
        # Remove query params and hashes
        clean_link = link.split('?')[0].split('#')[0]
        if not clean_link:
            continue
            
        target_path = os.path.normpath(os.path.join(dir_path, clean_link))
        if not os.path.exists(target_path):
            issues.append(f"[Broken Link] {html_file}: {link} -> {target_path} not found")

    # Check sources
    srcs = src_re.findall(content)
    for src in srcs:
        if src.startswith('http') or src.startswith('data:'):
            continue
        clean_src = src.split('?')[0].split('#')[0]
        if not clean_src:
            continue
            
        target_path = os.path.normpath(os.path.join(dir_path, clean_src))
        if not os.path.exists(target_path):
            issues.append(f"[Missing Asset] {html_file}: {src} -> {target_path} not found")

if issues:
    print("Found issues:")
    for issue in set(issues):
        print(issue)
else:
    print("No broken links or missing assets found!")
