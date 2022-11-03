import Voiture from "./voiture";

class Circuit {
  private kilometres: number;
  private voitures: Voiture[];

  constructor(kilometres: number) {
    this.kilometres = kilometres;
  }

  depart() {
    this.voitures.forEach((voiture) => {
      voiture.demarrer();
    });
    const timer = setInterval(() => {
      this.voitures.forEach((voiture) => {
        console.log(voiture.toString());
        const kmParcourru = voiture.getKmParcourru();
        if (kmParcourru >= this.kilometres) {
          clearInterval(timer);
          this.fin(voiture);
        }
      });
    }, 1000);
  }

  private fin(voiture: Voiture) {
    console.log("\n");
    console.log(`La voiture ${voiture.getMarque()} a gagné`);
    this.voitures.forEach((voiture) => voiture.arreter());
  }

  getKilometres(): number {
    return this.kilometres;
  }

  setVoitures(voitures: Voiture[]) {
    this.voitures = voitures;
  }

  getVoitures(): Voiture[] {
    return this.voitures;
  }
}

export default Circuit;
