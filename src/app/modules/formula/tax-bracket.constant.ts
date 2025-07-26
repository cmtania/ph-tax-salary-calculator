import { TaxBracket } from "../models/tax-bracket.interface";

  export const taxBrackets: TaxBracket[] = [
    { min: 0, max: 20833.33, rate: 0, baseAmount: 0 }, // ₱0 - ₱250,000 annually: 0%
    { min: 20833.33, max: 33333.33, rate: 0.20, baseAmount: 0 }, // ₱250,000 - ₱400,000 annually: 20% of excess over ₱250,000
    { min: 33333.33, max: 66666.67, rate: 0.25, baseAmount: 2500 }, // ₱400,000 - ₱800,000 annually: ₱30,000 + 25% of excess over ₱400,000
    { min: 66666.67, max: 166666.67, rate: 0.30, baseAmount: 10833.33 }, // ₱800,000 - ₱2,000,000 annually: ₱130,000 + 30% of excess over ₱800,000
    { min: 166666.67, max: 666666.67, rate: 0.32, baseAmount: 40833.33 }, // ₱2,000,000 - ₱8,000,000 annually: ₱490,000 + 32% of excess over ₱2,000,000
    { min: 666666.67, max: null, rate: 0.35, baseAmount: 200833.33 } // Over ₱8,000,000 annually: ₱2,410,000 + 35% of excess over ₱8,000,000
  ];