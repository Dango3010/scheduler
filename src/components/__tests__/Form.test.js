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

  //test 4: confirm that we remove the error message after we have shown it.
  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} interviewer={1} />
    );

    fireEvent.click(getByText("Save")); //click the save button => onsave is called when we have both interviewerID and student

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    //replace for the following:
    // const input = getByPlaceholderText("Enter Student Name"); //access the input element that has placeholder="Enter Student Name"
    //fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } }); //enter user input of "Lydia Miller-Jones" and trigger the onChange func => student = "Lydia Miller-Jones"

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
  
    fireEvent.click(getByText("Save")); //click the save button
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    }); //input element updates with user-input student name
  
    fireEvent.click(getByText("Cancel")); //click cancel button
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue(""); //the input element is reset
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
/* What is the difference between getByText and queryByText?
  When we use getByText, we should be confident that the element exists. If it does not exist, then it throws an error instead. 
  We can test for the absence of something by using queryByText and checking that the value is null.
*/