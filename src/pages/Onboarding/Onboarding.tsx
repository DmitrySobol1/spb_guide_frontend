import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Page } from '@/components/Page.tsx';
import { ActionButton } from '@/components/ActionButton/ActionButton.tsx';

import styles from './Onboarding.module.css';

export const Onboarding: FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/index');
  };

  return (
    <Page back={false}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <img
            src="/assets/tours/spb2.jpg"
            alt="Санкт-Петербург"
            className={styles.mainImage}
          />
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>
            Добро пожаловать в<br />Санкт-Петербург!
          </h1>
        </div>

        <ActionButton className={styles.button} onClick={handleStart}>
          Начать путешествие
        </ActionButton>
      </div>
    </Page>
  );
};
