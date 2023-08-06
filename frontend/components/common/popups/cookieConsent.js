import Link from "next/link";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { Container } from '@/components/layouts/publicLayout';
import { Button } from '@mui/material';

const USER_CONSENT_COOKIE_KEY = 'cookie_consent_agreed';
const USER_CONSENT_COOKIE_EXPIRED_DATE = 365;

const CookieConsent = () => {
    const [cookieConsentAgreed, setCookieConsentAgreed] = useState(true);

    useEffect(() => {
        const consentIsAgreed = Cookies.get(USER_CONSENT_COOKIE_KEY) === 'true';
        setCookieConsentAgreed(consentIsAgreed);
    }, []);

    const onClick = (e) => {
        e.preventDefault();

        if (!cookieConsentAgreed) {
            Cookies.set(USER_CONSENT_COOKIE_KEY, 'true', {
                expires: USER_CONSENT_COOKIE_EXPIRED_DATE
            })
            setCookieConsentAgreed(true)
        }
    }

    if (cookieConsentAgreed) {
        return null;
    }

    return (
        <section>
            <p>
            This site uses services that use cookies to deliver better
              experience and analyze traffic. You can learn more about the
              services we use at our{' '}
              <Link href="/privacy-policy">privacy policy</Link>
              .
            </p>
            <Button color="primary" onClick={onClick}>
                Got it
            </Button>
        </section>
    )
}

export default CookieConsent;