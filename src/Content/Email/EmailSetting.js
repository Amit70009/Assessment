import React from 'react'
import "./emailsetting.css"
import { useState } from 'react';
import { Button, Form, Input, InputNumber } from 'antd';

const EmailSetting = () => {
    const [componentDisabled, setComponentDisabled] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [senderName, setSenderName] = useState();
    const [senderEmail, setSenderEmail] = useState()

    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };

      const validateMessages = {
        required: '${label} is required!',
        types: {
          email: '${label} is not a valid email!',
    
        },
      };

      const onFinish = (values) => {
        console.log(values);
      };

      const EditSender = () => {
        setComponentDisabled(false);
      }

      const handleEditClick = () => {
        setIsEditing(true);
        setComponentDisabled(false)
      };
    
      const handleSaveClick = () => {
        setIsEditing(false);
        setComponentDisabled(true)
        // Perform save logic
      };
    
      const handleCancelClick = () => {
        setIsEditing(false);
        setComponentDisabled(true)
        
      };
  return (
   <div className='emailsettingpage'>
    <h5>Email Setting</h5>
    <div>
        <div>
        <h6>Sender Details</h6>
        {isEditing ? (
          <>
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={handleCancelClick}>Cancel</button>
          </>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
        </div>
    <Form
    {...layout}
    name="nest-messages"
    disabled={componentDisabled}
    onFinish={onFinish}
    style={{
      maxWidth: 600,
    }}
    validateMessages={validateMessages}
  >
    <Form.Item
      name={['user', 'name']}
      label="Name"
      value={senderName}
      onChange={(e) => setSenderName(e.target.value)}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'email']}
      label="Email"
      defaultvalue={senderEmail}
      onChange={(e) => setSenderEmail(e.target.value)}
      rules={[
        {
          type: 'email',
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
    </Form>
    </div>
    <div>
        <h6>Email Template</h6>
        
    </div>
   </div>
  )
}

export default EmailSetting