import React from 'react'
import "./emailsetting.css"
import { Button, Form, Input, InputNumber } from 'antd';

const EmailSetting = () => {

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

  return (
   <div className='emailsettingpage'>
    <h5>Email Setting</h5>
    <div><p>Sender Details</p>
    <Form
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{
      maxWidth: 600,
    }}
    validateMessages={validateMessages}
  >
    <Form.Item
      name={['user', 'name']}
      label="Name"
      
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'email']}
      label="Email"
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
        <h5>Email Template</h5>
    </div>
   </div>
  )
}

export default EmailSetting