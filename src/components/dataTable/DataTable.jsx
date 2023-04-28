import * as React from "react";

import { Button } from "react-bootstrap";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import ApiService from "../../services/ApiService";
import { useEffect } from "react";

import Cards from "../cards/Cards";
import CardsDisplay from "./CardsDisplay";

//import Card from 'react-bootstrap/Card';

import "../dataTable/DataTable.css";
import { Pagination } from "@mui/material";

export default function DataTable() {
  const [page, setPage] = useState(0);

  const [subEmp, setSubEmp] = useState(false);
  const [subEmpId, setSubEmpId] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const [status, setStatus] = useState(false);
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  const [search, setSearch] = useState();
  const [msg, setMsg] = useState();
  const [isPagination, setIsPagination] = useState(true);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("pageNumber")) || 1
  );
  const [cardsPerPage, setCardsPerPage] = useState(1);
  // window.onload = function () {
  //   console.log("hi Wenodh");
  // };

  let type = sessionStorage.getItem("type");

  const columns = [
    { id: "name", label: "Name", minWidth: 170 },

    { id: "lsiId", label: "Lancesoft Id", minWidth: 100 },

    { id: "profilePic", label: "Profile 2Photo", minWidth: 100 },

    { id: "designation", label: "Designation", minWidth: 120 }, // format: (value) => value.toLocaleString("en-US"),

    { id: "status", label: "status", minWidth: 120, color: "red" },

    { id: "manager", label: "Primary Manager", minWidth: 170 },

    // { id: "status", label: "status", minWidth: 170 },
    {
      id: "SecondaryManager",
      label: "Secondary Manager",
      minWidth: 170,
    },

    { id: "view", label: "View", minWidth: 50 },
    { id: "edit", label: "Edit", minWidth: 50 },
  ];

  function createData(
    name,
    lsiId,
    profilePic,
    designation,
    status,
    manager,
    SecondaryManager,
    view,
    edit
  ) {
    return {
      name,
      lsiId,
      profilePic,
      designation,
      status,
      manager,
      SecondaryManager,
      view,
      edit,
    };
  }

  const handleOnClick = (id) => {
    console.log("emp1");
    setModalShow(true);
    setSubEmpId(id);
    setSubEmp(true);
  };

  const handleOnClickEdit = (id) => {
    navigate("/hr/editEmployee", { state: { empId: id, name: "" } });
  };
  const handleOnClickView = (id) => {
    console.log(id, type);
    navigate("/hr/EmployeeProfile", { state: { empId: id, type: type } });
  };

  const navigate = useNavigate();

  let [rows, setRows] = useState([
    createData(
      "emp2",
      "34",
      "",
      "",
      "emp2@gmail.com",
      9596961,

      <Button
        className="card-btn"
        onClick={(e) => {
          e.stopPropagation();
          handleOnClick("emp1");
          console.log("emp1");
        }}
      >
        View
      </Button>,

      <Button
        className="card-btn"
        onClick={(e) => {
          e.stopPropagation();
          handleOnClickEdit("emp1");
        }}
      >
        Edit
      </Button>
    ),
  ]);

  const AssignsearchData = (items) => {
    let temp = [];

    items?.map((item) => {
      temp.push(
        createData(
          item.employeeName,
          item.lancesoftId,
          <div>
            <img src={item.photo} alt="Profile Photo" width="100px" />
          </div>,
          item.designation,
          item.status,
          item.managerName,
          item.subordinateManagerName,

          <Button
            className="card-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleOnClickView(item.empId);
              console.log(item.empId);
            }}
          >
            View
          </Button>,

          <Button
            variant="danger"
            className="card-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleOnClickEdit(item.empId);
              console.log(item.empId);
            }}
          >
            Edit
          </Button>
        )
      );
    });
    setRows(temp);
  };

  const AssignData = (items) => {
    let temp = [];

    items.Employees?.map((item) => {
      temp.push(
        createData(
          item.employeeName,
          item.lancesoftId,
          <div>
            <img src={item.photo} alt=" Photo" width="100px" />
          </div>,
          item.designation,
          item.status,
          item.managerName,
          item.subordinateManagerName,

          <Button
            className="card-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleOnClickView(item.empId);
              console.log(item.empId);
            }}
          >
            View
          </Button>,

          <Button
            variant="danger"
            className="card-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleOnClickEdit(item.empId);
              console.log(item.empId);
            }}
          >
            Edit
          </Button>
        )
      );
    });
    setRows(temp);
  };

  useEffect(() => {
    function getEmployeeDetails() {
      setIsPagination(true);
      setLoading(true);

      if (type === "hr") {
        ApiService.GetAllEmployes(currentPage - 1)
          .then((res) => {
            setData(res.data);
            console.log(res.data);

            setStatus(true);
            setLoading(false);

            setCardsPerPage(res.data.totalPage);
          })
          .catch((err) => {
            alert(err.message);
            setStatus(false);
          });
      }
      if (
        type === "manager" ||
        type === "lead" ||
        type === "ch" ||
        type === "md" ||
        type === "general_manager"
      ) {
        ApiService.GetAllEmployesby(currentPage - 1)
          .then((res) => {
            setData(res.data);

            setStatus(true);
            setLoading(false);
            console.log(res.data);

            setCardsPerPage(res.data.totalPage);
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
    }
    getEmployeeDetails();
  }, [currentPage]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const handleChange1 = (event, value) => {
    sessionStorage.setItem("pageNumber", value);
    setCurrentPage(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search.search);
    if (type === "hr") {
      ApiService.SearchEmployees(search.search)

        .then((res) => {
          console.log(page);
          setSearchData(res.data);

          //AssignsearchData(res.data);
          setStatus(true);
          setIsPagination(false);
          console.log(searchData);
        })
        .catch((error) => {
          setStatus(false);
          console.log(error);
          setMsg(
            error.response.data.errorMessage
              ? error.response.data.errorMessage
              : error.message
          );
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch({ ...data, [name]: value });
  };

  return (
    <>
      {/* <form id="searchForm" onSubmit={handleSubmit}>
        <input
          type="search"
          id="search"
          name="search"
          placeholder="Enter ID"
          onChange={handleChange}
        />

        <button type="submit" className="searchclick">
          Search
        </button>
      </form> */}

      <div className="container-large" id="page">
        <h3 className="page"> WE OFFER SOFTWARE</h3>
        {/* {<div></div>} */}

        <div class="center">
          <div class="carousel">
            <div class="pre"></div>
            <div class="change_outer">
              <div class="change_inner">
                {/* <div style={{ color: "#00FF00" }} class="element">
                  Solutions
                </div>
                <br />
                <div style={{ color: "#FFEB3B" }} class="element">
                  services
                </div>
                <br /> */}
              </div>
            </div>
          </div>
        </div>

        <div class="divcheckstep">
          <ul>
            <li>
              <span class="step1"></span>
              <div class="step1_text">Active</div>
            </li>
            <li>
              <span class="step2"></span>
              <div class="step2_text">Bench</div>
            </li>
            <li>
              <span class="step3"></span>
              <div class="step3_text">Management</div>
            </li>
            <li>
              <span class="step4"></span>
              <div class="step4_text">client side</div>
            </li>
            <li>
              <span class="step5"></span>
              <div class="step3_text">Internal</div>
            </li>
            <li>
              <span class="step6"></span>
              <div class="step4_text">Admin</div>
            </li>
            <li>
              <span class="step7"></span>
              <div class="step4_text">Exit</div>
            </li>
          </ul>
        </div>
      </div>

      {isPagination ? (
        <>
          <CardsDisplay empCards={data} loading={loading} />
          <Pagination
            count={cardsPerPage}
            page={currentPage}
            onChange={handleChange1}
          />
        </>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {searchData?.length >= 0 &&
            searchData.map((it) => <Cards data={it} />)}
        </div>
      )}

      <br />
    </>
  );
}
