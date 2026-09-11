import re

filepath = 'blog/gitarren-skalen-ubersicht.html'
with open(filepath, 'r') as f:
    content = f.read()

# Replace the whole <script>...</script> block with our custom scales script
old_script_regex = r'<script>\s*let currentRoot = "C";.*?</script>'

new_script = """<script>
      let currentRoot = "C";
      let currentScale = "minor-pentatonic";

      function generateScaleFretboard() {
        const grid = document.getElementById("scaleFretboard");
        grid.innerHTML = "";

        const strings = ["E", "B", "G", "D", "A", "E"];
        strings.forEach((note, strIndex) => {
          const strNum = 6 - strIndex; // 6 for high E, ..., 1 for low E
          const label = document.createElement("div");
          label.className = "string-label";
          label.style.position = "relative";

          const noteSpan = document.createElement("span");
          noteSpan.textContent = note;
          label.appendChild(noteSpan);
          grid.appendChild(label);

          for (let fret = 1; fret <= 15; fret++) {
            const fretDiv = document.createElement("div");
            fretDiv.className = "fret";
            fretDiv.dataset.string = strNum;
            fretDiv.dataset.fret = fret;

            if (strIndex === 2 && [3, 5, 7, 9, 12, 15].includes(fret)) {
              const marker = document.createElement("div");
              marker.className = "fret-marker";
              if (fret === 12) marker.classList.add("double");
              fretDiv.appendChild(marker);
            }
            grid.appendChild(fretDiv);
          }
        });
      }

      function displayScale() {
        // Clear old dots
        document.querySelectorAll(".finger-dot").forEach((el) => el.remove());

        const scaleData = guitarScalesDB.scales.find((s) => s.id === currentScale);
        const nameEl = document.getElementById("scaleDisplayName");
        const infoEl = document.getElementById("scaleDisplayInfo");

        const sharpMap = { Eb: "D#", Ab: "G#", Bb: "A#" };
        const displayRoot = sharpMap[currentRoot] || currentRoot;

        if (!scaleData) return;

        nameEl.textContent = displayRoot + " " + scaleData.label;
        infoEl.textContent = "Zeigt alle Töne der Skala auf dem gesamten Griffbrett.";

        const allNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        const stringStartNotes = [4, 9, 2, 7, 11, 4]; // Low E to High E
        
        let rootNoteIndex = allNotes.indexOf(displayRoot);
        
        // Calculate all note indices that belong to the scale
        let scaleNoteIndices = scaleData.intervals.map(interval => (rootNoteIndex + interval) % 12);

        // Iterate over strings (0=Low E, ..., 5=High e)
        for(let stringIndex = 0; stringIndex < 6; stringIndex++) {
            let strNum = stringIndex + 1; // 1 to 6
            for(let actualFret = 0; actualFret <= 15; actualFret++) {
                let noteIndex = (stringStartNotes[stringIndex] + actualFret) % 12;
                
                if (scaleNoteIndices.includes(noteIndex)) {
                    let isRoot = (noteIndex === rootNoteIndex);
                    
                    if (actualFret === 0) {
                        // For open strings we just color the label if we want, but for scales we can just put a dot on fret 1?
                        // No, open strings are technically fret 0, but our grid doesn't have a fret 0 div. 
                        // We will skip open strings visually for now, or just focus on fretted notes.
                        continue;
                    }
                    
                    const fretEl = document.querySelector(`[data-string="${strNum}"][data-fret="${actualFret}"]`);
                    if (fretEl) {
                        const dot = document.createElement("div");
                        dot.className = "finger-dot" + (isRoot ? " root-note-dot" : "");
                        // Show the note name on the dot
                        dot.textContent = allNotes[noteIndex];
                        dot.setAttribute("data-note", allNotes[noteIndex]);
                        fretEl.appendChild(dot);
                    }
                }
            }
        }
      }

      function generateRootTabs() {
        const container = document.getElementById("rootNoteTabs");
        container.innerHTML = "";
        const sharpMap = { Eb: "D#", Ab: "G#", Bb: "A#" };

        guitarScalesDB.keys.forEach((note) => {
          const btn = document.createElement("button");
          btn.className = "root-tab" + (note === currentRoot ? " active" : "");
          btn.textContent = sharpMap[note] || note;
          btn.onclick = () => {
            document.querySelectorAll(".root-tab").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            currentRoot = note;
            displayScale();
          };
          container.appendChild(btn);
        });
      }

      function generateScaleButtons() {
        const container = document.getElementById("scaleTypes");
        container.innerHTML = "";
        guitarScalesDB.scales.forEach((scale) => {
          const btn = document.createElement("button");
          btn.className = "chord-type-btn" + (scale.id === currentScale ? " active" : "");
          btn.textContent = scale.label;
          btn.onclick = () => {
            document.querySelectorAll(".chord-type-btn").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            currentScale = scale.id;
            displayScale();
          };
          container.appendChild(btn);
        });
      }

      generateScaleFretboard();
      generateRootTabs();
      generateScaleButtons();
      displayScale();
    </script>"""

content = re.sub(old_script_regex, new_script, content, flags=re.DOTALL)

with open(filepath, 'w') as f:
    f.write(content)
