import { useSwitchTheme, useTheme } from 'context/ThemeContext';
import Link from 'next/link';
import Image from 'next/image';
import {
  Container,
  Navbar,
  Nav,
} from 'react-bootstrap';
import styles from './Navbar.module.scss';

const NavigationBar = () => {
  const theme = useTheme();
  const switchTheme = useSwitchTheme();

  return (
    <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" className={styles.navbar}>
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand className={styles.nav_brand}>
            <b>Github Repos</b>
          </Navbar.Brand>
        </Link>
        <Nav className="me-auto" />
        <Nav>
          <button type="button" onClick={switchTheme} className={styles.theme_button}>
            {theme === 'dark' && (
              <Image alt="Light" src="/images/Sun.png" height="25px" width="25px" />
            )}
            {theme === 'light' && (
              <Image alt="Dark" src="/images/Moon.png" height="20px" width="20px" />
            )}
          </button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
