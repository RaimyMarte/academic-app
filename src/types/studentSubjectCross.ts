export interface StudentSubjectCross {
  Id: string;
  SignatureId: string;
  StudentId: string;
  CreatedDate: Date;
  CreatedBy: string | null;
  Grade: number | null;
}
