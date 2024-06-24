import { createRoot } from 'react-dom/client';
import App from '@src/app';
// eslint-disable-next-line
// @ts-ignore
import tailwindcssOutput from '@src/tailwind-output.css?inline';
import { AppProvider } from '@chrome-extension-boilerplate/shared/lib/context/AppContext';

const root = document.createElement('div');
root.id = 'sap-cpq-tools';
root.style.display = 'none';

document.body.appendChild(root);

const styleElement = document.createElement('style');
styleElement.innerHTML = tailwindcssOutput;
document.head.appendChild(styleElement);

createRoot(root).render(
  <AppProvider>
    <App />
  </AppProvider>,
);
