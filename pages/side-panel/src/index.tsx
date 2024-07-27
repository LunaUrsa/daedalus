import { createRoot } from 'react-dom/client';
import '@src/index.css';
import { HashRouter } from 'react-router-dom';
import SidePanel from '@src/SidePanel';
import { AppProvider } from '@extension/shared/lib/context/AppContext';

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);
  root.render(
    <AppProvider>
      <HashRouter>
        <SidePanel />
      </HashRouter>
    </AppProvider>,
  );
}

init();
