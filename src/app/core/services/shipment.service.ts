import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DashboardStats, Shipment, ShipmentDetail } from '../models/shipment.model';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  constructor() { }

  getShipmentDetails(id: string): Observable<ShipmentDetail> {
    const detail: ShipmentDetail = {
      trackingId: '#LGF-8923',
      status: 'In Transit',
      customer: 'Alex Morgan',
      origin: 'Hamburg, DE',
      destination: 'Lyon, FR',
      eta: 'Oct 24, 2023 - 14:00',
      type: 'Electronics / Palletized',
      warehouseCode: 'Warehouse H-22',
      distributionCenter: 'Distribution Center L-01',
      carrier: 'DHL Express',
      serviceType: 'Service: Express Worldwide',
      weight: '450 kg',
      pallets: '12 Pallets',
      timeline: [
        {
          title: 'Arrived at Distribution Center',
          location: 'Lyon, FR',
          timestamp: 'Oct 24, 13:50 (10 mins ago)',
          isCompleted: false, // In user's image, the top one is current but visually distinct (blue circle outline). I'll treat as current step.
          isCurrent: true,
          icon: 'truck'
        },
        {
          title: 'Departed Hub',
          location: 'Stuttgart, DE',
          timestamp: 'Oct 24, 08:30 (5 hours ago)',
          isCompleted: true,
          icon: 'check'
        },
        {
          title: 'Processed at Sort Facility',
          location: 'Hamburg, DE',
          timestamp: 'Oct 23, 18:45',
          isCompleted: true,
          icon: 'check'
        },
        {
          title: 'Shipment Picked Up',
          location: 'Hamburg, DE',
          timestamp: 'Oct 23, 09:00 (1 day ago)',
          isCompleted: true,
          icon: 'truck'
        }
      ],
      cargoDetails: {
        packageType: 'Standard Pallet (EUR)',
        dimensions: '120 × 80 × 144 cm',
        volumetricWeight: '480 kg',
        stackable: true
      },
      documents: [
          { name: 'Bill of Lading (BOL)', type: 'PDF', size: '2.4 MB' },
          { name: 'Commercial Invoice', type: 'PDF', size: '1.2 MB' }
      ]
    };
    return of(detail);
  }

  getDashboardStats(): Observable<DashboardStats> {
    const stats: DashboardStats = {
      totalActive: 1240,
      totalActiveTrend: 5,
      inTransit: 845,
      inTransitTrend: 12,
      exceptions: 12,
      exceptionsTrend: -2,
      revenue: 450000,
      revenueTrend: 8
    };
    return of(stats);
  }

  getRecentShipments(): Observable<Shipment[]> {
    const shipments: Shipment[] = [
      {
        trackingId: '#SHP-2049',
        customer: 'Acme Corp',
        origin: 'NY',
        destination: 'LA',
        eta: 'Oct 24, 2023',
        status: 'In Transit'
      },
      {
        trackingId: '#SHP-2050',
        customer: 'Globex Inc',
        origin: 'TX',
        destination: 'FL',
        eta: 'Oct 25, 2023',
        status: 'Delivered'
      },
      {
        trackingId: '#SHP-2051',
        customer: 'Soylent Corp',
        origin: 'WA',
        destination: 'OR',
        eta: 'Oct 26, 2023',
        status: 'Delayed'
      },
      {
        trackingId: '#SHP-2052',
        customer: 'Initech',
        origin: 'IL',
        destination: 'MI',
        eta: 'Oct 24, 2023',
        status: 'In Transit'
      },
       {
        trackingId: '#SHP-2053',
        customer: 'Umbrella Corp',
        origin: 'CA',
        destination: 'NV',
        eta: 'Oct 27, 2023',
        status: 'Exception'
      }
    ];
    return of(shipments);
  }

  getAllShipments(): Observable<Shipment[]> {
    const shipments: Shipment[] = [
      {
        trackingId: '#SHP-9281',
        customer: 'Acme Corp',
        clientInitials: 'AC',
        clientColor: 'bg-purple-100 text-purple-600',
        origin: 'Shanghai, CN',
        destination: 'Los Angeles, USA',
        eta: 'Oct 24, 2023',
        status: 'In Transit'
      },
      {
        trackingId: '#SHP-9282',
        customer: 'Globex Inc.',
        clientInitials: 'GL',
        clientColor: 'bg-orange-100 text-orange-600',
        origin: 'Berlin, DE',
        destination: 'Paris, FR',
        eta: 'Delayed',
        status: 'Incident'
      },
      {
        trackingId: '#SHP-9283',
        customer: 'Stark Ind.',
        clientInitials: 'ST',
        clientColor: 'bg-blue-100 text-blue-600',
        origin: 'New York, USA',
        destination: 'London, UK',
        eta: 'Oct 20, 2023',
        status: 'Delivered'
      },
      {
        trackingId: '#SHP-9284',
        customer: 'Wayne Ent.',
        clientInitials: 'WA',
        clientColor: 'bg-teal-100 text-teal-600',
        origin: 'Gotham, NJ',
        destination: 'Metropolis, NY',
        eta: 'Oct 26, 2023',
        status: 'Pending'
      },
      {
        trackingId: '#SHP-9285',
        customer: 'Umbrella Corp',
        clientInitials: 'UM',
        clientColor: 'bg-indigo-100 text-indigo-600',
        origin: 'Raccoon City, USA',
        destination: 'Tokyo, JP',
        eta: 'Oct 28, 2023',
        status: 'In Transit'
      }
    ];
    return of(shipments);
  }

  getVolumeByRegion(): Observable<{ region: string, value: number }[]> {
    return of([
      { region: 'North', value: 65 },
      { region: 'South', value: 85 },
      { region: 'East', value: 45 },
      { region: 'West', value: 70 },
    ]);
  }
}
