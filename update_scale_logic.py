import re

filepath = 'blog/gitarren-skalen-ubersicht.html'
with open(filepath, 'r') as f:
    content = f.read()

# 1. Add Position Selector UI
pos_html = """            <div class="scale-section">
              <label>Lage / Pattern (CAGED):</label>
              <div class="tabs" id="positionTabs">
                <!-- Generated via JS -->
              </div>
            </div>"""
            
# insert it before <div id="scaleFretboard"
content = content.replace('<div id="scaleFretboard"', pos_html + '\n            <div id="scaleFretboard"')

# 2. Add Legend Colors
old_legend = r"""                <li>
                  <span class="legend-icon finger-icon">1</span>
                  <span><strong>Orange Punkte mit Zahlen:</strong> Zeigen, wo du deine Finger platzierst \(1=Zeigefinger, 2=Mittelfinger, 3=Ringfinger, 4=Kleiner Finger\)</span>
                </li>"""

new_legend = """                <li>
                  <span class="legend-icon" style="background: #3b82f6"></span>
                  <span><strong>Blau:</strong> Pattern / Box 1 (E-Shape)</span>
                </li>
                <li>
                  <span class="legend-icon" style="background: #10b981"></span>
                  <span><strong>Grün:</strong> Pattern / Box 2 (D-Shape)</span>
                </li>
                <li>
                  <span class="legend-icon" style="background: #f59e0b"></span>
                  <span><strong>Gelb:</strong> Pattern / Box 3 (C-Shape)</span>
                </li>
                <li>
                  <span class="legend-icon" style="background: #8b5cf6"></span>
                  <span><strong>Lila:</strong> Pattern / Box 4 (A-Shape)</span>
                </li>
                <li>
                  <span class="legend-icon" style="background: #ec4899"></span>
                  <span><strong>Pink:</strong> Pattern / Box 5 (G-Shape)</span>
                </li>
                <li>
                  <span class="legend-icon" style="background: linear-gradient(135deg, #3b82f6 50%, #10b981 50%)"></span>
                  <span><strong>Zweifarbig:</strong> Töne, die zu zwei überlappenden Pattern gehören</span>
                </li>
                <li>
                  <span class="legend-icon" style="border: 3px solid #ef4444; background: #3b82f6"></span>
                  <span><strong>Roter Rand:</strong> Dies ist der Grundton der Skala (Root Note)</span>
                </li>"""

content = re.sub(old_legend, new_legend, content)

# 3. JS Logic
old_script_regex = r'<script>\s*let currentRoot = "C";.*?</script>'

new_script = """<script>
      let currentRoot = "C";
      let currentScale = "minor-pentatonic";
      let currentPosition = "All";

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
        document.querySelectorAll(".finger-dot").forEach((el) => el.remove());

        const scaleData = guitarScalesDB.scales.find((s) => s.id === currentScale);
        const nameEl = document.getElementById("scaleDisplayName");
        const infoEl = document.getElementById("scaleDisplayInfo");

        const sharpMap = { Eb: "D#", Ab: "G#", Bb: "A#" };
        const displayRoot = sharpMap[currentRoot] || currentRoot;

        if (!scaleData) return;

        nameEl.textContent = displayRoot + " " + scaleData.label;
        infoEl.textContent = currentPosition === "All" ? "Alle Lagen gleichzeitig." : `Zeigt nur Position ${currentPosition}.`;

        const allNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        const stringStartNotes = [4, 9, 2, 7, 11, 4]; // Low E to High E
        
        let rootNoteIndex = allNotes.indexOf(displayRoot);
        let scaleNoteIndices = scaleData.intervals.map(interval => (rootNoteIndex + interval) % 12);

        // Find the root on the Low E string (String index 0)
        let rootFretOnLowE = -1;
        for(let f = 0; f < 12; f++) {
           if ((stringStartNotes[0] + f) % 12 === rootNoteIndex) {
               rootFretOnLowE = f;
               break;
           }
        }

        // Define the 5 CAGED windows relative to Root on Low E
        const boxWindows = [
           [-1, 3], // Box 1
           [2, 6],  // Box 2
           [4, 8],  // Box 3
           [7, 11], // Box 4
           [9, 13]  // Box 5
        ];

        for(let stringIndex = 0; stringIndex < 6; stringIndex++) {
            let strNum = stringIndex + 1; 
            for(let actualFret = 1; actualFret <= 15; actualFret++) {
                let noteIndex = (stringStartNotes[stringIndex] + actualFret) % 12;
                
                if (scaleNoteIndices.includes(noteIndex)) {
                    let isRoot = (noteIndex === rootNoteIndex);
                    
                    // Determine which boxes this fret belongs to
                    let boxes = [];
                    let delta = actualFret - rootFretOnLowE;
                    
                    for(let b = 0; b < 5; b++) {
                        let win = boxWindows[b];
                        // Check delta, delta-12, delta+12 for wrap-around on 15 frets
                        if (
                          (delta >= win[0] && delta <= win[1]) ||
                          (delta - 12 >= win[0] && delta - 12 <= win[1]) ||
                          (delta + 12 >= win[0] && delta + 12 <= win[1])
                        ) {
                            boxes.push(b + 1);
                        }
                    }

                    // Filter based on currentPosition
                    if (currentPosition !== "All" && !boxes.includes(parseInt(currentPosition))) {
                        continue;
                    }
                    
                    // If filtering by position, it only belongs to THAT position visually
                    let visualBoxes = currentPosition === "All" ? boxes : [parseInt(currentPosition)];

                    const fretEl = document.querySelector(`[data-string="${strNum}"][data-fret="${actualFret}"]`);
                    if (fretEl) {
                        const dot = document.createElement("div");
                        let classNames = ["finger-dot"];
                        
                        if (visualBoxes.length === 1) {
                            classNames.push(`box-${visualBoxes[0]}`);
                        } else if (visualBoxes.length > 1) {
                            classNames.push(`box-${visualBoxes[0]}-${visualBoxes[1]}`);
                        }

                        if (isRoot) classNames.push("root-note-dot");
                        
                        dot.className = classNames.join(" ");
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

      function generatePositionButtons() {
        const container = document.getElementById("positionTabs");
        container.innerHTML = "";
        const positions = ["All", "1", "2", "3", "4", "5"];
        
        positions.forEach((pos) => {
          const btn = document.createElement("button");
          btn.className = "variant-btn" + (pos === currentPosition ? " active" : "");
          btn.textContent = pos === "All" ? "Alle Lagen" : "Pos " + pos;
          btn.onclick = () => {
            document.querySelectorAll("#positionTabs .variant-btn").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            currentPosition = pos;
            displayScale();
          };
          container.appendChild(btn);
        });
      }

      generateScaleFretboard();
      generateRootTabs();
      generateScaleButtons();
      generatePositionButtons();
      displayScale();
    </script>"""

content = re.sub(old_script_regex, new_script, content, flags=re.DOTALL)

with open(filepath, 'w') as f:
    f.write(content)
