import re

filepath = 'blog/gitarren-akkorde-ubersicht.html'
with open(filepath, 'r') as f:
    content = f.read()

old_logic = """            if (fretEl) {
              const dot = document.createElement("div");
              dot.className = "finger-dot";
              const fingerNum = fingers[stringIndex];
              dot.textContent = fingerNum > 0 ? fingerNum : "";
              fretEl.appendChild(dot);
            }"""

new_logic = """            if (fretEl) {
              const dot = document.createElement("div");
              dot.className = "finger-dot";
              const fingerNum = fingers[stringIndex];
              dot.textContent = fingerNum > 0 ? fingerNum : "";
              
              const allNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
              const stringStartNotes = [4, 9, 2, 7, 11, 4]; // E, A, D, G, B, e
              const noteIndex = (stringStartNotes[stringIndex] + actualFret) % 12;
              dot.setAttribute("data-note", allNotes[noteIndex]);
              
              fretEl.appendChild(dot);
            }"""

content = content.replace(old_logic, new_logic)

with open(filepath, 'w') as f:
    f.write(content)
