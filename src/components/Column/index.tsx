import { FC, memo } from 'react';
import { useDrop } from 'react-dnd';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';

import { moveCard, setDraggableItem } from '@store/reducers/boardSlice';

import { AddNewCard } from '../AddNewCard';
import { CardDraggable } from '../CardDraggable';

import { ColumnProps } from './interfaces';
import { STATUS_MAP } from './constants';

import styles from './styles.module.scss';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';

export const Column: FC<ColumnProps> = memo(
  ({ id, title, status, getTasksByListId }) => {
    const { draggedItem } = useAppSelector((state) => state.board);
    const dispatch = useAppDispatch();

    const cards = getTasksByListId(id);

    const [, drop] = useDrop({
      accept: ['CARD'],
      drop() {
        if (!draggedItem) {
          return;
        }
        if (draggedItem.columnId === id) {
          return;
        }

        if (cards.length) {
          return;
        }

        if (STATUS_MAP[draggedItem.status] === status) {
          dispatch(
            moveCard({
              draggedItemId: draggedItem.id,
              hoveredItemId: null,
              sourceColumnId: draggedItem.columnId,
              targetColumnId: id,
            })
          );
          dispatch(
            setDraggableItem({
              ...draggedItem,
              status,
              columnId: id,
            })
          );
        }
      },
    });

    return (
      <Card
        className={styles.column}
        verticalSpace="xs"
        horizontalSpace="xs"
        ref={drop}
      >
        <Text className={styles.columnTitle} as="h2" weight="bold" size="xl">
          {title}
        </Text>
        {cards.map((card) => (
          <CardDraggable
            key={card.id}
            id={card.id}
            title={card.title}
            body={card.body}
            status={status}
            columnId={id}
          />
        ))}
        {status === 'queue' && <AddNewCard />}
      </Card>
    );
  }
);
