import re
import os

filepath = 'blog/gitarren-akkorde-ubersicht.html'
with open(filepath, 'r') as f:
    content = f.read()

# Extract <style> block
style_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
if style_match:
    style_content = style_match.group(1)
    
    # Remove <style> block from html
    content = content.replace(style_match.group(0), '')
    
    # Add link to fretboard.css
    link_tag = '<link rel="stylesheet" href="../assets/css/fretboard.css" />'
    content = content.replace('<link rel="stylesheet" href="../assets/css/blog-post.css" />', 
                              f'<link rel="stylesheet" href="../assets/css/blog-post.css" />\n    {link_tag}')
    
    with open(filepath, 'w') as f:
        f.write(content)
    
    # Clean up the style content for light theme
    style_content = style_content.replace('rgba(58, 58, 58, 0.8)', '#ffffff')
    style_content = style_content.replace('rgba(255, 255, 255, 0.05)', '#ffffff')
    style_content = style_content.replace('rgba(255, 255, 255, 0.1)', 'rgba(255, 159, 67, 0.1)')
    style_content = style_content.replace('rgba(90, 90, 90, 0.6)', '#ffffff')
    style_content = style_content.replace('rgba(26, 26, 26, 0.1)', 'rgba(0,0,0,0.1)')
    style_content = style_content.replace('color: #1a1a1a;', 'color: #333;')
    
    # Fix the active colors to have white text
    style_content = style_content.replace('color: #333;\n        border-color: #ff9f43;', 'color: #fff;\n        border-color: #ff9f43;')
    style_content = style_content.replace('color: #333;\n        box-shadow: 0 8px 25px', 'color: #fff;\n        box-shadow: 0 8px 25px')
    
    # Make advanced btn active have white text
    style_content = style_content.replace('color: #333;\n      }\n\n      .advanced-chords-wrapper', 'color: #fff;\n      }\n\n      .advanced-chords-wrapper')
    
    # Fretboard container
    style_content = style_content.replace('background: rgba(255, 255, 255, 0.03);', 'background: #ffffff;')
    
    # Variant btn
    style_content = style_content.replace('color: #333;\n        box-shadow: 0 6px 20px', 'color: #fff;\n        box-shadow: 0 6px 20px')
    
    # Fretboard itself
    style_content = style_content.replace('background: #2a2a2a;', 'background: #fdfaf6;')
    style_content = style_content.replace('background: linear-gradient(180deg, #333 0%, #2a2a2a 100%);', 'background: linear-gradient(180deg, #e8dcc7 0%, #d5c3aa 100%);')
    style_content = style_content.replace('border-right: 2px solid #555;', 'border-right: 2px solid #8c7b68;')
    style_content = style_content.replace('background: rgba(0, 0, 0, 0.5);', 'background: rgba(255, 255, 255, 0.8);')
    style_content = style_content.replace('border-right: 5px solid #d4af37;', 'border-right: 5px solid #ff9f43;')
    style_content = style_content.replace('color: #ffd700;', 'color: #ff9f43;')
    style_content = style_content.replace('background: #1a1a1a;', 'background: rgba(255,255,255,0.5);')
    style_content = style_content.replace('color: #888;', 'color: #555;')
    style_content = style_content.replace('color: #1a1a1a;\n        background: #2a1f16;', 'color: #fff;\n        background: #2a1f16;')
    style_content = style_content.replace('background: #666;', 'background: rgba(0,0,0,0.3);')
    style_content = style_content.replace('border-left: 4px solid #888;', 'border-left: 4px solid #fff;')
    
    # Fix the .active tabs to definitely be white text
    style_content = re.sub(r'\.root-tab\.active \{.*\}', '.root-tab.active { background: #ff9f43; color: #fff; border-color: #ff9f43; box-shadow: 0 6px 20px rgba(255, 159, 67, 0.4); transform: scale(1.05); }', style_content, flags=re.DOTALL)
    style_content = re.sub(r'\.chord-type-btn\.active \{.*\}', '.chord-type-btn.active { background: #ff9f43; color: #fff; border-color: #ff9f43; box-shadow: 0 6px 20px rgba(255, 159, 67, 0.4); transform: scale(1.05); }', style_content, flags=re.DOTALL)
    style_content = re.sub(r'\.advanced-btn\.active \{.*\}', '.advanced-btn.active { background: #ff9f43; color: #fff; }', style_content, flags=re.DOTALL)
    style_content = re.sub(r'\.variant-btn\.active \{.*\}', '.variant-btn.active { background: #ff9f43; color: #fff; border-color: #ff9f43; box-shadow: 0 6px 20px rgba(255, 159, 67, 0.4); transform: scale(1.05); }', style_content, flags=re.DOTALL)
    
    with open('assets/css/fretboard.css', 'w') as f:
        f.write(style_content)
    print("Created fretboard.css and updated gitarren-akkorde-ubersicht.html")

# Now add fretboard.css to erste-akkorde-gitarre.html
filepath = 'blog/erste-akkorde-gitarre.html'
with open(filepath, 'r') as f:
    content = f.read()

if 'fretboard.css' not in content:
    link_tag = '<link rel="stylesheet" href="../assets/css/fretboard.css" />'
    content = content.replace('<link rel="stylesheet" href="../assets/css/blog-post.css" />', 
                              f'<link rel="stylesheet" href="../assets/css/blog-post.css" />\n    {link_tag}')
    with open(filepath, 'w') as f:
        f.write(content)
    print("Updated erste-akkorde-gitarre.html")

