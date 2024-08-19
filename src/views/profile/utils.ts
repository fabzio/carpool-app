export function equalObjects(obj1: any, obj2: any): boolean {

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const commonKeys = keys1.filter((key) => keys2.includes(key));
  return commonKeys.every((key) => obj1[key] === obj2[key]);
}
