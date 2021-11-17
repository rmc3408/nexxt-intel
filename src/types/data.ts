export interface IUsers {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface IAlbums {
  id: number;
  title: string;
  userId: number;
}

export interface IPhotos {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}
