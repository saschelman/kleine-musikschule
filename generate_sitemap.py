import os
import xml.etree.ElementTree as ET
from xml.dom import minidom

base_url = "https://www.kleine-musikschule.de"
urlset = ET.Element('urlset')
urlset.set('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')

for root_dir, _, files in os.walk('.'):
    if 'node_modules' in root_dir or '.git' in root_dir or 'venv' in root_dir:
        continue
    for file in files:
        if file.endswith('.html') and file != '404.html':
            filepath = os.path.join(root_dir, file)
            # Normalize path
            rel_path = os.path.normpath(filepath).replace('\\', '/')
            if rel_path.startswith('./'):
                rel_path = rel_path[2:]
            
            url = ET.SubElement(urlset, 'url')
            loc = ET.SubElement(url, 'loc')
            if rel_path == 'index.html':
                loc.text = f"{base_url}/"
            else:
                loc.text = f"{base_url}/{rel_path}"

xml_str = minidom.parseString(ET.tostring(urlset)).toprettyxml(indent="  ")
with open('sitemap.xml', 'w', encoding='utf-8') as f:
    f.write(xml_str)

