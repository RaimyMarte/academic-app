export interface Student {
  Id: string;
  Code?: string | null;
  FirstName: string;
  LastName: string;
  Address?: string | null;
  DateOfBirth: string;
  Gender?: string | null;
  EmailAddress?: string | null;
  PhoneNumber?: string | null;
  ParentName?: string | null;
  ParentPhoneNumber?: string | null;
  CreatedBy?: string | null;
  CreatedDate: string;
  LastUpdatedDate?: string | null;
  LastUpdatedBy?: string | null;
  Picture?: string | null;
  StatusId?: number | null;
}
