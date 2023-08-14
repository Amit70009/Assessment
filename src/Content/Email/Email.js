import React, { useContext } from "react";
import axios from "axios";
import "./Email.css";
import { useState, useEffect } from 'react';
import {SendOutlined,UserOutlined, DownOutlined} from "@ant-design/icons"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from "@mui/material/TextField";
import { Button, Space, Form, Input, InputNumber, Dropdown, message, Select  } from 'antd';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

// import Select from '@mui/material/Select';

export default function Email({fetchassessment}) {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const [RecieverEmail, setRecieverEmail] = useState("");
  const [recieverFullName, setRecieverFullName] = useState("");
  const [senderFullName, setSenderFullName] = useState("");
const [senderEmail, setSenderEmail] = useState("");
const [emailSubject, setEmailSubject] = useState("")
const [reqid, setReqID] = useState("req_vaBPviZnIxrdS7OI1R79")
const [fetchwebhook, setFetchWebhook] = useState()
const [newData, setNewData] = useState();
const [profile, setProfile] = useState();
const [age, setAge] = React.useState('');
const [selectedValue, setSelectedValue] = useState('Not');
const { Option } = Select;
const [emailTemplate, setEmailTemplate] = useState([])
const [fetch, setFetch] = useState([]);
const [form] = Form.useForm();
const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

 

const handleChange = (event) => {
  setAge(event.target.value);
};


const handleMenuClick = (e) => {
  message.info('Click on menu item.');
  console.log('click', e);
}

const items = [
  {
    label: '1st menu item',
    key: '1',
    icon: <UserOutlined />,
  },
  {
    label: '2nd menu item',
    key: '2',
    icon: <UserOutlined />,
  },
  {
    label: '3rd menu item',
    key: '3',
    icon: <UserOutlined />,
    danger: true,
  },
  {
    label: '4rd menu item',
    key: '4',
    icon: <UserOutlined />,
    danger: true,
    disabled: true,
  },
];
const menuProps = {
  items,
  onClick: handleMenuClick,
};

const handleButtonClick = (e) => {
  message.info('Click on left button.');
  console.log('click left button', e);
};

console.log(fetchassessment);

const ProfileCallOnClick = async () => {

  const x = (JSON.parse(localStorage.getItem("user-details")));
 
  const ProfileCall = await axios.get("https://expensive-seal-kerchief.cyclic.app/api/users/profile", {
      params: { email: x.email },
  }, {
      headers: {
          "Content-Type": "application/json",
          "accept": "application/json"
      }
  },);
  const profilecheck = await ProfileCall.data.data.matchUser
 setProfile(profilecheck)
}


  const sendEmail = async () => {
    const { sendername, senderemail } = profile;
    const data = JSON.stringify({
      sender: {
        name: sendername,
        email: senderemail
      },
      to: [
        {
          email: RecieverEmail,
          name: recieverFullName,
        },
      ],
      subject: emailSubject,
      htmlContent:
        `
        `,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.brevo.com/v3/smtp/email",
      headers: {
        accept: "application/json",
        "api-key": "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",
        "content-type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        window.location.reload()
        
      })
      .catch((error) => {
        console.log(error);
        
      });
  };

  useEffect(() => {
    ProfileCallOnClick()
}, [])

const FetchEmailTemplate = async () => {
  const x = (JSON.parse(localStorage.getItem("user-details")));
  const FetchEmail = await axios.get(`https://gray-famous-butterfly.cyclic.app/api/users/email-template/fetch/${x.userID}`, {
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json"
  }
  })
  setEmailTemplate(FetchEmail.data.data);
}

const FetchAllAssessment = async () => {
  const AssessmentData = await axios.get(
    "https://gray-famous-butterfly.cyclic.app/api/users/fetchallassessment",
    {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    }
  );
  setFetch(AssessmentData.data.data.AssessmentCheck);
};


  const FetchWebhook = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://gray-famous-butterfly.cyclic.app/api/users/webhook', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': process.env.REACT_APP_WEBHOOK
        }
      });
      
    const ids = response.data.data.models.map(obj => obj.id)

    let objectsArray = [];

 for (const id of ids) {
     const FinalResponse = await axios.get(`https://gray-famous-butterfly.cyclic.app/api/users/webhook/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.REACT_APP_WEBHOOK
      }
    });

    objectsArray = objectsArray.concat(FinalResponse.data.data.data.body);
  //   setFetchWebhook(objectsArray);
 setFetchWebhook(objectsArray)
 setIsLoading(false);
  } 
 

    } catch (error) {
      console.log(error);
    }
  }    

  const layout = {
    labelCol: {
      span: 10,
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
  const { TextArea } = Input;

  useEffect(() => {
    FetchWebhook()
  }, [])

  const handleSendButton = () => {
    FetchAllAssessment();
    FetchEmailTemplate();
  }

  const handleChange1 = (value) => {
    setSelectedValue(value);
  };

  const YourComponent = ({ fetchwebhook }) => {
    const updatedData = [];
  
    const updateData = async (email, event, timestamp) => {
      const existingData = updatedData.find((web) => web.email === email);
  
      if (existingData) {
        if (timestamp > existingData.timestamp) {
          existingData.event = event;
          existingData.timestamp = timestamp;
        }
      } else {
        updatedData.push({ email, event, timestamp });
      }
    };
  if(!fetchwebhook){
    return <div>Loading...</div>;
  }
 
   

    fetchwebhook.map((web) => {
      updateData(web.email, web.event);
    });

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Sr. No.</TableCell>
              <TableCell align="left">Recipient Email</TableCell>
              <TableCell align="left">Email Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

          
            {updatedData.map((web, index) => (

              <TableRow key={web.email} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <p>{index + 1}</p>
                </TableCell>
                <TableCell align="left">{web.email}</TableCell>
                <TableCell align="left">{web.event}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };



  return (
    <>
      <div className='EmailSetting'>
      <Space> <Button icon={<SendOutlined />} type="primary" data-bs-toggle="modal" data-bs-target="#sendemail" onClick={handleSendButton}> Send Email</Button> </Space>
        
        <a href='/email/emailsetting' className='Email'>Email Setting</a>
      </div>
      <div className="AssessmentTable">
      <YourComponent fetchwebhook={fetchwebhook} />
      </div>
      
      <div
          className="modal fade"
          id="sendemail"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Send Email
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body sendemail-modal">
              <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    >
    <Form.Item
      name={['user', 'name']}
      label="Full Name"
      onChange={(e) => setRecieverFullName(e.target.value)}
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input className=''/>
    </Form.Item>
    <Form.Item
      name={['user', 'email']}
      label="Email"
      onChange={(e) => setRecieverEmail(e.target.value)}
      rules={[
        {
          type: 'email',
          required: true
        },
      ]}
    >
      <Input className='input'/>
    </Form.Item>
    <Form.Item
      name={['user', 'subject']}
      label="Subject"
      onChange={(e) => setEmailSubject(e.target.value)}
      rules={[
        {
          type: 'text',
          required: true
        },
      ]}
    >
      <Input className='input'/>
    </Form.Item>
    
   <div className="check input">
    <p>Select Template : </p>
    <div class="form-group form-control-sm">
    {emailTemplate ? (
  <select className="form-control form-control-sm more" id="exampleFormControlSelect1">
    {emailTemplate.map((item) => (
      <option key={item.uniqueID} value={item.uniqueID}>
        {item.name}
      </option>
    ))}
  </select>
) : (
  <p>Loading email template...</p>
)}
</div>
</div>
  <div className="check input">
    <p>Select Assessment : </p>
    <div class="form-group form-control-sm">
    {emailTemplate ? (
  <select className="form-control form-control-sm more" id="exampleFormControlSelect1">
    {fetch.map((item) => (
      <option key={item.uniqueID} value={item.uniqueID}>
        {item.AssessmentName}
      </option>
    ))}
  </select>
) : (
  <p>Loading email template...</p>
)}
  </div>
  </div>
    </Form>
                
              </div>
              <div className="modal-footer">
                
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={sendEmail}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
