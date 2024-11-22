export interface Subject {
  Id: string;
  Code: string | null;
  Name: string;
  Description: string | null;
  Enabled: boolean;
  StatusId: number;
  StartDate: string;
  ProfessorId: string,
  EndDate: string;
  CreatedBy: string | null;
  CreatedDate: string;
  LastUpdatedBy: string | null;
  LastUpdatedDate: string | null;
}