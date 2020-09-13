export interface ISearchBox {
  searchBox: string;
}

export interface IResponseData {
  Response: string;
  Search?: Array<IDataFilmOrSerie>;
  totalResults?: string;
  Error?: string;
}

export interface IDataFilmOrSerie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}
