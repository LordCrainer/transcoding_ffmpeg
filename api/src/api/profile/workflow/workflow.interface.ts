import { Process } from "api/profile/process/process.interface";

export interface Workflow {
  title: String;
  id?: Number | String;
  process?: Process[];
}
