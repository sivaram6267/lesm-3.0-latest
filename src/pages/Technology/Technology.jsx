import React, { Fragment, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FormInputs } from "../../components/formInputs/FormInputs";
import ApiService from "../../services/ApiService";
import "./Technology.css";
import laptop from "../../images/laptop.gif";
export default function Technology() {
  const [data, setData] = useState({});
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("");
  //   const [errors, setErrors] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const formData = [
    {
      id: "technology",
      title: "Technology name",
      name: "technology",
      type: "text",
      placeholder: "Enter Technology name",
      required: true,
      defaultValue: data.technology,
      handleChange: handleChange,
    },
  ];
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(true);
    // setErrors(false);
    ApiService.TechnologyName(data)
      .then((res) => {
        // console.log(res.data);
        alert("successfull");
        navigate("/hr");
        setStatus(false);
        // setErrors(false);
        setMsg("");
      })
      .catch((error) => {
        // console.log(error);
        setStatus(false);
        // setErrors(true);
        alert(JSON.stringify(error));
        setMsg(
          error.response.data.errorMessage
            ? error.response.data.errorMessage
            : error.message
        );
      });
  };
  return (
    <>
      <div class="p-3 mb-2 bg-primary text-white" style={{ color: "#1492E6" }}>
        ADD DEPARTMENT
      </div>
      <div id="hrt" className="container-sm ">
        <h1 className="title text-center add">Add Technology</h1>
        <Form onSubmit={handleSubmit}>
          <div className="form">
            {formData.map((item) => (
              <Fragment key={item.id}>
                {item?.data ? (
                  item.data
                ) : (
                  <FormInputs
                    id={item.id}
                    title={item.title}
                    name={item.name}
                    type={item.type}
                    placeholder={item.placeholder}
                    required={item.required}
                    defaultValue={item.defaultValue}
                    handleChange={item.handleChange}
                    pattern={item.pattern}
                    message={item.message}
                  />
                )}
              </Fragment>
            ))}
          </div>
          <Button className="btn-signup px-2 exrc" type="submit">
            Submit
          </Button>{" "}
          {""}
          <Button as={Link} to="/hr" variant="danger" className="px-2 ere">
            Cancel
          </Button>
          {/* </Col> */}
          {status && (
            <p className="text-success mb-2">
              Please wait while we are processing your request.
            </p>
          )}
          {<p className="text-danger mb-2">{msg}</p>}
          <img src={laptop} alt="loading..." className="working" />
        </Form>
      </div>
    </>
  );
}
