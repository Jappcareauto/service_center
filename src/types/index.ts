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