export type ShipmentStatus = 'In Transit' | 'Delivered' | 'Delayed' | 'Exception' | 'Pending' | 'Incident';

export interface Shipment {
  trackingId: string;
  customer: string;
  clientInitials?: string;
  clientColor?: string;
  origin: string;
  destination: string;
  eta: string; 
  status: ShipmentStatus;
}

export interface ShipmentTimelineEvent {
  title: string;
  location: string;
  timestamp: string;
  isCompleted: boolean;
  isCurrent?: boolean;
  icon?: 'check' | 'truck' | 'box';
}

export interface ShipmentDetail extends Shipment {
  type: string; // e.g. "Electronics / Palletized"
  warehouseCode?: string;
  distributionCenter?: string;
  serviceType?: string;
  weight: string;
  pallets: string;
  carrier: string;
  timeline: ShipmentTimelineEvent[];
  documents: { name: string; type: string; size: string }[];
  cargoDetails: {
    packageType: string;
    dimensions: string;
    volumetricWeight: string;
    stackable: boolean;
  };
}

export interface DashboardStats {
  totalActive: number;
  totalActiveTrend: number; // Percentage
  inTransit: number;
  inTransitTrend: number;
  exceptions: number;
  exceptionsTrend: number;
  revenue: number;
  revenueTrend: number;
}
