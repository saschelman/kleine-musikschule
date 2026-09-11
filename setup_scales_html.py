import re

filepath = 'blog/gitarren-skalen-ubersicht.html'
with open(filepath, 'r') as f:
    content = f.read()

# Update Metadata
content = content.replace("<title>Gitarren-Akkorde Übersicht</title>", "<title>Gitarren-Skalen & Tonleitern</title>")
content = content.replace("gitarren-akkorde-ubersicht.html", "gitarren-skalen-ubersicht.html")
content = content.replace("Gitarren-Akkorde Übersicht - Interaktives Tool", "Gitarren-Skalen Übersicht - Interaktives Tool")

# Update H1 and paragraphs
content = re.sub(r'<h1>Gitarren-Akkorde Übersicht</h1>\s*<p>.*?Ein interaktives Tool, um die wichtigsten.*?wiederzufinden.</p>', 
                 '<h1>Gitarren-Skalen Übersicht</h1><p>Ein interaktives Tool, um alle wichtigen Tonleitern und Skalen (wie Pentatonik und Blues) auf dem gesamten Griffbrett zu visualisieren und zu lernen.</p>', 
                 content, flags=re.DOTALL)

# Update Script Import
content = content.replace('src="../assets/js/guitar-chords.js"', 'src="../assets/js/guitar-scales.js"')

# Remove Advanced Chords Toggle
advanced_chords_regex = r'<div class="advanced-toggle">.*?<div class="advanced-chords-wrapper">.*?</div>\s*</div>'
content = re.sub(advanced_chords_regex, '', content, flags=re.DOTALL)

# Change IDs
content = content.replace('id="chordDisplayName"', 'id="scaleDisplayName"')
content = content.replace('id="chordDisplayInfo"', 'id="scaleDisplayInfo"')
content = content.replace('id="chordVariants"', 'id="scaleVariants"') # Remove this later or use for positions
content = content.replace('id="chordTypes"', 'id="scaleTypes"')
content = content.replace('id="fretboard"', 'id="scaleFretboard"')
content = content.replace('generateFretboard();', 'generateScaleFretboard();')

with open(filepath, 'w') as f:
    f.write(content)
