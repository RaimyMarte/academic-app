export interface User {
    Id: string;
    FirstName: string;
    LastName: string;
    UserName: string;
    Gender: string;
    Email: string;
    ChangePwdNextLogin: boolean;
    LastPwdChangedDate: Date;
    UserRoleId: number;
    Authorized: boolean;
    Locked: boolean;
    LockedDate: Date;
    Deleted: boolean;
    DeletedDate: Date;
    CreatedBy: string;
    CreatedDate: Date;
    LastUpdatedBy: string;
    LastUpdatedDate: Date;
    LastIpAccess: string;
    LastAccessDate: Date;
    Picture: string;
  }
  