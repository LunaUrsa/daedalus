import { createRoot } from 'react-dom/client';
import '@src/index.css';
import Options from '@src/Options';
import { AppProvider } from '@extension/shared/lib/context/AppContext';

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);
  root.render(
    <AppProvider>
      <Options />
    </AppProvider>,
  );
}

init();
