import Vehicule from "./vehicule";

class Voiture extends Vehicule {
  protected _roues: number = 4;

  toString() {
    return `La voiture de la marque ${this.getMarque()} a parcourru ${this.getKmParcourru()}km`;
  }
}

export default Voiture;
