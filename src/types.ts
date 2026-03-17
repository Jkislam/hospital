export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  time: string;
  days: string;
  img: string;
  education: string;
  experience: string;
  bio: string;
  fees: string;
}

export interface Service {
  title: string;
  desc: string;
}

export interface Message {
  id: string;
  name: string;
  email?: string;
  phone: string;
  date: string;
  message: string;
  doctor_name?: string;
  status: 'unread' | 'read';
  created_at: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  img: string;
}

export interface BloodDonor {
  id: string;
  name: string;
  bloodGroup: string;
  address: string;
  phone: string;
  lastDonation?: string;
  img?: string;
}
