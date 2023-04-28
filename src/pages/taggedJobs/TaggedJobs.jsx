import React, { useEffect, useState } from 'react'
import TaggedToJobs from '../taggedTojobs/TaggedToJobs'
import ApiService from "../../services/ApiService"
const TaggedJobs = () => {
    const[data,setData]=useState({});
    // const [status, setStatus] = useState(false);
    const[msg,setMsg]=useState(null)

    function handleToggle(e) {
       
        const { name, value } = e.target
        // setStatus(e.target.value)
        console.log(name,value);
        ApiService.getTaggedJobs(value) //get all employeess for selected designation
        .then((res) => {
          // console.log(res.data);
          setData(res.data)
        })
    
        .catch((error) => {
          alert(JSON.stringify(error));
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
     
      }
      useEffect(()=>{
        ApiService.getTaggedJobs(true) //get all employeess for selected designation
        .then((res) => {
          // console.log(res.data);
          setData(res.data)
        })
    
        .catch((error) => {
          alert(JSON.stringify(error));
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
     
      },[])
   
  return (
    
      <>
        <nav className="Navitems"><h1>Tagged Jobs</h1>
  
  </nav>
      <div >
  <input
  type="radio"
  name="status"
  onChange={handleToggle}
  defaultChecked="true"
  value="true"
  // checked={status === "true"}
/> OpenJobs
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<input
  type="radio"
  name="status"
  onChange={handleToggle}
  value="false"
  // checked={status === "false"}
/> ClosedJobs
</div>
<div style={{display:"flex", flexWrap:"wrap", gap:"20px"}}>
        {data?.length>0 && data.map(it=> <TaggedToJobs data={it}/>)}
      </div>
      </>
    
  )
}

export default TaggedJobs