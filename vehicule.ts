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
  private timer: number;

  constructor(marque: string, kmh: number) {
    this.marque = marque;
    this.kmh = kmh;
  }

  demarrer() {
    this.kmParcourru += this.kmh;
    this.timer = setInterval(() => (this.kmParcourru += this.kmh), 1000);
  }

  arreter() {
    clearInterval(this.timer);
  }

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
