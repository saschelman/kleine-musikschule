import os
from bs4 import BeautifulSoup

def audit_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')
    
    issues = {
        'title': [],
        'meta_desc': [],
        'canonical': [],
        'h1': [],
        'img_alt': [],
        'links': [],
        'forms': [],
        'language': []
    }
    
    # 1. Check title
    title = soup.find('title')
    if not title or not title.string or len(title.string.strip()) == 0:
        issues['title'].append("Missing or empty <title> tag.")
    
    # 2. Check meta description
    meta_desc = soup.find('meta', attrs={'name': 'description'})
    if not meta_desc or not meta_desc.get('content') or len(meta_desc.get('content').strip()) == 0:
        issues['meta_desc'].append("Missing or empty meta description.")
        
    # 3. Check canonical
    canonical = soup.find('link', attrs={'rel': 'canonical'})
    if not canonical or not canonical.get('href') or len(canonical.get('href').strip()) == 0:
        issues['canonical'].append("Missing or empty canonical tag.")
        
    # 4. Check H1
    h1s = soup.find_all('h1')
    if len(h1s) == 0:
        issues['h1'].append("Missing <h1> tag.")
    elif len(h1s) > 1:
        issues['h1'].append(f"Multiple <h1> tags found ({len(h1s)}).")
        
    # 5. Check img alt
    imgs = soup.find_all('img')
    missing_alts = [img.get('src', 'unknown') for img in imgs if not img.get('alt') or len(img.get('alt').strip()) == 0]
    if missing_alts:
        issues['img_alt'].append(f"Images missing alt text: {len(missing_alts)}")
        
    # 6. Check empty links
    links = soup.find_all('a')
    empty_links = [a.string or 'unknown' for a in links if a.get('href') == '#']
    if empty_links:
        issues['links'].append(f"Empty/dummy links (href='#') found: {len(empty_links)}")
        
    # 7. Check forms
    forms = soup.find_all('form')
    for form in forms:
        if not form.get('action'):
            issues['forms'].append("Form missing action attribute.")
            
    # 8. Check lang
    html_tag = soup.find('html')
    if not html_tag or not html_tag.get('lang'):
        issues['language'].append("Missing lang attribute on <html>.")

    return issues

audit_results = {}
for root, _, files in os.walk('.'):
    if 'node_modules' in root or '.git' in root or 'venv' in root:
        continue
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            issues = audit_html_file(filepath)
            # Filter empty lists
            active_issues = {k: v for k, v in issues.items() if v}
            if active_issues:
                audit_results[filepath] = active_issues

print("Audit Results:")
for path, issues in audit_results.items():
    print(f"\nFile: {path}")
    for category, issue_list in issues.items():
        for issue in issue_list:
            print(f"  - [{category}] {issue}")

# Also check for sitemap and robots
if not os.path.exists('sitemap.xml'):
    print("\nGlobal: Missing sitemap.xml")
if not os.path.exists('robots.txt'):
    print("Global: Missing robots.txt")

