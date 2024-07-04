/* eslint-disable @typescript-eslint/no-unused-vars */
import { python } from '@codemirror/lang-python';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { Annotation, EditorState, Transaction } from '@codemirror/state';
import { useEffect, useRef } from 'react';
import {
  EditorView,
  lineNumbers,
  highlightActiveLineGutter,
  highlightSpecialChars,
  drawSelection,
  dropCursor,
  rectangularSelection,
  crosshairCursor,
  highlightActiveLine,
  keymap,
  ViewUpdate,
  scrollPastEnd,
  placeholder,
} from '@codemirror/view';
import {
  indentUnit,
  indentOnInput,
  codeFolding,
  foldGutter,
  foldKeymap,
  syntaxHighlighting,
  defaultHighlightStyle,
  bracketMatching,
  unfoldAll,
  // syntaxTree,
  // foldable,
  // foldEffect,
  foldCode,
  syntaxTree,
  foldable,
  foldEffect,
  foldAll,
} from '@codemirror/language';
import { indentWithTab, history, defaultKeymap, historyKeymap, undo, redo } from '@codemirror/commands';
import { search, highlightSelectionMatches, searchKeymap } from '@codemirror/search';
import { closeBrackets, autocompletion, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete';
import { lintGutter, lintKeymap } from '@codemirror/lint';
import { vscodeKeymap } from '@replit/codemirror-vscode-keymap';
// import { oneDark, oneDarkTheme } from "@codemirror/theme-one-dark";
import { updateHiddenElement } from './scriptWorkbench';
import { zebraStripes } from './zebraStripes';
import { saveToStorage } from '@chrome-extension-boilerplate/shared/lib/utils';

export const logoString = `
      ⠀⠀⠀⠀⢀⣴⢿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⢀⡾⠁⡞⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⠀⠀⢠⢺⠃⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⠀⢠⠏⢸⡄⠈⣇⠀⠀Daedalus⠀⠀⠀⠀⠀⠀⠀⠀
      ⠀⢸⡀⢸⡄⠀⠹⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⢀⡜⡇⠈⣿⡀⠀⠙⢄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⢸⠀⢳⠄⠹⣿⡄⠀⠈⢦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⣸⠆⢸⣧⡄⢸⣿⣶⠀⢠⠙⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⠀⠷⡀⠹⣷⣄⣻⣿⡟⠺⣷⡀⠉⠓⢤⡀⠀⠀⠀⠀⠀⠀⠀⠀
      ⢧⠀⣶⣄⡘⢿⣦⣽⣿⣄⠈⢱⡦⠀⠀⠉⠓⢤⡀⠀⠀⠀⠀⠀
      ⠘⣇⠈⠻⣷⡜⢻⣧⠉⠻⣄⠈⢻⣶⣴⠶⡄⠀⠙⡆⠀⠀⠀⠀
      ⠀⢻⠉⣄⠈⢿⣿⣿⣷⠀⠀⣶⣤⣀⣷⣀⠀⠀⠀⣸⠀⠀⠀⠀
      ⠀⠀⢧⡈⢿⣥⣍⣿⠉⠉⠃⢶⣦⣿⠀⠀⠀⠀⡚⠋⠀⠀⠀⠀
      ⠀⠀⠈⠳⣤⣈⠛⠻⢷⣦⣤⡄⣶⣾⣿⠃⠀⠀⠛⢦⡄⠀⠀⠀
      ⠀⠀⠀⠀⠀⠉⠒⠒⣾⠋⠁⠀⣈⣽⣿⣷⡆⠀⠀⠀⠘⡄⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⠹⠦⢴⠋⠁⠀⠹⣿⣿⣿⠀⠀⠀⠙⣄⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⢤⠴⠋⠀⡀⠛⠿⠟⡇⠠⠤⠤⠷
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠤⠴⣇⣠⣏⣰⠁⠀⠀⠀⠀
      `;

const extensions = (userOptions: UserOptions, editorViewRef: React.MutableRefObject<EditorView | null>) => [
  // // You could use basicSetup from the 'codemirror' npm package, but it's the same as below
  // basicSetup,
  // lineNumbers(),
  // highlightActiveLineGutter(),
  // highlightSpecialChars(),
  // history(),
  // foldGutter(),
  // codeFolding(),
  // drawSelection(),
  // dropCursor(),
  // indentOnInput(),
  // syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  // bracketMatching(),
  // closeBrackets(),
  // autocompletion(),
  // search(),
  // rectangularSelection(),
  // crosshairCursor(),
  // highlightActiveLine(),
  // highlightSelectionMatches(),

  // Language extension
  python(),

  // # Core Extensions

  // ## Editing https://codemirror.net/docs/extensions/#editing

  // ### Whitespace
  EditorState.tabSize.of(4), // Default: 4
  // EditorState.lineSeparator.of('\n'), // Default: '\n'
  indentUnit.of('    '), // Default: '  ' (two spaces)
  indentOnInput(),

  // // ### Read-Only
  // EditorView.editable.of(true), // Default: true
  // EditorState.readOnly.of(false), // Default: false

  // // ### Editing Helpers
  EditorState.allowMultipleSelections.of(true), // Default: false
  autocompletion(),
  closeBrackets(),
  codeFolding(),
  search(),

  // ## Presentation
  dracula, // Theme
  zebraStripes({ step: 2 }), // Zebra stripes

  EditorView.theme({
    // Change height of editor
    '&': { height: '100%', maxHeight: '100%' },
    '.cm-scroller': { overflow: 'auto' },
    '.cm-content, .cm-gutter': { minHeight: '222px' },
  }),

  // ## Presentation Features
  drawSelection(),
  EditorView.lineWrapping,
  highlightActiveLine(),
  highlightSpecialChars(),
  scrollPastEnd(),
  bracketMatching(),
  highlightSelectionMatches(),
  placeholder('Enter your code here...'),

  // ## Gutters
  lineNumbers(),
  foldGutter(),
  lintGutter(),
  highlightActiveLineGutter(),

  // ## Tooltips

  // Input Handling
  dropCursor(),
  keymap.of([
    ...vscodeKeymap,
    ...defaultKeymap,
    ...closeBracketsKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
    ...lintKeymap,
    indentWithTab,
  ]),
  // EditorView.dragMovesSelection,
  rectangularSelection(),
  crosshairCursor(),

  // Language
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  // linter(source: null),

  // Primitives
  EditorView.updateListener.of((update: ViewUpdate) => {
    if (update.docChanged) {
      updateHiddenElement(editorViewRef, userOptions);
    }
  }),
];

const syncAnnotation = Annotation.define<boolean>();

function syncDispatch(tr: Transaction, view: EditorView, other: EditorView) {
  view.update([tr]);
  if (!tr.changes.empty && !tr.annotation(syncAnnotation)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const annotations: Annotation<any>[] = [syncAnnotation.of(true)];
    const userEvent = tr.annotation(Transaction.userEvent);
    if (userEvent) annotations.push(Transaction.userEvent.of(userEvent));
    other.dispatch({ changes: tr.changes, annotations });
  }
}

export const mainState = (userOptions: UserOptions, editorViewRef: React.MutableRefObject<EditorView | null>) => {
  return EditorState.create({
    doc: userOptions.workbenchCode || logoString,
    extensions: [history(), ...extensions(userOptions, editorViewRef)],
  });
};

export const otherState = (
  userOptions: UserOptions,
  editorViewRef: React.MutableRefObject<EditorView | null>,
  startState: EditorState,
  startView: EditorView,
) => {
  return EditorState.create({
    doc: startState.doc,
    extensions: [
      ...extensions(userOptions, editorViewRef),
      keymap.of([
        ...defaultKeymap,
        { key: 'Mod-z', run: () => undo(startView) },
        { key: 'Mod-y', mac: 'Mod-Shift-z', run: () => redo(startView) },
      ]),
    ],
  });
};

export const useCodeMirror = (userOptions: UserOptions) => {
  const mainViewRef = useRef<EditorView | null>(null);
  const mainStateRef = useRef<EditorState | null>(null);
  const otherViewRef = useRef<EditorView | null>(null);

  // Create main state
  useEffect(() => {
    if (!mainStateRef.current) {
      mainStateRef.current = mainState(userOptions, mainViewRef);
      // console.log('mainStateRef', mainStateRef.current);
    }
  }, [userOptions]);

  // Create main view
  useEffect(() => {
    if (!mainViewRef.current && mainStateRef.current) {
      mainViewRef.current = new EditorView({
        state: mainStateRef.current,
        parent: document.getElementById('custom-editor') as HTMLElement,
        dispatch: tr => syncDispatch(tr, mainViewRef.current as EditorView, otherViewRef.current as EditorView),
      });
      // console.log('mainViewRef', mainViewRef.current);
    }
  }, []);

  // Create other view
  useEffect(() => {
    if (!mainViewRef.current || !mainStateRef.current) return;
    if (!otherViewRef.current) {
      const otherStateInstance = otherState(userOptions, mainViewRef, mainStateRef.current, mainViewRef.current);
      otherViewRef.current = new EditorView({
        state: otherStateInstance,
        parent: document.getElementById('custom-editor2') as HTMLElement,
        dispatch: tr => syncDispatch(tr, otherViewRef.current as EditorView, mainViewRef.current as EditorView),
      });
    }
  }, [userOptions]);

  return mainViewRef;
};

export const handleFoldClick = (
  setIsFolded: React.Dispatch<React.SetStateAction<boolean>>,
  editorViewRef: React.MutableRefObject<EditorView | null>,
) => {
  setIsFolded(prevValue => {
    if (editorViewRef.current) {
      if (prevValue) {
        // console.log('unfolding code');
        unfoldAll(editorViewRef.current);
      } else {
        // console.log('folding code');
        // foldAll(editorViewRef.current);
        foldAllRecursive(editorViewRef.current);
      }
    } else {
      console.error('CodeMirror editor not found');
    }
    return !prevValue;
  });
};

// Function to fold all levels of code
function foldAllRecursive(view: EditorView) {
  const state = view.state;

  // Traverse the syntax tree and collect all foldable ranges
  const foldRanges: { from: number, to: number }[] = [];
  syntaxTree(state).iterate({
    enter(node) {
      const isFoldable = foldable(state, node.from, node.to)
      if (isFoldable) {
        foldRanges.push({ from: isFoldable.from, to: isFoldable.to });
      }
    }
  });

  view.dispatch({
    effects: foldRanges.map(range => foldEffect.of({ from: range.from, to: range.to }))
  });
}

export const handleFullScreenClick = (setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>) => {
  console.log('Full screen button clicked');
  setIsFullscreen(prevValue => {
    return !prevValue;
  });

  // if (editorRef.current && toolbarRef.current && scrollRef.current) {
  //   editorRef.current.classList.add('col-sm-8', 'col-md-8', 'largeleft');
  //   editorRef.current.style.position = 'fixed';
  //   editorRef.current.style.top = '40px';
  //   editorRef.current.style.left = '0';
  //   editorRef.current.style.width = '100vw';
  //   editorRef.current.style.height = 'calc(100vh - 40px)';
  //   editorRef.current.style.zIndex = '1000';
  //   editorRef.current.style.overflow = 'auto';

  //   toolbarRef.current.style.position = 'fixed';
  //   toolbarRef.current.style.top = '0';
  //   toolbarRef.current.style.left = '0';
  //   toolbarRef.current.style.width = '100vw';
  //   toolbarRef.current.style.zIndex = '1001';
  //   toolbarRef.current.style.display = 'flex';

  //   scrollRef.current.style.maxHeight = 'none';

  //   document.addEventListener('keydown', handleEscape);
  //   if (showFullScreenAlert) {
  //     setIsFullScreenAlertOpen(true);
  //   }
  // } else {
  //   console.error('CodeMirror editor or toolbar element not found');
  // }
};

export const handleSplitScreenClick = (
  userOptions: UserOptions,
  setUserOptions: React.Dispatch<React.SetStateAction<UserOptions>>,
) => {
  // console.log('Split screen button clicked', userOptions.workbenchIsSplit);
  setUserOptions(prevValues => {
    const newOptions = {
      ...prevValues,
      workbenchIsSplit: !prevValues.workbenchIsSplit,
    };
    console.log('newOptions', newOptions);
    saveToStorage('userOptions', newOptions);
    return newOptions;
  });
};

// const handleEscape = useCallback((event: KeyboardEvent) => {
//   if (event.key === 'Escape' && editorRef.current && toolbarRef.current) {
//     editorRef.current.style.cssText = originalEditorStyle.current;
//     toolbarRef.current.style.cssText = originalToolbarStyle.current;
//     document.removeEventListener('keydown', handleEscape);
//   }
// }, []);

// const handleFullScreenAlertClose = (doNotShowAgain: boolean) => {
//   setIsFullScreenAlertOpen(false);
//   if (doNotShowAgain) {
//     setShowFullScreenAlert(false);
//   }
// };
