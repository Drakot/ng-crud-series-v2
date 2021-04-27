import { Serie } from './../models/serie.model';
import { SeriesService } from './../services/series.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  isNew = true
  id: string | null = ""
  form: FormGroup

  constructor(private seriesService: SeriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location) {
    this.router.events.subscribe((currentUrl) => {
      if (currentUrl instanceof NavigationEnd) {

        this.id = activatedRoute.snapshot.paramMap.get("id")
        if (this.id == "new") {
          this.isNew = true
        } else {
          this.isNew = false
        }
      }
    });

    this.form = this.formBuilder.group({
      name: ["", Validators.required],
      type: ["", Validators.required]
    })
  }

  serie: Serie = new Serie()

  ngOnInit() {
    if (!this.isNew) {
      this.getSerie()
    } else {
      console.log("Añadir nueva serie")
    }
  }
  getSerie() {
    this.seriesService.getSerie(this.id).subscribe(
      data => {
        this.serie = data

        this.form.patchValue({
          name: this.serie.name,
          type: this.serie.type,
        })
      },
      error => {
        console.log("Error:", error);
      }
    );
  }

  save() {
    if (this.isNew) {
      this.saveSerie()
    } else {
      this.updateSerie()
    }
  }

  saveSerie() {
    const serie: Serie = new Serie()
    serie.name = this.form.controls.name.value
    serie.type = this.form.controls.type.value

    this.seriesService.saveSerie(serie).subscribe(
      data => {
        //TODO redireccionar hacia atras
        this.location.back()
        console.log("Serie creada satisfactoriamente")
      },
      error => {
        console.log(error.status)
        console.log("Error:", error);
      }
    );
  }

  //Actualizar
  updateSerie() {
    const serie: Serie = new Serie()
    serie._id = this.id || ""
    serie.name = this.form.controls.name.value
    serie.type = this.form.controls.type.value
    //No da tiempo a añadir un selector de Platform
    serie.platform = "60700437978d51e36e4614f2"

    this.seriesService.updateSerie(serie).subscribe(data => {
      console.log("Buen trabajo")
      //TODO redireccionar hacia atras
      this.location.back()
    },
      error => {
        console.log("Error:", error);
      }
    );
  }

  //Borrar
  deleteSerie() {
    this.seriesService.deleteSerie(this.id || "").subscribe(
      data => {
        this.serie = data
        console.log(this.serie)
        this.location.back()
      },
      error => {
        console.log("Error:", error);
      }
    );
  }

}
