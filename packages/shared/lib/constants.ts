import { stripIndent } from 'common-tags';

export const defaultUserPreferences: UserOptions = {
  isDarkMode: true,
  language: 'en',
  openInSidePanel: false,
  workbenchView: 'Default' as WorkbenchViews,
  scriptingView: 'Default' as ScriptingViews,
  scriptingMode: 'Standard' as ScriptingModes,
  workbenchIsSplit: false,
  workbenchAlwaysClearTraces: true,
  workbenchCode: stripIndent`
class DataProcessor:
    def __init__(self, data):
        self.data = data
        self.processed_data = None

    def transform_data(self):
        self.processed_data = self._complex_algorithm(self.data)

    def _complex_algorithm(self, data):
        result = []
        for i in range(len(data)):
            intermediate = self._nested_loop(data, i)
            result.append(intermediate)
        return result

    def _nested_loop(self, data, index):
        result = 0
        for i in range(len(data)):
            for j in range(len(data)):
                result += self._meaningless_calculation(data[i], data[j], index)
        return result

    def _meaningless_calculation(self, a, b, c):
        return (a * b - c) + (a + b + c) - (a - b + c)

    def run(self):
        self.transform_data()
        self._finalize()

    def _finalize(self):
        # Finalize the process, but don't do anything meaningful
        Trace.Write('Hello World!')
        pass

if __name__ == "__builtin__":
    data = [i for i in range(1, 3)]  # Generate a list of numbers from 1 to 100
    processor = DataProcessor(data)
    processor.run()`,
  // downloadLocations: {},
};

export const codeMirrorThemes = {
  Default: 'default',
  Light: 'light',
  Dark: 'dark',
  Day3024: '3024-day',
  Night3024: '3024-night',
  Abbott: 'abbott',
  Abcdef: 'abcdef',
  AmbianceMobile: 'ambiance-mobile',
  Ambiance: 'ambiance',
  AyuDark: 'ayu-dark',
  AyuMirage: 'ayu-mirage',
  Base16Dark: 'base16-dark',
  Base16Light: 'base16-light',
  Bespin: 'bespin',
  Blackboard: 'blackboard',
  Cobalt: 'cobalt',
  Colorforth: 'colorforth',
  Darcula: 'darcula',
  Dracula: 'dracula',
  DuotoneDark: 'duotone-dark',
  DuotoneLight: 'duotone-light',
  Eclipse: 'eclipse',
  Elegant: 'elegant',
  ErlangDark: 'erlang-dark',
  GruvboxDark: 'gruvbox-dark',
  Hopscotch: 'hopscotch',
  Icecoder: 'icecoder',
  Idea: 'idea',
  Isotope: 'isotope',
  Juejin: 'juejin',
  LesserDark: 'lesser-dark',
  Liquibyte: 'liquibyte',
  Lucario: 'lucario',
  MaterialDarker: 'material-darker',
  MaterialOcean: 'material-ocean',
  MaterialPalenight: 'material-palenight',
  Material: 'material',
  Mbo: 'mbo',
  MdnLike: 'mdn-like',
  Midnight: 'midnight',
  Monokai: 'monokai',
  Moxer: 'moxer',
  Neat: 'neat',
  Neo: 'neo',
  Night: 'night',
  Nord: 'nord',
  OceanicNext: 'oceanic-next',
  PandaSyntax: 'panda-syntax',
  ParaisoDark: 'paraiso-dark',
  ParaisoLight: 'paraiso-light',
  PastelOnDark: 'pastel-on-dark',
  Railscasts: 'railscasts',
  Rubyblue: 'rubyblue',
  Seti: 'seti',
  Shadowfox: 'shadowfox',
  Solarized: 'solarized',
  Ssms: 'ssms',
  TheMatrix: 'the-matrix',
  TomorrowNightBright: 'tomorrow-night-bright',
  TomorrowNightEighties: 'tomorrow-night-eighties',
  Ttcn: 'ttcn',
  Twilight: 'twilight',
  VibrantInk: 'vibrant-ink',
  XqDark: 'xq-dark',
  XqLight: 'xq-light',
  Yeti: 'yeti',
  Yonce: 'yonce',
  Zenburn: 'zenburn',
};

