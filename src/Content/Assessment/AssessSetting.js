import React, {useState, useEffect, useRef} from 'react'
import "./AssessSetting.css"
import { Switch } from 'antd';
import TextField from "@mui/material/TextField";
import axios from 'axios';
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";


const AssessSetting = () => {

  
  const [autoSubmitSwitch, setAutoSubmitSwitch] = useState();
  const [autoCutOffSwitch, setAutoCutOffSwitch] = useState();
  const [autoCutOffTime, setAutoCutOffTime] = useState();
  const [autocamera, setAutoCamera] = useState();
  const [autoresultDisplay, setAutoResultDisplay] = useState();
  const [autoSubmitMinimizeScreen, setAutoSubmitMinimizeScreen] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [fetchData, setFetchData] = useState([])
  const [isCustomizedClicked, setIsCustomizedClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  const onAutoSubmitChange = (checked) => {
    const AutoSubmit = checked ? true : false;
    setAutoSubmitSwitch(AutoSubmit);
  };
  const onAutoCutOffTimeChange = (checked) => {
    const AutoSubmit = checked ? true : false;
    setAutoCutOffTime(AutoSubmit);
  };
  const onCameraChange = (checked) => {
    const AutoSubmit = checked ? true : false;
    setAutoCamera(AutoSubmit);
  };
  const onResultDisplayChange = (checked) => {
    const AutoSubmit = checked ? true : false;
    setAutoResultDisplay(AutoSubmit);
  };
  
  const onautoSubmitMinimizeScreenChange = (checked) => {
    const AutoSubmit = checked ? true : false;
    setAutoSubmitMinimizeScreen(AutoSubmit);
  };

  const onCutOffChange = (checked) => {
    const Cutoff = checked ? true : false;
    setAutoCutOffSwitch(Cutoff);
  }


  const AssessmentSetting = async (id) => {
    const createAssessSetting = axios.post(`https://gray-famous-butterfly.cyclic.app/api/users/assessmentsetting-create`, {
      AssessID: localStorage.getItem("Assessment Setting ID"),
      AutoSubmit: false,
      AutoCutOffTime: 0,
      AutoSubmitMinimizeScreen: false,
      ResultDisplay: false,
      Camera: false,
      AutoCutOff: false
    },
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    )
  }

  const check = async () => {
    const doublecheck = await axios.get(`https://gray-famous-butterfly.cyclic.app/api/users/assessmentsetting-fetch/${localStorage.getItem("Assessment Setting ID")}`,
{
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
}).then(res => {
  setFetchData([res.data.data]);
  console.log("setItem", res.data.data);
  // setAutoCamera(res.data.data.autocamera)
  localStorage.setItem("AutoSubmitCheck", res.data.data.AutoSubmit);
  localStorage.setItem("AutoCutoff", res.data.data.AutoCutOff);
  localStorage.setItem("AutoCutoffTime", res.data.data.AutoCutOffTime);
  localStorage.setItem("ResultDisplay", res.data.data.ResultDisplay);
  localStorage.setItem("AutoMinimize", res.data.data.AutoSubmitMinimizeScreen);
  localStorage.setItem("AutoCamera", res.data.data.Camera);


})
}

useEffect(() => {
  const FetchAssessSetting = async () => {
    try {
      const response = await axios.get(`https://gray-famous-butterfly.cyclic.app/api/users/assessmentsetting-fetch/${localStorage.getItem("Assessment Setting ID")}`).then(res => {
        setFetchData([res.data.data]);
        localStorage.setItem("AutoSubmitCheck", res.data.data.AutoSubmit);
        localStorage.setItem("AutoCutoff", res.data.data.AutoCutOff);
        localStorage.setItem("AutoCutoffTime", res.data.data.AutoCutOffTime);
        localStorage.setItem("ResultDisplay", res.data.data.ResultDisplay);
        localStorage.setItem("AutoMinimize", res.data.data.AutoSubmitMinimizeScreen);
        localStorage.setItem("AutoCamera", res.data.data.Camera);
      })
      setAutoCutOffSwitch(localStorage.getItem("AutoCutoff") === "true");
    setAutoCamera(localStorage.getItem("AutoCamera") === "true");
    setAutoCutOffTime(localStorage.getItem("AutoCutoffTime"))
    setAutoSubmitMinimizeScreen(localStorage.getItem("AutoMinimize") === "true");
    setAutoSubmitSwitch(localStorage.getItem("AutoSubmitCheck") === "true");
    setAutoResultDisplay(localStorage.getItem("ResultDisplay") === "true");
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  }

  FetchAssessSetting();
}, []);


  

  const UpdateAssessmentSetting = async() => {
    const UpdateAssesssetting = {
      AssessID: localStorage.getItem("Assessment Setting ID")
    };
    if(autoSubmitSwitch) UpdateAssesssetting.AutoSubmit = autoSubmitSwitch;
    if(autoCutOffSwitch) UpdateAssesssetting.AutoCutOff = autoCutOffSwitch;
    if(autoCutOffTime) UpdateAssesssetting.AutoCutOffTime = autoCutOffTime;
    if(autocamera) UpdateAssesssetting.Camera = autocamera;
    if(autoresultDisplay) UpdateAssesssetting.ResultDisplay = autoresultDisplay;
    if(autoSubmitMinimizeScreen) UpdateAssesssetting.AutoSubmitMinimizeScreen = autoSubmitMinimizeScreen;

    const Setting = axios.patch(`https://gray-famous-butterfly.cyclic.app/api/users/assessmentsetting-update/${localStorage.getItem("Assessment Setting ID")}`,
    UpdateAssesssetting,
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    )
  }

  // useEffect(() => {
  //   setAutoCutOffSwitch(localStorage.getItem("AutoCutoff") === "true");
  //   setAutoCamera(localStorage.getItem("AutoCamera") === "true");
  //   setAutoCutOffTime(localStorage.getItem("AutoCutoffTime"))
  //   setAutoSubmitMinimizeScreen(localStorage.getItem("AutoMinimize") === "true");
  //   setAutoSubmitSwitch(localStorage.getItem("AutoSubmitCheck") === "true");
  //   setAutoResultDisplay(localStorage.getItem("ResultDisplay") === "true");
  //   setIsLoading(false);
  //   console.log("setvariable");
    
  // }, []);
  return (
    <>
    <div className='AssessSetting'>
      <div> 
        <h3>Assessment Setting</h3> 
      </div>
      <div className='Assbtn'>
      {fetchData.map((fetch, index) => (
  fetch === null ? (
    <div key={index}>
      <button className='btn btn-outline-success btn-sm' 
      onClick={() => {
        AssessmentSetting();
        setIsDisabled(false)
      }}
      >Setup Setting</button>
    </div>
  ) : (
    <div>
      {isCustomizedClicked ? (
        <div>
          <button className='btn btn-outline-success btn-sm cancelbtn' onClick={() => {setIsDisabled(true); setIsCustomizedClicked(false)}}>Cancel</button>
          <button className='btn btn-outline-success btn-sm' onClick={() => {UpdateAssessmentSetting(); setIsDisabled(true); setIsCustomizedClicked(false)}}>Update</button>
          </div>
      ) : (<div className='Assbtn' key={index}>
      <button className='btn btn-outline-success btn-sm' onClick={() => {setIsDisabled(false); setIsCustomizedClicked(true)}}>Customize</button>
    </div>)}
    
    </div>
  )
))}</div>

      
      
    </div>
    <div className='Breadcrumbs'>
    <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/assessment">
            Assessment
          </Link>
          <Typography color="text.primary">Assessment-Setting</Typography>
        </Breadcrumbs>
        </div>
        {isLoading ? (<p>Loading....</p>) : (<div className='MainBody'>
    <h5 className='cutoff'>Assessment Cutoff Time :  <Switch className='switch' defaultChecked={autoCutOffSwitch} checked={autoCutOffSwitch} onChange={onCutOffChange} disabled={isDisabled}/></h5>
   {autoCutOffSwitch === true ? (
    <>
    <div className='cutofftime'>
    <h6>Assessment Cutoff Time : </h6>
    <div className='cutofftimer'>
    <TextField
                        className="NumberField"
                        id="outlined-number"
                        type="number"
                        onChange={(event) => setAutoCutOffTime(event.target.value)}
                        variant="standard"
                        disabled={isDisabled}
                        defaultValue={autoCutOffTime}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      /> <p>minutes</p></div>
                      </div>
                      </>
   ) : null}
   <h5 className='autosubmit'>Assessment Auto-Submit: <Switch className='switch' disabled={isDisabled} defaultChecked={autoSubmitSwitch} onChange={onAutoSubmitChange}/></h5>
   <h5 className='autosubmit'>Assessment Auto-Submit on minimize screen:  <Switch className='switch' disabled={isDisabled} defaultChecked={autoSubmitMinimizeScreen} onChange={onautoSubmitMinimizeScreenChange}/></h5>
   <h5 className='autosubmit'>Video Camera:  <Switch className='switch' defaultChecked={autocamera} disabled={isDisabled} onChange={onCameraChange}/></h5>
   <h5 className='autosubmit'>Display Result after submit:  <Switch className='switch' disabled={isDisabled} defaultChecked={autoresultDisplay} onChange={onResultDisplayChange}/></h5>
    </div>)}
    
    
    
    </>
  )
}

export default AssessSetting