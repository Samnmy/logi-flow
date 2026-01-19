import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentService } from '../../core/services/shipment.service';
import { StatsCardComponent } from '../../shared/components/stats-card/stats-card.component';
import { ShipmentVolumeChartComponent } from '../../shared/components/shipment-volume-chart/shipment-volume-chart.component';
import { LiveFleetMapComponent } from '../../shared/components/live-fleet-map/live-fleet-map.component';
import { RecentShipmentsTableComponent } from '../../shared/components/recent-shipments-table/recent-shipments-table.component';
import { Observable } from 'rxjs';
import { DashboardStats, Shipment } from '../../core/models/shipment.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    StatsCardComponent,
    ShipmentVolumeChartComponent,
    LiveFleetMapComponent,
    RecentShipmentsTableComponent
  ],
  template: `
    <div class="space-y-8 max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p class="text-gray-500 mt-1">Real-time logistic metrics and fleet status.</p>
        </div>
        <div class="flex items-center text-sm text-gray-500 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 text-gray-400"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
           Last updated: Just now
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" *ngIf="stats$ | async as stats">
        <app-stats-card
          title="Total Active Shipments"
          [value]="(stats.totalActive | number) ?? '0'"
          [trend]="stats.totalActiveTrend"
          iconContext="blue">
          <svg icon xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
        </app-stats-card>

        <app-stats-card
          title="In Transit"
          [value]="stats.inTransit"
          [trend]="stats.inTransitTrend"
          iconContext="purple">
           <svg icon xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
        </app-stats-card>

        <app-stats-card
          title="Exceptions"
          [value]="stats.exceptions"
          [trend]="stats.exceptionsTrend"
          iconContext="red">
          <svg icon xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        </app-stats-card>
        
        <app-stats-card
          title="Revenue (MTD)"
          [value]="'$' + (stats.revenue / 1000) + 'k'"
          [trend]="stats.revenueTrend"
          iconContext="green">
          <svg icon xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
        </app-stats-card>
      </div>

      <!-- Charts Area -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
           <app-shipment-volume-chart [data]="(volumeData$ | async) || []"></app-shipment-volume-chart>
        </div>
        <div class="lg:col-span-1">
           <app-live-fleet-map></app-live-fleet-map>
        </div>
      </div>

      <!-- Recent Shipments -->
      <div>
        <app-recent-shipments-table [shipments]="(shipments$ | async) || []"></app-recent-shipments-table>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  private shipmentService = inject(ShipmentService);
  
  stats$: Observable<DashboardStats>;
  shipments$: Observable<Shipment[]>;
  volumeData$: Observable<{ region: string, value: number }[]>;

  constructor() {
    this.stats$ = this.shipmentService.getDashboardStats();
    this.shipments$ = this.shipmentService.getRecentShipments();
    this.volumeData$ = this.shipmentService.getVolumeByRegion();
  }

  ngOnInit(): void {}
}
