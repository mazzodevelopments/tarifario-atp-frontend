export interface Unit {
  id: number;
  name: string;
}

export interface WeightUnit {
  id: number;
  name: string;
  kgValue: number;
}

export interface CreateWeightUnit {
  name: string;
  kgValue: number;
}

export interface MeasurementUnit {
  id: number;
  name: string;
}