export const defaultCodePreferences: CodeMirrorOptions = {
  // The starting value of the editor. Can be a string, or a document object.
  // value: '',
  // The mode to use.
  // When not given, this will default to the first mode that was loaded.
  // It may be a string, which either simply names the mode or is a MIME type associated with the mode.
  // Alternatively, it may be an object containing configuration options for the mode.
  // mode: {
  //   name: "python",
  //   singleLineStringErrors: false,
  //   version: 3
  // },
  // pythonVersion: 2,
  // Explicitly set the line separator for the editor.
  // By default (value null), the document will be split on CRLFs as well as lone CRs and LFs,
  // and a single LF will be used as line separator in all output (such as getValue).
  lineSeparator: null,
  // The theme to style the editor with.
  // You must make sure the CSS file defining the corresponding .cm-s-[name] styles is loaded.
  theme: 'darcula' as CodeMirrorTheme, // SAP default = "default"
  // How many spaces a block (whatever that means in the edited language) should be indented.
  indentUnit: 4,
  // Whether to use the context-sensitive indentation that the mode provides (or just indent the same as the line before).
  smartIndent: true,
  // The width of a tab character.
  tabSize: 4,
  // Whether, when indenting, the first N*tabSize spaces should be replaced by N tabs.
  indentWithTabs: false,
  // Configures whether the editor should re-indent the current line when a character is typed that might
  // change its proper indentation (only works if the mode supports indentation).
  electricChars: true,
  scrollbarStyle: 'overlay',
  // Flips overall layout and selects base paragraph direction to be left-to-right or right-to-left.
  // direction: "ltr",
  // Determines whether horizontal cursor movement through right-to-left (Arabic, Hebrew) text is
  // visual (pressing the left arrow moves the cursor left) or
  // logical (pressing the left arrow moves to the next lower index in the string, which is visually right in right-to-left text).
  // rtlMoveVisually: false,
  // Configures the key map to use. The default is "default", which is the only key map defined in codemirror.js itself.
  // You can also use 'emacs', 'sublime', 'vim' or a custom key map that you define.
  // https://codemirror.net/5/doc/manual.html#keymaps
  keyMap: 'default',
  // Can be used to specify extra key bindings for the editor, alongside the ones defined by keyMap.
  // extraKeys: {
  //   "Ctrl-Space": "autocomplete"
  // },
  // Allows you to configure the behavior of mouse selection and dragging.
  // configureMouse: null,
  // Whether CodeMirror should scroll or wrap for long lines.
  lineWrapping: true,
  // Whether to show line numbers to the left of the editor.
  lineNumbers: true,
  // At which number to start counting lines.
  firstLineNumber: 1,
  // Can be used to add extra gutters (beyond or instead of the line number gutter).
  // gutters: [],
  // Determines whether the gutter scrolls along with the content horizontally (false)
  // or whether it stays fixed during horizontal scrolling (true, the default).
  fixedGutter: true,
  // Chooses a scrollbar implementation. The default is "native", showing native scrollbars.
  // When fixedGutter is on, and there is a horizontal scrollbar, by default the gutter will be visible to the left of this scrollbar.
  coverGutterNextToScrollbar: false,
  // Selects the way CodeMirror handles input and focus.
  // inputStyle: "textarea",
  // This label is read by the screen readers when CodeMirror text area is focused.
  // screenReaderLabel: null,
  // Whether the cursor should be drawn when a selection is active.
  showCursorWhenSelecting: false,
  // When enabled, which is the default, doing copy or cut when there is no selection will copy or cut the whole lines that have cursors on them.
  lineWiseCopyCut: true,
  // When pasting something from an external source (not from the editor itself),
  // if the number of lines matches the number of selection, CodeMirror will by default insert one line per selection.
  pasteLinesPerSelection: true,
  // Determines whether multiple selections are joined as soon as they touch (the default) or only when they overlap (true).
  selectionsMayTouch: false,
  // The maximum number of undo levels that the editor stores. Note that this includes selection change events. Defaults to 200.
  undoDepth: 200,
  // The period of inactivity (in milliseconds) that will cause a new history event to be started when typing or deleting.
  historyEventDelay: 1250,
  // The tab index to assign to the editor. If not given, no tab index will be assigned.
  // tabindex: null,
  // Can be used to make CodeMirror focus itself on initialization.
  autofocus: true, // SAP default = false
  // Some addons run user-visible strings (such as labels in the interface) through the phrase method to allow for translation.
  // phrases: null,

  // Below this a few more specialized, low-level options are listed.
  //These are only useful in very specific situations.
  // You might want to skip them the first time you read this manual.

  // Controls whether drag-and-drop is enabled.
  // dragDrop: true,
  // When set (default is null) only files whose type is in the array can be dropped into the editor.
  // allowDropFileTypes: null,
  // Half-period in milliseconds used for cursor blinking.
  // cursorBlinkRate: 530,
  // How much extra space to always keep above and below the cursor when approaching the top or bottom of the visible view in a scrollable document.
  cursorScrollMargin: 0,
  // Determines the height of the cursor. Default is 1, meaning it spans the whole height of the line.
  // cursorHeight: 1,
  // If set to true (the default), will keep the cursor height constant for an entire line (or wrapped part of a line).
  // When false, the cursor's height is based on the height of the adjacent reference character.
  // singleCursorHeightPerLine: true,
  // Controls whether, when the context menu is opened with a click outside of the current selection, the cursor is moved to the point of the click.
  resetSelectionOnContextMenu: true,
  // Highlighting is done by a pseudo background-thread that will work for workTime milliseconds, and then use timeout to sleep for workDelay milliseconds.
  // workTime: 100,
  // workDelay: 100,
  // Indicates how quickly CodeMirror should poll its input textarea for changes (when focused).
  // pollInterval: 100,
  // By default, CodeMirror will combine adjacent tokens into a single span if they have the same class.
  // flattenSpans: true,
  // When enabled (off by default), an extra CSS class will be added to each token, indicating the (inner) mode that produced it, prefixed with "cm-m-".
  // addModeClass: false,
  // When highlighting long lines, in order to stay responsive, the editor will give up and simply style the rest of the line as plain text when it reaches a certain position.
  maxHighlightLength: 60000,
  // Specifies the amount of lines that are rendered above and below the part of the document that's currently scrolled into view.
  // Can be set to Infinity to make sure the whole document is always rendered, and thus the browser's text search works on it.
  // This will have bad effects on performance of big documents.
  viewportMargin: 10,
  // Specifies whether or not spellcheck will be enabled on the input.
  spellCheck: true, // SAP default = false
  // Specifies whether or not auto-capitalization will be enabled on the input.
  autoCapitalize: true,
  // Specifies whether or not autocorrect will be enabled on the input.
  autoCorrect: true,
  // when set to true, will make the editor full-screen (as in, taking up the whole browser window).
  // fullScreen: false,

  // SAP addons
  // The following are addon options that are not enabled by default.

  // SAP custom options, id what these are
  // disableInput: false,
  // moveInputWithCursor: true,
  // tabMode: "shift",
  // wholeLineUpdateBefore: true,

  // Addon Options
  search: true,
  jumpToLine: true,
  matchesOnScrollbar: true,
  matchBrackets: true,
  autoCloseBrackets: true,
  matchTags: true,
  showTrailingSpace: true,
  // autoCloseTags: true,
  // continueList: true,
  comments: true,
  foldCode: true,
  autoComplete: true,
  highlightSelectionMatches: true,
  linting: true,
  markSelection: true,
  styleActiveLine: true,
  selectionPointer: true,
  continueComment: true,
  scrollPastEnd: true,
  continueComments: true,
};

