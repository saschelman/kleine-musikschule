with open('assets/css/fretboard.css', 'r') as f:
    content = f.read()

content = content.replace('color: #1a1a1a;\n        box-shadow: 0 8px 25px', 'color: #fff;\n        box-shadow: 0 8px 25px')
content = content.replace('color: #1a1a1a;\n      }\n\n      .advanced-chords-wrapper', 'color: #fff;\n      }\n\n      .advanced-chords-wrapper')
content = content.replace('color: #1a1a1a;\n        box-shadow: 0 6px 20px', 'color: #fff;\n        box-shadow: 0 6px 20px')
content = content.replace('background: #2a1f16;', 'background: #ffffff;')

with open('assets/css/fretboard.css', 'w') as f:
    f.write(content)
