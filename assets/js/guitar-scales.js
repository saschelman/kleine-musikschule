const guitarScalesDB = {
  keys: ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"],
  scales: [
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
  ]
};
