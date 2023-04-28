import React, { useState } from 'react'
import {  Button} from "react-bootstrap";
import "./ViewProfiles.css";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";

const ViewProfiles = (props) => {
  const[status,setStatus]=useState(false)
  const[msg,setMsg]=useState(null)

    const navigate = useNavigate();
    const handleInterview= (id) => {

      ApiService.scheduleStatus(id)
             .then((res) => {
            //    console.log(res.data); 
            navigate("/hr/GetInterviewStatus", { state: { candidateId: id } });
            setStatus(false);

             })
             .catch((err) => {
               console.log(err);
               
               setStatus(true);
               setMsg(err.message);


             });
           

      console.log(id);
      
    };
  return (
 
             
      <div class="card-deck">
      <div class="card">
<div class="card-body">
          <h6 class="card-title">Profile</h6>
          <ul class="list-group">
            <li class="list-group-item list-group-item-success"><b>Candidate Id:</b> {props?.profiles?.candidateId}</li>
            <li class="list-group-item list-group-item-success"><b>Candidate Name:</b> {props?.profiles?.candidateName}</li>
            <li class="list-group-item list-group-item-success">  <b> Email Id:</b> {props?.profiles?.emailId}</li>
            <li class="list-group-item list-group-item-success"> <b>Mobile No:</b> {props?.profiles?.mobileNo}</li>
            <li class="list-group-item list-group-item-success"> <b>Current CTC:</b> {props?.profiles?.currentCTC}</li>
            <li class="list-group-item list-group-item-success"> <b>Expected CTC:</b> {props?.profiles?.expectedCTC}</li>
            <li class="list-group-item list-group-item-success"> <b>Relevant Exp:</b> {props?.profiles?.relevantExp}</li>

            <li class="list-group-item list-group-item-success"> <b>Sent By:</b> {props?.profiles?.sentBy}</li>
            <li class="list-group-item list-group-item-success"><b>Total Exp:</b> {props?.profiles?.totalExp}</li>
            <li class="list-group-item list-group-item-success"> <b>Current Org:</b> {props?.profiles?.currentOrg}</li>
            <li class="list-group-item list-group-item-success"> <b>Sent At:</b> {props?.profiles?.sentAt}</li>
            <li class="list-group-item list-group-item-success"> <b>Manager Approval:</b> {props?.profiles?.managerApproval}</li>
            <li class="list-group-item list-group-item-success"> <b>Approve At:</b> {props?.profiles?.approveAt}</li>
            <li class="list-group-item list-group-item-success"> <b>Ticket Name:</b> {props?.profiles?.ticketName}</li>
            <div className="candiResume"><b>Sample Resume:</b></div>
<button className="resume-button">
  <a
     className="resume-button"
     href= {props?.profiles?.candiResume}
   >
    Download Resume:
  </a>
</button>

<br/>
<div className="status-profile">
        {status && (
          <p className="text-danger mb-2">
            The profile is rejected or pending..
          </p>
        )}
        </div>

<Button className="btn-signup px-2" 
        type="submit"
        onClick={(e) => {
          e.stopPropagation();
          handleInterview(props?.profiles?.candidateId);
          //console.log("emp1");
        }}
        >
          Schedule Interview
        </Button>{" "}
        
        {/* {<p className="text-danger mb-2">{msg}</p>} */}

        
    
  
          </ul>
        
</div>


          </div>
        </div>
                          
 
  )
}

export default ViewProfiles