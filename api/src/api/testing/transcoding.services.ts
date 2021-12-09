import { Workflow } from "../profile/workflow/workflow.interface";
import { Profile } from "../profile/profile.interface";
import { hashSortCoerce, hasher } from "../shared/object-hash/node-object-hash";


const isObject = (obj: Object) =>
  Object.prototype.toString.call(obj) === "[object Object]";

const ComparasionObjects = (obj1: any, obj2: any) => {
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    let val1 = obj1[key];
    let val2 = obj2[key];
    let areObjects = isObject(val1) && isObject(val2);

    if (
      (areObjects && !ComparasionObjects(val1, val2)) ||
      (!areObjects && val1 !== val2)
    )
      return false;
  }

  return true;
};

const getProcessByProfile = (profile: Profile, workflow: Workflow[]) => {
  return workflow.find((w) => w.id === profile.workflowId);
};

const getManyProcessByProfile = (profile: Profile[], workflow: Workflow[]) =>
  profile.map((p) => getProcessByProfile(p, workflow));

export default {
  ComparasionObjects,
  getManyProcessByProfile,
};
