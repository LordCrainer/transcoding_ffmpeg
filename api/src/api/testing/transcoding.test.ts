import transcdoingMock from "./transcoding.mock";
import transcdoingService from "./transcoding.services";
import { hashSortCoerce, hasher } from "../shared/object-hash/node-object-hash";
import { Process, Workflow } from "./transcoding.interface";

const addHashtopProcess = (data: Process) => {
  const { id, hash, ...hasheable } = data;
  const convertToHash = hasher({ sort: true, coerce: true, alg: "sha1" });
  const hashFinal = convertToHash.hash(hasheable);
  return "" + hashFinal;
};
const processToHash = (data: Workflow) =>
  data.process.map((p) => ({ ...p, hash: addHashtopProcess(p) }));

describe("HASH OBJECT", () => {
  test("should Objects be same", () => {
    const normalize_12_A = {
      title: "Normalize",
      slug: "normalize",
      id: 100,
      type: "filter",
      metadata: [
        {
          type: "audio",
          threshold: -12,
          margen: 1,
        },
      ],
    };
    const normalize_12_B = {
      title: "Normalize",
      slug: "normalize",
      id: 100,
      type: "filter",
      metadata: [
        {
          type: "audio",
          threshold: -12,
          margen: 1,
        },
      ],
    };
    const comparation =
      hashSortCoerce.hash(normalize_12_A) ===
      hashSortCoerce.hash(normalize_12_B);
    expect(comparation).toBeTruthy();
  });
  test("should Objects be different", () => {
    const normalize_12 = {
      title: "Normalize",
      slug: "normalize",
      id: 100,
      type: "filter",
      metadata: [
        {
          type: "audio",
          threshold: -12,
          margen: 1,
        },
      ],
    };
    const normalize_20 = {
      title: "Normalize",
      slug: "normalize",
      id: 100,
      type: "filter",
      metadata: [
        {
          type: "audio",
          threshold: -20,
          margen: 1,
        },
      ],
    };
    const comparation =
      hashSortCoerce.hash(normalize_12) === hashSortCoerce.hash(normalize_20);
    expect(comparation).toBeFalsy();
  });
  test("should convert a unique hash the object A (sha1)", () => {
    const hashCompare = hasher({ sort: true, coerce: true, alg: "sha1" });
    const objectA = {
      title: "Normalize",
      slug: "normalize",
      id: 100,
      type: "filter",
      metadata: [
        {
          type: "audio",
          threshold: -12,
          margen: 1,
        },
      ],
    };
    const result = hashCompare.hash(objectA);
    expect(result).toBe("a67bc8a5234b82c81a80c5fe61c8ed092fe20ee0");
  });
  test("should convert a unique hash the object B (sha1)", () => {
    const hashCompare = hasher({ sort: true, coerce: true, alg: "sha1" });
    const objectB = {
      title: "Normalize",
      slug: "normalizeVolume",
      program: "ffmpeg",
      type: "filter",
      metadata: {
        general: {
          container: "mov",
        },
        filter: {
          normalizeVolume: {
            threshold: -12,
            marginError: 1,
          },
        },
      },
    };
    const result = hashCompare.hash(objectB);
    expect(result).toBe("958ac832d10952285c872bc1c49e0f3215a5486c");
  });
  test("Should bring a hash to Process", () => {
    const workflowsData = transcdoingMock.WORKFLOWS;
    const changed = workflowsData.map(wf => processToHash(wf))
    expect(changed).toBe("");
  });
});

const findWorkflowById =
  (data: Workflow[]) => async (input: { id: string | Number }) => {
    return await data.find((d) => d.id === input.id);
  };

describe("Name of the group", () => {
  test("should ", () => {
    const inputData = transcdoingMock.inputData;
    const workflowsData = transcdoingMock.WORKFLOWS;
    const { origin, destiny } = inputData.source;
    const profiles = inputData.profiles;
    const mapProfilesProcess = transcdoingService.getManyProcessByProfile(
      profiles,
      workflowsData
    );

    mapProfilesProcess.reduce((acc, value) => {
      if (acc) {
        const obj = acc.process.reduce((acc, v) => {
          const key = v.title;
          let obj = {};
          obj = { ...obj, [v.title]: v.slug };
          return acc;
        });
        acc.process.map((p) => {});
      }

      return acc;
    });
    expect(mapProfilesProcess).toStrictEqual([]);
  });
});
