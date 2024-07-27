/* eslint-disable import/namespace */
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';

// import * as themes from "@uiw/codemirror-themes-all";

// import useAppContext from '@extension/shared/lib/hooks/useAppContext';

/* See https://github.com/uiwjs/react-codemirror for documentation */

const ModEditor: React.FC<ModEditProps> = ({ mod, handleChange }) => {
  // const { codeMirrorOptions } = useAppContext();

  return (
    <div>
      <CodeMirror
        value={mod.content}
        style={{
          border: mod.isValidCode ? 'none' : '1px solid red',
        }}
        height="200px"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // theme={
        //   themes[codeMirrorOptions?.theme as keyof typeof themes] ||
        //   codeMirrorOptions?.theme
        // }
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          foldGutter: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          searchKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
          tabSize: 2,
        }}
        extensions={[css()]}
        onUpdate={viewUpdate => {
          if (mod.content !== viewUpdate.state.doc.toString()) {
            handleChange(mod.id, 'content', viewUpdate.state.doc.toString());
          }
        }}
      />
    </div>
  );
};

export default ModEditor;
