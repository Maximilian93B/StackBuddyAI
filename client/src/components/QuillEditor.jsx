import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill'; // import the ReactQuill module
import 'react-quill/dist/quill.snow.css'; // import quill stylesheet

const QuillEditor = ({ initialContent, handleContentChange }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleChange = (content, delta, source, editor) => {
    setContent(content);
    handleContentChange(editor.getHTML()); // or editor.getText() if you need the text
  };

  return (
    <div>
      <ReactQuill 
        theme="snow" 
        value={content}
        onChange={handleChange}
      />
    </div>
  );
};

export default QuillEditor;