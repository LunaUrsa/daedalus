/* eslint-disable @typescript-eslint/no-explicit-any */

type Option = {
  label: string;
  key: keyof CodeMirrorOptions | keyof UserOptions;
  type: 'switch' | 'select' | 'number' | 'string';
  tooltip: string;
  options?: string[];
};

interface Shortcut {
  id: string;
  key: string;
  destination: string;
  isUnique: boolean;
  isValidDestination: boolean;
}

interface ShortcutsListProps {
  shortcuts: Shortcut[];
  setShortcuts: React.Dispatch<React.SetStateAction<Shortcut[]>>;
}

interface Mod {
  id: string;
  name: string;
  content: string;
  isEnabled: boolean;
  isValidCode: boolean;
}

interface ModListProps {
  mods: Mod[];
  setMods: React.Dispatch<React.SetStateAction<Mod[]>>;
  preferences: UserOptions;
  codeMirrorOptions: CodeMirrorOptions;
}

interface ModEditProps {
  mod: Mod;
  handleChange: (id: string, field: keyof Mod, value: string | boolean) => void;
}

interface SiteMap {
  [category: string]: {
    [subCategory: string]: string;
  };
}

interface ToolbarProps {
  mods: Mod[];
  setMods: React.Dispatch<React.SetStateAction<Mod[]>>;
  shortcuts: Shortcut[];
  setShortcuts: React.Dispatch<React.SetStateAction<Shortcut[]>>;
  currentPage: Page;
  setCurrentPage: React.Dispatch<React.SetStateAction<Page>>;
}

enum Page {
  MODS = 'mods',
  SHORTCUTS = 'shortcuts',
  INFO = 'info',
  FORMULA = 'formula',
  OPTIONS = 'options',
}

interface RoutingProps {
  mods: Mod[];
  setMods: React.Dispatch<React.SetStateAction<Mod[]>>;
  shortcuts: Shortcut[];
  setShortcuts: React.Dispatch<React.SetStateAction<Shortcut[]>>;
  preferences: UserOptions;
  setPreferences: React.Dispatch<React.SetStateAction<UserOptions>>;
  codeMirrorOptions: CodeMirrorOptions;
  setCodeMirrorOptions: React.Dispatch<React.SetStateAction<CodeMirrorOptions>>;
  currentPage: Page;
  setCurrentPage: React.Dispatch<React.SetStateAction<Page>>;
}

interface FormulaProps {
  preferences: UserOptions;
}

// interface downloadProps {
//   hostUrl: string;
//   destination: string;
// }

enum WorkbenchViews {
  Default = 'Default',
  SideBySide = 'Side By Side',
  NarrowTrace = 'Narrow Trace',
}

enum ScriptingViews {
  Default = 'Default',
  Fullscreen = 'Fullscreen',
  Expanded = 'Expanded',
}

enum ScriptingModes {
  Standard = 'Standard',
  Test = 'Test',
}

interface UserOptions {
  isDarkMode: boolean;
  language: 'en';
  openInSidePanel: boolean;
  workbenchView: WorkbenchViews;
  scriptingView: ScriptingViews;
  scriptingMode: ScriptingModes;
  workbenchCode: string;
  workbenchIsSplit: boolean;
  workbenchAlwaysClearTraces: boolean;
  // downloadLocations: { [key: string]: string };
}

type ModeOptions = {
  name: string;
  singleLineStringErrors: boolean;
  version: number;
};

type ExtraKeys = {
  [key: string]: string;
};

enum CodeMirrorTheme {
  Day3024 = '3024-day',
  Night3024 = '3024-night',
  Abbott = 'abbott',
  Abcdef = 'abcdef',
  AmbianceMobile = 'ambiance-mobile',
  Ambiance = 'ambiance',
  AyuDark = 'ayu-dark',
  AyuMirage = 'ayu-mirage',
  Base16Dark = 'base16-dark',
  Base16Light = 'base16-light',
  Bespin = 'bespin',
  Blackboard = 'blackboard',
  Cobalt = 'cobalt',
  Colorforth = 'colorforth',
  Default = 'default',
  Darcula = 'darcula',
  Dracula = 'dracula',
  DuotoneDark = 'duotone-dark',
  DuotoneLight = 'duotone-light',
  Eclipse = 'eclipse',
  Elegant = 'elegant',
  ErlangDark = 'erlang-dark',
  GruvboxDark = 'gruvbox-dark',
  Hopscotch = 'hopscotch',
  Icecoder = 'icecoder',
  Idea = 'idea',
  Isotope = 'isotope',
  Juejin = 'juejin',
  LesserDark = 'lesser-dark',
  Liquibyte = 'liquibyte',
  Lucario = 'lucario',
  MaterialDarker = 'material-darker',
  MaterialOcean = 'material-ocean',
  MaterialPalenight = 'material-palenight',
  Material = 'material',
  Mbo = 'mbo',
  MdnLike = 'mdn-like',
  Midnight = 'midnight',
  Monokai = 'monokai',
  Moxer = 'moxer',
  Neat = 'neat',
  Neo = 'neo',
  Night = 'night',
  Nord = 'nord',
  OceanicNext = 'oceanic-next',
  PandaSyntax = 'panda-syntax',
  ParaisoDark = 'paraiso-dark',
  ParaisoLight = 'paraiso-light',
  PastelOnDark = 'pastel-on-dark',
  Railscasts = 'railscasts',
  Rubyblue = 'rubyblue',
  Seti = 'seti',
  Shadowfox = 'shadowfox',
  Solarized = 'solarized',
  Ssms = 'ssms',
  TheMatrix = 'the-matrix',
  TomorrowNightBright = 'tomorrow-night-bright',
  TomorrowNightEighties = 'tomorrow-night-eighties',
  Ttcn = 'ttcn',
  Twilight = 'twilight',
  VibrantInk = 'vibrant-ink',
  XqDark = 'xq-dark',
  XqLight = 'xq-light',
  Yeti = 'yeti',
  Yonce = 'yonce',
  Zenburn = 'zenburn',
}

