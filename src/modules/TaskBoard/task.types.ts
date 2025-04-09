

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
  

  