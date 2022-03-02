export type UserType = {
  birthday: Date;
  city: string;
  dueDate: Date;
  firstname: string;
  gender: Gender;
  lastname: string;
  numberOfChildren: number;
  photoUrl: string;
  postalCode: number;
  name: string;
};


export type GroupType = {
  id: string;
  city: string;
  description: string;
  dueDate: Date;
  experience: string;
  groupType: GroupType;
  location: Location;
  margin: number;
  maxSize: number;
  name: string;
  photoUrl: string;
  postalCode: number;
  members: Array<User>
  };

export type Location = {
  latitude: number;
  longitude: number;
};


export enum GroupType2 {
  MØDREGRUPPE = 0,
  FÆDREGRUPPE = 1,
  FAMILIEGRUPPE = 2
};

export enum Experience {
  FØRSTEGANGSFØDENDE = 0,
  ANDENGANGSFØDENDE = 1,
  ERFAREN = 2,
};

export enum Gender {
  KVINDE = 0,
  MAND = 1
};

export type PostType = {
  id: string;
  author: User;
  text?: string;
  createdAt: Date;
  photoUrl?: string;
}

export type EventType = PostType & {
  startTime: Date;
  endTime: Date;
  title: string;
  location: Location;
}