type CodeMirrorOptions = {
  // Standard options
  // value: string;
  // mode: ModeOptions | string;
  // pythonVersion: 2 | 3;
  lineSeparator: string | null;
  theme: CodeMirrorTheme;
  indentUnit: number;
  smartIndent: boolean;
  tabSize: number;
  indentWithTabs: boolean;
  electricChars: boolean;
  // specialChars: RegExp;
  // direction: "ltr" | "rtl";
  // rtlMoveVisually: boolean;
  keyMap: string;
  // extraKeys: ExtraKeys;
  // configureMouse: null | Record<string, unknown>;
  lineWrapping: boolean;
  lineNumbers: boolean;
  firstLineNumber: number;
  // gutters: string[];
  fixedGutter: boolean;
  scrollbarStyle: 'native' | 'null' | 'overlay' | 'simple';
  coverGutterNextToScrollbar: boolean;
  // inputStyle: string;
  // screenReaderLabel: string | null;
  showCursorWhenSelecting: boolean;
  lineWiseCopyCut: boolean;
  pasteLinesPerSelection: boolean;
  selectionsMayTouch: boolean;
  undoDepth: number;
  historyEventDelay: number;
  // tabindex: number | null;
  autofocus: boolean;
  // phrases: Record<string, string> | null;
  // Minor options
  // dragDrop: boolean;
  // allowDropFileTypes: string[] | null;
  // cursorBlinkRate: number;
  cursorScrollMargin: number;
  // cursorHeight: number;
  // singleCursorHeightPerLine: boolean;
  resetSelectionOnContextMenu: boolean;
  // workTime: number;
  // workDelay: number;
  // pollInterval: number;
  // flattenSpans: boolean;
  // addModeClass: boolean;
  maxHighlightLength: number;
  viewportMargin: number;
  spellCheck: boolean;
  autoCapitalize: boolean;
  autoCorrect: boolean;
  // fullScreen: boolean;
  // SAP addons
  // hintOptions: null | Record<string, unknown>;
  showTrailingSpace: boolean;
  // SAP custom options
  // disableInput: boolean;
  // moveInputWithCursor: boolean;
  // tabMode: "shift" | "spaces";
  // wholeLineUpdateBefore: boolean;
  // My custom options
  foldCode: boolean;
  matchTags: boolean;
  linting: boolean;
  highlightSelectionMatches: boolean;
  styleActiveLine: boolean;
  search: boolean;
  // Maybe CM6?
  // highlightActiveLine: boolean;
  // resize: true;
  // shortcuts: ExtraKeys;
  markSelection: boolean;
  selectionPointer: boolean;
  continueComment: boolean;
  autoComplete: boolean;
  autoCloseBrackets: boolean;
  // autoCloseTags: boolean;
  // continueList: boolean;
  matchBrackets: boolean;
  matchTags: boolean;
  jumpToLine: boolean;
  matchesOnScrollbar: boolean;
  comments: boolean;
  continueComments: boolean;
  scrollPastEnd: boolean;
};

// /* for the file reading */
// interface FileSystemDirectoryHandle {
//   kind: 'directory';
//   name: string;
//   queryPermission(options: FileSystemHandlePermissionDescriptor): Promise<PermissionState>;
//   requestPermission(options: FileSystemHandlePermissionDescriptor): Promise<PermissionState>;
//   values(): AsyncIterable<FileSystemHandle>;
// }

// interface FileSystemFileHandle {
//   kind: 'file';
//   name: string;
//   getFile(): Promise<File>;
// }

// interface FileSystemHandle {
//   kind: 'file' | 'directory';
//   name: string;
// }

// interface FileSystemHandlePermissionDescriptor {
//   mode: 'read' | 'readwrite';
// }

// interface Window {
//   showDirectoryPicker(options?: OpenFilePickerOptions): Promise<FileSystemDirectoryHandle>;
// }

interface KeymapItem {
  keys: string;
  command: string;
  link: string;
  withShift?: string;
  withShiftLink?: string;
}

interface Keymaps {
  [category: string]: KeymapItem[];
}