export const sapDefaultPreferences: CodeMirrorOptions = {
  // "mode": {
  //   "name": "python",
  //   "version": 3,
  //   "singleLineStringErrors": false
  // },
  // pythonVersion: 3,
  lineSeparator: null,
  theme: 'default' as CodeMirrorTheme,
  indentUnit: 4,
  smartIndent: true,
  tabSize: 4,
  indentWithTabs: false,
  electricChars: true,
  // extraKeys: {
  //   "Ctrl-Space": "autocomplete"
  // },
  // direction: "ltr",
  // rtlMoveVisually: false,
  keyMap: 'default',
  lineWrapping: true,
  lineNumbers: true,
  firstLineNumber: 1,
  fixedGutter: true,
  scrollbarStyle: 'native',
  coverGutterNextToScrollbar: false,
  showCursorWhenSelecting: false,
  lineWiseCopyCut: true,
  pasteLinesPerSelection: true,
  selectionsMayTouch: false,
  undoDepth: 200,
  historyEventDelay: 1250,
  autofocus: false,
  // cursorBlinkRate: 530,
  cursorScrollMargin: 0,
  resetSelectionOnContextMenu: true,
  maxHighlightLength: 10000,
  viewportMargin: 10,
  spellCheck: false,
  autoCapitalize: false,
  autoCorrect: false,
  // closeBrackets: false,
  // closeTag: false,

  // Addon Options
  search: true,
  jumpToLine: true,
  matchesOnScrollbar: true,
  matchBrackets: true,
  autoCloseBrackets: true,
  matchTags: true,
  showTrailingSpace: true,
  // autoCloseTags: true,
  // continueList: true,
  comments: true,
  foldCode: true,
  autoComplete: true,
  highlightSelectionMatches: true,
  linting: true,
  markSelection: true,
  styleActiveLine: true,
  selectionPointer: true,
  continueComment: true,
  scrollPastEnd: true,
  continueComments: true,

  // "tabMode": "shift",
  // "readOnly": false,
  // "value": "",
  // "specialChars": {},
  // "wholeLineUpdateBefore": true,
  // "disableInput": false,
  // "dragDrop": true,
  // "cursorHeight": 1,
  // "workTime": 100,
  // "workDelay": 100,
  // "flattenSpans": true,
  // "addModeClass": false,
  // "pollInterval": 100,
  // "moveInputWithCursor": true,
  // "tabindex": null,
  // "hintOptions": null,
  // "fullScreen": false
};

export const themeOptions = Object.values(codeMirrorThemes);

