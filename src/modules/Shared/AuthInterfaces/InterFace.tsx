export  interface userData {
    userName: string,
    email: string,
    country: string,
    phoneNumber: number,
    password: string | number,
    confirmPassword: string | number

  }
  export  interface userDataVerfiy {
      email: string,
      code: string,
  
    }