import { FC, useState } from 'react';
import { Button } from '@consta/uikit/Button';
import { Modal } from '@consta/uikit/Modal';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';

import styles from './styles.module.scss';

import { useAppDispatch } from '@/hooks/redux';
import { fetchAddCard } from '@/store/reducers/ActionCreators';

import { ICard } from '@/types';

export const AddNewCard: FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState<string | null>('');
  const [description, setDescription] = useState<string | null>('');

  const dispatch = useAppDispatch();

  const handleChangeTitle = ({ value }: { value: string | null }) => {
    setTitle(value);
  };

  const handleChangeDescription = ({ value }: { value: string | null }) => {
    setDescription(value);
  };

  const addCardHandler = () => {
    dispatch(fetchAddCard({ title, body: description } as ICard));
  };

  return (
    <>
      <Modal
        isOpen={showForm}
        hasOverlay
        onClickOutside={() => setShowForm(false)}
        onEsc={() => setShowForm(false)}
        className={styles.newCardModal}
      >
        <Text
          as="h2"
          size="xl"
          view="primary"
          className={styles.newCardModalTitle}
        >
          Добавить новую карточку
        </Text>
        <div className={styles.formWrapper}>
          <TextField
            className={styles.newCardTitleField}
            placeholder="Введите название карточки"
            label="Название карточки"
            labelPosition="top"
            value={title}
            autoFocus
            onChange={handleChangeTitle}
          />

          <TextField
            className={styles.newCardDescriptionField}
            placeholder="Введите описание карточки"
            label="Описание карточки"
            labelPosition="top"
            value={description}
            onChange={handleChangeDescription}
          />
        </div>
        <div className={styles.wrapperBtns}>
          <Button
            className={styles.closeModalBtn}
            size="m"
            view="secondary"
            label="Закрыть"
            width="default"
            onClick={() => setShowForm(false)}
          />
          <Button
            className={styles.addCardBtn}
            size="m"
            view="primary"
            label="Добавить"
            width="default"
            onClick={addCardHandler}
            disabled={!(title && description)}
          />
        </div>
      </Modal>
      <Button label="Добавить" onClick={() => setShowForm(true)} />
    </>
  );
};
