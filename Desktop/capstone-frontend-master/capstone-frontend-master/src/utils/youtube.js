export const createYoutubePopup = (editorRef) => {
  const container = document.createElement('div');
  const description = document.createElement('p');
  description.textContent = 'Youtube 주소를 입력하고 Enter를 누르세요!';
  const urlInput = document.createElement('input');
  urlInput.style.width = '100%';
  urlInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      if (
        /https:\/\/youtu.be\/.{11,}/.test(e.target.value) ||
        /https:\/\/www.youtube.com\/watch\?v=.{11,}/.test(e.target.value)
      ) {
        let str =
          '\n<iframe width="400" height="300" src="https://www.youtube-nocookie.com/embed/' +
          e.target.value.slice(-11) +
          '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';

        editorRef.current.getInstance().changeMode('markdown');
        editorRef.current.getInstance().insertText(str);
        editorRef.current.getInstance().eventEmitter.emit('closePopup');
        editorRef.current.getInstance().changeMode('markdown');
        e.target.value = '';
      }
    }
  });
  container.appendChild(description);
  container.appendChild(urlInput);
  return container;
};

export const iframe = (node) => {
  return [
    {
      type: 'openTag',
      tagName: 'iframe',
      outerNewLine: true,
      attributes: node.attrs,
    },
    { type: 'html', content: node.childrenHTML },
    { type: 'closeTag', tagName: 'iframe', outerNewLine: false },
  ];
};
