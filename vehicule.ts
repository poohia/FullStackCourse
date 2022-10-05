interface VehiculeFunctionnalitee {
  demarrer: () => void;
  arreter: () => void;
  readonly toString: () => void;
}

abstract class Vehicule implements VehiculeFunctionnalitee {
  protected roues: number;
  private marque: string;
  private kmh: number;
  private kmParcourru: number = 0;

  constructor(marque: string, kmh: number) {
    this.marque = marque;
    this.kmh = kmh;
  }

  demarrer() {
    this.kmParcourru += this.kmh;
    setInterval(() => (this.kmParcourru += this.kmh), 1000);
  }

  arreter() {}

  toString() {
    return `Le véhicule est de la marque ${this.marque}`;
  }

  getMarque() {
    return this.marque;
  }

  setMarque(marque: string) {
    this.marque = marque;
  }

  getKmh(): number {
    return this.kmh;
  }

  getKmParcourru(): number {
    return this.kmParcourru;
  }
}

export default Vehicule;
