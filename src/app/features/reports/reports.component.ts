import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService, ReportStats, WeeklyVolume, RouteVolume, CriticalAlert } from '../../core/services/report.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6 max-w-7xl mx-auto pb-8">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <h1 class="text-2xl font-bold text-gray-900">Operational Reports</h1>
         
         <div class="flex items-center gap-3">
             <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <input type="text" class="block w-64 pl-9 pr-3 py-2 border-none bg-gray-50 rounded-lg text-sm text-gray-900 placeholder-gray-500 hover:bg-gray-100 transition-colors focus:ring-1 focus:ring-blue-500" placeholder="Search reports...">
             </div>
             
             <button class="flex items-center gap-2 px-3 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                Last 30 Days
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
             </button>

             <button class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Export
             </button>
         </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" *ngIf="stats$ | async as stats">
          <!-- Volume -->
          <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <div class="flex justify-between items-start mb-2">
                <span class="text-blue-600 font-medium text-sm">Total Volume</span>
                <span class="p-1 rounded bg-green-100 text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </span>
             </div>
             <div class="text-3xl font-bold text-gray-900 mb-1">{{ stats.totalVolume | number }}</div>
             <div class="text-xs text-gray-500">
                <span class="text-green-600 font-medium">+{{ stats.totalVolumeTrend }}%</span> vs last month
             </div>
          </div>

          <!-- In Transit -->
          <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <div class="flex justify-between items-start mb-2">
                <span class="text-blue-600 font-medium text-sm">In Transit</span>
                <span class="p-1 rounded bg-blue-100 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                </span>
             </div>
             <div class="text-3xl font-bold text-gray-900 mb-1">{{ stats.inTransit }}</div>
             <div class="text-xs text-gray-500">Active shipments</div>
          </div>

          <!-- On-Time -->
          <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <div class="flex justify-between items-start mb-2">
                <span class="text-blue-600 font-medium text-sm">On-Time Rate</span>
                <span class="p-1 rounded bg-purple-100 text-purple-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </span>
             </div>
             <div class="text-3xl font-bold text-gray-900 mb-1">{{ stats.onTimeRate }}%</div>
             <div class="text-xs text-gray-500">Within delivery window</div>
          </div>

           <!-- Exceptions -->
          <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <div class="flex justify-between items-start mb-2">
                <span class="text-blue-600 font-medium text-sm">Exceptions</span>
                <span class="p-1 rounded bg-red-100 text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                </span>
             </div>
             <div class="text-3xl font-bold text-gray-900 mb-1">{{ stats.exceptions }}</div>
             <div class="text-xs text-gray-500 text-red-600 font-medium">Requires Attention</div>
          </div>
      </div>

       <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <!-- Stacked Bar: Weekly Volume -->
          <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <div class="flex justify-between items-start mb-6">
                <div>
                    <h3 class="text-lg font-bold text-gray-900">Weekly Shipment Volume</h3>
                    <div class="text-sm text-gray-500">Domestic vs International</div>
                </div>
                <button class="text-gray-400 hover:text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button>
             </div>

             <div class="h-64 flex items-end justify-between gap-4 px-4">
                 <div *ngFor="let week of weeklyVolume$ | async" class="flex flex-col items-center w-full group">
                     <!-- Bar -->
                     <div class="w-16 flex flex-col-reverse h-48 relative">
                          <!-- International (Top visually, but stacked) actually standard stacking is bottom-up. 
                               In CSS flex-col-reverse: first element is at bottom. 
                               Let's use static heights based on max approx 300 for scale.
                           -->
                          <div class="w-full bg-blue-600 rounded-t-sm transition-all duration-300 relative group-hover:opacity-90" [style.height.%]="(week.domestic / 300) * 100"></div>
                          <div class="w-full bg-blue-200 transition-all duration-300 relative group-hover:opacity-90" [style.height.%]="(week.international / 300) * 100"></div>
                     </div>
                     <span class="mt-3 text-xs text-gray-500 font-medium">{{ week.week }}</span>
                 </div>
             </div>
             
             <div class="flex justify-center gap-6 mt-6">
                 <div class="flex items-center gap-2 text-xs text-gray-500">
                     <span class="w-3 h-3 rounded-full bg-blue-600"></span> Domestic
                 </div>
                 <div class="flex items-center gap-2 text-xs text-gray-500">
                     <span class="w-3 h-3 rounded-full bg-blue-200"></span> International
                 </div>
             </div>
          </div>

          <!-- Line Chart: Delivery Performance -->
          <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
             <div class="flex justify-between items-start mb-6">
                <div>
                    <h3 class="text-lg font-bold text-gray-900">Delivery Performance</h3>
                    <div class="text-sm text-gray-500">Average Transit Time (Days)</div>
                </div>
             </div>

             <div class="h-64 w-full relative">
                 <svg class="w-full h-full overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
                     <!-- Gradient Defs -->
                     <defs>
                         <linearGradient id="lineGap" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.1"/>
                             <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
                         </linearGradient>
                     </defs>
                     
                     <!-- Smooth Path manually approximated to match image wave -->
                     <!-- M start (0,150) -> curve up -> dip -> curve up -> end -->
                     <path d="M0,150 C50,50 100,50 150,100 S250,200 300,150 S400,0 500,50" 
                           fill="none" stroke="#3b82f6" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"
                           class="drop-shadow-sm"/>
                 </svg>

                 <!-- X Axis Labels (Absolute positioning for ease) -->
                 <div class="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-400 px-2">
                     <span>May 01</span>
                     <span>May 08</span>
                     <span>May 15</span>
                     <span>May 22</span>
                     <span>May 30</span>
                 </div>
             </div>
          </div>
      </div>

      <!-- Bottom Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <!-- Top Routes -->
          <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full">
              <h3 class="text-lg font-bold text-gray-900 mb-6">Top Routes by Volume</h3>
              <div class="space-y-6">
                  <div *ngFor="let route of topRoutes$ | async" class="flex items-center gap-4 text-sm">
                      <div class="w-16 font-bold text-gray-700">{{ route.origin }}-{{ route.destination }}</div>
                      <div class="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div class="h-full bg-blue-500 rounded-full" [style.width.%]="route.percentage"></div>
                      </div>
                      <div class="w-10 text-right font-bold text-gray-900">{{ route.percentage }}%</div>
                  </div>
              </div>
          </div>

          <!-- Critical Alerts -->
           <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full">
              <div class="flex justify-between items-center mb-6">
                  <h3 class="text-lg font-bold text-gray-900">Recent Critical Alerts</h3>
                  <button class="text-sm text-blue-600 font-medium hover:text-blue-700">View All</button>
              </div>
              
              <div class="space-y-4">
                  <!-- Header Row -->
                  <div class="grid grid-cols-12 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">
                      <div class="col-span-2">Type</div>
                      <div class="col-span-2">Shipment ID</div>
                      <div class="col-span-5">Message</div>
                      <div class="col-span-2">Date</div>
                      <div class="col-span-1 text-right">Action</div>
                  </div>

                  <!-- Rows -->
                  <div *ngFor="let alert of alerts$ | async" class="grid grid-cols-12 items-center text-sm py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-2 -mx-2 rounded transition-colors">
                      <div class="col-span-2">
                          <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                                [ngClass]="getAlertBadgeClass(alert.type)">
                             <span *ngIf="alert.type === 'Delay' || alert.type === 'Exception'" class="mr-1">!</span>
                             <span *ngIf="alert.type === 'Update'" class="mr-1">i</span>
                             {{ alert.type }}
                          </span>
                      </div>
                      <div class="col-span-2 font-medium text-gray-900">{{ alert.id }}</div>
                      <div class="col-span-5 text-gray-600 truncate">{{ alert.message }}</div>
                      <div class="col-span-2 text-blue-600">{{ alert.date }}</div>
                      <div class="col-span-1 text-right">
                          <button class="text-blue-500 hover:text-blue-700 font-medium text-xs">
                              {{ alert.type === 'Update' ? 'Dismiss' : 'Resolve' }}
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>

    </div>
  `
})
export class ReportsComponent {
  private reportService = inject(ReportService);
  
  stats$: Observable<ReportStats>;
  weeklyVolume$: Observable<WeeklyVolume[]>;
  topRoutes$: Observable<RouteVolume[]>;
  alerts$: Observable<CriticalAlert[]>;

  constructor() {
    this.stats$ = this.reportService.getReportStats();
    this.weeklyVolume$ = this.reportService.getWeeklyVolume();
    this.topRoutes$ = this.reportService.getTopRoutes();
    this.alerts$ = this.reportService.getCriticalAlerts();
  }

  getAlertBadgeClass(type: string): string {
    switch (type) {
        case 'Delay': return 'bg-red-100 text-red-700';
        case 'Exception': return 'bg-orange-100 text-orange-700';
        case 'Update': return 'bg-blue-100 text-blue-700';
        default: return 'bg-gray-100 text-gray-600';
    }
  }
}
