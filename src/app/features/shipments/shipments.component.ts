import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentService } from '../../core/services/shipment.service';
import { Shipment, ShipmentStatus } from '../../core/models/shipment.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shipments',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6 max-w-7xl mx-auto">
      <!-- Breadcrumb & Header -->
      <div>
        <div class="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>Dashboard</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            <span class="font-medium text-gray-900">Shipments</span>
        </div>
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div>
                <h1 class="text-2xl font-bold text-gray-900">Shipments</h1>
                <p class="text-gray-500 mt-1">Manage and track your active logistics operations.</p>
             </div>
             <div class="flex items-center gap-3">
                 <button class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    Export
                 </button>
                 <button class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Create Shipment
                 </button>
             </div>
        </div>
      </div>

      <!-- Filters & Table Container -->
      <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        
        <!-- Filter Bar -->
        <div class="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50">
           <div class="flex items-center gap-3 flex-1">
                <!-- Search -->
                <div class="relative w-full md:max-w-xs">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </div>
                    <input type="text" class="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" placeholder="Filter by ID, Client...">
                </div>

                <div class="h-8 w-px bg-gray-200 mx-2 hidden md:block"></div>

                <!-- Status Filter -->
                <div class="relative hidden md:block">
                   <button class="flex items-center justify-between gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 w-40">
                      <span>All Statuses</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500"><polyline points="6 9 12 15 18 9"></polyline></svg>
                   </button>
                </div>

                 <!-- More Filters -->
                 <button class="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                    More Filters
                 </button>
           </div>
           
           <div class="flex items-center gap-2 text-sm text-gray-500">
             <span>Viewing last 30 days</span>
             <button class="p-1 hover:bg-gray-200 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
             </button>
           </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm text-gray-600">
            <thead class="bg-gray-50 text-xs uppercase font-medium text-gray-500 border-b border-gray-200">
              <tr>
                <th class="px-6 py-3 font-semibold cursor-pointer group hover:bg-gray-100 transition-colors w-32">
                   <div class="flex items-center gap-1">
                     ID
                     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 group-hover:text-gray-600"><polyline points="8 9 12 5 16 9"></polyline><polyline points="8 15 12 19 16 15"></polyline></svg>
                   </div>
                </th>
                <th class="px-6 py-3 font-semibold w-40">Status</th>
                <th class="px-6 py-3 font-semibold">Client</th>
                <th class="px-6 py-3 font-semibold">Origin</th>
                <th class="px-6 py-3 font-semibold">Destination</th>
                <th class="px-6 py-3 font-semibold cursor-pointer group hover:bg-gray-100 transition-colors">
                   <div class="flex items-center gap-1">
                     ETA
                     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><polygon points="12 5 19 12 12 19"></polygon></svg>
                   </div>
                </th>
                <th class="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr *ngFor="let shipment of shipments$ | async" class="hover:bg-blue-50/30 transition-colors">
                <td class="px-6 py-4 font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                  {{ shipment.trackingId }}
                </td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border"
                        [ngClass]="getStatusBadgeClass(shipment.status)">
                     <span *ngIf="shipment.status === 'In Transit'" class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                     <span *ngIf="shipment.status === 'Delivered'" class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                     <span *ngIf="shipment.status === 'Pending'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                     </span>
                     <span *ngIf="shipment.status === 'Incident'">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                     </span>
                     {{ shipment.status }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                         [ngClass]="shipment.clientColor || 'bg-gray-100 text-gray-600'">
                      {{ shipment.clientInitials }}
                    </div>
                    <span class="font-medium text-gray-900">{{ shipment.customer }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-gray-500">
                  {{ shipment.origin }}
                </td>
                <td class="px-6 py-4 text-gray-500">
                  {{ shipment.destination }}
                </td>
                <td class="px-6 py-4">
                   <span [ngClass]="{'text-red-600 font-semibold': shipment.eta === 'Delayed', 'text-gray-600': shipment.eta !== 'Delayed'}">
                     {{ shipment.eta }}
                   </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Footer / Pagination -->
        <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
           <span class="text-sm text-gray-500">
             Showing <span class="font-medium text-gray-900">1</span> to <span class="font-medium text-gray-900">5</span> of <span class="font-medium text-gray-900">128</span> results
           </span>
           <div class="flex gap-2">
              <button class="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>Previous</button>
              <button class="px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 bg-white hover:bg-gray-50">Next</button>
           </div>
        </div>

      </div>

      <!-- Logout (fixed at bottom of screen in original, keeping consistent with layout flow here or managed by layout) -->
    </div>
  `,
  styles: []
})
export class ShipmentsComponent {
  private shipmentService = inject(ShipmentService);
  shipments$: Observable<Shipment[]>;

  constructor() {
    this.shipments$ = this.shipmentService.getAllShipments();
  }

  getStatusBadgeClass(status: ShipmentStatus): string {
    switch(status) {
        case 'In Transit': return 'bg-blue-50 text-blue-700 border-blue-100';
        case 'Delivered': return 'bg-green-50 text-green-700 border-green-100';
        case 'Pending': return 'bg-gray-100 text-gray-700 border-gray-200';
        case 'Incident': return 'bg-red-50 text-red-700 border-red-100';
        default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  }
}
