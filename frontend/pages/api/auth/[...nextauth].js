import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const BACKEND_ACCESS_TOKEN_LIFETIME = 60 * 60 * 1000; // 60 minutes
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60 * 1000; // 6 days

const getCurrentEpochTime = () => {
    return Math.floor(new Date().getTime() / 1000);
};

const SIGNIN_IN_HANDLERS = {
    "credentials": async (user, account, profile, email, credentials) => {
        return true;
    },
    "google": async (user, account, profile, email, credentials) => {
        try {
            const response = await axios({
                url: process.env.NEXTAUTH_BACKEND_URL + 'auth/google/',
                method: 'POST',
                data: {
                    access_token: account['id_token'],
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            account['meta'] = response.data;
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
};

const SIGN_IN_PROVIDERS = Object.keys(SIGNIN_IN_HANDLERS);

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
    },
    debug: process.env.NODE_ENV!== 'development',
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    required: true,
                    placeholder: "Username",
                },
                password: {
                    label: "Password",
                    type: "password",
                    required: true,
                    placeholder: "Password",
                }
            },
            async authorize(credentials) {
                try {
                    const response = await axios({
                        url: process.env.NEXTAUTH_BACKEND_URL + 'auth/login/',
                        method: 'POST',
                        data: JSON.stringify(credentials),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (response.data) {
                        return response.data;
                    }
                } catch (error) {
                    console.error(error);
                    return null;
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    access_type: 'offline',
                    prompt: 'consent',
                    response_type: 'code'
                }
            }
        }),
    ],
    callbacks: {
        async signIn({user, account, profile, email, credentials}) {
            if (!SIGN_IN_PROVIDERS.includes(account.provider)) {
                return false;
            }
            return SIGNIN_IN_HANDLERS[account.provider](user, account, profile, email, credentials);
        },
        async jwt({user, token, account }) {
            if (user && account) {
                let backendResponse = account.provider === 'credentials' ? user : account.meta;
                token['access_token'] = backendResponse.access;
                token['refresh_token'] = backendResponse.refresh;
                token['ref'] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
                token['user'] = backendResponse.user;
                return token;
            }
            if (getCurrentEpochTime() > token['ref']) {
                const backendResponse = await axios({
                    url: process.env.NEXT_PUBLIC_BACKEND_URL + 'auth/token/refresh/',
                    method: 'POST',
                    data: {
                        refresh: token['refresh_token']
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                token['access_token'] = backendResponse.data.access;
                token['refresh_token'] = backendResponse.data.refresh;
                token['ref'] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
            }
            return token;
        },
        async session({token}) {
            return token;
        },
        async redirect({url}) {
            return url;
        },
    },
};

export default NextAuth(authOptions);
