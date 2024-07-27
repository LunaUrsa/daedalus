/* eslint-disable import/namespace */
import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { Grid } from '@mui/material';

// import * as themes from "@uiw/codemirror-themes-all";

// import useAppContext from '@extension/shared/lib/hooks/useAppContext';

interface TrackingDict {
  Operators: number;
  Tags: number;
  if: number;
  endif: number;
  colons: number;
}

// Parse raw code
const parseRawCode = (rawText: string): string => {
  const rawList: string[] = [];
  const outputList: string[] = [];

  // Initialize the current index in the list in the list
  let index = 0;

  // Initialize a dictionary to keep track of the number of operators, tags, if statements, endif statements, and colons
  // This is used to determine how many indents to add to the output list
  const trackingDict: TrackingDict = { Operators: 0, Tags: 0, if: 0, endif: 0, colons: 0 };

  // Remove all whitespace characters from the raw text
  rawText = rawText.replace(/\n/g, '').replace(/\t/g, '').replace(/\r/g, '').trim();

  // Add all characters from the raw text to the raw list, so we can iterate through each character
  rawList.push(...rawText);

  for (const character of rawList) {
    switch (character) {
      case '(':
        if (trackingDict.Tags > 0) {
          // If this is inside of a tag, just add the character to the output list in the same line
          outputList.push(character);
        } else if (trackingDict.Operators > 0 || trackingDict.if > 0) {
          // If this is after an operator or an if statement, add a new line and indents before the character
          outputList.push(character, '\n');
          addIndents(outputList, trackingDict.Operators + trackingDict.colons + trackingDict.if);
        } else {
          // Otherwise, just add the character to the output list
          outputList.push(character);
        }
        break;
      case ')':
        if (trackingDict.Tags > 0) {
          // If this is inside of a tag, just add the character to the output list in the same line
          outputList.push(character);
        } else {
          // Otherwise, add a new line before the character
          outputList.push('\n');
          // Add indents before the character
          addIndents(outputList, trackingDict.Operators + trackingDict.colons + trackingDict.if);
          // Add the character to the output list
          outputList.push(character);
          // Reduce the number of operators by 1, we do this because we added a new line before the character
          if (trackingDict.Operators > 0) trackingDict.Operators--;
        }
        break;
      case '<':
        // If this is a tag, increase the number of tags by 1
        trackingDict.Tags++;
        outputList.push(character);
        break;
      case '>':
        trackingDict.Tags--;
        outputList.push(character);
        if (trackingDict.colons > 0) {
          trackingDict.colons--;
          outputList.push('\n');
          addIndents(outputList, trackingDict.Operators + trackingDict.colons + trackingDict.if);
        }
        break;
      case '[':
        if (
          rawList
            .slice(index + 1, index + 3)
            .join('')
            .toLowerCase() === 'if'
        ) {
          trackingDict.if++;
          outputList.push(character);
        } else if (
          rawList
            .slice(index + 1, index + 5)
            .join('')
            .toLowerCase() === 'endif'
        ) {
          trackingDict.if--;
          outputList.push('\n');
          addIndents(outputList, trackingDict.Operators + trackingDict.colons + trackingDict.if);
          outputList.push(character);
        } else {
          trackingDict.Operators++;
          outputList.push(character);
        }
        break;
      // case ']':
      //   if (trackingDict.if > 0) {
      //     trackingDict.if--;
      //     outputList.push('\n');
      //     addIndents(outputList, trackingDict.Operators + trackingDict.colons + trackingDict.if);
      //   }
      //   outputList.push(character);
      //   break;
      case ',':
        if (trackingDict.Tags > 0) {
          outputList.push(character);
        } else {
          outputList.push('\n');
          addIndents(outputList, trackingDict.Operators + trackingDict.colons + trackingDict.if);
          outputList.push(character);
        }
        break;
      case ':':
        if (trackingDict.Tags > 0) {
          trackingDict.colons++;
          trackingDict.Tags--;
          outputList.push(character, '\n');
          addIndents(outputList, trackingDict.Operators + trackingDict.colons + trackingDict.if);
        } else {
          outputList.push(character);
        }
        break;
      case '{':
        if (trackingDict.if > 0) {
          outputList.push(character, '\n');
          addIndents(outputList, trackingDict.Operators + trackingDict.colons + trackingDict.if);
        } else {
          outputList.push(character);
        }
        break;
      case '}':
        if (trackingDict.if > 0) {
          outputList.push('\n');
          addIndents(outputList, trackingDict.Operators + trackingDict.colons + trackingDict.if);
          outputList.push(character);
        } else {
          outputList.push(character);
        }
        break;
      default:
        outputList.push(character);
    }
    index++;
  }

  return outputList.join('');
};

// Add indents to the list
const addIndents = (list: string[], count: number): void => {
  list.push(...Array(count).fill('\t'));
};

// Revert parsed code to raw code
function revertToRaw(parsedText: string): string {
  return parsedText.replace(/\n/g, '').replace(/\t/g, '').replace(/\r/g, '').trim();
}

const FormulaPage: React.FC = () => {
  // const { codeMirrorOptions } = useAppContext();

  const [rawText, setRawText] = useState<string>(
    `[IF](<*CTX( Quote.CustomField(Customer's Language).AddDays().InUSDateFormat )*>){"True"}{"False"}[ENDIF]`,
  );
  const [formattedText, setFormattedText] = useState(`[IF](
  <*CTX( Quote.CustomField(Customer's Language).AddDays().InUSDateFormat )*>
  ){
  "True"
  }{
  "False"
  }[ENDIF]
  `);

  const handleRawUpdate = (text: string) => {
    console.log('Raw text updated:', text);
    setRawText(text);
  };

  const handleFormattedUpdate = (text: string) => {
    setFormattedText(text);
  };

  const handleRawBlur = () => {
    // This should take the formattedText, convert it to lowercase, and set it as the rawText
    const formatted = parseRawCode(rawText);
    console.log('Raw text blurred:', formatted);
    setFormattedText(formatted);
  };

  const handleFormattedBlur = () => {
    // This should take the rawText, convert it to uppercase, and set it as the formattedText
    const raw = revertToRaw(formattedText);
    setRawText(raw);
  };

  return (
    <main className="container mx-auto p-0 m-0">
      <Grid container spacing={2} sx={{ padding: 0, margin: 0 }}>
        <Grid item xs={12} sx={{ fontSize: '16px', padding: 0, margin: 0 }}>
          <CodeMirror
            value={rawText}
            height="12vh"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // theme={themes[codeMirrorOptions.theme as keyof typeof themes] || codeMirrorOptions?.theme}
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
            onUpdate={viewUpdate => {
              handleRawUpdate(viewUpdate.state.doc.toString());
            }}
            onBlur={handleRawBlur}
            className="border rounded-md shadow-sm"
          />
        </Grid>
        <Grid item xs={12} sx={{ fontSize: '16px' }}>
          <CodeMirror
            value={formattedText}
            height="60vh"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // theme={themes[codeMirrorOptions.theme as keyof typeof themes] || codeMirrorOptions?.theme}
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
            onUpdate={viewUpdate => {
              handleFormattedUpdate(viewUpdate.state.doc.toString());
            }}
            onBlur={handleFormattedBlur}
            className="border rounded-md shadow-sm"
          />
        </Grid>
      </Grid>
    </main>
  );
};

export default FormulaPage;
