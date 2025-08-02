
interface SessionTokenRequest {
    addresses: Array<{
      address: string;
      blockchains: string[];
    }>;
    assets?: string[];
  }
  
  interface SessionTokenResponse {  
    token: string;
    channel_id?: string;
  }

export async function generateSessionToken(
    params: SessionTokenRequest
): Promise<string | null> {
    try {
        const response = await fetch('/api/session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Session token generation failed:', error);
            throw new Error(error.error || 'Failed to generate session token');
        }

        const data: SessionTokenResponse = await response.json();
        return data.token;
    } catch (error) {
        console.error('Error generating session token:', error);
        return null;
    }
}