export const codeMirrorOptionsConfig: Option[] = [
  // { label: "Mode", key: "mode", type: "select", tooltip: "The mode to use. It may be a string or an object containing configuration options for the mode.", options: ["python", "javascript", "html", "css", "xml", "markdown"] },
  // { label: "Python Version", key: "pythonVersion", type: "select", tooltip: "Which version of python are you aiming for?", options: ['2', '3'] },
  {
    label: 'Line Separator',
    key: 'lineSeparator',
    type: 'string',
    tooltip: 'Explicitly set the line separator for the editor.',
  },
  {
    label: 'Theme',
    key: 'theme',
    type: 'select',
    tooltip: 'The theme to style the editor with.',
    options: themeOptions,
  },
  { label: 'Indent Unit', key: 'indentUnit', type: 'number', tooltip: 'How many spaces a block should be indented.' },
  {
    label: 'Smart Indent',
    key: 'smartIndent',
    type: 'switch',
    tooltip: 'Whether to use the context-sensitive indentation that the mode provides.',
  },
  { label: 'Tab Size', key: 'tabSize', type: 'number', tooltip: 'The width of a tab character.' },
  {
    label: 'Indent with Tabs',
    key: 'indentWithTabs',
    type: 'switch',
    tooltip: 'Whether to replace spaces with tabs when indenting.',
  },
  {
    label: 'Electric Characters',
    key: 'electricChars',
    type: 'switch',
    tooltip:
      'Configures whether the editor should re-indent the current line when a character is typed that might change its proper indentation.',
  },
  // { label: "Direction", key: "direction", type: "select", tooltip: "Flips overall layout and selects base paragraph direction to be left-to-right or right-to-left.", options: ["ltr", "rtl"] },
  // { label: "RTL Move Visually", key: "rtlMoveVisually", type: "switch", tooltip: "Determines whether horizontal cursor movement through right-to-left text is visual or logical." },
  {
    label: 'Key Map',
    key: 'keyMap',
    type: 'select',
    tooltip: 'Configures the key map to use.',
    options: ['default', 'emacs', 'sublime', 'vim'],
  },
  // { label: "Extra Keys", key: "extraKeys", type: "select", tooltip: "Specifies extra key bindings for the editor." },
  // { label: "Configure Mouse", key: "configureMouse", type: "select", tooltip: "Allows you to configure the behavior of mouse selection and dragging." },
  {
    label: 'Line Wrapping',
    key: 'lineWrapping',
    type: 'switch',
    tooltip: 'Whether CodeMirror should scroll or wrap for long lines.',
  },
  {
    label: 'Line Numbers',
    key: 'lineNumbers',
    type: 'switch',
    tooltip: 'Whether to show line numbers to the left of the editor.',
  },
  {
    label: 'First Line Number',
    key: 'firstLineNumber',
    type: 'number',
    tooltip: 'At which number to start counting lines.',
  },
  // { label: "Gutters", key: "gutters", type: "select", tooltip: "Can be used to add extra gutters (beyond or instead of the line number gutter)." },
  {
    label: 'Fixed Gutter',
    key: 'fixedGutter',
    type: 'switch',
    tooltip: 'Determines whether the gutter scrolls along with the content horizontally or stays fixed.',
  },
  {
    label: 'Cover Gutter Next to Scrollbar',
    key: 'coverGutterNextToScrollbar',
    type: 'switch',
    tooltip: 'When fixedGutter is on, determines whether the gutter will be visible to the left of the scrollbar.',
  },
  {
    label: 'Scrollbar Style',
    key: 'scrollbarStyle',
    type: 'select',
    tooltip: 'Chooses a scrollbar implementation.',
    options: ['native', 'overlay'],
  },
  // { label: "Input Style", key: "inputStyle", type: "select", tooltip: "Selects the way CodeMirror handles input and focus.", options: ["textarea", "contenteditable"] },
  // { label: "Screen Reader Label", key: "screenReaderLabel", type: "select", tooltip: "This label is read by the screen readers when CodeMirror text area is focused." },
  {
    label: 'Show Cursor When Selecting',
    key: 'showCursorWhenSelecting',
    type: 'switch',
    tooltip: 'Whether the cursor should be drawn when a selection is active.',
  },
  {
    label: 'Line Wise Copy Cut',
    key: 'lineWiseCopyCut',
    type: 'switch',
    tooltip:
      'Whether doing copy or cut when there is no selection will copy or cut the whole lines that have cursors on them.',
  },
  {
    label: 'Paste Lines Per Selection',
    key: 'pasteLinesPerSelection',
    type: 'switch',
    tooltip: 'When pasting from an external source, determines whether to insert one line per selection.',
  },
  {
    label: 'Selections May Touch',
    key: 'selectionsMayTouch',
    type: 'switch',
    tooltip: 'Determines whether multiple selections are joined as soon as they touch or only when they overlap.',
  },
  {
    label: 'Undo Depth',
    key: 'undoDepth',
    type: 'number',
    tooltip: 'The maximum number of undo levels that the editor stores.',
  },
  {
    label: 'History Event Delay',
    key: 'historyEventDelay',
    type: 'number',
    tooltip: 'The period of inactivity that will cause a new history event to be started when typing or deleting.',
  },
  // { label: "Tab Index", key: "tabindex", type: "select", tooltip: "The tab index to assign to the editor." },
  {
    label: 'Autofocus',
    key: 'autofocus',
    type: 'switch',
    tooltip: 'Can be used to make CodeMirror focus itself on initialization.',
  },
  // { label: "Phrases", key: "phrases", type: "select", tooltip: "Some addons run user-visible strings through the phrase method to allow for translation." },

  // Specialized options
  // { label: "Drag Drop", key: "dragDrop", type: "switch", tooltip: "Controls whether drag-and-drop is enabled." },
  // { label: "Allow Drop File Types", key: "allowDropFileTypes", type: "select", tooltip: "Only files whose type is in the array can be dropped into the editor." },
  // { label: "Cursor Blink Rate", key: "cursorBlinkRate", type: "number", tooltip: "Half-period in milliseconds used for cursor blinking." },
  {
    label: 'Cursor Scroll Margin',
    key: 'cursorScrollMargin',
    type: 'number',
    tooltip: 'How much extra space to always keep above and below the cursor.',
  },
  // { label: "Cursor Height", key: "cursorHeight", type: "select", tooltip: "Determines the height of the cursor." },
  // { label: "Single Cursor Height Per Line", key: "singleCursorHeightPerLine", type: "switch", tooltip: "When true, will keep the cursor height constant for an entire line." },
  {
    label: 'Reset Selection on Context Menu',
    key: 'resetSelectionOnContextMenu',
    type: 'switch',
    tooltip: 'Controls whether the cursor is moved to the point of the click when the context menu is opened.',
  },
  // { label: "Work Time", key: "workTime", type: "select", tooltip: "Highlighting is done by a pseudo background-thread that will work for workTime milliseconds." },
  // { label: "Work Delay", key: "workDelay", type: "select", tooltip: "The delay in milliseconds for the background-thread used for highlighting." },
  // { label: "Poll Interval", key: "pollInterval", type: "select", tooltip: "Indicates how quickly CodeMirror should poll its input textarea for changes." },
  // { label: "Flatten Spans", key: "flattenSpans", type: "switch", tooltip: "Whether to combine adjacent tokens into a single span if they have the same class." },
  // { label: "Add Mode Class", key: "addModeClass", type: "switch", tooltip: "When enabled, an extra CSS class will be added to each token indicating the mode that produced it." },
  {
    label: 'Max Highlight Length',
    key: 'maxHighlightLength',
    type: 'number',
    tooltip: 'The maximum length of lines to highlight before styling the rest as plain text.',
  },
  {
    label: 'Viewport Margin',
    key: 'viewportMargin',
    type: 'number',
    tooltip:
      'Specifies the amount of lines rendered above and below the part of the document currently scrolled into view.',
  },
  {
    label: 'Spellcheck',
    key: 'spellCheck',
    type: 'switch',
    tooltip: 'Specifies whether spellcheck will be enabled on the input.',
  },
  {
    label: 'Autocapitalize',
    key: 'autoCapitalize',
    type: 'switch',
    tooltip: 'Specifies whether autocapitalization will be enabled on the input.',
  },
  {
    label: 'Autocorrect',
    key: 'autoCorrect',
    type: 'switch',
    tooltip: 'Specifies whether autocorrect will be enabled on the input.',
  },

  // Addon Options
  { label: 'Search', key: 'search', type: 'switch', tooltip: 'Enables searching the code' },
  { label: 'Jump to line', key: 'jumpToLine', type: 'switch', tooltip: 'Adds jumping to line number with Alt-G' },
  {
    label: 'Matches on scrollbar',
    key: 'matchesOnScrollbar',
    type: 'switch',
    tooltip: "Search matches of the given query will be displayed on the editor's vertical scrollbar.",
  },
  {
    label: 'Match Brackets',
    key: 'matchBrackets',
    type: 'switch',
    tooltip: 'Causes matching brackets to be highlighted whenever the cursor is next to them.',
  },
  {
    label: 'Close Brackets',
    key: 'autoCloseBrackets',
    type: 'switch',
    tooltip: 'Automatically closes brackets when typed',
  },
  { label: 'Match Tags', key: 'matchTags', type: 'switch', tooltip: 'Whether to highlight the matching tag.' },
  {
    label: 'Show Trailing Space',
    key: 'showTrailingSpace',
    type: 'switch',
    tooltip: 'Adds a CSS class to stretches of whitespace at the end of lines.',
  },
  // { label: "", key: "autoCloseTags", type: "", tooltip: "" },
  // { label: "", key: "continueList", type: "switch", tooltip: "" },
  { label: 'Comments', key: 'comments', type: 'switch', tooltip: 'Addon for commenting and uncommenting code.' },
  {
    label: 'Fold Code',
    key: 'foldCode',
    type: 'switch',
    tooltip: 'Whether the gutter with line-folding controls should be shown.',
  },
  { label: 'Autocomplete', key: 'autoComplete', type: 'switch', tooltip: 'Adds auto completion with ctrl+space' },
  {
    label: 'Highlight Selection Matches',
    key: 'highlightSelectionMatches',
    type: 'switch',
    tooltip: 'Whether to highlight other occurrences of the currently selected text.',
  },
  { label: 'Lint', key: 'linting', type: 'switch', tooltip: 'Whether to use linting.' },
  { label: 'Mark Selection', key: 'markSelection', type: 'switch', tooltip: 'Causes the selected text to be marked.' },
  {
    label: 'Style Active Line',
    key: 'styleActiveLine',
    type: 'switch',
    tooltip: 'Whether to highlight the currently active line.',
  },
  // { label: "Custom Selection Pointer", key: "selectionPointer", type: "switch", tooltip: "Activates a custom cursor" },
  {
    label: 'Continue Comments',
    key: 'continueComment',
    type: 'switch',
    tooltip: 'The editor will make the next line continue a comment when you press Enter inside a comment block',
  },
  // { label: "Full Screen", key: "fullScreen", type: "switch", tooltip: "When set to true, will make the editor full-screen." },
  {
    label: 'Scroll Past End',
    key: 'scrollPastEnd',
    type: 'switch',
    tooltip: 'Allows the user to scroll one editor height of empty space into view at the bottom of the editor.',
  },
];

