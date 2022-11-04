const allTypes:
  | number
  | string
  | Array<any>
  | null
  | undefined
  | boolean
  | Number
  | String = "";

Number(2156470).toString();

const myNum: number = 21511;

myNum.toString();

type NumbersFilters = 0 | 1 | 2 | 3;

const myNumbers: NumbersFilters = 3;
const myStrings: "a" | "b" | "c" = "b";

export type Voiture = {
  marque: string;
  kmh: number;
  km_parcourru: number;
  roues?: number;
};

export type Circuit = {
  kilometres: number;
  voitures: Voiture[];
};
