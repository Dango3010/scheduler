import React from "react"; 
import axios from "axios";

import { 
  fireEvent, render, cleanup, waitForElement, getByText, prettyDOM, getAllByTestId, getByAltText,
  getByPlaceholderText, queryByText, wait, queryByAltText, getByTestId
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

//note: here, we utilize the static fixture data from scheduler/src/__mocks__/axios.js file.
describe('Application component', () => {
  //test 1: verify that the data is loaded when the component mounts.
  it('defaults to Monday and changes the schedule when a new day is selected', async () => {
    const {getByText} = render(<Application/>);
    await waitForElement(() => getByText('Monday')); 
    fireEvent.click(getByText('Tuesday')); //click on Tuesday button
    expect(getByText("Leopold Silvers")).toBeInTheDocument(); //verify that the text "Leopold Silvers" is in the document. 
  });

  //test 2
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const {container, debug} = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen")); //wait until the text "Archie Cohen" is displayed.
    const appointments = getAllByTestId(container, "appointment"); //an array of 3 appointments.
    const appointment = appointments[0]; //the 1st empty appointment.
    
    //to book an appointment:
    fireEvent.click(getByAltText(appointment, 'Add'));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Lydia Miller-Jones"}
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, 'Save')); //click on the save button
    expect(getByText(appointment, 'Saving')).toBeInTheDocument(); //see if the mode has changed into SAVING
    
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones")); //wait for the student name to appear = change into SHOW mode
    expect(getByText(appointment, 'Lydia Miller-Jones')).toBeInTheDocument();

    //test that "Monday" displays the text "no spots remaining" after we book an appointment
    const day = getAllByTestId(container, 'day').find(day => queryByText(day, 'Monday'));       
    expect(getByText(day, 'no spots remaining')).toBeInTheDocument();
  });

  //test 3
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const {debug, container} = render(<Application />); // render the Application.
    await wait(() => getByText(container, "Archie Cohen")); 
    
    //to delete an appointment:
    const appointment = getAllByTestId(container, "appointment")[1];
    fireEvent.click(queryByAltText(appointment, 'Delete')); 
    expect(getByText(appointment, "You are sure you wanna delete this? It is a bad idea")).toBeInTheDocument(); //mode has changed into CONFIRM
    
    fireEvent.click(getByText(appointment, 'Confirm'));
    expect(getByText(appointment, 'Deleting')).toBeInTheDocument(); //mode has changed into DELETE
    
    await wait(() => getByAltText(appointment, 'Add')); 
    
    const day = getAllByTestId(container, 'day').find(day => queryByText(day, 'Monday')); 
    expect(getByText(day, '2 spots remaining')).toBeInTheDocument(); // check if the 'Monday' <li> also has the text "2 spots remaining".
  });

  //test 4
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const {container} = render(<Application />); 
    await wait(() => getByText(container, "Archie Cohen")); 
    
    //to delete an appointment:
    const appointment = getAllByTestId(container, "appointment")[1];
    fireEvent.click(queryByAltText(appointment, 'Edit')); //click the edit button
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: 'Dango'}
    }); //change student name
    fireEvent.click(getByText(appointment, 'Save')); 
    expect(getByText(appointment, 'Saving')).toBeInTheDocument(); 
    
    await wait(() => getByAltText(appointment, 'Edit')); 
    
    const day = getAllByTestId(container, 'day').find(day => queryByText(day, 'Monday')); 
    expect(getByText(day, '1 spot remaining')).toBeInTheDocument(); // check if the 'Monday' <li> still has the same text "1 spot remaining".
  });

  //test 5
  it("shows the save error when failing to save an appointment", async () => {
    await axios.put.mockRejectedValueOnce();
    const {container} = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen")); 
    const appointment = getAllByTestId(container, "appointment")[0] 

    //to book an appointment:
    fireEvent.click(getByAltText(appointment, 'Add')); 
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Lydia Miller-Jones"}
    }); 
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
    fireEvent.click(getByText(appointment, 'Save')); 
    await wait(() => getByText(appointment, 'Error')); 
    expect(getByText(appointment, 'Error')).toBeInTheDocument();

    fireEvent.click(getByAltText(appointment, 'Close'));
    await wait(() => getByText(appointment, 'Save'));
    expect(getByText(appointment, 'Save')).toBeInTheDocument();
  });

  //test 6
  it("shows the delete error when failing to delete an existing appointment", async () => {
    await axios.delete.mockRejectedValueOnce();
    const {container} = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen")); 
    const appointment = getAllByTestId(container, "appointment")[1]; 

    fireEvent.click(getByAltText(appointment, 'Delete'));
    await wait(() => getByText(appointment, 'You are sure you wanna delete this? It is a bad idea'));
    fireEvent.click(getByText(appointment, 'Confirm'));
    await wait(() => getByText(appointment, 'Error')); 
    expect(getByText(appointment, 'Error')).toBeInTheDocument(); 

    fireEvent.click(getByAltText(appointment, 'Close')); 
    await wait(() => getByAltText(appointment, 'Edit')); 
    expect(getByAltText(appointment, 'Edit')).toBeInTheDocument(); 
  });
});

