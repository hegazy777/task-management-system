export  interface data {
    id: number,
    userName: string,
    email: string | number,
    country: | string,
    phoneNumber: number,
    isActivated: boolean,
    creationDate: number
 
}
interface Group {
    id: number;
    name: string;
    creationDate: string;
    modificationDate: string;
}
  export interface User {
    id: number;
    userName: string;
    email: string;
    country: string;
    phoneNumber: string;
    creationDate: string;
    modificationDate: string;
    isActivated: boolean;
    imagePath: string | null;
    group: Group;
}

 

