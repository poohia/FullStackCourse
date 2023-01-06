from Voiture import *

marque = input("Marque: ")

voiture = Voiture(marque, 0)
voiture.parcourrir(1000)
print(voiture.__str__())