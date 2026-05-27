// Airwallex API client
const BASE = process.env.AIRWALLEX_ENV === "prod"
  ? "https://api.airwallex.com"
  : "https://api-demo.airwallex.com";

let cachedToken: { token: string; expiresAt: number } | null = null;

export async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.token;
  }

  const res = await fetch(`${BASE}/api/v1/authentication/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.AIRWALLEX_API_KEY!,
      "x-client-id": process.env.AIRWALLEX_CLIENT_ID!,
    },
  });

  const data = await res.json();
  const token = data.token;
  cachedToken = { token, expiresAt: Date.now() + (data.expires_in || 1800) * 1000 };
  return token;
}

export async function createPaymentIntent(params: {
  amount: number;
  currency: string;
  orderId: string;
  userId: string;
  coins: number;
  returnUrl: string;
}) {
  const token = await getAccessToken();

  const res = await fetch(`${BASE}/api/v1/pa/payment_intents/create`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      request_id: params.orderId,
      amount: params.amount,
      currency: params.currency,
      merchant_order_id: params.orderId,
      return_url: params.returnUrl,
      metadata: { userId: params.userId, coins: String(params.coins) },
    }),
  });

  return res.json();
}

export function getAirwallexEnv() {
  return process.env.AIRWALLEX_ENV === "prod" ? "prod" : "demo";
}
