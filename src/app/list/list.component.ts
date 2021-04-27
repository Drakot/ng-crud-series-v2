import { Serie } from './../models/serie.model';
import { SeriesService } from './../services/series.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private seriesService: SeriesService) { }

  series: Array<Serie> = []
  searchName = ""
  ngOnInit() {
    this.loadSeries()
  }

  loadSeries() {
    this.seriesService.getSeries(this.searchName).subscribe(
      (data: Serie[]) => {
        this.series = data
        console.log(data)
      },
      error => {
        console.log("Error:", error);
      }
    );
  }

  updateSearch(event: any) {
    this.searchName = event.target.value
    this.loadSeries()
  }

}
