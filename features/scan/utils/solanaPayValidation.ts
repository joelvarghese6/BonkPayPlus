export interface SolanaPayUrlData {
  recipient: string;
  amount?: string;
  reference?: string;
  label?: string;
  message?: string;
  memo?: string;
}

export function isValidSolanaAddress(address: string): boolean {
  // Solana addresses are base58 encoded and typically 32-44 characters long
  const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
  return base58Regex.test(address);
}

export function isValidSolanaPayUrl(url: string): boolean {
  try {
    // Check if it starts with solana:
    if (!url.startsWith('solana:')) {
      return false;
    }

    // Parse the URL
    const urlObj = new URL(url);
    
    // Check if the protocol is solana
    if (urlObj.protocol !== 'solana:') {
      return false;
    }

    // Check if there's a recipient (the pathname should be a valid Solana address)
    const recipient = urlObj.pathname;
    if (!recipient || !isValidSolanaAddress(recipient)) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error validating Solana Pay URL:', error);
    return false;
  }
}

export function parseSolanaPayUrl(url: string): SolanaPayUrlData | null {
  try {
    if (!isValidSolanaPayUrl(url)) {
      return null;
    }

    const urlObj = new URL(url);
    const recipient = urlObj.pathname;
    
    return {
      recipient,
      amount: urlObj.searchParams.get('amount') || undefined,
      reference: urlObj.searchParams.get('reference') || undefined,
      label: urlObj.searchParams.get('label') || undefined,
      message: urlObj.searchParams.get('message') || undefined,
      memo: urlObj.searchParams.get('memo') || undefined,
    };
  } catch (error) {
    console.error('Error parsing Solana Pay URL:', error);
    return null;
  }
} 