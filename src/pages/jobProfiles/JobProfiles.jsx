import React, { useEffect, useState } from "react";
import {  Form ,Col,Row,Button} from "react-bootstrap";
import ApiService from "../../services/ApiService";
import { useNavigate } from "react-router-dom";

import "./JobProfiles.css";
const JobProfiles = (props) => {

    const[approve,setApprove]=useState(props?.profiles?.managerApproval)
    const[msg,setMsg]=useState(null)
    const[reject,setReject]=useState(null)
    const[status,setStatus]=useState(false)
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
    //console.log(props)

    const handleApproval = (id) => {
      
let status=[
  {
    "id": id,
    "status": "APPROVE"
  }
]


      console.log(id);
      // console.log('value is:', e.target.value);

  
      // if (name === "APPROVE") {
        ApiService.ApproveProfiles(status)
          .then((res) => {
             console.log(res.data);
            
          })
  
          .catch((error) => {
            alert(JSON.stringify(error))
            setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
          })
      
  
    
    }
    const handleReject = (id) => {
      console.log(id)
  
      let status1=[
        {
          "id": id,
          "status": "REJECT"
        }
      ]
      // if (name === "REJECT") {
        ApiService.ApproveProfiles(status1)
          .then((res) => {
         
            setReject(res.data)
          })
  
          .catch((error) => {
            alert(JSON.stringify(error))
            setMsg(error.response.data.errorMessage ? error.response.data.errorMessage : error.message)
          })
      
    
    }
   
    return (
      <div id="add-employee" className="card">

            
     <Form >
               
     <h1 className="title text-center">Profiles</h1>
                       <hr></hr>
       
<div>  <b>Candidate Id:</b><p>{props?.profiles?.candidateId}</p></div>
<div>  <b>Candidate Name:</b><p>{props?.profiles?.candidateName}</p></div>
<div>  <b>Email Id:</b><p>{props?.profiles?.emailId}</p></div>
<div>  <b>Mobile No:</b><p>{props?.profiles?.mobileNo}</p></div>
<div>  <b>Current CTC:</b><p>{props?.profiles?.currentCTC}</p></div>
<div>  <b>Relevant Exp:</b><p>{props?.profiles?.relevantExp}</p></div>
<div>  <b>Expected CTC:</b><p>{props?.profiles?.expectedCTC}</p></div>
<div>  <b>SentBy:</b><p>{props?.profiles?.sentBy}</p></div>
<div>  <b>Total Exp:</b><p>{props?.profiles?.totalExp}</p></div>
<div>  <b>Current Org:</b><p>{props?.profiles?.currentOrg}</p></div>
<div>  <b>Sent At:</b><p>{props?.profiles?.sentAt}</p></div>
<div>  <b>Manager Approval:</b><p>{approve}</p></div>
<div>  <b>Approve At:</b><p>{props?.profiles?.approveAt}</p></div>
<div>  <b>Ticket Name:</b><p>{props?.profiles?.ticketName}</p></div>
<div><b>Candidate Resume:</b></div>
                          <button className="button">
                            <a
                              className="button"
                              href={props?.profiles?.candiResume}
                            
                              >
                              Download Resume:
                            </a>
                          </button>


                </Form>
                <br/>
                <Button
               
        className="card-btn1"
        onClick={(e) => {
          e.stopPropagation();
          handleInterview(props?.profiles?.candidateId);
          //console.log("emp1");
        }}
      >
        GetInterviewStatus
      </Button>
<br/>
<div className="view-buttons">

        <Button className="btn-signup px-2" 
        type="submit"
        name="APPROVE"
        onClick={(e) => {
          e.stopPropagation();
          handleApproval(props?.profiles?.candidateId);
          //console.log("emp1");
        }}
        >
              Approve
       
        </Button>{" "}
        <Button className="px-2" type="submit"

onClick={(e) => {
  e.stopPropagation();
  handleReject(props?.profiles?.candidateId);
  //console.log("emp1");
}}
>
Reject
          
        </Button>
        </div>



                {/* <Button
                name="APPROVE"
        className="card-btn"
        onClick={(e) => {
          e.stopPropagation();
          handleApproval(props?.profiles?.candidateId);
          //console.log("emp1");
        }}
      >
    
      </Button> */}
    {/* <br/> */}
      
      {/* <Button
      name="REJECT"
        className="card-btn"
        onClick={(e) => {
          e.stopPropagation();
          handleReject(props?.profiles?.candidateId);
          //console.log("emp1");
        }}
      >
      Reject
      </Button> */}
      
                </div>
            
            
      )
}

export default JobProfiles