import { useTheme } from 'context/ThemeContext';
import { Card } from 'react-bootstrap';
import { Node } from 'types/User.type';
import Image from 'next/image';
import styles from './ReposCard.module.scss';

type props = {
  repository: Node
}

const ReposCard = ({ repository }: props) => {
  const theme = useTheme();

  return (
    <Card className={`${styles[`card_${theme}`]} ${styles.card_custom}`}>
      <Card.Body className={`${styles.card_body} ${styles.card_body}`}>
        <div className={styles.repository}>
          <div className={styles.data}>
            <div>
              <h5>
                {repository.name}
              </h5>
            </div>
            <div>
              {repository.description}
            </div>
            <div className={styles.language}>
              {repository.primaryLanguage?.name}
            </div>
          </div>
          <div className={styles.link}>
            <a target="_blank" href={repository.url} rel="noreferrer">
              <Image
                src={`/images/github_${theme}.png`}
                width="30"
                height="30"
              />
            </a>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ReposCard;
