import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "../Appointment/Form"

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  //test 1: access the input element in Form component of scheduler project 
  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} /> 
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  //test 2: make the Form render with a student name
  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones" /> 
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  //test 3:
  it("validates that the student name is not blank", () => {
    const Save = jest.fn();
    const {getByText} = render(
      <Form interviewers={interviewers} onSave={Save} />
    );
    fireEvent.click(getByText("Save")); //click on the Save button

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(Save).not.toHaveBeenCalled();
  });

  //test 4: confirm that we remove the error message after we have shown it.
  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} interviewer={1} />
    );

    fireEvent.click(getByText("Save")); 

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByText("Save"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1); //student name = "Lydia Miller-Jones", interviewerID = 1
  });

  //test 5:
  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        student="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    fireEvent.click(getByText("Save")); 
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    }); 
  
    fireEvent.click(getByText("Cancel")); 
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue(""); 
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
