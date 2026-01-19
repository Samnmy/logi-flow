export type CustomerStatus = 'Active' | 'Inactive' | 'Pending';

export interface Customer {
  id: string; // e.g. #9921
  name: string;
  industry: string;
  initials: string;
  avatarColor: string; // e.g., 'bg-blue-100 text-blue-600'
  primaryContact: {
    name: string;
    avatarUrl: string; // Use ui-avatars logic or similar if real images not avail
  };
  activeShipments: number;
  status: CustomerStatus;
}
