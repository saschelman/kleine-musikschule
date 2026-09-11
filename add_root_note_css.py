import re

filepath = 'assets/css/fretboard.css'
with open(filepath, 'r') as f:
    content = f.read()

# Add .root-note-dot class
if '.root-note-dot' not in content:
    content += """

      /* Scale root notes */
      .root-note-dot {
        background: #ef4444;
      }
      
      .root-note-dot:hover {
        box-shadow: 0 6px 20px rgba(239, 68, 68, 0.7);
      }
      
      .root-note-dot::after {
        border-color: rgba(239, 68, 68, 0.5);
      }
"""

    with open(filepath, 'w') as f:
        f.write(content)
