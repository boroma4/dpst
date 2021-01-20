import {Fibonacci} from "./fibonacci";
import {Custom} from "./custom";
import {LCS} from "./lcs";
import {CoinChange} from "./coinChange";
import {Knapsack} from "./knapsack";

export const getKeyValue = (key: string) => (obj: Record<string, any>) => obj[key];

export const Templates = {
  'Fibonacci': Fibonacci,
  'LCS':LCS,
  'Custom': Custom,
  'Coin Change': CoinChange,
  '0-1 Knapsack': Knapsack
};
