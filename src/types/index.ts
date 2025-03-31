import { ServiceItem } from "@/enums/ServiceItem";
import { AppointmentFilter } from "@/enums/AppointmentFIlter";

export interface Audit {
  id: string;
  createdAt: Date;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}
export interface IUser {
  id: string;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  verified: boolean;
  profileImageId: string | null;
  profileImageUrl: string;
  dateOfBirth: string | null;
  provider: string;
  location: string | null;
  phones: string[];
  garageIds: string | null;
}


export interface IServiceCenter {
  id: string;
  categoryId: string;
  createdBy: string | null;
  name: string;
  ownerId: string;
  location: string | null;
  category: string;
  imageUrl: string | null;
  imageId: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface FormService {
  item:ServiceItem[]
  totalItems: number;
  totalPrices: number;
  tauxAmount : number
}

export interface Service extends Audit {
  title: string;
  image: string;
  definition: string;
  serviceCenterId: string;
  serviceCenter?: IServiceCenter;
}

export interface VehicleDetail  {
  make: string;
  model: string;
  year: string;
  trim: string;
  transmission: string;
  driveTrain: string;
  power: string;
  bodyType: string;
  vehicleId: string;
}

export interface VehicleMediaItem  {
  sourceUrl: string;
  capturedUrl: string;
  type: string;
  mediaId: string;
  fileId: string;
  fileUrl: string;
}


export interface VehicleMedia  {
  type: string;
  source: string;
  items: VehicleMediaItem[];
}

export interface Vehicle extends Audit {
  name: string;
  description: string 
  detail: VehicleDetail;
  garageId: string;
  imageUrl: string 
  media: VehicleMedia;
  registrationNumber: string
  vin: string ;
}

export interface IAppointment extends Audit {
  date: string;
  locationType: "HOME" | "OFFICE" | "OTHER";
  note: string | null;
  serviceId: string;
  service?: Service;
  status:AppointmentFilter;
  vehicleId: string;
  vehicle?: Vehicle;
  user?: IUser;
}


export interface IAppointmentt {
  id: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  date: string;
  locationType: string;
  note?: string;
  timeOfDay: 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT';
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

  service: {
      id: string;
      createdBy: string | null;
      updatedBy: string | null;
      createdAt: string;
      updatedAt: string;
      title: string;
      description: string | null;
      serviceCenterId: string | null;
      definition: string;
  };

  vehicle: {
      id: string;
      createdBy: string | null;
      updatedBy: string | null;
      createdAt: string;
      updatedAt: string;
      name: string;
      description: string | null;
      garageId: string | null;
      vin: string;
      registrationNumber: string | null;
      imageUrl: string | null;

      detail: {
          id: string;
          createdBy: string | null;
          updatedBy: string | null;
          createdAt: string;
          updatedAt: string;
          make: string;
          model: string;
          year: string;
          trim: string;
          vehicleType: string | null;
          transmission: string | null;
          driveTrain: string | null;
          power: string | null;
          bodyType: string | null;
          manufacturer: string | null;
          manufacturerRegion: string | null;
          manufacturerCountry: string | null;
          manufacturerPlantCity: string | null;
          restraint: string | null;
          engineSize: string | null;
          engineDescription: string | null;
          engineCapacity: string | null;
          dimensions: string | null;
          vehicleId: string | null;
      };

      media: {
          id: string | null;
          createdBy: string | null;
          updatedBy: string | null;
          createdAt: string | null;
          updatedAt: string | null;
          type: string | null;
          source: string | null;
          items: Array<{
              sourceUrl: string;
              type: string;
          }>;
          mainItemUrl: string | null;
      };
  };
}

