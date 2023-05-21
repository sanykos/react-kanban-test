import { FC, useEffect } from 'react';

import { Loader } from '@consta/uikit/Loader';
import { Informer } from '@consta/uikit/Informer';
import { useAppSelector, useAppDispatch } from '@hooks/redux';
import { fetchAllCards } from '@store/reducers/ActionCreators';

import { Column } from '../Column';

import styles from './styles.module.scss';

export const Board: FC = () => {
  const { boards, isLoading, error } = useAppSelector((state) => state.board);
  const getTasksByListId = (id: number) => {
    return boards.find((board) => board.id === id)?.cards || [];
  };

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
      {boards.map(({ id, title, status }) => (
        <Column
          key={id}
          id={id}
          title={title}
          getTasksByListId={getTasksByListId}
          status={status}
        />
      ))}
    </main>
  );
};
