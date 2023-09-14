import React, {useState, useEffect} from 'react'
import "./AssessSetting.css"
import { Switch } from 'antd';
import TextField from "@mui/material/TextField";


const AssessSetting = () => {
 
  const [autoSubmitSwitch, setAutoSubmitSwitch] = useState(true);
  const [autoCutOffSwitch, setAutoCutOffSwitch] = useState(true);
  // const [isDisabled, setIsDisabled] = useState('false');
  const [cutofftime, setCutOffTime] = useState("0")

  
  const onAutoSubmitChange = (checked) => {
    const AutoSubmit = checked ? true : false;
    setAutoSubmitSwitch(AutoSubmit);
    // localStorage.setItem("Assessment Setting ID", AutoSubmit)
  };

  const onCutOffChange = (checked) => {
    const Cutoff = checked ? true : false;
    setAutoCutOffSwitch(Cutoff);
    // localStorage.setItem("Assessment Setting ID", Cutoff)
  }

  const local = {
    AutoSubmit: autoSubmitSwitch,
    AutoCutOff: autoCutOffSwitch
  }

  localStorage.setItem("Set", JSON.stringify(local))
  return (
    <>
    <div className='AssessSetting'>
      <div> 
        <h3>Assessment Setting</h3> 
      </div>
      <div className='Assbtn'>
       <button className='btn btn-outline-success btn-sm'>Preview</button>
      </div>
    </div>
    <div className='MainBody'>
    <h5 className='cutoff'>Assessment Cutoff Time :  <Switch className='switch' onChange={onCutOffChange}/></h5>
   {autoCutOffSwitch === "true" ? (
    <>
    <div className='cutofftime'>
    <h6>Assessment Cutoff Time : </h6>
    <div className='cutofftimer'>
    <TextField
                        className="NumberField"
                        id="outlined-number"
                        type="number"
                        onChange={(event) => setCutOffTime(event.target.value)}
                        variant="standard"
                        defaultValue={cutofftime}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      /> <p>minutes</p></div>
                      </div>
                      </>
   ) : null}
   <h5 className='autosubmit'>Assessment Auto-Submit:  <Switch className='switch' defaultChecked={autoSubmitSwitch} onChange={onAutoSubmitChange}/></h5>
   <h5 className='autosubmit'>Assessment Auto-Submit on minimize screen:  <Switch className='switch' defaultUnchecked/></h5>
   <h5 className='autosubmit'>Video Camera:  <Switch className='switch' defaultUnchecked/></h5>
   <h5 className='autosubmit'>Display Result after submit:  <Switch className='switch' defaultUnchecked/></h5>
    </div>
    
    
    </>
  )
}

export default AssessSetting