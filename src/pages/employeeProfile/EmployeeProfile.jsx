import React, { Fragment } from "react";
import { useState } from "react";
import { Button, Modal, Col, Row, Form, FormGroup } from "react-bootstrap";
// import moment from "moment";
import "./EmployeeProfile.css";

import ModelComponent from "../../modelComponent/ModelComponent";
import lance_logo from "../../images/lance_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ApiService from "../../services/ApiService";
import SubEmployee from "../../components/subEmployee/SubEmployee";
import { useLocation } from "react-router-dom";
import FileSaver from "file-saver";
import DownloadIcon from "@mui/icons-material/Download";
import SaveAsSharpIcon from "@mui/icons-material/SaveAsSharp";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function EmployeeProfile({ props }) {
  let type = sessionStorage.getItem("type");
  // console.log(props.data);
  const [data, setData] = useState({});
  const [client, setClient] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("");
  const [fName, setFName] = useState("");
  const [allowanceData, setAllowanceData] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const [enhancedFields, setEnhancedFields] = useState();
  const [showEmployeeProfile, setShowEmployeeProfile] = useState(true);
  const [showAllowances, setShowAllowances] = useState(false);
  const [showBill, setShowBill] = useState(true);
  const [showClients, setShowClients] = useState(false);
  const [showEmployees, setShowEmployees] = useState(false);
  const [viewEmployee, setViewEmployee] = useState(false);
  const [employee, setEmployee] = useState([]);
  const [subEmp, setSubEmp] = useState(false);
  const [subEmpId, setSubEmpId] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);

  const showColor = (status) => {
    if (status === "BENCH") {
      return {
        backgroundColor: "#FFEB3B",
        // color: "#000",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "CLIENT") {
      return {
        backgroundColor: "#66BB6A",
        // color: "#000",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "MANAGMENT") {
      return {
        backgroundColor: "#FFA500",
        // color: "#ffff",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "ABSCONDED") {
      return {
        backgroundColor: "#F6C3CC",
        // color: "#000",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "RELEASED") {
      return {
        backgroundColor: "#F6C3CC",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "TERMINATED") {
      return {
        backgroundColor: "#F6C3CC",
        // color: "#000",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "EXIT") {
      return {
        backgroundColor: "#EF5350",
        // color: "#000",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "ACTIVE") {
      return {
        backgroundColor: "#00FF00",
        // color: "#000",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "CLIENT_SIDE") {
      return {
        backgroundColor: "#1E90FF",
        // color: "#000",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    } else if (status === "INTERNAL") {
      return {
        backgroundColor: "black",
        // color: "#000",
        "padding-left": "10px",
        "padding-right": "10px",
      };
    }
  };

  const [employeesButtonName, setEmployeesButtonName] =
    useState("View Employees");

  const handleHideBox = () => {
    setShowEmployeeProfile(false);
  };
  const handleemployeeBackClick = () => {
    setShowEmployeeProfile(true);
  };

  const handleAllowancesButtonClick = () => {
    setShowAllowances(true);
    setShowClients(false);
    setShowEmployees(false);
    setShowBill(true);
    setShowEmployeeProfile(false);
    setEmployeesButtonName("View Employees");
    setShowBackButton(true);
  };

  const handleClientsButtonClick = () => {
    setShowClients(true);
    setShowAllowances(false);
    setShowEmployees(false);
    setShowEmployeeProfile(false);
    setShowBill(true);
    setShowBackButton(true);
    setEmployeesButtonName("View Employees");
  };

  const handleEmployeesButtonClick = () => {
    setShowEmployees(true);
    setShowAllowances(false);
    setShowClients(false);
    setShowEmployeeProfile(false);
    setShowBill(true);
    setEmployeesButtonName();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleClick = (id) => {
    setSubEmpId(id);
    setSubEmp(true);
    setModalShow(true);
    setShowEmployees(true);
    setShowAllowances(false);
    setShowClients(false);
    setShowEmployeeProfile(false);
    setShowBill(true);
    setEmployeesButtonName();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  const handleClose = () => {};
  const extractFileName = (contentDispositionValue) => {
    var filename = "";
    if (
      contentDispositionValue &&
      contentDispositionValue.indexOf("attachment") !== -1
    ) {
      var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      var matches = filenameRegex.exec(contentDispositionValue);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, "");
      }
    }
    return filename;
  };

  const handleResume = async () => {
    const id = data.detailsResponse?.employeeId;
    console.log(id);
    await ApiService.DownloadResume(id)
      .then((res) => {
        console.log(res.data);
        const filename = extractFileName(res.headers["content-disposition"]);
        if (filename !== null) {
          setFName(filename);
          setMsg("");
          console.log("File Name: ", filename);
          var fileDownload = require("js-file-download");
          fileDownload(res.data, filename);
        } else {
          setMsg("resume not found");
        }
      })

      .catch((error) => {
        alert(JSON.stringify(error));

        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  };

  useEffect(() => {
    console.log(location.state.empId);

    if (location.state.empId) {
      setStatus(true);
      //console.log(props)
      console.log(data);

      ApiService.getEmployeeById(location.state.empId)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
          setStatus(false);
          setMsg("");
        })
        .catch((err) => {
          console.log(err);
          setData("");
          setStatus(false);
          setMsg(err.message);
        });
      ApiService.specialallowance(location.state.empId)
        .then((res) => {
          console.log(res.data);
          setAllowanceData(res.data);
          setStatus(false);
          setMsg("");
        })
        .catch((err) => {
          console.log(err);
          setAllowanceData("");
          setStatus(false);
          setMsg(err.message);
        });

      ApiService.getAllClientsByEmpId(location.state.empId)
        .then((res) => {
          console.log(data);
          console.log(res.data.addres);
          setClient(res.data);
          setStatus(false);
        })
        .catch((err) => {
          console.log(err);
          setClient({});
          setStatus(false);
        });
    }
    ApiService.getUnderEmployee(location.state.empId)
      .then((res) => {
        console.log(res.data);
        setEmployee(res.data);
        setSubEmp(true);
      })
      .catch((err) => {
        console.log(err);
        setSubEmp(false);
      });

    ApiService.enhancedFields(location.state.empId)
      .then((res) => {
        console.log(data.enhancedFields);
        console.log(res.data.enhancedFields);
        setEnhancedFields(res.data.enhancedFields);
        setStatus(false);
      })
      .catch((err) => {
        console.log(err);
        setEnhancedFields({});
        setStatus(false);
      });
  }, [location.state.empId]);
  const l = data.detailsResponse?.status;

  return (
    <>
      {/* <div style={showColor(l)}> */}
      <div
        className="p-3 mb-2 bg-primary text-white"
        style={{ color: "#1492E6" }}
      >
        EMPLOYEE PROFILE{" "}
        <ArrowBackIcon
          className="arrow"
          style={{ marginLeft: "1368px" }}
          onClick={handleemployeeBackClick}
        />
      </div>

      {showEmployeeProfile && (
        <>
          <div>
            {status && <p className="text-success mb-1">loading...</p>}
            <p className="text-danger">{msg}</p>
            {!status && (
              <div onSubmit={handleSubmit}>
                <div className="container basicbox">
                  <table className="basictable">
                    <tbody>
                      <tr>
                        <td style={{ borderBottom: "none" }}>
                          {/* <img src={profile} className="basicpic" /> */}
                          <img
                            src={data.profile}
                            alt="Profile Photo"
                            className="basicpic"
                          />
                        </td>
                        <td>
                          <p style={{ textDecoration: "underline" }}>
                            Basic Details
                          </p>
                          <p
                            name="firstName"
                            id="firstName"
                            required
                            type="text"
                            className="basicfields"
                          >
                            First Name
                          </p>
                          <p className="basicdata">
                            {data.detailsResponse?.firstName}&nbsp;
                          </p>
                        </td>
                        <td>
                          <p
                            className="basicfields"
                            style={{ marginTop: "35px" }}
                          >
                            Last Name
                          </p>
                          <p className="basicdata">
                            {data.detailsResponse?.lastName}&nbsp;
                          </p>
                        </td>
                        <td>
                          <p
                            className="basicfields"
                            style={{ marginTop: "35px" }}
                          >
                            Phone Number
                          </p>
                          <p className="basicdata">
                            {data.detailsResponse?.phoneNo}&nbsp;
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ borderBottom: "none" }}>
                          <p
                            className="basicfields"
                            style={{ marginTop: "35px" }}
                          >
                            Designation
                          </p>
                          <p className="basicdata">
                            {data.detailsResponse?.designation}&nbsp;
                          </p>
                        </td>
                        <td style={{ borderBottom: "none" }}>
                          <p
                            className="basicfields"
                            style={{ marginTop: "25px" }}
                          >
                            Gender
                          </p>
                          <p className="basicdata">
                            {data.detailsResponse?.gender}&nbsp;
                          </p>
                        </td>
                        <td style={{ borderBottom: "none" }}>
                          <p
                            className="basicfields"
                            style={{ marginTop: "25px" }}
                          >
                            Date of Birth
                          </p>
                          <p className="basicdata">
                            {data.detailsResponse?.dob}&nbsp;
                          </p>
                        </td>
                        <td style={{ borderBottom: "none" }}>
                          <p
                            className="basicfields"
                            style={{ marginTop: "25px" }}
                          >
                            Email
                          </p>
                          <p className="basicdata">
                            {data.detailsResponse?.email}&nbsp;
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="addressbox">
                    <table className="addresstable">
                      <tbody>
                        <tr>
                          <td>
                            <p style={{ textDecoration: "underline" }}>
                              Address Details
                            </p>
                            <p className="basicfields">Street</p>
                            {data.addres?.map((it) => (
                              <p className="basicdata">{it.street}&nbsp;</p>
                            ))}
                          </td>
                          <td>
                            <p
                              className="basicfields"
                              style={{ marginTop: "35px" }}
                            >
                              City
                            </p>
                            {data.addres?.map((it) => (
                              <p className="basicdata">{it.city}&nbsp;</p>
                            ))}
                          </td>
                          <td>
                            <p
                              className="basicfields"
                              style={{ marginTop: "35px" }}
                            >
                              PinCode
                            </p>
                            {data.addres?.map((it) => (
                              <p className="basicdata">{it.zipCod}&nbsp;</p>
                            ))}
                          </td>
                        </tr>
                        <tr style={{ borderBottom: "none" }}>
                          <td>
                            <p
                              className="basicfields"
                              style={{ marginTop: "25px" }}
                            >
                              State
                            </p>
                            {data.addres?.map((it) => (
                              <p className="basicdata">{it.state}&nbsp;</p>
                            ))}
                          </td>
                          <td>
                            <p
                              className="basicfields"
                              style={{ marginTop: "25px" }}
                            >
                              Country
                            </p>
                            {data.addres?.map((it) => (
                              <p className="basicdata">{it.country}&nbsp;</p>
                            ))}
                          </td>
                          <td>
                            <p className="basicfields"></p>
                            <p className="basicdata"></p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="internalbox">
                    <table className="internaltable">
                      <tbody>
                        <tr>
                          <td>
                            <p style={{ textDecoration: "underline" }}>
                              Internal Details
                            </p>
                            <p className="basicfields">Employee Id</p>
                            <p className="basicdata">
                              {data.detailsResponse?.employeeId}&nbsp;
                            </p>
                          </td>
                          <td>
                            <p
                              className="basicfields"
                              style={{ marginTop: "35px" }}
                            >
                              Joining Date
                            </p>
                            <p className="basicdata">
                              {data.detailsResponse?.joiningDate}&nbsp;
                            </p>
                          </td>
                          <td>
                            <p
                              className="basicfields"
                              style={{ marginTop: "35px" }}
                            >
                              Employment type
                            </p>
                            <p className="basicdata">
                              {data.detailsResponse?.employeeType}&nbsp;
                            </p>
                          </td>
                        </tr>
                        <tr style={{ borderBottom: "none" }}>
                          <td>
                            <p
                              className="basicfields"
                              style={{ marginTop: "25px" }}
                            >
                              Location
                            </p>
                            <p className="basicdata">
                              {data.detailsResponse?.location}&nbsp;
                            </p>
                          </td>
                          <td>
                            <p
                              className="basicfields"
                              style={{ marginTop: "25px" }}
                            >
                              Department
                            </p>
                            <p className="basicdata">
                              {data.detailsResponse?.department}&nbsp;
                            </p>
                          </td>
                          <td>
                            <p
                              className="basicfields"
                              style={{ marginTop: "25px" }}
                            >
                              Sub-Department
                            </p>
                            <p className="basicdata">
                              {data.detailsResponse?.subDepartName}&nbsp;
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="statusbox">
                    <table className="statustable">
                      <tbody>
                        <tr style={{ borderBottom: "none" }}>
                          <td colSpan="2">
                            <p style={{ textDecoration: "underline" }}>
                              Status and Technology Details
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p className="basicfields">Last Status</p>
                            <p className="basicdata">{data.lastStatus}&nbsp;</p>
                          </td>
                          <td>
                            <p className="basicfields">Exit Type</p>
                            <p className="basicdata">{data.exitType}&nbsp;</p>
                          </td>
                          <td>
                            <p className="basicfields">Released Date</p>
                            <p className="basicdata">
                              {data.releasedDate}&nbsp;
                            </p>
                          </td>
                        </tr>
                        <tr style={{ borderBottom: "none" }}>
                          <td>
                            <p
                              className="basicfields"
                              style={{ marginTop: "25px" }}
                            >
                              Technology-1
                            </p>
                            <p className="basicdata">
                              {data.detailsResponse?.technology1}&nbsp;
                            </p>
                          </td>
                          <td>
                            <p
                              className="basicfields"
                              style={{ marginTop: "25px" }}
                            >
                              Technology-2
                            </p>
                            <p className="basicdata">
                              {data.detailsResponse?.technology2}&nbsp;
                            </p>
                          </td>
                          <td>
                            <p
                              className="basicfields"
                              style={{ marginTop: "25px" }}
                            >
                              Salary
                            </p>
                            <p className="basicdata">&nbsp;</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="resumebox">
                    <table className="resumetable" style={{ width: "400px" }}>
                      <tbody>
                        <tr>
                          <td>
                            <p
                              style={{
                                textDecoration: "underline",
                                marginTop: "30px",
                                marginLeft: "30px",
                              }}
                            >
                              Resume Details
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p
                              className="basicfields"
                              style={{
                                marginLeft: "60px",
                                marginTop: "20px",
                              }}
                            >
                              {" "}
                              Resume Download
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Button className="download" onClick={handleResume}>
                              <a className="" href="" download={fName}>
                                <DownloadIcon /> &nbsp;Download Resume
                              </a>
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="amountbox">
                  <p
                    style={{
                      textDecoration: "underline",
                      marginTop: "20px",
                      marginLeft: "50px",
                    }}
                  >
                    Amount Details
                  </p>

                  <div
                    scope="col"
                    style={{ marginTop: "53px", marginLeft: "-60px" }}
                  >
                    <p className="basicfields">BR INR</p>
                    <p className="basicdata">{enhancedFields?.br_INR}&nbsp;</p>
                  </div>
                  <div
                    scope="col"
                    style={{
                      marginTop: "53px",
                      marginLeft: "130px",
                      borderRight: "1px solid grey",
                      paddingRight: "80px",
                      height: "50px",
                    }}
                  >
                    <p className="basicfields">BR USD</p>
                    <p className="basicdata">{enhancedFields?.br_USD}&nbsp;</p>
                  </div>

                  <div
                    scope="col"
                    style={{ marginTop: "53px", marginLeft: "130px" }}
                  >
                    <p className="basicfields">PR INR</p>
                    <p className="basicdata">{enhancedFields?.pr_INR}&nbsp;</p>
                  </div>
                  <div
                    scope="col"
                    style={{
                      marginTop: "53px",
                      marginLeft: "120px",
                      borderRight: "1px solid grey",
                      paddingRight: "80px",
                      height: "50px",
                    }}
                  >
                    <p className="basicfields">PR USD</p>
                    <p className="basicdata">{enhancedFields?.pr_USD}&nbsp;</p>
                  </div>
                  <div
                    scope="col"
                    style={{ marginTop: "53px", marginLeft: "130px" }}
                  >
                    <p className="basicfields">GPM INR</p>
                    <p className="basicdata">{enhancedFields?.gpm_INR}&nbsp;</p>
                  </div>
                  <div
                    scope="col"
                    style={{
                      marginTop: "53px",
                      marginLeft: "120px",
                      borderRight: "1px solid grey",
                      paddingRight: "80px",
                      height: "50px",
                    }}
                  >
                    <p className="basicfields">GPM USD</p>
                    <p className="basicdata">{enhancedFields?.gpm_USD}&nbsp;</p>
                  </div>
                  <div
                    scope="col"
                    style={{ marginTop: "53px", marginLeft: "130px" }}
                  >
                    <p className="basicfields">GM</p>
                    <p className="basicdata">{enhancedFields?.gm}&nbsp;</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {setShowBill && (
        <table className="billtable">
          <tbody>
            <tr>
              <td>
                <div className="billbox">
                  <Col style={{ marginLeft: "40px" }}>
                    <p className="text-muted">Bill Details</p>
                    <p className="col1">All Clients Earning</p>
                    <p className="basicdata">{data.allClientsEarning}</p>
                  </Col>
                  <Col>
                    <p className="col2">Bench Salary Paid Till Now</p>
                    <p className="basicdata">{enhancedFields?.benchPay}</p>
                  </Col>
                  <Col style={{ marginLeft: "50px" }}>
                    <p className="col3">Days on Bench</p>
                    <p className="basicdata">{enhancedFields?.daysOnBench}</p>
                  </Col>
                </div>
              </td>
              <td className="view">
                <table className="billtable1">
                  <tbody>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>
                        <Button
                          className="edit1"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/hr/editEmployee", {
                              state: {
                                empId: location.state.empId,
                                name: "",
                              },
                            });
                          }}
                        >
                          <SaveAsSharpIcon /> &nbsp;&nbsp;&nbsp;Edit
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Button
                          className="viewallowances"
                          onClick={handleAllowancesButtonClick}
                        >
                          View Allowances
                        </Button>
                      </td>

                      <td>
                        <Button
                          className="viewclients"
                          onClick={handleClientsButtonClick}
                        >
                          View Clients
                        </Button>
                      </td>
                      <td>
                        <ModelComponent
                          data={subEmpId}
                          type={type}
                          show={modalShow}
                          onHide={() => {
                            setModalShow(false);
                          }}
                        />
                        <Button
                          className="viewemployees"
                          onClick={handleEmployeesButtonClick}
                          // onClick={(e) => {
                          //   e.preventDefault();
                          //   setViewEmployee(!viewEmployee);

                          //   ApiService.getUnderEmployee(location.state.empId)
                          //     .then((res) => {
                          //       console.log(res.data);
                          //       setEmployee(res.data);
                          //       setSubEmp(true);
                          //     })
                          //     .catch((err) => {
                          //       console.log(err);
                          //       setSubEmp(false);
                          //     });
                          // }}
                        >
                          View Employees
                          {/* {viewEmployee ? "Hide" : "View Employees"} */}
                        </Button>

                        {/* 
                        {viewEmployee &&
                          [
                            "manager",
                            "general_manager",
                            "ch",
                            "md",
                            "hr",
                          ].includes(type) && (
                            <div className="listEmp">
                              {subEmp && employee?.length === 0 && (
                                <span className="employees">
                                  <br />
                                  No Employees
                                </span>
                              )}
                              {employee?.map((emp, index) => (
                                <Fragment key={index}>
                                  <span
                                    className="listOfEmp"
                                    onClick={() =>
                                      handleEmployeesButtonClick(emp.empId)
                                    }
                                  >
                                    {index + 1}.{" "}
                                    <nobr>
                                      {emp.firstName}
                                      {emp.lastName}
                                    </nobr>
                                  </span>

                                  <br />
                                </Fragment>
                              ))}
                            </div>
                          )} */}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {/* {showBackButton &&(
        <>
         <Button
                          className="edit1"
                          onClick={handleemployeeBackClick}
                        >
                         &nbsp;&nbsp;&nbsp;Back
                        </Button>
        </>
      )} */}
      {showAllowances && (
        <>
          {/* <Link type="button"
        to="/hr/EmployeeProfile"
        state={{ empId:location.state.empId, type: type }}
        style={{ textDecoration: "none" }}
      ></Link> */}

          <div
            className="allowancecontainer"
            style={{
              maxHeight: "400px",
              width: "1500px",
              overflowY: "scroll",
              marginTop: "100px",
              marginLeft: "150px",
            }}
          >
            {data.atClientAllowances?.map((allowanceData, index) => (
              <div key={index}>
                <h5>Allowance {index + 1}</h5>
                <div className="allowancebox">
                  <div className="col">
                    <p className="allowances">Shift Allowances</p>
                    <p className="p1">{allowanceData.shiftAllowance}</p>
                  </div>
                  <div className="col">
                    <p className="allowances">Special Allowances</p>
                    <p className="p1">{allowanceData.specialAllowance}</p>
                  </div>
                  <div className="col">
                    <p className="allowances">Joining Bonus</p>
                    <p className="p1">{allowanceData.joingBonus}</p>
                  </div>
                  <div className="col">
                    <p className="allowances">Joining Tenure</p>
                    <p className="p1">{allowanceData.joiningBonusTenure}</p>
                  </div>
                  <div className="col">
                    <p className="allowances">Deputation Allowances</p>
                    <p className="p1"> {allowanceData.deputationAllowances}</p>
                  </div>

                  <div className="col">
                    <p className="allowances">Extra Allowances</p>
                    <p className="p1"> {allowanceData.extraAllowance}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {showClients && (
        <>
          <div>
            {data.employeeAtClientsDetails?.map((client, index) => (
              <div key={index}>
                <h5 className="client">Client {index + 1}</h5>
                <div className="client1 ">
                  <table
                    className=" table-primary clienttable"
                    style={{ marginLeft: "40px" }}
                  >
                    <tbody>
                      <tr>
                        <td>
                          <p className="clientfields"> Client Name</p>
                          <p className="clientdata">{client.clients}</p>
                        </td>
                        <td>
                          <p className="clientfields"> Client Location</p>
                          <p className="clientdata"> {client.clientLocation}</p>
                        </td>
                        <td>
                          <p className="clientfields"> Work Mode</p>
                          <p className="clientdata">{client.workMode}</p>
                        </td>
                        <td>
                          <p className="clientfields"> Client Email</p>
                          <p className="clientdata"> {client.clientEmail}</p>
                        </td>
                        <td>
                          <p className="clientfields"> Client Manager Name</p>
                          <p className="clientdata">
                            {client.clientManagerName}
                          </p>
                        </td>
                        <td>
                          <p className="clientfields"> Client Salary</p>
                          <p className="clientdata">{client.clientSalary}</p>
                        </td>
                      </tr>
                    </tbody>

                    <tbody>
                      <tr>
                        <td>
                          <p className="clientfields"> PO Date </p>
                          <p className="clientdata"> {client.podate}</p>
                        </td>
                        <td>
                          <p className="clientfields"> PO Start Date</p>
                          <p className="clientdata"> {client.posdate}</p>
                        </td>
                        <td>
                          <p className="clientfields">PO End Date</p>
                          <p className="clientdata"> {client.poedate}</p>
                        </td>
                        <td>
                          <p className="clientfields">Offer Release Date</p>
                          <p className="clientdata">
                            {client.offerReleaseDate}
                          </p>
                        </td>
                        <td>
                          <p className="clientfields"> Joining Date</p>
                          <p className="clientdata">
                            {client.clientJoiningDate}
                          </p>
                        </td>
                        <td>
                          <p className="clientfields">Designation at Client </p>
                          <p className="clientdata">{client.desgAtClient}</p>
                        </td>
                      </tr>
                    </tbody>

                    <tbody>
                      <tr>
                        <td>
                          <p className="clientfields">Skill Set</p>
                          <p className="clientdata">{client.skillSet}</p>
                        </td>
                        <td>
                          <p className="clientfields">Sub Contractor</p>
                          <p className="clientdata">{client.subContractor}</p>
                        </td>
                        <td>
                          <p className="clientfields">Tower Head</p>
                          <p className="clientdata">{client.towerHead}</p>
                        </td>
                        <td>
                          <p className="clientfields">Tower Lead</p>
                          <p className="clientdata"> {client.towerLead}</p>
                        </td>
                        <td>
                          <p className="clientfields">Recruiter</p>
                          <p className="clientdata">{client.recruiter}</p>
                        </td>
                        <td>
                          <p className="clientfields">
                            Client Last Working Date
                          </p>
                          <p className="clientdata">
                            {client.clientLastWorkingDate}
                          </p>
                        </td>
                      </tr>
                    </tbody>

                    <tbody>
                      <tr>
                        <td>
                          <p className="clientfields">
                            Lancesoft Last Working Date
                          </p>
                          <p className="clientdata">
                            {client.lancesoftLastWorkingDate}
                          </p>
                        </td>
                        <td>
                          <p className="clientfields"> Client Tenure</p>
                          <p className="clientdata">{client.clientTenure}</p>
                        </td>
                        <td>
                          <p className="clientfields">
                            Total Billing at Client
                          </p>
                          <p className="clientdata">
                            {client.totalEarningAtClient}
                          </p>
                        </td>
                        <td>
                          <p className="clientfields">PO Value</p>
                          <p className="clientdata"> {client.povalue}</p>
                        </td>
                        <td>
                          <p className="clientfields">PO Number</p>
                          <p className="clientdata">{client.ponumber}</p>
                        </td>
                        <td>
                          <p className="clientfields">IGST</p>
                          <p className="clientdata">{client.igst}</p>
                        </td>
                      </tr>
                    </tbody>

                    <tbody>
                      <tr style={{ borderBottom: "none" }}>
                        <td>
                          <p className="clientfields"> CGST</p>
                          <p className="clientdata">{client.cgst}</p>
                        </td>
                        <td>
                          <p className="clientfields"> SGST</p>
                          <p className="clientdata">{client.sgst}</p>
                        </td>
                        <td>
                          <p className="clientfields"> Total Tax</p>
                          <p className="clientdata">{client.totalTax}</p>
                        </td>
                        <td>
                          <p className="clientfields"> </p>
                          <p className="clientdata"></p>
                        </td>
                        <td>
                          <p className="clientfields"></p>
                          <p className="clientdata"></p>
                        </td>
                        <td>
                          <p className="clientfields"></p>
                          <p className="clientdata"></p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {showEmployees && (
        <div
          className="Container"
          style={{
            maxHeight: "400px",
            width: "1550px",
            overflowY: "scroll",
            marginTop: "100px",
            marginLeft: "71px",
          }}
        >
          {employee?.map((emp, index) => (
            <div className="empbox" key={index}>
              <Col>
                <img src="" className="emppic" />
              </Col>
              <Col>
                <p className="emp">
                  {emp.firstName}
                  {emp.lastName}
                </p>
              </Col>
              <Col>
                <p className="emp">{emp.employeeId}</p>
              </Col>
              <Col>
                <p className="emp">{emp.email}</p>
              </Col>
              <Col>
                <p className="emp">{emp.phoneNo}</p>
              </Col>
              <Col>
                <Button className="details">Get Details</Button>
              </Col>
            </div>
          ))}
        </div>
      )}
      {/* </div> */}
    </>
  );
}

export default EmployeeProfile;
