import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentService } from '../../core/services/shipment.service';
import { ShipmentDetail } from '../../core/models/shipment.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6 max-w-7xl mx-auto pb-8" *ngIf="shipment$ | async as shipment">
      
      <!-- Top Bar / Filter Placeholder -->
      <div class="bg-gray-50 rounded-lg p-2 flex items-center gap-4">
         <div class="relative flex-1 max-w-md">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
             <input type="text" class="block w-full pl-9 pr-3 py-2 border-none bg-transparent rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:ring-0" placeholder="#LGF-8923" disabled value="#LGF-8923">
         </div>
         <div class="ml-auto flex items-center gap-4">
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">Update Status</button>
         </div>
      </div>

      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
           <div class="flex items-center gap-4 mb-2">
              <h1 class="text-3xl font-bold text-gray-900">Shipment {{ shipment.trackingId }}</h1>
              <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">{{ shipment.status }}</span>
           </div>
           <div class="flex items-center gap-4 text-gray-500 text-sm">
              <div class="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                  <span>ETA: {{ shipment.eta }}</span>
              </div>
              <span class="text-gray-300">•</span>
              <div class="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                  <span>{{ shipment.type }}</span>
              </div>
           </div>
        </div>
        <div class="flex gap-3">
             <button class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download Report
             </button>
             <button class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                Share Tracking
             </button>
        </div>
      </div>

      <!-- Info Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Origin -->
        <div class="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 text-gray-500 text-sm mb-3">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"></path><path d="M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
                 <span>Origin</span>
            </div>
            <div class="font-bold text-lg text-gray-900">{{ shipment.origin }}</div>
            <div class="text-sm text-gray-400 mt-1">{{ shipment.warehouseCode }}</div>
        </div>

        <!-- Destination -->
        <div class="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 text-gray-500 text-sm mb-3">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"></path><path d="M22 2l-7 20-4-9-9-4 20-7z" class="transform rotate-90 origin-center"></path></svg>
                 <span>Destination</span>
            </div>
            <div class="font-bold text-lg text-gray-900">{{ shipment.destination }}</div>
            <div class="text-sm text-gray-400 mt-1">{{ shipment.distributionCenter }}</div>
        </div>

         <!-- Carrier -->
        <div class="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 text-gray-500 text-sm mb-3">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                 <span>Carrier</span>
            </div>
            <div class="font-bold text-lg text-gray-900">{{ shipment.carrier }}</div>
            <div class="text-sm text-gray-400 mt-1">{{ shipment.serviceType }}</div>
        </div>

        <!-- Weight -->
        <div class="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <div class="flex items-center gap-2 text-gray-500 text-sm mb-3">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.91 8.84 5.91 2.23a1 1 0 0 0-1.38.44l-2.18 4.92a1 1 0 0 0 .41 1.33l15 6.61a1 1 0 0 0 1.38-.44l2.18-4.92a1 1 0 0 0-.41-1.33z"></path><path d="M12 5v6"></path></svg>
                 <span>Weight</span>
            </div>
            <div class="font-bold text-lg text-gray-900">{{ shipment.weight }}</div>
            <div class="text-sm text-gray-400 mt-1">{{ shipment.pallets }}</div>
        </div>
      </div>

      <!-- Main Content Split (Timeline & Map) -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
         
         <!-- Timeline -->
         <div class="bg-white p-6 rounded-xl border border-gray-200 h-full overflow-y-auto">
            <h3 class="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600"><polyline points="12 6 12 12 16 14"></polyline><circle cx="12" cy="12" r="10"></circle></svg>
                Shipment History
            </h3>
            
            <div class="relative pl-4 border-l-2 border-gray-100 space-y-8">
                <div *ngFor="let event of shipment.timeline; let last = last" class="relative pl-6">
                    <!-- Dot -->
                    <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center"
                         [ngClass]="event.isCurrent ? 'border-blue-500 ring-4 ring-blue-100' : (event.isCompleted ? 'border-blue-500 bg-blue-500' : 'border-gray-300')">
                        <div *ngIf="event.isCurrent" class="w-2 h-2 rounded-full bg-blue-500"></div>
                        <svg *ngIf="event.isCompleted && !event.isCurrent" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>

                    <!-- Content -->
                    <div class="flex flex-col">
                        <span class="font-semibold text-gray-900" [ngClass]="{'text-blue-600': event.isCurrent}">{{ event.title }}</span>
                        <span class="text-sm text-gray-500">{{ event.location }}</span>
                        <span class="text-xs text-gray-400 mt-1">{{ event.timestamp }}</span>
                    </div>
                </div>
            </div>
         </div>

         <!-- Map -->
         <div class="lg:col-span-2 bg-blue-50 rounded-xl border border-gray-200 overflow-hidden relative">
            <div class="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-lg p-3 shadow-sm z-10">
                <div class="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Current Location</div>
                <div class="flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span class="font-bold text-gray-900">Lyon Area, FR</span>
                </div>
            </div>

            <!-- Fake Map SVG -->
             <svg class="w-full h-full object-cover" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#bae6fd" />
                <path d="M0,400 Q400,300 800,450" fill="none" stroke="white" stroke-width="2" opacity="0.6"/>
                <path d="M100,0 L300,500" fill="none" stroke="white" stroke-width="2" opacity="0.6"/>
                <!-- Path line -->
                <path d="M700,400 L500,300" fill="none" stroke="#3b82f6" stroke-width="3" stroke-dasharray="8 4" opacity="0.6"/>
                
                <!-- Current Position dot on map -->
                <circle cx="65%" cy="65%" r="8" fill="#3b82f6" fill-opacity="0.3" class="animate-ping" />
                <circle cx="65%" cy="65%" r="4" fill="#2563eb" stroke="white" stroke-width="2" />
            </svg>

            <div class="absolute bottom-4 right-4 flex flex-col gap-2">
                <button class="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">+</button>
                <button class="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">-</button>
            </div>
         </div>

      </div>

      <!-- Bottom Details -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
         <!-- Cargo -->
         <div class="bg-white p-6 rounded-xl border border-gray-200">
             <h3 class="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                Cargo Details
            </h3>
            <div class="space-y-4">
                <div class="flex justify-between border-b border-gray-100 pb-3">
                    <span class="text-gray-500 text-sm">Package Type</span>
                    <span class="font-medium text-gray-900 text-sm">{{ shipment.cargoDetails.packageType }}</span>
                </div>
                 <div class="flex justify-between border-b border-gray-100 pb-3">
                    <span class="text-gray-500 text-sm">Dimensions</span>
                    <span class="font-medium text-gray-900 text-sm">{{ shipment.cargoDetails.dimensions }}</span>
                </div>
                 <div class="flex justify-between border-b border-gray-100 pb-3">
                    <span class="text-gray-500 text-sm">Volumetric Weight</span>
                    <span class="font-medium text-gray-900 text-sm">{{ shipment.cargoDetails.volumetricWeight }}</span>
                </div>
                 <div class="flex justify-between pt-1">
                    <span class="text-gray-500 text-sm">Stackable</span>
                    <span class="font-medium text-green-600 text-sm flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Yes
                    </span>
                </div>
            </div>
         </div>

         <!-- Docs -->
         <div class="bg-white p-6 rounded-xl border border-gray-200">
             <h3 class="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                Documents
            </h3>
            <div class="space-y-3">
                <div *ngFor="let doc of shipment.documents" class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group cursor-pointer border border-gray-100">
                    <div class="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center mr-4">
                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    </div>
                    <div class="flex-1">
                        <div class="font-medium text-gray-900 text-sm">{{ doc.name }}</div>
                        <div class="text-xs text-gray-500">{{ doc.type }} • {{ doc.size }}</div>
                    </div>
                    <button class="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    </button>
                </div>
            </div>
         </div>
      </div>
    </div>
  `,
  styles: []
})
export class TrackingComponent {
  private shipmentService = inject(ShipmentService);
  shipment$: Observable<ShipmentDetail>;

  constructor() {
    this.shipment$ = this.shipmentService.getShipmentDetails('LGF-8923');
  }
}
