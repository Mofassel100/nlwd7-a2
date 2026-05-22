export type TType = "bug" | "feature_request";
export type TStatus = "open" | "in_progress" | "resolved";

export interface TIssue {
  title: string;
  description: string;
  type: TType;
  status?: TStatus;
  reporter_id?: number;
}
