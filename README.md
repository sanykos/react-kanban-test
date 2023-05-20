# Kanban доска

## Запуск проекта

### `npm install && npm run dev`

## Инструменты

- React + Redux, JS или TS – на выбор. Для визуального оформления можно использовать любую библиотеку типа bootstrap, materialize и тд, но лучше если сразу [CONSTA](https://consta.design/libs/uikit){:target="\_blank"}. В качестве источника данных можно использовать любой сервис типа [jsonplaceholder](https://jsonplaceholder.typicode.com/){:target="\_blank"}.

## Условие

- На доске должны быть 4 колонки с заголовками «Очередь», «В работе», «На проверке», «Выполнено»;
- Реализовать получение уже имеющихся карточек и вывод на доску;
- Реализовать добавление новых карточек в первую колонку. В карточке должны быть поля «ID», «Заголовок», «Описание»;
- Реализовать перетягивание курсором мыши карточки из одной колонки в другую. Причём карточка может двигаться только слева направо, и только в ближайшую колонку;
- Добавить кнопку удаления карточки;
- Обязательно реализовать запросы к API на получение, обновление, удаление карточек. Даже если данные не откуда получить, запрос должен быть написан;
