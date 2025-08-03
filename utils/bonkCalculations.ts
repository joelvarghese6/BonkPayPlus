/**
 * Calculates 2% of BONK amount based on SOL and BONK prices
 * @param solPrice - Current price of SOL in USD
 * @param bonkPrice - Current price of BONK in USD
 * @param solAmount - Amount of SOL to calculate 2% from (optional, defaults to 1 SOL)
 * @returns The amount of BONK that represents 2% of the SOL value
 */
export const calculateTwoPercentBonk = (
  solPrice: number,
  bonkPrice: number,
  solAmount: number = 1
): number => {
  if (solPrice <= 0 || bonkPrice <= 0) {
    throw new Error('Prices must be greater than 0');
  }

  // Calculate the USD value of the SOL amount
  const solValueUSD = solPrice * solAmount;
  
  // Calculate 2% of the SOL value in USD
  const twoPercentUSD = solValueUSD * 0.02;
  
  // Convert the USD amount to BONK
  const bonkAmount = twoPercentUSD / bonkPrice;
  
  return bonkAmount;
};

/**
 * Calculates 2% of BONK amount for a fixed SOL amount (1 SOL)
 * @param solPrice - Current price of SOL in USD
 * @param bonkPrice - Current price of BONK in USD
 * @returns The amount of BONK that represents 2% of 1 SOL value
 */
export const calculateTwoPercentBonkForOneSol = (
  solPrice: number,
  bonkPrice: number
): number => {
  return calculateTwoPercentBonk(solPrice, bonkPrice, 1);
};

/**
 * Formats BONK amount with appropriate decimal places
 * @param bonkAmount - The BONK amount to format
 * @returns Formatted BONK amount as string
 */
export const formatBonkAmount = (bonkAmount: number): string => {
  if (bonkAmount >= 1000000) {
    return `${(bonkAmount / 1000000).toFixed(2)}M`;
  } else if (bonkAmount >= 1000) {
    return `${(bonkAmount / 1000).toFixed(2)}K`;
  } else {
    return bonkAmount.toFixed(2);
  }
}; 