import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { FavouritesComponent } from './favourites.component';
import { IResponseData } from '../service/entity/OMDb';

describe('FavouriteComponent', () => {
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

  let favouritesComponent: FavouritesComponent;
  beforeEach(() => {
    favouritesComponent = new FavouritesComponent({
      // tslint:disable-next-line: object-literal-key-quotes
      getDataList: () => of(mockListSearch),
      getFilmOrSerieFavourite: () => of(mockListSearch),
    } as any);
    localStorage.setItem('idList', JSON.stringify(['aaaa', 'aaaa1']));
  });

  it('ngOnInit', () => {
    favouritesComponent.ngOnInit();
    expect(favouritesComponent.showNoFavourite).toBeFalse();
    expect(favouritesComponent.showData).toBeTruthy();
    // tslint:disable:no-string-literal
    expect(favouritesComponent['idList'][0]).toBe('aaaa');
  });
  it('deleteFavourite', () => {
    favouritesComponent.deleteFavourite('aaaa');
    expect(favouritesComponent['idList']).toBe(undefined);
  });
  it('ngOnInit: no favourites', () => {
    localStorage.removeItem('idList');
    favouritesComponent.ngOnInit();
    expect(favouritesComponent.showNoFavourite).toBeTruthy();
    expect(favouritesComponent.showData).toBeFalsy();
  });
});
