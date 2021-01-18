import {Fibonacci} from "./fibonacci";
import {Custom} from "./custom";

export const getKeyValue = (key: string) => (obj: Record<string, any>) => obj[key];

export const Templates = {
  'Fibonacci': Fibonacci,
  'Custom': Custom
};
