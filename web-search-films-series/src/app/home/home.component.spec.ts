import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { HomeComponent } from './homecomponent';
import { IResponseData } from '../service/entity/OMDb';

// tslint:disable: no-string-literal
describe('HomeComponent', () => {
  const mockListSearch: IResponseData = {
    Response: 'true',
    Search: [
      {
        Poster: '',
        Title: 'Batman',
        Type: 'film',
        Year: '1995',
        imdbID: 'iii20',
      },
    ],
    totalResults: '1',
  };
  const mockResponseError: IResponseData = {
    Response: 'False',
    Error: '',
  };

  let home: HomeComponent;
  beforeEach(() => {
    home = new HomeComponent({
      // tslint:disable-next-line: object-literal-key-quotes
      getDataList: () => of(mockListSearch),
      getFilmOrSerieFavourite: () => of(mockListSearch),
    } as any);
    localStorage.setItem('idList', JSON.stringify(['aaaa', 'aaaa1']));
  });

  it('ngOnInit', () => {
    home.ngOnInit();
    expect(home.isError).toBeFalse();
    expect(home.showData).toBeFalse();
    expect(home.form.value.searchBox).toEqual('');
  });

  it('search with results', () => {
    const formBuilder: FormBuilder = new FormBuilder();
    home.form = formBuilder.group({
      searchBox: 'batman',
    });

    home.search();
    expect(home.dataFromOMDb[0].Title).toBe('Batman');
  });
  it('search without results', () => {
    const formBuilder: FormBuilder = new FormBuilder();
    home.form = formBuilder.group({
      searchBox: 'batman',
    });
    home['omdbapiServices'].getDataList = () => of(mockResponseError) as any;
    home.search();
    expect(home.showData).toBeFalsy();
  });

  it('Add to favourite the first time', () => {
    home.addFavourites('aaaa');
    expect(JSON.parse(localStorage.getItem('idList')).length).toBe(2);
  });

  it('Addto favourite more times', () => {
    home.addFavourites('aaaa1');
    expect(JSON.parse(localStorage.getItem('idList')).length).toBe(2);
  });
});
