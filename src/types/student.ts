export interface Student {
  Id: string;
  Code?: string | null;
  FirstName: string;
  LastName: string;
  FullName: string;
  Address?: string | null;
  DateOfBirth: string;
  Age: number;
  Gender?: string | null;
  EmailAddress?: string | null;
  PhoneNumber?: string | null;
  ParentName?: string | null;
  ParentPhoneNumber?: string | null;
  NationalityId?: number | null;
  CreatedBy?: string | null;
  CreatedDate: string;
  LastUpdatedDate?: string | null;
  LastUpdatedBy?: string | null;
  Picture?: string | null;
  StatusId?: number | null;
}
