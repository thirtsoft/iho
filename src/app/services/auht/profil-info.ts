export class ProfilInfo {
    id: number;
    name: string;
    username: string;
    newUsername: string;
    email: string;
    password: string;
    newPassword: string;
    photo: string;
  }
  
  export class UpdateProfilInfo {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  
  export class UpdateUsernameInfo {
    username: string;
    newUsername: string;
  }
  
  export class UpdatePasswordInfo {
    username: string;
    oldPassword: string;
    newPassword: string;
  }
  
  export class UpdateProfileInfo {
    name: string;
    username: string;
    newUsername: string;
    email: string;
    mobile: string;
    addressRecruteur: string;
  }
  
