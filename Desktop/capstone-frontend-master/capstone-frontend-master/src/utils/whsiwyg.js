/**
 * 백스페이스 핸들러
 * @param {*} event
 * @param {*} text
 * @param {*} setMarkdownText
 */
export const BackspaceKeyHandler = (event, text, setMarkdownText) => {
  const start = event.target.selectionStart;
  const end = event.target.selectionEnd;
  const beforeCursor = text.substring(0, start);
  const afterCursor = text.substring(end);
  const lastFourChars = beforeCursor.substring(beforeCursor.length - 4);
  const last2Chars = beforeCursor.substring(beforeCursor.length - 1, beforeCursor.length);
  if (lastFourChars === '    ') {
    event.preventDefault();
    setMarkdownText(beforeCursor.substring(0, beforeCursor.length - 4) + afterCursor);
    event.target.selectionStart = event.target.selectionEnd = start - 4;
  }
  if (last2Chars === '\n') {
    setMarkdownText(beforeCursor.substring(0, beforeCursor.length - 2) + afterCursor);
    event.target.selectionStart = event.target.selectionEnd = start - 2;
  }
};

/**
 * 볼드 핸들러
 * @param {*} event
 * @param {*} text
 * @param {*} setMarkdownText
 * @param {*} selection
 * @param {*} setSelection
 */
export const BoldKeyHandler = (event, text, setMarkdownText, selection, setSelection) => {
  event.preventDefault();
  const start = selection.start;
  const end = selection.end;
  const selectedText = text.substring(start, end);
  const isBold = selectedText.startsWith('**') && selectedText.endsWith('**');

  if (isBold) {
    // 지우기
    setMarkdownText(
      text.substring(0, start) +
        selectedText.substring(2, selectedText.length - 2) +
        text.substring(end),
    );
    setSelection({ start: start + 2, end: end - 2 });
  } else {
    // 굵게
    setMarkdownText(
      text.substring(0, start) + '**' + text.substring(start, end) + '**' + text.substring(end),
    );
    setSelection({ start: end + 2, end: end + 2 });
  }
};

/**
 * 엔터 핸들러
 * @param {*} event
 * @param {*} text
 * @param {*} setMarkdownText
 */
export const EnterKeyHandler = (event, text, setMarkdownText) => {
  event.preventDefault();
  const start = event.target.selectionStart;
  const end = event.target.selectionEnd;
  setMarkdownText(text.substring(0, start) + '  \n' + text.substring(end));
  event.target.selectionStart = event.target.selectionEnd = start + 1;
};

/**
 * 이탤릭 핸들러
 * @param {*} event
 * @param {*} text
 * @param {*} setMarkdownText
 * @param {*} selection
 * @param {*} setSelection
 */
export const ItalicKeyHandler = (event, text, setMarkdownText, selection, setSelection) => {
  event.preventDefault();
  // const start = event.target.selectionStart;
  // const end = event.target.selectionEnd;
  const start = selection.start;
  const end = selection.end;
  const selectedText = text.substring(start, end);
  const isItalic = selectedText.startsWith('*') && selectedText.endsWith('*');
  // event.target.selectionStart = start + 2;
  // event.target.selectionEnd = end + 2;
  if (isItalic) {
    // 지우기
    setMarkdownText(
      text.substring(0, start) +
        selectedText.substring(1, selectedText.length - 1) +
        text.substring(end),
    );
    setSelection({ start: start + 1, end: end - 1 });
  } else {
    // 기울기
    setMarkdownText(
      text.substring(0, start) + '*' + text.substring(start, end) + '*' + text.substring(end),
    );
    setSelection({ start: end + 1, end: end + 1 });
  }
};

/**
 * 탭 핸들러
 * @param {*} event
 * @param {*} text
 * @param {*} setMarkdownText
 */
export const TabKeyHandler = (event, text, setMarkdownText) => {
  event.preventDefault();
  const start = event.target.selectionStart;
  const end = event.target.selectionEnd;
  setMarkdownText(text.substring(0, start) + '    \t' + text.substring(end));
  event.target.selectionStart = event.target.selectionEnd = start + 1;
};

/**
 * 밑줄 핸들러
 * @param {*} event
 * @param {*} text
 * @param {*} setMarkdownText
 * @param {*} selection
 * @param {*} setSelection
 */
export const UnderlineKeyHandler = (event, text, setMarkdownText, selection, setSelection) => {
  event.preventDefault();
  const start = selection.start;
  const end = selection.end;
  const selectedText = text.substring(start, end);
  const isUline = selectedText.startsWith('<u>') && selectedText.endsWith('</u>');
  if (isUline) {
    // 지우기
    setMarkdownText(
      text.substring(0, start) +
        selectedText.substring(3, selectedText.length - 4) +
        text.substring(end),
    );
    setSelection({ start: start + 3, end: end - 4 });
  } else {
    // 기울기
    setMarkdownText(
      text.substring(0, start) + '<u>' + text.substring(start, end) + '</u>' + text.substring(end),
    );
    setSelection({ start: end + 4, end: end + 4 });
  }
};
