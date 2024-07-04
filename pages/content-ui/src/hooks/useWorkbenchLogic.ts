import { useEffect, useRef } from 'react';
import {
  // hideToastContainer,
  autoScrollTrace,
  repositionTraceWindow,
  updateHiddenElement,
} from '../util/scriptWorkbench';
import { useCodeMirror } from '@src/util/codeMirror';

export const useWorkbenchLogic = (userOptions: UserOptions) => {
  const traceRef = useRef<HTMLElement | null>(null);
  const mainViewRef = useCodeMirror(userOptions);

  useEffect(() => {
    const getScriptWindow = () => {
      const scriptWindow = document.querySelector('cpq-scripting-codemirror') as HTMLElement;
      if (scriptWindow) {
        console.log('scriptWindow after load', scriptWindow);
        scriptObserver.disconnect();
      }
    };

    const scriptObserver = new MutationObserver(getScriptWindow);
    scriptObserver.observe(document.body, { childList: true, subtree: true });

    // const onDOMContentLoaded = () => {
    //   setTimeout(() => {
    //     const scriptWindow = document.querySelector('cpq-scripting-codemirror') as HTMLElement;
    //     console.log('scriptWindow after load', scriptWindow);
    //   }, 1000); // Adjust the delay as needed
    // };
    // if (document.readyState === 'loading') {
    //   console.log('loading')
    //   document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
    // } else {
    //   console.log('loaded')
    //   onDOMContentLoaded();
    // }

    if (window.location.href.includes('ScriptWorkbench')) {
      const root = document.getElementById('sap-cpq-tools');
      const toolbarElement = document.getElementsByClassName('dev-admin-page')[0];
      if (toolbarElement && root) {
        toolbarElement.prepend(root);
        root.style.display = 'block';
      }

      const sapPage = document.getElementById('scriptDebuggerContainer');
      if (sapPage) {
        sapPage.style.display = 'None';
      }

      traceRef.current = document.getElementById('tracesContainer') as HTMLElement;

      // hideToastContainer(traceRef);
      autoScrollTrace(traceRef);
      repositionTraceWindow(traceRef);
      updateHiddenElement(mainViewRef, userOptions);
    } else if (window.location.href.includes('global-scripts')) {
      console.log('globalscripts');
      const root = document.getElementById('sap-cpq-tools');

      const scriptWindow = document.querySelector('cpq-scripting-codemirror') as HTMLElement;
      if (scriptWindow && root) {
        scriptWindow.prepend(root);
        root.style.display = 'block';
      } else {
        console.log('no scriptWindow', scriptWindow);
      }

      const cpqElement = document.querySelector('cpq-scripting-codemirror div') as HTMLElement;
      if (cpqElement) {
        cpqElement.style.display = 'None';
      } else {
        console.log('no cpqElement', cpqElement);
      }
    }
  }, [mainViewRef, userOptions]);

  return mainViewRef;
};
