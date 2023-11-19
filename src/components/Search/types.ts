export type PeopleRequestType = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

export type PeoplesRequestType = {
  count: number;
  next: string;
  previous: null;
  results: PeopleRequestType[];
};

export type SearchPropsType = {
  // searchFormHandler: (event: React.FormEvent<HTMLFormElement>) => void;
  // fetchError: string;
  // setFetchError: (value: string) => void;
};
