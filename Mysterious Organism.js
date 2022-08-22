// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

// pAequor instances factory function
const pAequorFactory = (uniqueNum, dnaStrand) => {
  return {
    specimenNum: uniqueNum,
    dna: dnaStrand,
    mutate() {
      // select a base in dna property randomly
      let randomIndex = Math.floor(Math.random() * 15);
      let selectedBase = this.dna[randomIndex];
      console.log('Random index: ' + randomIndex);
      console.log('Selected Base: ' + selectedBase);
      console.log(this.dna);
      // change that base to another base that's different from the original base
      let newBase;
      do {
        newBase = returnRandBase();
      } while (newBase === selectedBase);
      console.log('New Base: ' + newBase);
        // replace the original base with the new base
      this.dna[randomIndex] = newBase;
      console.log(this.dna);
      // return dna
      return this.dna;
    },
    compareDNA(pAequorObject) {
      // compare the current pAequor's .dna with the passed in pAequor's .dna
      // compute how many bases are identical and in the same locations
      let identicalBaseCount = 0;
      for (let i = 0; i < 15; i++) {
        if (this.dna[i] === pAequorObject.dna[i]) {
          identicalBaseCount++;
        }
      }
      // .compareDNA() does not return anything, but prints a message that states the percentage of DNA the two objects have in common
      // use .specimenNum to identify which pAequor objects are being compared
      console.log(`specimen #${this.specimenNum} and specimen #${pAequorObject.specimenNum} have ${identicalBaseCount / 16 * 100}% DNA in common`);
      
    },
    willLikelySurvive() {
      // return true if the object's .dna array contains at least 60% 'C' or 'G' bases
      // Otherwise, return false
      let eligibleBasesCount = 0;
      for (let i = 0; i < 15; i++) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          eligibleBasesCount++;
        }
      }
      // console.log((eligibleBasesCount / 15 * 100).toFixed(2) + '%');
      if ((eligibleBasesCount / 15 * 100) >= 60) {
        return true;
      }
      else {
        return false;
      }
    },
    complementStrand() {
      // return a complementary dna strand
      // 'A' binds with 'T'
      // 'C' binds with 'G'
      console.log('Original DNA strand:      ' + this.dna);
      // declare an array to hold the complementary dna strand
      let complementaryDNA = [];
        for (let i = 0; i < 15; i++) {
          switch (this.dna[i]) {
            case 'A':
              complementaryDNA[i] = 'T';
              break;
            case 'T':
              complementaryDNA[i] = 'A';
              break;
            case 'C':
              complementaryDNA[i] = 'G';
              break;
            case 'G':
              complementaryDNA[i] = 'C';
              break;
            default:
              console.log("The switch statement in complementaryDNA() has received an input other than 'A', 'C', 'T', or 'G'.");
              break;
          }
        }
        console.log('Complimentary DNA strand: ' + complementaryDNA);
    }
  }
}

// const organism1 = pAequorFactory(1, mockUpStrand());
// const organism2 = pAequorFactory(2, mockUpStrand());

// console.log(organism1.dna);
// console.log(organism2.dna);

// organism1.mutate();
// organism1.compareDNA(organism2);
// console.log(organism1.willLikelySurvive());


// creating 30 instances of pAequor that will likely survive in their natural environment ans storing them in an array
let pAequorStorage = [];
let id = 1;
while (pAequorStorage.length < 30) {
  let pAequorSample = pAequorFactory(id, mockUpStrand());
  if (pAequorSample.willLikelySurvive()) {
    pAequorStorage.push(pAequorSample);
    id++;
    // console.log('accepted');
  }
  else {
    // console.log('rejected');
    id++;
  }
}

// console.log(pAequorStorage);

// organism1.complementStrand();

// Using .compareDNA() to find the two most related instances of pAequor
let firstInstance = pAequorStorage[0];
console.log(firstInstance);

for (let i = 1; i < 15; i++) {
  firstInstance.compareDNA(pAequorStorage[i]);
}