export const defaultMods: Mod[] = [
  {
    id: '1',
    name: 'Embiggen Edit Icon',
    content: stripIndent`
      img[title="Edit"] {
        width: 40px;
        outline: 2px solid black;
      }

      button[title="Edit"] {
        width: 40px;
        outline: 2px solid black;
      }
    `,
    isEnabled: true,
    isValidCode: true,
  },

  // {
  //   id: "2",
  //   name: "Add New Document Pop-up",
  //   content: stripIndent`
  //     #popup1 {
  //       position: fixed;
  //       top: 350px;
  //       left: 1100px;
  //     }
  //   `,
  //   isEnabled: true,
  //   isValidCode: true,
  // },
  // {
  //   id: "3",
  //   name: "Product Configuration Layout",
  //   content: stripIndent`
  //     #divConfiguratorLayout {
  //       width: 1500px;
  //     }

  //     #ctl00_cph1_tabsDiv {
  //       width: 100%;
  //     }
  //   `,
  //   isEnabled: true,
  //   isValidCode: true,
  // },
  // {
  //   id: "4",
  //   name: "Document Preview Modal",
  //   content: stripIndent`
  //     #preview_popup {
  //       position: fixed;
  //       top: 20px;
  //       height: 900px;
  //       width: 1500px;
  //     }

  //     #preview_container {
  //       height: 100%;
  //     }

  //     iframe[src*="tempdoc/preview"] {
  //       height: 800px;
  //       width: 1400px;
  //     }
  //   `,
  //   isEnabled: true,
  //   isValidCode: true,
  // },
  // {
  //   id: "5",
  //   name: "Adding Attributes from Simple Products Modal",
  //   content: stripIndent`
  //     #ctl00_cph1_attributeControl_ps_pnlTable {
  //       height: 850px;
  //       position: fixed;
  //       top: 25px;
  //     }
  //   `,
  //   isEnabled: true,
  //   isValidCode: true,
  // },
  // {
  //   id: "6",
  //   name: "Tag Builder",
  //   content: stripIndent`
  //     #tab-container-1 {
  //       width: 800px;
  //     }

  //     #ddlTags {
  //       height: 250px;
  //       width: 750px;
  //     }

  //     #PA_ID {
  //       width: 750px;
  //     }

  //     #PAV_ID {
  //       width: 750px;
  //       height: 250px;
  //     }

  //     textarea.consolelook.form-control {
  //       height: 200px;
  //       width: 750px;
  //     }

  //     #txtResult {
  //       height: 300px;
  //       width: 762px;
  //     }
  //   `,
  //   isEnabled: true,
  //   isValidCode: true,
  // },
  // {
  //   id: "7",
  //   name: "Product Configuration Fields",
  //   content: stripIndent`
  //     textarea.form-control[name*="DynPartNumber"] {
  //       height: 150px;
  //       width: 600px;
  //     }
  //   `,
  //   isEnabled: true,
  //   isValidCode: true,
  // },
  // {
  //   id: "8",
  //   name: "Rule Text Boxes",
  //   content: stripIndent`
  //     #ctl00_cph1_pnlRuleAdministration {
  //       width: 1600px;
  //     }

  //     #conditionDiv {
  //       width: 550px;
  //     }

  //     textarea.form-control[name*="RuleCondition"] {
  //       height: 250px;
  //       width: 500px;
  //     }

  //     #actionDiv {
  //       width: 550px;
  //     }

  //     #ctl00_cph1_txtRuleAction {
  //       height: 250px;
  //       width: 500px;
  //     }
  //   `,
  //   isEnabled: true,
  //   isValidCode: true,
  // },
  // {
  //   id: "9",
  //   name: "Script Events",
  //   content: stripIndent`
  //     #ctl00_cph1_lbAfterAdding1 {
  //       height: 150px;
  //       width: 400px;
  //     }
  //   `,
  //   isEnabled: true,
  //   isValidCode: true,
  // },
  // {
  //   id: "10",
  //   name: "Promo Banner on Quote Page",
  //   content: stripIndent`
  //     div.alert.alert-info {
  //       z-index: 5;
  //       opacity: 1;
  //       position: fixed;
  //       width: 95%;
  //       height: 55px;
  //       top: 135px;
  //     }

  //     div.quote-page-main-container {
  //       margin-top: 55px;
  //     }
  //   `,
  //   isEnabled: true,
  //   isValidCode: true,
  // },
  // {
  //   id: "11",
  //   name: "Save Notifications",
  //   content: stripIndent`
  //     #ctl00_cph1_labError {
  //       font-weight: bold;
  //       font-size: 18pt;
  //       position: fixed;
  //       left: 1200px;
  //       top: 50px;
  //       border: solid 1px;
  //     }
  //   `,
  //   isEnabled: true,
  //   isValidCode: true,
  // },
];

