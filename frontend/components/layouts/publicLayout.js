import Link from 'next/link';
import CookieConsent from '@/components/common/popups/cookieConsent';

export const Container = ({ children }) => (
    <div>{children}</div>
)

const PublicLayout = ({ children}) => {

    return (
        <div>
            <header>
                <Container>
                    <h1>Taskr</h1>
                </Container>
            </header>
            <Container>{children}</Container>
            <footer>
                <Container>
                    <ul>
                        <li>
                            <Link href="/privacy-policy">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                Home
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
