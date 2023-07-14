import React, { useState } from 'react';
import "./EmailTemplate.css"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { render } from 'react-dom';
import EmailEditor from 'react-email-editor';
import { useRef } from 'react';

export default function MyComponent(props) {
  // const [value, setValue] = useState('');
    const emailEditorRef = useRef(null);
  
    const exportHtml = () => {
      emailEditorRef.current.editor.exportHtml((data) => {
        const { design, html } = data;
        console.log('exportHtml', design);
      });
    };
  
    const onReady = () => {
      // editor is ready
      // you can load your template here;
      // const templateJson = {};
      // emailEditorRef.current.editor.loadDesign(templateJson);
    };
  
  return (
  <>
  <div className='email-template'>
      <div>
        <button onClick={exportHtml}>Export HTML</button>
      </div>

      <EmailEditor ref={emailEditorRef} onReady={onReady} />
    </div>
  {/* <Breadcrumbs aria-label="breadcrumb">
  <Link underline="hover" color="inherit" href="/email">
    Email
  </Link>
  <Link
    underline="hover"
    color="inherit"
    href="/email/emailsetting"
  >
    Email Setting
  </Link>
  <Typography color="text.primary">Template</Typography>
</Breadcrumbs>
  <button>Save</button>
  <div>
  <ReactQuill theme="snow" className="emailtemplate" value={value} onChange={setValue} />
  </div> */}
  
  </>
  )
}