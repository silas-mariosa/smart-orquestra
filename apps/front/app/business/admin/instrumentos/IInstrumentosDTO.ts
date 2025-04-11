export type CategoriesType = {
  id: number;
  name: string;
};

export interface InstrumentosType {
  id: number;
  nameInstrument: string;
  typeInstrument: string;
  categories: string;
  description: string;
}
