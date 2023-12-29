import * as React from 'react';
// import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

export default function WhsiwygMenu({ modified = false, last_updated }) {
  return (
    <div className="whsiwyg-menu">
      <div className="modified">{modified ? '' : '모든 변경사항이 저장됨'}</div>
      <div className="last-updated">문서 최종 수정: {last_updated}</div>
      {/* <button>Save</button> */}
    </div>
  );
}
