import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-live-fleet-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-full flex flex-col">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900">Live Fleet Overview</h3>
        <span class="relative flex h-3 w-3">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </div>

      <div class="relative w-full flex-1 min-h-[300px] rounded-lg overflow-hidden border border-slate-100">
        <div #mapContainer class="absolute inset-0 w-full h-full z-0"></div>
      </div>
    </div>
  `
})
export class LiveFleetMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  private map: L.Map | undefined;

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    // Center on Medellín, Colombia
    this.map = L.map(this.mapContainer.nativeElement).setView([6.2476, -75.5658], 13);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(this.map);

    // Custom Icons
    const truckIcon = L.divIcon({
      html: `
        <div class="bg-blue-500 text-white p-1.5 rounded-full shadow-lg ring-2 ring-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
        </div>
      `,
      className: '',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    const alertIcon = L.divIcon({
      html: `
        <div class="bg-orange-500 text-white p-1.5 rounded-full shadow-lg ring-2 ring-white animate-bounce-slow">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
        </div>
      `,
      className: '',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });

    // Mock Trucks in Medellín
    L.marker([6.2518, -75.5636], { icon: truckIcon }).addTo(this.map).bindPopup('Truck #LGF-101 (Active)');
    L.marker([6.2300, -75.5900], { icon: truckIcon }).addTo(this.map).bindPopup('Truck #LGF-104 (Active)');
    L.marker([6.2650, -75.5500], { icon: alertIcon }).addTo(this.map).bindPopup('Truck #LGF-209 (Delayed)');
  }
}