export const defaultShortcuts: Shortcut[] = [
  {
    id: '0',
    key: '1',
    destination:
      'https://help.sap.com/docs/SAP_CPQ/884885f05e6b4c8082254d4d9d63f19b/e5f2e0b33a9e4e7ea2a22e27dba2e76f.html',
    isUnique: true,
    isValidDestination: true,
  },
  {
    id: '1',
    key: 'Q',
    destination: 'Home > Quote List',
    isUnique: true,
    isValidDestination: true,
  },
  {
    id: '2',
    key: 'W',
    destination: 'Home > Script Workbench',
    isUnique: true,
    isValidDestination: true,
  },
  // {
  //   id: "3",
  //   key: "E",
  //   destination: "",
  //   isUnique: true,
  //   isValidDestination: true,
  // },
  {
    id: '4',
    key: 'R',
    destination: 'UI Design > Responsive Templates',
    isUnique: true,
    isValidDestination: true,
  },
  {
    id: '5',
    key: 'T',
    destination: 'Quotes > Quote Tables',
    isUnique: true,
    isValidDestination: true,
  },
  // {
  //   id: "6",
  //   key: "A,
  //   destination: "",
  //   isUnique: true,
  //   isValidDestination: true,
  // },
  // {
  //   id: "7",
  //   key: "S",
  //   destination: "",
  //   isUnique: true,
  //   isValidDestination: true,
  // },
  {
    id: '8',
    key: 'D',
    destination: 'Home > Developer Console',
    isUnique: true,
    isValidDestination: true,
  },
  {
    id: '9',
    key: 'F',
    destination: 'Quotes > Custom Fields',
    isUnique: true,
    isValidDestination: true,
  },
  {
    id: '10',
    key: 'G',
    destination: 'Develop > Global Scripts',
    isUnique: true,
    isValidDestination: true,
  },
  // {
  //   id: "11",
  //   key: "Z",
  //   destination: "",
  //   isUnique: true,
  //   isValidDestination: true,
  // },
  // {
  //   id: "12",
  //   key: "X",
  //   destination: "",
  //   isUnique: true,
  //   isValidDestination: true,
  // },
  {
    id: '13',
    key: 'C',
    destination: 'Develop > Custom Actions',
    isUnique: true,
    isValidDestination: true,
  },
  // {
  //   id: "14",
  //   key: "V",
  //   destination: "",
  //   isUnique: true,
  //   isValidDestination: true,
  // },
  // {
  //   id: "15",
  //   key: "B",
  //   destination: "",
  //   isUnique: true,
  //   isValidDestination: true,
  // },
];

export const userOptionsConfig = [
  // { label: 'Dark Mode', key: 'isDarkMode', type: 'switch' },
  // { label: 'Language', key: 'language', type: 'select', options: ['en', 'es', 'fr'] },
  { label: 'Open app in side panel', key: 'openInSidePanel', type: 'switch' },
] as Option[];

export const codeMirrorVersion = '5.65.14';
export const cdnBaseUrl = `https://cdnjs.cloudflare.com/ajax/libs/codemirror/${codeMirrorVersion}/`;
export const cmFiles = {
  main: {
    scripts: [`${cdnBaseUrl}codemirror.min.js`],
    css: [`${cdnBaseUrl}codemirror.min.css`],
  },
  modes: {
    scripts: [
      // `${cdnBaseUrl}mode/meta.min.js`,
      // `${cdnBaseUrl}mode/apl/apl.min.js`,
      `${cdnBaseUrl}mode/python/python.min.js`,
    ],
    css: [],
  },
  activeLine: {
    scripts: [`${cdnBaseUrl}addon/selection/active-line.min.js`],
    css: [],
  },
  // "autorefresh": {
  //   'scripts': [
  //     `${cdnBaseUrl}addon/display/autorefresh.min.js`,
  //   ],
  //   'css': []
  // },
  comment: {
    scripts: [`${cdnBaseUrl}addon/comment/comment.min.js`],
    css: [],
  },
  continuecomment: {
    scripts: [`${cdnBaseUrl}addon/comment/continuecomment.min.js`],
    css: [],
  },
  closebrackets: {
    scripts: [`${cdnBaseUrl}addon/edit/closebrackets.min.js`],
    css: [],
  },
  closetag: {
    scripts: [`${cdnBaseUrl}addon/edit/closetag.min.js`],
    css: [],
  },
  continuelist: {
    scripts: [`${cdnBaseUrl}addon/edit/continuelist.min.js`],
    css: [],
  },
  dialog: {
    scripts: [`${cdnBaseUrl}addon/dialog/dialog.min.js`],
    css: [`${cdnBaseUrl}addon/dialog/dialog.min.css`],
  },
  emacs: {
    scripts: [`${cdnBaseUrl}keymap/emacs.min.js`],
    css: [],
  },
  fold: {
    scripts: [
      `${cdnBaseUrl}addon/fold/foldcode.min.js`,
      `${cdnBaseUrl}addon/fold/foldgutter.min.js`,
      `${cdnBaseUrl}addon/fold/brace-fold.min.js`,
      `${cdnBaseUrl}addon/fold/comment-fold.min.js`,
      `${cdnBaseUrl}addon/fold/indent-fold.min.js`,
      `${cdnBaseUrl}addon/fold/markdown-fold.min.js`,
      `${cdnBaseUrl}addon/fold/xml-fold.min.js`,
    ],
    css: [`${cdnBaseUrl}addon/fold/foldgutter.min.css`],
  },
  fullscreen: {
    scripts: [`${cdnBaseUrl}addon/display/fullscreen.min.js`],
    css: [`${cdnBaseUrl}addon/display/fullscreen.min.css`],
  },
  hint: {
    scripts: [
      `${cdnBaseUrl}addon/hint/show-hint.min.js`,
      `${cdnBaseUrl}addon/hint/anyword-hint.min.js`,
      // `${cdnBaseUrl}addon/hint/css-hint.min.js`,
      // `${cdnBaseUrl}addon/hint/html-hint.min.js`,
      // `${cdnBaseUrl}addon/hint/javascript-hint.min.js`,
      // `${cdnBaseUrl}addon/hint/sql-hint.min.js`,
      // `${cdnBaseUrl}addon/hint/xml-hint.min.js`,
    ],
    css: [`${cdnBaseUrl}addon/hint/show-hint.min.css`],
  },
  highlightSelectionMatches: {
    scripts: [`${cdnBaseUrl}addon/search/match-highlighter.min.js`],
    css: [`${cdnBaseUrl}addon/search/matchesonscrollbar.min.css`],
  },
  jumpToLine: {
    scripts: [`${cdnBaseUrl}addon/search/jump-to-line.min.js`],
    css: [],
  },
  lint: {
    scripts: [
      `${cdnBaseUrl}addon/lint/lint.min.js`,
      // `${cdnBaseUrl}addon/lint/coffeescript-lint.min.js`,
      // `${cdnBaseUrl}addon/lint/css-lint.min.js`,
      // `${cdnBaseUrl}addon/lint/html-lint.min.js`,
      // `${cdnBaseUrl}addon/lint/javascript-lint.min.js`,
      // `${cdnBaseUrl}addon/lint/json-lint.min.js`,
      // `${cdnBaseUrl}addon/lint/yaml-lint.min.js`,
    ],
    css: [`${cdnBaseUrl}addon/lint/lint.min.css`],
  },
  matchbrackets: {
    scripts: [`${cdnBaseUrl}addon/edit/matchbrackets.min.js`],
    css: [],
  },
  // "merge": {
  //   'scripts': [
  //     `${cdnBaseUrl}addon/merge/merge.min.js`,
  //   ],
  //   'css': [
  //     `${cdnBaseUrl}addon/merge/merge.min.css`,
  //   ]
  // },
  // "mode": {
  //   'scripts': [
  //     `${cdnBaseUrl}addon/mode/loadmode.min.js`,
  //     `${cdnBaseUrl}addon/mode/multiplex.min.js`,
  //     `${cdnBaseUrl}addon/mode/multiplex_test.min.js`,
  //     // `${cdnBaseUrl}addon/mode/overlay.min.js`,
  //     `${cdnBaseUrl}addon/mode/simple.min.js`,
  //   ],
  //   'css': []
  // },
  matchesOnScrollbar: {
    scripts: [
      `${cdnBaseUrl}addon/scroll/annotatescrollbar.min.js`,
      `${cdnBaseUrl}addon/search/matchesonscrollbar.min.js`,
    ],
    css: [`${cdnBaseUrl}addon/search/matchesonscrollbar.min.css`],
  },
  matchtags: {
    scripts: [`${cdnBaseUrl}addon/edit/matchtags.min.js`, `${cdnBaseUrl}addon/fold/xml-fold.min.js`],
    css: [],
  },

  markSelection: {
    scripts: [`${cdnBaseUrl}addon/selection/mark-selection.min.js`],
    css: [],
  },
  // "panel": {
  //   'scripts': [
  //     `${cdnBaseUrl}addon/panel/panel.min.js`,
  //   ],
  //   'css': []
  // },
  // "placeholder": {
  //   'scripts': [
  //     `${cdnBaseUrl}addon/display/placeholder.min.js`,
  //   ],
  //   'css': []
  // },
  // "runmode": {
  //   'scripts': [
  //     `${cdnBaseUrl}addon/runmode/colorize.min.js`,
  //     `${cdnBaseUrl}addon/runmode/runmode-standalone.min.js`,
  //     `${cdnBaseUrl}addon/runmode/runmode.min.js`,
  //     `${cdnBaseUrl}addon/runmode/runmode.node.min.js`,
  //   ],
  //   'css': []
  // },
  // "rulers": {
  //   'scripts': [
  //     `${cdnBaseUrl}addon/rulers/rulers.min.js`,
  //   ],
  //   'css': []
  // },
  selectionPointer: {
    scripts: [`${cdnBaseUrl}addon/selection/selection-pointer.min.js`],
    css: [],
  },
  search: {
    scripts: [`${cdnBaseUrl}addon/search/search.min.js`, `${cdnBaseUrl}addon/search/searchcursor.min.js`],
    css: [],
  },
  scrollpastend: {
    scripts: [`${cdnBaseUrl}addon/scroll/scrollpastend.min.js`],
    css: [],
  },
  simpleScrollbars: {
    scripts: [`${cdnBaseUrl}addon/scroll/simplescrollbars.min.js`],
    css: [`${cdnBaseUrl}addon/scroll/simplescrollbars.min.css`],
  },
  sublime: {
    scripts: [`${cdnBaseUrl}keymap/sublime.min.js`],
    css: [],
  },
  tern: {
    scripts: [`${cdnBaseUrl}addon/tern/tern.min.js`, `${cdnBaseUrl}addon/tern/worker.min.js`],
    css: [`${cdnBaseUrl}addon/tern/tern.min.css`],
  },
  trailingspace: {
    scripts: [`${cdnBaseUrl}addon/edit/trailingspace.min.js`],
    css: [],
  },
  vim: {
    scripts: [`${cdnBaseUrl}keymap/vim.min.js`],
    css: [],
  },
  wrap: {
    scripts: [`${cdnBaseUrl}addon/wrap/hardwrap.min.js`],
    css: [],
  },
};

