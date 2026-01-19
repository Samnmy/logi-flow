import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../core/services/customer.service';
import { Customer, CustomerStatus } from '../../core/models/customer.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6 max-w-7xl mx-auto pb-8">
      <!-- Breadcrumb & Header -->
      <div>
        <div class="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>Home</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            <span class="font-medium text-blue-600">Customers</span>
        </div>
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
             <div>
                <h1 class="text-2xl font-bold text-gray-900">All Customers</h1>
                <p class="text-gray-500 mt-1">Manage your client base and view shipment relationships</p>
             </div>
             <div>
                 <button class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Add New Customer
                 </button>
             </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6" *ngIf="stats$ | async as stats">
         <div *ngFor="let stat of stats" class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div class="flex justify-between items-start mb-2">
                <span class="text-gray-500 text-sm font-medium">{{ stat.label }}</span>
                <span class="text-xs font-medium px-2 py-0.5 rounded-full"
                      [ngClass]="stat.trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                      {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
                </span>
            </div>
            <div class="text-3xl font-bold text-gray-900">{{ stat.value }}</div>
         </div>
      </div>

      <!-- Filters & Table -->
      <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <!-- Filter Bar -->
         <div class="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div class="relative flex-1 max-w-sm">
               <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
               </div>
               <input type="text" class="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" placeholder="Filter customers...">
           </div>
           
           <div class="flex gap-3">
              <button class="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 min-w-[120px] justify-between">
                  <span>All Status</span>
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              <button class="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 min-w-[120px] justify-between">
                  <span>Region</span>
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              <button class="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  Export
              </button>
           </div>
         </div>

         <!-- Table -->
         <div class="overflow-x-auto">
            <table class="w-full text-left text-sm text-gray-600">
                <thead class="bg-gray-50 text-xs uppercase font-bold text-gray-500 border-b border-gray-200">
                    <tr>
                        <th class="px-4 py-3 w-10 text-center">
                            <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                        </th>
                        <th class="px-4 py-3 font-semibold">Client Name</th>
                        <th class="px-4 py-3 font-semibold">ID</th>
                        <th class="px-4 py-3 font-semibold">Primary Contact</th>
                        <th class="px-4 py-3 font-semibold">Active Shipments</th>
                        <th class="px-4 py-3 font-semibold">Status</th>
                        <th class="px-4 py-3 w-10"></th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    <tr *ngFor="let customer of customers$ | async" class="hover:bg-gray-50 transition-colors group">
                        <td class="px-4 py-4 text-center">
                             <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
                        </td>
                        <td class="px-4 py-4">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                                     [ngClass]="customer.avatarColor">
                                     {{ customer.initials }}
                                </div>
                                <div class="flex flex-col">
                                    <span class="font-medium text-gray-900">{{ customer.name }}</span>
                                    <span class="text-xs text-gray-500">{{ customer.industry }}</span>
                                </div>
                            </div>
                        </td>
                         <td class="px-4 py-4 text-gray-500 font-medium">
                            {{ customer.id }}
                        </td>
                         <td class="px-4 py-4">
                             <div class="flex items-center gap-2">
                                 <img [src]="customer.primaryContact.avatarUrl" class="w-6 h-6 rounded-full" alt="Avatar">
                                 <span class="text-gray-900">{{ customer.primaryContact.name }}</span>
                             </div>
                        </td>
                         <td class="px-4 py-4 font-medium text-gray-900">
                            {{ customer.activeShipments }}
                        </td>
                         <td class="px-4 py-4">
                              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                    [ngClass]="getStatusBadgeClass(customer.status)">
                                    {{ customer.status }}
                              </span>
                        </td>
                         <td class="px-4 py-4 text-right">
                            <button class="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
         </div>

         <!-- Pagination -->
         <div class="px-4 py-3 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
             <span>Showing <span class="font-medium text-gray-900">1</span> to <span class="font-medium text-gray-900">5</span> of <span class="font-bold text-gray-900">1,240</span> results</span>
             <div class="flex items-center gap-1">
                 <button class="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                 </button>
                 <button class="px-3 py-1 border border-blue-500 bg-blue-50 text-blue-600 font-medium rounded">1</button>
                 <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">2</button>
                 <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">3</button>
                 <span class="px-2">...</span>
                 <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">10</button>
                 <button class="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                 </button>
             </div>
         </div>
      </div>
    </div>
  `
})
export class CustomersComponent {
  private customerService = inject(CustomerService);
  customers$: Observable<Customer[]>;
  stats$: Observable<{ label: string, value: string, trend: number }[]>;

  constructor() {
    this.customers$ = this.customerService.getCustomers();
    this.stats$ = this.customerService.getCustomerStats();
  }

  getStatusBadgeClass(status: CustomerStatus): string {
    switch(status) {
        case 'Active': return 'bg-green-100 text-green-800';
        case 'Inactive': return 'bg-gray-100 text-gray-800';
        case 'Pending': return 'bg-orange-100 text-orange-800';
        default: return 'bg-gray-100 text-gray-800';
    }
  }
}
