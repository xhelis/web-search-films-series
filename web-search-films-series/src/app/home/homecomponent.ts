import { Component, OnInit } from '@angular/core';
import {
  IDataFilmOrSerie,
  IResponseData,
  ISearchBox,
} from '../service/entity/OMDb';
import { FormGroup, FormControl } from '@angular/forms';
import { OmdbapiServices } from '../service/omdbapi.service';
import { uniq } from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  isError: boolean;
  showData: boolean;
  private idList: Array<string>;
  dataFromOMDb: Array<IDataFilmOrSerie>;
  constructor(private omdbapiServices: OmdbapiServices) {}

  ngOnInit(): void {
    this.showData = false;
    this.isError = false;
    this.cleanSearchBox();
  }

  search() {
    const searchBox: ISearchBox = this.form.value;
    this.omdbapiServices
      .getDataList(searchBox.searchBox)
      .subscribe((response: IResponseData) => {
        if (response.Response === 'False') {
          this.isError = true;
          this.showData = false;
        } else {
          this.dataFromOMDb = response.Search;
          this.isError = false;
          this.showData = true;
        }
      });
  }

  addFavourites(id: string) {
    this.idList = JSON.parse(localStorage.getItem('idList'));
    if (!this.idList || this.idList.length === 0) {
      this.idList = [];
      this.idList.push(id);
      this.idList = uniq(this.idList);
      localStorage.setItem('idList', JSON.stringify(this.idList));
    } else {
      this.idList.push(id);
      this.idList = uniq(this.idList);
      localStorage.setItem('idList', JSON.stringify(this.idList));
    }
  }

  private cleanSearchBox() {
    this.form = new FormGroup({
      searchBox: new FormControl(''),
    });
  }
}
