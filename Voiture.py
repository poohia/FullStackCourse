from Vehicule import *

class Voiture(Vehicule):
    def __init__(self, marque, km):
        super().__init__(marque, km)
        self.roues = 4
# declaring __str__() method
    def __str__(self) -> str:
        return "La voiture est de la marque "+self.marque+"a "+str(self.roues)+" roues et a parcourru "+str(self.km)+" km"

