import Link from 'next/link';
import CookieConsent from '@/components/common/popups/cookieConsent';

export const Container = ({ children }) => (
    <div>{children}</div>
)

const PublicLayout = ({ children}) => {

    return (
        <div>
            <Container>{children}</Container>
            <footer>
                <Container>
                    <ul>
                        <li>
                            <Link href="/privacy-policy">
                                Privacy Policy
                            </Link>
                        </li>
                    </ul>
                </Container>
                <Container>
                    <p>
                        copyright &copy; {new Date().getFullYear()} all rights reserved
                    </p>
                </Container>
            </footer>
            <CookieConsent />
        </div>
    )
}

export default PublicLayout;
