import * as React from 'react';
// import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

export default function WhsiwygTitle({onChange, value}) {
  const inputChange = (event) => {
    const inputValue = event.target.value;
    onChange(inputValue);  
  };

  return (
    <div className="whsiwyg-title">
      <input placeholder="노트의 제목을 입력하세요" value={value} onChange={inputChange} />
      {}
    </div>
  );
}
