import re

filepath = 'blog/erste-akkorde-gitarre.html'
with open(filepath, 'r') as f:
    content = f.read()

# Fix C chord
old_C = """        C: {
          positions: [
            { string: 0, fret: -1, finger: 0 },
            { string: 1, fret: 1, finger: 1 },
            { string: 2, fret: 0, finger: 0 },
            { string: 3, fret: 2, finger: 2 },
            { string: 4, fret: 3, finger: 3 },
            { string: 5, fret: 0, finger: 0 },
          ],
        },"""

new_C = """        C: {
          positions: [
            { string: 0, fret: 0, finger: 0 },
            { string: 1, fret: 1, finger: 1 },
            { string: 2, fret: 0, finger: 0 },
            { string: 3, fret: 2, finger: 2 },
            { string: 4, fret: 3, finger: 3 },
            { string: 5, fret: -1, finger: 0 },
          ],
        },"""

# Fix D chord
old_D = """        D: {
          positions: [
            { string: 0, fret: -1, finger: 0 },
            { string: 1, fret: -1, finger: 0 },
            { string: 2, fret: 2, finger: 1 },
            { string: 3, fret: 3, finger: 3 },
            { string: 4, fret: 2, finger: 2 },
            { string: 5, fret: 0, finger: 0 },
          ],
        }"""

new_D = """        D: {
          positions: [
            { string: 0, fret: 2, finger: 2 },
            { string: 1, fret: 3, finger: 3 },
            { string: 2, fret: 2, finger: 1 },
            { string: 3, fret: 0, finger: 0 },
            { string: 4, fret: -1, finger: 0 },
            { string: 5, fret: -1, finger: 0 },
          ],
        }"""

content = content.replace(old_C, new_C)
content = content.replace(old_D, new_D)

with open(filepath, 'w') as f:
    f.write(content)
