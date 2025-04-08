export type ProjectType = {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
  manager: ManagerType;
};

export type ManagerType = {
  id: number;
  userName: string;
  imagePath: string;
};

export type ProjectTypeForm = {
  title: string;
  description: string;
};
