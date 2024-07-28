import React from 'react';
import {
  Typography,
  Link,
  Paper,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  CssBaseline,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
const InfoPage = () => {
  const keymaps: Keymaps = {
    VSCode: [
      {
        keys: 'VSCode Keybindings',
        command: 'Description',
        link: 'https://code.visualstudio.com/docs/getstarted/keybindings',
      },
    ],
    Default: [
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
      {
        keys: 'Alt-ArrowDown',
        command: 'moveLineDown',
        link: 'https://codemirror.net/6/docs/ref/#commands.moveLineDown',
      },
      {
        keys: 'Shift-Alt-ArrowUp',
        command: 'copyLineUp',
        link: 'https://codemirror.net/6/docs/ref/#commands.copyLineUp',
      },
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
    ],
    Search: [
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
    ],
    History: [
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
    ],
    Folding: [
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
    ],
    'Autocomplete (Not fully implemented)': [
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
    ],
    'Linting (Not fully implemented)': [
      {
        keys: 'Ctrl-Shift-m (Cmd-Shift-m on macOS)',
        command: 'openLintPanel',
        link: 'https://codemirror.net/6/docs/ref/#lint.openLintPanel',
      },
      { keys: 'F8', command: 'nextDiagnostic', link: 'https://codemirror.net/6/docs/ref/#lint.nextDiagnostic' },
    ],
    'Close Bracket': [
      {
        keys: 'Backspace',
        command: 'deleteBracketPair',
        link: 'https://codemirror.net/6/docs/ref/#autocomplete.deleteBracketPair',
      },
    ],
    'Tab-Indent': [
      { keys: 'Tab', command: 'indentMore', link: 'https://codemirror.net/6/docs/ref/#commands.indentMore' },
      { keys: 'Shift-Tab', command: 'indentLess', link: 'https://codemirror.net/6/docs/ref/#commands.indentLess' },
    ],
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h5" component="h1">
                About Daedalus
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                This extension was created by{' '}
                <Link href="https://linkedin.com/in/erichoftiezer" target="_blank" rel="noopener">
                  <strong>Eric Hoftiezer</strong>
                </Link>{' '}
                to enhance the functionality and user experience of SAP CPQ. It is designed to be simple and intuitive,
                providing tools to help you get your work done.
              </Typography>
              <Typography variant="body1" paragraph>
                The source code is available on{' '}
                <Link href="https://github.com/lunaursa/daedalus" target="_blank" rel="noopener">
                  <strong>GitHub</strong>
                </Link>{' '}
                and you are encouraged to contribute! Pull requests are very welcome! If you have suggestions or
                improvements, please contribute to this project.
              </Typography>
              <Typography variant="body1" paragraph>
                It&apos;s built with React and uses Material Design styles, providing a modern and responsive user
                interface.
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h5" component="h1">
                Code Editor / Script Workbench
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                The code editor used by SAP CPQ is very basic and lacks many features that developers are used to. One
                of this extension&apos;s main features overwrites the default functionality with a more advanced code
                editor. The editor supports syntax highlighting, line numbers, and a few other features to make writing
                scripts easier. This makes development directly in SAP CPQ possible, instead of constantly copying code
                into VSCode and back again. The code mirror used is{' '}
                <Link href="https://codemirror.net/" target="_blank" rel="noopener">
                  CodeMirror6
                </Link>
                . I&apos;ve added the following features:
                <List>
                  <ListItem>Code Folding, including one-click fold-everything</ListItem>
                  <ListItem>
                    Split editor, open the same file twice so you can look at two spots at the same time
                  </ListItem>
                  <ListItem>Search, including regex search</ListItem>
                  <ListItem>Highlight active line</ListItem>
                  <ListItem>Highlight selected word</ListItem>
                  <ListItem>Highlight matching brackets</ListItem>
                  <ListItem>Zebra Stripe formatting</ListItem>
                  <ListItem>Dark mode theme (Dracula)</ListItem>
                </List>
                If you have suggestions for additional features, please let me know!
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h5">Keymaps</Typography>
            </AccordionSummary>
            {Object.entries(keymaps).map(([category, keymapList], index) => (
              <AccordionDetails key={index}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h6">{category} Keymaps</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Keys</TableCell>
                            <TableCell>Command</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {keymapList.map((keymap, index) => (
                            <TableRow key={index}>
                              <TableCell>{keymap.keys}</TableCell>
                              <TableCell>
                                <Link href={keymap.link} target="_blank" rel="noopener">
                                  {keymap.command}
                                </Link>
                                {keymap.withShift && (
                                  <>
                                    {' (with Shift: '}
                                    <Link href={keymap.withShiftLink} target="_blank" rel="noopener">
                                      {keymap.withShift}
                                    </Link>
                                    {')'}
                                  </>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              </AccordionDetails>
            ))}
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h5" component="h1">
                Shortcuts
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                You can setup shortcuts to quickly access the tools you use most. You can select any item from the setup
                menu, or you can input your own URLs that you need to quickly access. Some pre-defined shortcuts are
                available for you to use for inspiration. If you think a shortcut should be added as a default shortcut,
                please let me know!
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h5" component="h1">
                Mods
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                Mods allow you to inject CSS into the webpage to change the appearance of the page. You can use this to
                change colors, fonts, or any other styles on the page. In the example provided, we change the size of
                the Edit icons so that they are easier to click. Javascript mods are NOT supported using this method: if
                you have an idea for a JS mod, please let me know!
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h5" component="h1">
                Formula Format
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" paragraph>
                Very simple: This takes a single-line formula and formats it to be more readable. It also does the
                reverse, in case you need to reduce whitespace in a formula. If I missed a formatting rule, please let
                me know!
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Box>
    </Container>
  );
};

export default InfoPage;
