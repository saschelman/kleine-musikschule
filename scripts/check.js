const fs = require('fs');
const code = fs.readFileSync('assets/js/guitar-chords.js', 'utf8');
eval(code);

let found = false;
for(const key of Object.keys(guitarChordsDB.chords)) {
  for(const chord of guitarChordsDB.chords[key]) {
    for(const pos of chord.positions) {
      if(pos.frets[2] === 0 && pos.frets[3] === 1 && pos.frets[4] === 2 && pos.frets[5] === 1) {
        console.log('MATCH:', key, chord.suffix);
        found = true;
      }
    }
  }
}
if(!found) console.log('no match');
