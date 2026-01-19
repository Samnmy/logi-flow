import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

  getCustomers(): Observable<Customer[]> {
    const customers: Customer[] = [
      {
        id: '#9921',
        name: 'TechGlobal Inc.',
        industry: 'Technology / Enterprise',
        initials: 'TG',
        avatarColor: 'bg-blue-100 text-blue-600',
        primaryContact: { name: 'Sarah Jenkins', avatarUrl: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=random' },
        activeShipments: 12,
        status: 'Active'
      },
      {
        id: '#8832',
        name: 'FastMove Logistics',
        industry: 'Logistics / Partner',
        initials: 'FM',
        avatarColor: 'bg-orange-100 text-orange-600',
        primaryContact: { name: 'Mike Ross', avatarUrl: 'https://ui-avatars.com/api/?name=Mike+Ross&background=random' },
        activeShipments: 0,
        status: 'Inactive'
      },
      {
        id: '#7712',
        name: 'Retail King',
        industry: 'Retail / Global',
        initials: 'RK',
        avatarColor: 'bg-purple-100 text-purple-600',
        primaryContact: { name: 'Jessica Pearson', avatarUrl: 'https://ui-avatars.com/api/?name=Jessica+Pearson&background=random' },
        activeShipments: 45,
        status: 'Pending'
      },
      {
        id: '#6421',
        name: 'Ocean Transport',
        industry: 'Shipping / International',
        initials: 'OT',
        avatarColor: 'bg-cyan-100 text-cyan-600',
        primaryContact: { name: 'Daniel Lee', avatarUrl: 'https://ui-avatars.com/api/?name=Daniel+Lee&background=random' },
        activeShipments: 8,
        status: 'Active'
      },
      {
        id: '#5119',
        name: 'Apex Freight',
        industry: 'Cargo / Local',
        initials: 'AF',
        avatarColor: 'bg-pink-100 text-pink-600',
        primaryContact: { name: 'Emily Chen', avatarUrl: 'https://ui-avatars.com/api/?name=Emily+Chen&background=random' },
        activeShipments: 21,
        status: 'Active'
      }
    ];
    return of(customers);
  }

  getCustomerStats(): Observable<{ label: string, value: string, trend: number }[]> {
      return of([
          { label: 'Total Clients', value: '1,240', trend: 5 },
          { label: 'Active Now', value: '850', trend: 12 },
          { label: 'Pending Approval', value: '12', trend: -2 }
      ]);
  }
}
