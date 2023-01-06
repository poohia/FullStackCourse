class Vehicule:
    def __init__(self, marque, km):
        self.marque = marque
        self.km = km
    def parcourrir(self, km):
        self.km += km
# declaring __str__() method
    def __str__(self) -> str:
        return "Le véhicule est de la marque "+self.marque+" a parcourru "+str(self.km)+" km"
