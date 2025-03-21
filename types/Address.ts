interface Country {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
  zipCode: string;
  country: Country;
}

export interface Address {
  id: number;
  street: string;
  number: string;
  city: City;
}
