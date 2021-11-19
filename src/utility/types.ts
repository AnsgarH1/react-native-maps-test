type offer = {
  coordLat: number;
  coordLong: number;
  locationName: string;
  desc: string;
};

type adress = {
  street: string;
  streetNr: number;
  postalcode: number;
  city: string;
  valLat: number;
  valLong: number;
};

type apiResult = {
  count: number;
  next: URL;
  previus: string;
  results: Array<adress>;
};
export { offer, apiResult, adress };
