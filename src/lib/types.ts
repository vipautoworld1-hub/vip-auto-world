// Vehicle inventory types
export interface Vehicle {
  id: string;
  plate_number: string;
  engine_number: string;
  vehicle_photo: string | null;
  location: string;
  remark: string;
  status: 'available' | 'sold' | 'reserved';
  created_at: string;
  updated_at: string;
}

export interface CreateVehicleInput {
  plate_number: string;
  engine_number: string;
  location: string;
  remark: string;
  vehicle_photo?: File;
}

export interface UpdateVehicleInput {
  plate_number?: string;
  engine_number?: string;
  location?: string;
  remark?: string;
  vehicle_photo?: File | null;
  status?: 'available' | 'sold' | 'reserved';
}
