import { FC, useEffect } from 'react';

import { Loader } from '@consta/uikit/Loader';
import { Informer } from '@consta/uikit/Informer';
import { useAppSelector, useAppDispatch } from '@hooks/redux';
import { fetchAllCards } from '@store/reducers/ActionCreators';

import { Column } from '../Column';

import styles from './styles.module.scss';

export const Board: FC = () => {
  const { boards, isLoading, error } = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCards());
  }, [dispatch]);

  if (error) {
    return (
      <Informer status="alert" view="filled" title="Ошибка" label={error} />
    );
  }

  if (isLoading) {
    return <Loader size="m" />;
  }

  return (
    <main className={styles.board}>
      {boards.map(({ id, title, status, cards }) => (
        <Column key={id} id={id} title={title} cards={cards} status={status} />
      ))}
    </main>
  );
};
