import * as React from 'react';
import { Editor } from '@toast-ui/react-editor';
import { TfiYoutube } from 'react-icons/tfi';
import ReactDOM from 'react-dom';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

// 색상변환버튼 관련
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

// 차트 입력 관련
import chart from '@toast-ui/editor-plugin-chart';

// 유튜브 버튼 관련
import { createYoutubePopup, iframe } from '../../utils/youtube.js';

// 코드블럭 관련
import 'highlight.js/styles/github.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';
import 'prismjs/themes/prism.css';
import Prism from 'prismjs';

// uml 관련
import uml from '@toast-ui/editor-plugin-uml';

import DOMPurify from 'dompurify';

export default function WhsiwygBody({value, onChange}) {


  const editorRef = React.useRef();


  const inputChange = () => {
    const instance = editorRef.current.getInstance();
    const inputValue = instance.getMarkdown();
    onChange(DOMPurify.sanitize(inputValue));
  };

  React.useEffect(() => {
    if (editorRef.current) {
      const instance = editorRef.current.getInstance();
      instance.setMarkdown(value);
    }
  }, [value]);



  const myCustomEl = document.createElement('span');
  myCustomEl.style = 'cursor: pointer;';

  const icon = <TfiYoutube size={32} />;
  ReactDOM.render(icon, myCustomEl);
  const youtubePopup = createYoutubePopup(editorRef);

  return (
    <div className="whsiwyg-body">
      <Editor
        //code블럭 입력이 되지 않아 일단 주석처리 해뒀습니다.
        // placeholder={content || '노트의 내용을 입력하세요'}
        initialValue=''
        previewStyle="vertical"
        height="100%"
        initialEditType="markdown"
        useCommandShortcut={true}
        language="ko"
        ref={editorRef}
        // plugins 주석처리시 ResizeObserver loop limit exceeded 오류 없어짐
        // 무시 가능
        plugins={[colorSyntax, chart, [codeSyntaxHighlight, { highlighter: Prism }], uml]}
        toolbarItems={[
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task'],
          ['table', 'image', 'link'],
          ['code', 'codeblock'],
          // 유튜브 삽입을 위해 툴바 버튼 커스터마이징
          [
            {
              name: 'Youtube',
              tooltip: 'Youtube',
              el: myCustomEl,
              popup: {
                body: youtubePopup,
                style: { width: 'auto' },
              },
            },
          ],
        ]}
        customHTMLRenderer={{
          htmlBlock: { iframe },
        }}
        // value = {initialValue||value}
        onChange={inputChange}
      />
    </div>
  );
}
