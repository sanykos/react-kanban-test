import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend as Backend } from 'react-dnd-html5-backend';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Header } from '@consta/uikit/Header';
import { Text } from '@consta/uikit/Text';

import { Board } from '../components/Board';
import { setupStore } from '../store/store';

const store = setupStore();

const App = () => (
  <DndProvider backend={Backend}>
    <Provider store={store}>
      <Theme preset={presetGpnDefault}>
        <Header
          leftSide={
            <>
              <Text
                as="h1"
                view="brand"
                size="3xl"
                weight="bold"
                lineHeight="2xs"
              >
                Kanban board
              </Text>
            </>
          }
        />
        <Board />
      </Theme>
    </Provider>
  </DndProvider>
);

export default App;
