import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shipment-volume-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-full">
      <div class="flex justify-between items-center mb-6">
        <div>
           <h3 class="text-lg font-semibold text-gray-900">Shipment Volume by Region</h3>
           <p class="text-sm text-gray-500">Last 30 Days Performance</p>
        </div>
        <button class="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
        </button>
      </div>

      <div class="flex items-end justify-evenly h-48 px-2 gap-4">
        <div *ngFor="let item of data" class="flex flex-col items-center w-full group cursor-pointer h-full">
           <!-- Bar Wrapper -->
           <div class="relative w-full flex flex-col justify-end items-center h-full transition-transform duration-300 group-hover:-translate-y-1">
               <!-- Top Stack (Secondary Value - Light Blue) -->
               <div class="w-20 bg-blue-100 rounded-t-lg transition-all duration-500 ease-out"
                    [style.height.%]="(item.value / maxValue) * 30">
               </div>
               <!-- Bottom Stack (Main Value - Blue) -->
               <div class="w-20 bg-blue-600 transition-all duration-500 ease-out shadow-sm"
                    [style.height.%]="(item.value / maxValue) * 70">
               </div>
           </div>
           <span class="mt-3 text-sm font-medium text-gray-500 group-hover:text-blue-600 transition-colors">{{ item.region }}</span>
        </div>
      </div>
    </div>
  `
})
export class ShipmentVolumeChartComponent {
  @Input() data: { region: string, value: number }[] = [];

  get maxValue(): number {
    return Math.max(...this.data.map(d => d.value), 100);
  }
}