export const vscodeKeymap = [
  {
    keys: 'VSCode Keybinds',
    command: 'Description',
    link: 'https://code.visualstudio.com/docs/getstarted/keybindings',
  },
];

export const defaultKeymap = [
  {
    keys: 'Alt-ArrowLeft (Ctrl-ArrowLeft on macOS)',
    command: 'cursorSyntaxLeft',
    link: 'https://codemirror.net/6/docs/ref/#commands.cursorSyntaxLeft',
    withShift: 'selectSyntaxLeft',
    withShiftLink: 'https://codemirror.net/6/docs/ref/#commands.selectSyntaxLeft',
  },
  {
    keys: 'Alt-ArrowRight (Ctrl-ArrowRight on macOS)',
    command: 'cursorSyntaxRight',
    link: 'https://codemirror.net/6/docs/ref/#commands.cursorSyntaxRight',
    withShift: 'selectSyntaxRight',
    withShiftLink: 'https://codemirror.net/6/docs/ref/#commands.selectSyntaxRight',
  },
  { keys: 'Alt-ArrowUp', command: 'moveLineUp', link: 'https://codemirror.net/6/docs/ref/#commands.moveLineUp' },
  { keys: 'Alt-ArrowDown', command: 'moveLineDown', link: 'https://codemirror.net/6/docs/ref/#commands.moveLineDown' },
  { keys: 'Shift-Alt-ArrowUp', command: 'copyLineUp', link: 'https://codemirror.net/6/docs/ref/#commands.copyLineUp' },
  {
    keys: 'Shift-Alt-ArrowDown',
    command: 'copyLineDown',
    link: 'https://codemirror.net/6/docs/ref/#commands.copyLineDown',
  },
  {
    keys: 'Escape',
    command: 'simplifySelection',
    link: 'https://codemirror.net/6/docs/ref/#commands.simplifySelection',
  },
  {
    keys: 'Ctrl-Enter (Cmd-Enter on macOS)',
    command: 'insertBlankLine',
    link: 'https://codemirror.net/6/docs/ref/#commands.insertBlankLine',
  },
  {
    keys: 'Alt-l (Ctrl-l on macOS)',
    command: 'selectLine',
    link: 'https://codemirror.net/6/docs/ref/#commands.selectLine',
  },
  {
    keys: 'Ctrl-i (Cmd-i on macOS)',
    command: 'selectParentSyntax',
    link: 'https://codemirror.net/6/docs/ref/#commands.selectParentSyntax',
  },
  {
    keys: 'Ctrl-[ (Cmd-[ on macOS)',
    command: 'indentLess',
    link: 'https://codemirror.net/6/docs/ref/#commands.indentLess',
  },
  {
    keys: 'Ctrl-] (Cmd-] on macOS)',
    command: 'indentMore',
    link: 'https://codemirror.net/6/docs/ref/#commands.indentMore',
  },
  {
    keys: 'Ctrl-Alt-\\ (Cmd-Alt-\\ on macOS)',
    command: 'indentSelection',
    link: 'https://codemirror.net/6/docs/ref/#commands.indentSelection',
  },
  {
    keys: 'Shift-Ctrl-k (Shift-Cmd-k on macOS)',
    command: 'deleteLine',
    link: 'https://codemirror.net/6/docs/ref/#commands.deleteLine',
  },
  {
    keys: 'Shift-Ctrl-\\ (Shift-Cmd-\\ on macOS)',
    command: 'cursorMatchingBracket',
    link: 'https://codemirror.net/6/docs/ref/#commands.cursorMatchingBracket',
  },
  {
    keys: 'Ctrl-/ (Cmd-/ on macOS)',
    command: 'toggleComment',
    link: 'https://codemirror.net/6/docs/ref/#commands.toggleComment',
  },
  {
    keys: 'Shift-Alt-a',
    command: 'toggleBlockComment',
    link: 'https://codemirror.net/6/docs/ref/#commands.toggleBlockComment',
  },
  {
    keys: 'Ctrl-m (Alt-Shift-m on macOS)',
    command: 'toggleTabFocusMode',
    link: 'https://codemirror.net/6/docs/ref/#commands.toggleTabFocusMode',
  },
];

