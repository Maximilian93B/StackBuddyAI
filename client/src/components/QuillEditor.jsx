import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill'; // Import the ReactQuill module
import PropTypes from 'prop-types'; // Import PropTypes
import 'react-quill/dist/quill.snow.css'; // Import Quill stylesheet

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

// Define prop types for QuillEditor component
QuillEditor.propTypes = {
  initialContent: PropTypes.string,
  handleContentChange: PropTypes.func.isRequired
};

export default QuillEditor;