import React from "react"; //  We are rendering `<Application />` down below, so we need React.createElement

import { 
  fireEvent, render, cleanup, waitForElement, getByText, prettyDOM, getAllByTestId, getByAltText,
  getByPlaceholderText, queryByText, wait, queryByAltText, getByTestId
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

//note: here, we utilize the static fixture data from /Users/oanh/scheduler/src/__mocks__/axios.js file.
describe('Application component', () => {
  //test 1: verify that the data is loaded when the component mounts.
  it('defaults to Monday and changes the schedule when a new day is selected', async () => {
    const {getByText} = render(<Application/>);
    
    await waitForElement(() => getByText('Monday')); //We can make our test asynchronous by returning a Promise.
    
    fireEvent.click(getByText('Tuesday')); //click on Tuesday button

    expect(getByText("Leopold Silvers")).toBeInTheDocument(); //verify that the text "Leopold Silvers" is in the document. 
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const {container, debug} = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen")); //wait until the text "Archie Cohen" is displayed.
      //Output a list of <article> components of appointments.
      //The first <article> represents an appointment in the "EMPTY" mode and the second <article> represents an appointment in the "SHOW" mode.

    const appointments = getAllByTestId(container, "appointment"); //an array of 3 appointments.
      // waitForElement returns a promise that resolves or rejects
      // getAllByTestId is an asynchronous func that needs to be wrapped in a promise to be resolved / rejected (waitForElement returns that promise). A promise (returned  by waitForElement) needs to be awaited to return and use the value
      // in our HTML, we have: <article className="appointment" data-testid="appointment">. Instead of searching for one element with the above test id, we are going to search for all of the elements in the DOM with the matching data-testid attribute.
    const appointment = appointments[0]; //the 1st empty appointment.
    
    //to book an appointment:
    fireEvent.click(getByAltText(appointment, 'Add')); //click the "Add" button on the first empty appointment.
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Lydia Miller-Jones"}
    }); //update the input element with the placeholder "Enter Student Name" by the name "Lydia Miller-Jones"
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));// in InterviewerListItem component, interviewer name = 'alt' text of the img element. here, we click on the interviewer image with the "Sylvia Palmer" name.
    
    fireEvent.click(getByText(appointment, 'Save')); //click on the save button
      //ERROR msg: If we see act() warnings, it is because we are causing the component to update when we click the "Save" button
    expect(getByText(appointment, 'Saving')).toBeInTheDocument(); //see if the mode has changed into SAVING
    
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones")); //wait for the student name to appear = change into SHOW mode
    expect(getByText(appointment, 'Lydia Miller-Jones')).toBeInTheDocument();

    //test that "Monday" displays the text "no spots remaining" after we book an appointment
    const day = getAllByTestId(container, 'day').find(day => queryByText(day, 'Monday')); //Array.prototype.find() method
      //we want to use 'queryByText' here b/c we want to have the value null returned if it doesn't find the node. If we used 'getByText' instead then our test will throw an error and fail if it doesn't find the text "Monday" on the first iteration.
      //day = <li> with the text 'Monday'
    expect(getByText(day, 'no spots remaining')).toBeInTheDocument();

    // console.log('day', prettyDOM(day));
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const {debug, container} = render(<Application />); // render the Application.
    await wait(() => getByText(container, "Archie Cohen")); // wait until the text "Archie Cohen" is displayed.
    
    //to delete an appointment:
    const appointment = getAllByTestId(container, "appointment")[1];
    fireEvent.click(queryByAltText(appointment, 'Delete')); //click the delete button
    expect(getByText(appointment, "You are sure you wanna delete this? It is a bad idea")).toBeInTheDocument(); //mode has changed into CONFIRM
    
    fireEvent.click(getByText(appointment, 'Confirm')); //click the 'confirm' button
    expect(getByText(appointment, 'Deleting')).toBeInTheDocument(); //mode has changed into DELETE
    
    await wait(() => getByAltText(appointment, 'Add')); //wait until the element with the "Add" button is displayed.
    
    const day = getAllByTestId(container, 'day').find(day => queryByText(day, 'Monday')); //get <li> with 'Monday' text
      //getAllByTestId(container, 'day') = an array of <li> with 'Monday', 'Tuesday', etc.
      //array.find(); = a method to find the <li> with 'Monday' text
    expect(getByText(day, '2 spots remaining')).toBeInTheDocument(); // check if the 'Monday' <li> also has the text "2 spots remaining".
    
    // console.log('day', prettyDOM(day));
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const {container} = render(<Application />); // render the Application.
    await wait(() => getByText(container, "Archie Cohen")); // wait until the text "Archie Cohen" is displayed.
    
    //to delete an appointment:
    const appointment = getAllByTestId(container, "appointment")[1];
    fireEvent.click(queryByAltText(appointment, 'Edit')); //click the edit button
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: 'Dango'}
    }); //change student name
    fireEvent.click(getByText(appointment, 'Save')); //click the 'Save' button
    expect(getByText(appointment, 'Saving')).toBeInTheDocument(); //mode has changed into Saving
    
    await wait(() => getByAltText(appointment, 'Edit')); //wait until the mode changes back to SHOW
    
    const day = getAllByTestId(container, 'day').find(day => queryByText(day, 'Monday')); //get <li> with 'Monday' text
      //getAllByTestId(container, 'day') = an array of <li> with 'Monday', 'Tuesday', etc.
      //array.find(); = a method to find the <li> with 'Monday' text
    expect(getByText(day, '1 spot remaining')).toBeInTheDocument(); // check if the 'Monday' <li> still has the same text "1 spot remaining".
    
    // console.log('day', prettyDOM(day));
  });
});

