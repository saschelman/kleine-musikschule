import re

filepath = 'blog/gitarren-akkorde-ubersicht.html'
with open(filepath, 'r') as f:
    content = f.read()

style_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
if style_match:
    style_content = style_match.group(1)
    
    # Remove from html and add link
    content = content.replace(style_match.group(0), '')
    link_tag = '<link rel="stylesheet" href="../assets/css/fretboard.css" />'
    if 'fretboard.css' not in content:
        content = content.replace('<link rel="stylesheet" href="../assets/css/blog-post.css" />', 
                                  f'<link rel="stylesheet" href="../assets/css/blog-post.css" />\n    {link_tag}')
    
    with open(filepath, 'w') as f:
        f.write(content)
    
    # Replace colors in CSS for light theme
    s = style_content
    # Tabs background
    s = s.replace('background: rgba(58, 58, 58, 0.8);', 'background: #ffffff; /* Tabs container */')
    s = s.replace('background: rgba(255, 255, 255, 0.05);', 'background: #ffffff;')
    s = s.replace('background: rgba(90, 90, 90, 0.6);', 'background: #ffffff; /* Chord btn */')
    # Borders
    s = s.replace('border: 2px solid transparent;', 'border: 1px solid rgba(0,0,0,0.1);')
    s = s.replace('border: 2px solid rgba(26, 26, 26, 0.1);', 'border: 1px solid rgba(0,0,0,0.1);')
    # Text colors
    s = s.replace('color: #1a1a1a;', 'color: #333;')
    # Fix active state text colors to be white
    s = s.replace('color: #333;\n        border-color: #ff9f43;', 'color: #fff;\n        border-color: #ff9f43;')
    s = s.replace('color: #333;\n        box-shadow: 0 8px 25px', 'color: #fff;\n        box-shadow: 0 8px 25px')
    s = s.replace('color: #333;\n      }\n\n      .advanced-chords-wrapper', 'color: #fff;\n      }\n\n      .advanced-chords-wrapper')
    s = s.replace('color: #333;\n        box-shadow: 0 6px 20px', 'color: #fff;\n        box-shadow: 0 6px 20px')
    # Fretboard container
    s = s.replace('background: rgba(255, 255, 255, 0.03);', 'background: #ffffff;')
    s = s.replace('border: 1px solid rgba(102, 126, 234, 0.15);', 'border: 1px solid rgba(0,0,0,0.05);')
    # Fretboard grid and fret colors
    s = s.replace('background: #2a2a2a;', 'background: #fdfaf6;')
    s = s.replace('background: linear-gradient(180deg, #333 0%, #2a2a2a 100%);', 'background: linear-gradient(180deg, #f5ecd9 0%, #d5c3aa 100%);')
    s = s.replace('background: rgba(0, 0, 0, 0.5);', 'background: rgba(255, 255, 255, 0.8);')
    s = s.replace('color: #ffd700;', 'color: #ff9f43;')
    s = s.replace('border-right: 5px solid #d4af37;', 'border-right: 5px solid #ff9f43;')
    s = s.replace('color: #888;', 'color: #555;')
    s = s.replace('background: rgba(26, 26, 26, 0.5);', 'background: rgba(255, 255, 255, 0.6);')
    s = s.replace('border-right: 2px solid #555;', 'border-right: 2px solid #a39171;')
    s = s.replace('background: #666;', 'background: rgba(0,0,0,0.3);')
    s = s.replace('border-left: 4px solid #888;', 'border-left: 4px solid #fff;')
    # Active tab fix
    s = re.sub(r'\.root-tab\.active \{.*?\}', '.root-tab.active { background: #ff9f43; color: #fff; border-color: #ff9f43; box-shadow: 0 6px 20px rgba(255, 159, 67, 0.4); transform: scale(1.05); }', s, flags=re.DOTALL)

    with open('assets/css/fretboard.css', 'w') as f:
        f.write(s)
    print("Created fretboard.css cleanly")

