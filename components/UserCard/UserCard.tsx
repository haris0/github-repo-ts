import { useTheme } from 'context/ThemeContext';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from 'react-bootstrap';
import { Node } from 'types/Search.type';
import styles from './UserCard.module.scss';

type props = {
  user: Node
}

const UserCard = ({ user }: props) => {
  const theme = useTheme();

  return (
    <Card className={`${styles[`card_${theme}`]} ${styles.card_custom}`}>
      <Card.Body className={styles.card_body}>
        <Link href={`/user/${user.login}`} passHref>
          <a href={`/user/${user.login}`}>
            <div className={styles.avatar}>
              <Image
                src={user.avatarUrl}
                placeholder="blur"
                blurDataURL={user.avatarUrl}
                alt={user.login}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </a>
        </Link>
        <div className={styles.user_data}>
          <Link href={`/user/${user.login}`} passHref>
            <a href={`/user/${user.login}`}>
              <div className={styles.name}>
                {user?.name && (
                  <b className={styles.user_name}>{user?.name}</b>
                )}
                <b>{user.login}</b>
              </div>
            </a>
          </Link>
          <div>
            {user.bio}
          </div>
          <div className={styles.loc_email}>
            <span>{user.location}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
