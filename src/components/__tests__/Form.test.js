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
      <Form interviewers={interviewers} /> //pass the Form component fake interviewers props
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });
  //getByPlaceholderText("Enter Student Name") = access the student-name input element by 'PlaceholderText' in the DOM.

  //test 2: make the Form render with a student name
  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones" /> //we're also passing it a student-name prop.
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });
  //getByTestId("student-name-input") = access the student-name input element by 'data-testid' in the DOM.

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
  
  //test 4:
  it("validates that the interviewer cannot be null", () => {
    const Save = jest.fn();
    const {getByText} = render(
      <Form interviewers={interviewers} onSave={Save} student="Lydia Miller-Jones" />
    ); //no interviewer is passed
    fireEvent.click(getByText("Save")); //click on the Save button
  
    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
    expect(Save).not.toHaveBeenCalled();
  });
  
  //test 5:
  it("calls onSave function when the student-name and interviewer is defined", () => {
    const Save = jest.fn();
    const { getByText, queryByText } = render(
      <Form
        interviewers={interviewers}
        onSave={Save}
        student="Lydia Miller-Jones"
        interviewer={interviewers[0].id}
      />
    );
    fireEvent.click(getByText("Save")); //click on the Save button
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(queryByText(/please select an interviewer/i)).toBeNull();
    expect(Save).toHaveBeenCalledTimes(1);
    expect(Save).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  });
});
/* What is the difference between getByText and queryByText?
  When we use getByText, we should be confident that the element exists. If it does not exist, then it throws an error instead. 
  We can test for the absence of something by using queryByText and checking that the value is null.
*/