


import React, { useState } from 'react'

import "./Jobs.css";
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';

import { useNavigate } from "react-router-dom";
const Jobs = (props) => {
  const navigate = useNavigate();
  const handleOnClickView = (id) => {
    console.log(id);
    navigate("/postedJobProfile", { state: { jobStringId: id } });
  };


return (
  
  <>

  <div className="job-card" >

  <div className="info">

  <div className="name">Job Descriptions:<p>{props?.data?.jd	}</p> </div> 
  <div className="name">Open Date:<p>{props?.data?.openDate	}</p> </div> 
 
    <div className="name"> Closed Date:<p>{props?.data?.closeDate}</p></div> 
    <div className="name">Budget :<p>{props?.data?.budget} </p></div> 


<div className="name">Ticket:<p>{props?.data?.jobStringTicket	}</p> </div> 


<div>Sample Resume:</div>
<button className="button">
  <a
     className="button"
     href={props?.data?.sampleResume}>
    Download Resume:
  </a>
</button>

   
  
  </div>
 
        <label htmlFor="TaggedEmployees">
          Tagged Employees:
           <nobr />
           <span className="text-danger"> *</span>
         </label>
               <div className="groove">
               <Table responsive>
      <thead>
        <tr>
          <th>Employee Name</th>
          <th>LancesoftId</th>
         </tr>
      </thead>
      <tbody>
      {props?.data?.taggedEmployees?.map((type,index) => (
              <tr data-index={index}>
               
                <td><p>{type.employeeName}</p></td>
                <td><p>{type.lancesoftId}</p></td>
               
              </tr>
            ))}
    
      </tbody>
    
    </Table>
    
</div>
<br/>
{" "}

  <Button className="btn button1" 
    type="submit"
    onClick={(e) => {
      e.stopPropagation();
      handleOnClickView(props?.data?.jobStringId);
      //console.log("emp1");
    }}
    >
          View
        </Button>
        <br/>
        
       

    </div>
  
   
    </>
 )
      }
       

export default Jobs