import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Shipment, ShipmentStatus } from '../../../core/models/shipment.model';

@Component({
  selector: 'app-recent-shipments-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div class="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 class="text-lg font-semibold text-gray-900">Recent Shipments</h3>
        <div class="flex gap-2">
            <button class="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors">
                Filter
            </button>
            <button class="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors">
                Export
            </button>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-600">
          <thead class="bg-gray-50 text-xs uppercase font-semibold text-gray-500">
            <tr>
              <th class="px-6 py-4">Tracking ID</th>
              <th class="px-6 py-4">Customer</th>
              <th class="px-6 py-4">Route</th>
              <th class="px-6 py-4">ETA</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr *ngFor="let shipment of shipments" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 font-medium text-blue-600 hover:text-blue-700 cursor-pointer">
                {{ shipment.trackingId }}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                    {{ shipment.customer.substring(0,2).toUpperCase() }}
                  </div>
                  <span class="font-medium text-gray-900">{{ shipment.customer }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                    <span>{{ shipment.origin }}</span>
                    <span class="text-gray-400">→</span>
                    <span>{{ shipment.destination }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                {{ shipment.eta }}
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      [ngClass]="getStatusClasses(shipment.status)">
                   <span class="w-1.5 h-1.5 rounded-full mr-1.5" [ngClass]="getStatusDotColor(shipment.status)"></span>
                   {{ shipment.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <button class="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class RecentShipmentsTableComponent {
  @Input() shipments: Shipment[] = [];

  getStatusClasses(status: ShipmentStatus): string {
    switch (status) {
      case 'In Transit': return 'bg-blue-50 text-blue-700';
      case 'Delivered': return 'bg-green-50 text-green-700';
      case 'Delayed': return 'bg-orange-50 text-orange-700';
      case 'Exception': return 'bg-red-50 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }

  getStatusDotColor(status: ShipmentStatus): string {
    switch (status) {
        case 'In Transit': return 'bg-blue-500';
        case 'Delivered': return 'bg-green-500';
        case 'Delayed': return 'bg-orange-500';
        case 'Exception': return 'bg-red-500';
        default: return 'bg-gray-500';
    }
  }
}
