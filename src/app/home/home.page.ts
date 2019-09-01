import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';


import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
import {Platform} from "@ionic/angular";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  @ViewChild("mapCanvas",{static:false}) mapCanvas:ElementRef;
  map: GoogleMap;

  constructor(private geolocation: Geolocation,private platform:Platform) {

  }

  ngOnInit(): void {
    this.platform.ready()
        .then(()=>{

          this.geolocation.watchPosition()
              .subscribe((data:any)=>{
                console.log(data);
                this.loadMap(data.coords.latitude,data.coords.longitude)
              })

        })
        .catch(()=>{

        });
  }


  loadMap(lat,lon) {
    if(this.map != undefined){
      this.map.remove();
    }
    let element = this.mapCanvas.nativeElement
    this.map = GoogleMaps.create(element, {
      camera: {
        target: {
          lat: lat,
          lng: lon
        },
        zoom: 18,
        tilt: 30
      }
    });

  }




}
