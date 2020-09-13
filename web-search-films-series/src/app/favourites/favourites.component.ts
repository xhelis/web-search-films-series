import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IDataFilmOrSerie } from '../service/entity/OMDb';
import { OmdbapiServices } from '../service/omdbapi.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {
  showNoFavourite: boolean;
  showData: boolean;
  private idList: Array<string>;
  dataFromOMDb: Array<IDataFilmOrSerie> = [];
  subscription: Subscription = new Subscription();
  constructor(private omdbapiServices: OmdbapiServices) {}

  ngOnInit(): void {
    this.idList = JSON.parse(localStorage.getItem('idList'));

    if (this.idList === null || this.idList.length === 0) {
      this.showNoFavourite = true;
      this.showData = false;
    } else {
      this.showNoFavourite = false;
      this.showData = true;
      this.getListFavourites();
    }
  }
  deleteFavourite(id: string) {
    if (this.idList) {
      this.idList = this.idList.filter((element) => element !== id);
      localStorage.setItem('idList', JSON.stringify(this.idList));
      window.location.reload();
    }
  }

  private getListFavourites() {
    this.idList.forEach((element) => {
      this.omdbapiServices
        .getFilmOrSerieFavourite(element)
        .subscribe((response) => {
          this.dataFromOMDb.push(response);
        });
    });
  }
}
