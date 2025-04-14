

export type TaskStatus = 'ToDo' | 'InProgress' | 'Done';

export interface TaskResponse {
    pageNumber: number;
    pageSize: number;
    data: Task[];
    totalNumberOfRecords: number;
    totalNumberOfPages: number;
  }
  
  export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'ToDo' | 'InProgress' | 'Done';
    creationDate: string;
    modificationDate: string;
  }
  
  // export interface Project {
  //   id: number;
  //   title: string;
  //   description: string;
  //   creationDate: string;
  //   modificationDate: string;
  // }
  
  // export interface Employee {
  //   id: number;
  //   userName: string;
  //   imagePath: string | null;
  //   email: string;
  //   password: string;
  //   country: string;
  //   phoneNumber: string;
  //   verificationCode: string;
  //   isVerified: boolean;
  //   isActivated: boolean;
  //   creationDate: string;
  //   modificationDate: string;
  // }
  