import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'gulavlival-grand-super-secure-production-secret-key-2026';
const COOKIE_NAME = 'gulavlival_session';

export interface UserSession {
    id: string;
    email: string;
    role: string;
    name?: string;
    exp?: number;
}

// Convert string to Uint8Array key
async function getCryptoKey(): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    return crypto.subtle.importKey(
        'raw',
        encoder.encode(JWT_SECRET),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign', 'verify']
    );
}

// Base64Url encode/decode helpers
function base64UrlEncode(data: Uint8Array | string): string {
    const str = typeof data === 'string'
        ? btoa(unescape(encodeURIComponent(data)))
        : btoa(String.fromCharCode(...data));
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str: string): string {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) str += '=';
    return decodeURIComponent(escape(atob(str)));
}

// Sign JWT token
export async function signToken(payload: UserSession, expiresInSeconds = 60 * 60 * 24 * 7): Promise<string> {
    const header = { alg: 'HS256', typ: 'JWT' };
    const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
    const body = { ...payload, exp };

    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedBody = base64UrlEncode(JSON.stringify(body));
    const dataToSign = `${encodedHeader}.${encodedBody}`;

    const key = await getCryptoKey();
    const signature = await crypto.subtle.sign(
        'HMAC',
        key,
        new TextEncoder().encode(dataToSign)
    );

    const encodedSignature = base64UrlEncode(new Uint8Array(signature));
    return `${dataToSign}.${encodedSignature}`;
}

// Verify JWT token
export async function verifyToken(token: string): Promise<UserSession | null> {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;

        const [encodedHeader, encodedBody, encodedSignature] = parts;
        const dataToVerify = `${encodedHeader}.${encodedBody}`;

        const key = await getCryptoKey();

        // Convert signature back to Uint8Array
        const signatureBytes = Uint8Array.from(atob(encodedSignature.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));

        const isValid = await crypto.subtle.verify(
            'HMAC',
            key,
            signatureBytes,
            new TextEncoder().encode(dataToVerify)
        );

        if (!isValid) return null;

        const decoded = JSON.parse(base64UrlDecode(encodedBody)) as UserSession;

        if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
            return null; // Expired
        }

        return decoded;
    } catch {
        return null;
    }
}

// Get session from server cookies
export async function getSession(): Promise<UserSession | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return verifyToken(token);
}

// Set session cookie
export async function setSessionCookie(token: string) {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });
}

// Clear session cookie
export async function clearSessionCookie() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}
