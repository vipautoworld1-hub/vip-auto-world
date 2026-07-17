-- Create vehicles table
CREATE TABLE vehicles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  plate_number VARCHAR(50) UNIQUE NOT NULL,
  engine_number VARCHAR(100) UNIQUE NOT NULL,
  vehicle_photo TEXT,
  location VARCHAR(255),
  remark TEXT,
  status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'sold', 'reserved')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster searches
CREATE INDEX idx_vehicles_plate_number ON vehicles(plate_number);
CREATE INDEX idx_vehicles_engine_number ON vehicles(engine_number);
CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_vehicles_created_at ON vehicles(created_at);

-- Enable RLS (Row Level Security)
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for public read access
CREATE POLICY "Enable read access for all users" ON vehicles
  FOR SELECT USING (true);

-- Create RLS policy for authenticated write access
CREATE POLICY "Enable write for authenticated users" ON vehicles
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON vehicles
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable delete for all users" ON vehicles
  FOR DELETE
  USING (true);
