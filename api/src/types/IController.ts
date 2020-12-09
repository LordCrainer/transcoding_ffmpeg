import { Response, Request } from "express";

export interface IController {
  (req: Request, res: Response): void;
}
