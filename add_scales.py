filepath = 'assets/js/guitar-scales.js'
with open(filepath, 'r') as f:
    content = f.read()

# We'll just replace the whole scales array
old_scales = """  scales: [
    {
      id: "minor-pentatonic",
      label: "Moll-Pentatonik",
      intervals: [0, 3, 5, 7, 10] // Root, m3, P4, P5, m7
    },
    {
      id: "major-pentatonic",
      label: "Dur-Pentatonik",
      intervals: [0, 2, 4, 7, 9] // Root, M2, M3, P5, M6
    },
    {
      id: "blues",
      label: "Blues Skala",
      intervals: [0, 3, 5, 6, 7, 10] // Root, m3, P4, d5, P5, m7
    },
    {
      id: "minor-natural",
      label: "Natürliches Moll (Aeolian)",
      intervals: [0, 2, 3, 5, 7, 8, 10] // Root, M2, m3, P4, P5, m6, m7
    },
    {
      id: "major-natural",
      label: "Dur-Tonleiter (Ionian)",
      intervals: [0, 2, 4, 5, 7, 9, 11] // Root, M2, M3, P4, P5, M6, M7
    }
  ]"""

new_scales = """  scales: [
    { id: "minor-pentatonic", label: "Moll-Pentatonik", intervals: [0, 3, 5, 7, 10] },
    { id: "major-pentatonic", label: "Dur-Pentatonik", intervals: [0, 2, 4, 7, 9] },
    { id: "blues", label: "Blues Skala", intervals: [0, 3, 5, 6, 7, 10] },
    { id: "minor-natural", label: "Natürliches Moll", intervals: [0, 2, 3, 5, 7, 8, 10] },
    { id: "major-natural", label: "Dur-Tonleiter", intervals: [0, 2, 4, 5, 7, 9, 11] },
    { id: "harmonic-minor", label: "Harmonisches Moll", intervals: [0, 2, 3, 5, 7, 8, 11] },
    { id: "melodic-minor", label: "Melodisches Moll", intervals: [0, 2, 3, 5, 7, 9, 11] },
    { id: "dorian", label: "Dorisch", intervals: [0, 2, 3, 5, 7, 9, 10] },
    { id: "phrygian", label: "Phrygisch", intervals: [0, 1, 3, 5, 7, 8, 10] },
    { id: "lydian", label: "Lydisch", intervals: [0, 2, 4, 6, 7, 9, 11] },
    { id: "mixolydian", label: "Mixolydisch", intervals: [0, 2, 4, 5, 7, 9, 10] },
    { id: "locrian", label: "Lokrisch", intervals: [0, 1, 3, 5, 6, 8, 10] },
    { id: "phrygian-dominant", label: "Phrygisch Dominant", intervals: [0, 1, 4, 5, 7, 8, 10] },
    { id: "hungarian-minor", label: "Zigeuner-Moll", intervals: [0, 2, 3, 6, 7, 8, 11] },
    { id: "whole-tone", label: "Ganzton-Skala", intervals: [0, 2, 4, 6, 8, 10] },
    { id: "diminished", label: "Vermindert (HTGT)", intervals: [0, 1, 3, 4, 6, 7, 9, 10] }
  ]"""

content = content.replace(old_scales, new_scales)

with open(filepath, 'w') as f:
    f.write(content)
