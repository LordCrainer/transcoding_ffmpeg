import { IMetada, ISourceData } from "../../3.Domain/entities/IParams";
const transcoding = (source: ISourceData, metadata: IMetada) => {
  const audio = metadata.audioFilter.status;
};

export default {
  transcoding,
};
