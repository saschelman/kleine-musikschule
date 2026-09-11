import re

# Update fretboard.css
css_file = 'assets/css/fretboard.css'
with open(css_file, 'r') as f:
    css_content = f.read()

# Replace 135deg with 90deg
css_content = css_content.replace('linear-gradient(135deg,', 'linear-gradient(90deg,')

with open(css_file, 'w') as f:
    f.write(css_content)

# Update gitarren-skalen-ubersicht.html
html_file = 'blog/gitarren-skalen-ubersicht.html'
with open(html_file, 'r') as f:
    html_content = f.read()

html_content = html_content.replace('linear-gradient(135deg,', 'linear-gradient(90deg,')

with open(html_file, 'w') as f:
    f.write(html_content)
