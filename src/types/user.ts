export interface User {
  Id: string;
  FirstName: string;
  LastName: string;
  UserName: string;
  FullName: string;
  Gender: string;
  Email: string;
  Phone: string;
  ChangePwdNextLogin: boolean;
  LastPwdChangedDate: Date | null;
  UserRoleId: number;
  Authorized: boolean;
  Locked: boolean;
  LockedDate: Date | null;
  Deleted: boolean;
  DeletedDate: Date | null;
  CreatedBy: string | null;
  CreatedDate: Date;
  LastUpdatedBy: string | null;
  LastUpdatedDate: Date | null;
  LastIpAccess: string | null;
  LastAccessDate: Date | null;
  Picture: string | null;
  UserRole: {
    Name: string
  } | null
}
