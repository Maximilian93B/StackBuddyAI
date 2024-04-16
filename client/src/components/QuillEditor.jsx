import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill'; // Import the ReactQuill module
import PropTypes from 'prop-types'; // Import PropTypes
import 'react-quill/dist/quill.snow.css'; // Import Quill stylesheet
import styled from 'styled-components';



const QuillContainer = styled.div`
.quill {
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s ease;

  &:focus-within {
    border-color: #007bff;
  }
}
.ql-toolbar {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: black;
}
.ql-container {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  height: 350px; // Adjust based on your needs
  width: 100%; 
  background: -webkit-linear-gradient(to right, #363795, #005C97);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #363795, #005C97); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: white;
}
`;


// Quil Component 
const QuillEditor = ({ initialContent, handleContentChange }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleChange = (content, delta, source, editor) => {
    setContent(content);
    handleContentChange(editor.getHTML()); // or editor.getText() if you need the text
  };

// Define prop types for QuillEditor component
QuillEditor.propTypes = {
  initialContent: PropTypes.string,
  handleContentChange: PropTypes.func.isRequired
};

  // set all modules and formats from quil docs 

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['link', 'image', 'video'],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ]
  };

  const formats = [
    'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block',
    'header', 'list', 'script',
    'indent', 'direction', 'size',
    'link', 'image', 'video',
    'color', 'background'
  ];


// Return component with Quill/styles and modules 
  return (
    <QuillContainer>
      <ReactQuill 
        theme="snow"
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
    </QuillContainer>
  );
};

export default QuillEditor;