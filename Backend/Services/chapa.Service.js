import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

const CHAPA_API_URL = "https://api.chapa.co/v1";

const getErrorMessage = (message) => {
    if (typeof message === "string") return message;
    if (message && typeof message === "object") {
        return Object.entries(message)
            .map(([field, value]) => `${field}: ${typeof value === "string" ? value : JSON.stringify(value)}`)
            .join("; ");
    }
    return "Chapa request failed";
};

const chapaRequest = async (path, options = {}) => {
    if (!process.env.CHAPA_SECRET_KEY) {
        const error = new Error("Chapa is not configured on the server");
        error.statusCode = 503;
        throw error;
    }
    let response;
    try {
        response = await fetch(`${CHAPA_API_URL}${path}`, {
            ...options,
            signal: AbortSignal.timeout(15000),
            headers: {
                Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
        });
    } catch (fetchError) {
        const error = new Error(`Unable to connect to Chapa: ${fetchError.message}`);
        error.statusCode = 502;
        throw error;
    }
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.status === "failed") {
        const error = new Error(getErrorMessage(data.message));
        error.statusCode = 502;
        throw error;
    }
    return data;
};

export const initializePayment = (payload) => chapaRequest("/transaction/initialize", {
    method: "POST",
    body: JSON.stringify(payload),
});

export const verifyPayment = (txRef) => chapaRequest(`/transaction/verify/${encodeURIComponent(txRef)}`);