export interface Profile {
  title: String;
  id?: Number | String;
  type: String;
  quality: "HD" | "SD";
  workflowId?: Number | String;
  description?: String;
}
