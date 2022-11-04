import { Voiture, Circuit } from "./types";

const mercedes: Voiture = {
  marque: "Mercedes",
  km_parcourru: 0,
  kmh: 350,
};

const redbull: Voiture = {
  marque: "RedBull",
  km_parcourru: 0,
  kmh: 300,
};

const castelet: Circuit = {
  kilometres: 4500,
  voitures: [mercedes, redbull],
};

const depart = () => {
  const timer = setInterval(() => {
    castelet.voitures.forEach((voiture) => {
      voiture.km_parcourru += voiture.kmh;
      console.log(
        `La voiture de la marque ${voiture.marque} a parcourru ${voiture.km_parcourru}km`
      );
      if (voiture.km_parcourru >= castelet.kilometres) {
        clearInterval(timer);
        console.log(`La voiture de la marque ${voiture.marque} a gagné`);
      }
    });
  });
};

depart();
