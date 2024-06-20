import { useEffect, useRef } from 'react';
import { hideToastContainer, autoScrollTrace, repositionTraceWindow, updateHiddenElement } from '../util/scriptWorkbench';
import { EditorView } from 'codemirror';

export const useTraceManagement = (editorViewRef: React.MutableRefObject<EditorView | null>, userOptions: any) => {
  const traceRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    traceRef.current = document.getElementById('tracesContainer') as HTMLElement;

    if (window.location.href.includes('ScriptWorkbench')) {
      hideToastContainer(traceRef);
      autoScrollTrace(traceRef);
      repositionTraceWindow(traceRef);
      updateHiddenElement(editorViewRef, userOptions);
    }
  }, [editorViewRef, userOptions]);

  return traceRef;
};