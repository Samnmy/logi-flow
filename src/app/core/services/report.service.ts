import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ReportStats {
  totalVolume: number;
  totalVolumeTrend: number;
  inTransit: number;
  onTimeRate: number;
  exceptions: number;
}

export interface WeeklyVolume {
  week: string;
  domestic: number;
  international: number;
}

export interface RouteVolume {
  origin: string;
  destination: string;
  percentage: number;
}

export interface CriticalAlert {
  id: string;
  type: 'Delay' | 'Exception' | 'Update';
  message: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() { }

  getReportStats(): Observable<ReportStats> {
    return of({
      totalVolume: 1240,
      totalVolumeTrend: 12,
      inTransit: 450,
      onTimeRate: 98.2,
      exceptions: 15
    });
  }

  getWeeklyVolume(): Observable<WeeklyVolume[]> {
    return of([
      { week: 'Week 1', domestic: 40, international: 20 },
      { week: 'Week 2', domestic: 30, international: 40 },
      { week: 'Week 3', domestic: 35, international: 15 },
      { week: 'Week 4', domestic: 90, international: 160 }
    ]);
  }

  getDeliveryPerformance(): Observable<number[]> {
    // Mock data points for the smooth line chart
    return of([20, 60, 90, 80, 50, 10, 30, 10, 60, 20, 90]);
  }

  getTopRoutes(): Observable<RouteVolume[]> {
    return of([
       { origin: 'NY', destination: 'LA', percentage: 85 },
       { origin: 'CHI', destination: 'MIA', percentage: 65 },
       { origin: 'DAL', destination: 'NY', percentage: 45 },
       { origin: 'LA', destination: 'SEA', percentage: 30 },
       { origin: 'MIA', destination: 'HOU', percentage: 20 },
    ]);
  }

  getCriticalAlerts(): Observable<CriticalAlert[]> {
    return of([
      { id: 'SHP-2991', type: 'Delay', message: 'Customs clearance hold in Rotterdam', date: '2 hours ago' },
      { id: 'SHP-3022', type: 'Exception', message: 'Address verification failed for recipient', date: '5 hours ago' },
      { id: 'SHP-1004', type: 'Update', message: 'Carrier rerouted due to weather', date: '1 day ago' },
    ]);
  }
}