export const closebraketKeymap = [
  {
    keys: 'Backspace',
    command: 'deleteBracketPair',
    link: 'https://codemirror.net/6/docs/ref/#autocomplete.deleteBracketPair',
  },
];

export const searchKeymap = [
  { keys: 'Ctrl-f', command: 'openSearchPanel', link: 'https://codemirror.net/6/docs/ref/#search.openSearchPanel' },
  { keys: 'F3, Ctrl-g', command: 'findNext', link: 'https://codemirror.net/6/docs/ref/#search.findNext' },
  {
    keys: 'Shift-F3, Shift-Ctrl-g',
    command: 'findPrevious',
    link: 'https://codemirror.net/6/docs/ref/#search.findPrevious',
  },
  { keys: 'Ctrl-Alt-g', command: 'gotoLine', link: 'https://codemirror.net/6/docs/ref/#search.gotoLine' },
  {
    keys: 'Ctrl-d',
    command: 'selectNextOccurrence',
    link: 'https://codemirror.net/6/docs/ref/#search.selectNextOccurrence',
  },
];

export const historyKeymap = [
  { keys: 'Ctrl-z', command: 'undo', link: 'https://codemirror.net/6/docs/ref/#commands.undo' },
  {
    keys: 'Ctrl-y (Ctrl-Shift-z on macOS) + Ctrl-Shift-z on Linux',
    command: 'redo',
    link: 'https://codemirror.net/6/docs/ref/#commands.redo',
  },
  { keys: 'Ctrl-u', command: 'undoSelection', link: 'https://codemirror.net/6/docs/ref/#commands.undoSelection' },
  {
    keys: 'Alt-u (Ctrl-Shift-u on macOS)',
    command: 'redoSelection',
    link: 'https://codemirror.net/6/docs/ref/#commands.redoSelection',
  },
];

export const foldKeymap = [
  {
    keys: 'Ctrl-Shift-[ (Cmd-Alt-[ on macOS)',
    command: 'foldCode',
    link: 'https://codemirror.net/6/docs/ref/#language.foldCode',
  },
  {
    keys: 'Ctrl-Shift-] (Cmd-Alt-] on macOS)',
    command: 'unfoldCode',
    link: 'https://codemirror.net/6/docs/ref/#language.unfoldCode',
  },
  { keys: 'Ctrl-Alt-[', command: 'foldAll', link: 'https://codemirror.net/6/docs/ref/#language.foldAll' },
  { keys: 'Ctrl-Alt-]', command: 'unfoldAll', link: 'https://codemirror.net/6/docs/ref/#language.unfoldAll' },
];

export const autocompleteKeymap = [
  {
    keys: 'Ctrl-Space',
    command: 'startCompletion',
    link: 'https://codemirror.net/6/docs/ref/#autocomplete.startCompletion',
  },
  {
    keys: 'Escape',
    command: 'closeCompletion',
    link: 'https://codemirror.net/6/docs/ref/#autocomplete.closeCompletion',
  },
  {
    keys: 'ArrowDown',
    command: 'moveCompletionSelection',
    link: 'https://codemirror.net/6/docs/ref/#autocomplete.moveCompletionSelection',
  },
  {
    keys: 'ArrowUp',
    command: 'moveCompletionSelection',
    link: 'https://codemirror.net/6/docs/ref/#autocomplete.moveCompletionSelection',
  },
  {
    keys: 'PageDown',
    command: 'moveCompletionSelection',
    link: 'https://codemirror.net/6/docs/ref/#autocomplete.moveCompletionSelection',
  },
  {
    keys: 'PageUp',
    command: 'moveCompletionSelection',
    link: 'https://codemirror.net/6/docs/ref/#autocomplete.moveCompletionSelection',
  },
  {
    keys: 'Enter',
    command: 'acceptCompletion',
    link: 'https://codemirror.net/6/docs/ref/#autocomplete.acceptCompletion',
  },
];

export const lintKeymap = [
  {
    keys: 'Ctrl-Shift-m (Cmd-Shift-m on macOS)',
    command: 'openLintPanel',
    link: 'https://codemirror.net/6/docs/ref/#lint.openLintPanel',
  },
  { keys: 'F8', command: 'nextDiagnostic', link: 'https://codemirror.net/6/docs/ref/#lint.nextDiagnostic' },
];

export const tabindentKeymap = [
  { keys: 'Tab', command: 'indentMore', link: 'https://codemirror.net/6/docs/ref/#commands.indentMore' },
  { keys: 'Shift-Tab', command: 'indentLess', link: 'https://codemirror.net/6/docs/ref/#commands.indentLess' },
];
