import React from "react";
import { useState, useEffect } from "react";
import "./Setting.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "axios";
import DashBoard from "../Dashboard";
import { Children } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import {
  LogoutOutlined,
  SettingOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Collapse, Select, Form, Input, Col, Row, message, Upload } from "antd";
import { UploadChangeParam } from "antd/es/upload";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { Button, Space } from 'antd';

const { Option } = Select;

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const onChange = (key) => {
  // console.log(key);
};

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function Setting() {
  const [profile, setProfile] = React.useState([]);
  const [email, setEmail] = React.useState(null);
  const Navigation = useNavigate();
  const [update, setUpdate] = React.useState(true);
  const [expandIconPosition, setExpandIconPosition] = useState("end");
  const [isDisabled, setIsDisabled] = useState(true);
  const [orgisDisabled, setOrgIsDisabled] = useState(true)
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [editID, setEditID] = useState(null)
  const [isEditing, setIsEditing] = useState(false);
  const [orgIsEditing, setOrgIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState([])
  const [orgEditID, setOrgEditID] = useState(null);
  const [file, setFile] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
 
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  // const handleEdit = (id) => {
  //   setIsDisabled(false);
  //   setEditID(id)
  // };

  const handleEditClick = (id) => {
    setIsDisabled(false);
    setIsEditing(true);
    setEditID(id)
    console.log(id);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setIsDisabled(true);
    setEditID(-1)
  };

  const handleUpdateClick = () => {
    UpdateProfile();
    setIsEditing(false);
    setIsDisabled(true);
    setEditID(-1)
    // Add your update logic here
  };

  const handleOrgEditClick = (id) => {
    setOrgIsDisabled(false);
    setOrgIsEditing(true);
    setOrgEditID(id)
    console.log(id);
  };

  const handleOrgCancelClick = () => {
    setOrgIsEditing(false);
    setOrgIsDisabled(true);
    setOrgEditID(-1)
  };

  const handleOrgUpdateClick = () => {
    UpdateOrgProfile();
    setOrgIsEditing(false);
    setOrgIsDisabled(true);
    setOrgEditID(-1)
    // Add your update logic here
  };



  const handleProfileUpload = () => {
    const formData = new FormData()
    formData.append('file', file)
    axios.post('http://localhost:7383/api/users/update-profile-picture', formData)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  const items = [
    {
      key: "1",
      label: <h6>Personal Information</h6>,
      children: (
        <div>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Row>
              <Col span={12}>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{
                        width: "100%",
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Col>
              <Col span={12}>
                <div>
                  {profile.map((item) => (
                    <div key={item._id}>
                      <TextField
                        label="First Name"
                        id="outlined-size-small"
                        defaultValue={item.first_name}
                        size="small"
                        disabled={isDisabled}
                        onChange={(e) => {
                          const FirstName = e.target.value;
                          console.log(FirstName);
                          setFirstName(FirstName)}}
                        style={{ width: "80%" }}
                      />
                      <br></br>
                      <TextField
                        label="Last Name"
                        id="outlined-size-small fullwidth"
                        defaultValue={item.last_name}
                        size="small"
                        disabled={isDisabled}
                        onChange={(e) => {
                          const LastName = e.target.value;
                          console.log(LastName);
                          setLastName(LastName)}}
                        style={{ width: "80%" }}
                      />
                      <br></br>
                      <TextField
                        label="Email ID"
                        id="outlined-size-small"
                        defaultValue={item.email}
                        size="small"
                        disabled
                        style={{ width: "80%" }}
                      />
                      <br></br>
                      <TextField
                        label="Mobile Number"
                        id="outlined-size-small"
                        defaultValue={item.mobile}
                        size="small"
                        disabled={isDisabled}
                        onChange={(e) => {
                          setMobileNo(e.target.value)}}
                        style={{ width: "80%" }}
                      />
                      
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </Box>
        </div>
      ),
      extra: (
        <div>
        {profile.map((edit) => (
          <div key={edit.id}>
            {edit.senderid === editID ? (
              <div>
                <button className="btn btn-outline-primary btn-sm EditButton" onClick={(event) => {
                  handleCancelClick();
                  event.stopPropagation();
                }
                }>Cancel</button>
                <button className="btn btn-outline-success btn-sm" onClick={(event) => {
                  handleUpdateClick();
                  event.stopPropagation();
                }}>Update</button>
              </div>
            ) : (
              
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={(event) => {
                  handleEditClick(edit.senderid);
                  event.stopPropagation();
                }}
              >
                Edit
              </button>
              
            )}
          </div>
        ))}
      </div>


      ),
    },
    {
      key: "2",
      label: <h6>Company Information</h6>,
      children: <div className="Orgdata">
 <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Row>
              <Col span={12}></Col>
              <Col span={12}> {profile.map((item) => (
        <div key={item._id}>
          <TextField
            label="Company Name"
            id="outlined-size-small"
            defaultValue={item.companyname}
            size="small"
            onChange={(e) => {
              const Company = e.target.value;
            console.log(Company);
            setCompanyName(Company);
            }}
            disabled={orgisDisabled}
            style={{ width: "80%" }}
          />
          </div>
      ))}</Col>
              </Row>
              </Box>
          </div>,
      extra: (
        <div>
        {profile.map((edit) => (
          <div key={edit.id}>
            {edit.senderid === orgEditID ? (
              <div>
                <button className="btn btn-outline-primary btn-sm EditButton" onClick={(event) => {
                  handleOrgCancelClick();
                  event.stopPropagation();
                }
                }>Cancel</button>
                <button className="btn btn-outline-success btn-sm" onClick={(event) => {
                  handleOrgUpdateClick();
                  event.stopPropagation();
                }}>Update</button>
              </div>
            ) : (
              
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={(event) => {
                  handleOrgEditClick(edit.senderid);
                  event.stopPropagation();
                }}
              >
                Edit
              </button>
              
            )}
          </div>
        ))}
      </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const x = JSON.parse(localStorage.getItem("user-details"));
      const ProfileCall = await axios.get(
        "https://expensive-seal-kerchief.cyclic.app/api/users/profile",
        {
          params: { email: x?.email },
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );
      const fetch = [ProfileCall.data.data.matchUser];
      setProfile(fetch);
      setEditProfile(ProfileCall.data.data.matchUser)
    };

    fetchData();
  }, []);

 
  const UpdateProfile = async () => {
    const x = JSON.parse(localStorage.getItem("user-details"));
    const updatedFields = {
      email: x?.email,
    };
    if (firstname) updatedFields.first_name = firstname;
    if (lastname) updatedFields.last_name = lastname;
    if (mobileNo) updatedFields.mobile = mobileNo;
  
    const UpdateCall = await axios.patch(
      "https://expensive-seal-kerchief.cyclic.app/api/users/update",
      updatedFields,
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    )
};

const UpdateOrgProfile = async () => {
  const x = JSON.parse(localStorage.getItem("user-details"));
  const updatedFields = {
    email: x.email,
  };
  if (companyName) updatedFields.companyname = companyName;

  const UpdateCall = await axios.patch(
    "https://expensive-seal-kerchief.cyclic.app/api/users/update",
    updatedFields,
    {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    }
  )
};

  return (
    <>
      <div className="Setting">
        <h3>Setting</h3>
        <button
          className="LogoutButton btn btn-outline-danger btn-sm"
          onClick={() => {
            localStorage.clear();
            Navigation("/login");
          }}
        >
          <span>Logout</span> <LogoutOutlined />
        </button>
      </div>
      <div className="MyProfile">
        <Collapse
          defaultActiveKey={["1"]}
          onChange={onChange}
          expandIconPosition={expandIconPosition}
          items={items}
        />
      </div>
    
    </>
  );
}
