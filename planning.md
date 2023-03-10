DATA STRUCTURE
## DayListItem component
it needs the following props:
1. name of the day: constant, string
2. the interview spots: the number of spots remaining, number
3. when the user selects: show the interview info for that day
  selected:Boolean true or false declaring that this day is selected
4. setDay:Function 
  accepts the name of the day e.g. "Monday", "Tuesday"
  
  We use the spots prop for two purposes:
1. To display the text "{props.spots} spots remaining" 
2. to determine if the day is full (if props.spots is 0, the day is full).

  #storybook
  This component shows us all of the data for a single weekday. 
  When the user clicks on a particular day, it displays a white background, indicating the user has selected that day.

create DayListItem.js component file 
--> build out the DayListItem's states in ur story file: stories/index.js
--> build ur component and test it with storybook

## The DayList Component
Our DayList component will take in three props:
1. days:Array 
  a list of day objects (each object includes an id, name, and spots)
2. day:String - the currently selected day
3. setDay:Function 
  accepts the name of the day e.g. "Monday", "Tuesday"
The DayList is responsible for rendering multiple DayListItem components. 
It doesn't have any styles of its own so we don't need a DayList.scss file.

--> we will create DayListItem first. Once the component is completed, we will create the DayList component.

create DayList.js component file 
--> build out the DayList's states in ur story file: stories/index.js (build ur stories)
--> build ur component and test it with storybook

## <Appointment> components 
  Shows up for the selected day
  To show appointments, we need to build the components that the <Appointment> uses first. 
    When we create a new interview, we render a Form component. The Form uses an <InterviewerList> to allow the user to choose an interviewer.

Component creation steps
  To build our new components, we should follow the same steps as before.
1. Create a file with our component name
2. Create & Export the component function
3. Add the base HTML in the return statement of our component
4. Create & Import a CSS / SCSS file holding the style of our component
5. Write stories for Storybook to render our component in isolation
6. Refactor the hardcoded content to use props & state
Those are the steps that we used to build our <Button>, <DayListItem> and <DayList> components.

## <form> component
  To show all the available interviewers in the form, we need a component for an individual interviewer and a component that will hold the list of interviewers
  these components will use a similar pattern as the <DayList> and <DayListItem> components

## <InterviewerListItem> component 
  has two states. 
    The first state is when it is not selected, showing only the image of the interviewer. 
    the second state is when it is selected. This state will highlight the item with a white background and show the name of the interviewer.
  
  the component should receive the following props:
    id:number - the id of the interviewer
    name:string - the name of the interviewer
    avatar:url - a url to an image of the interviewer
  the component also needs a prop to know if it is selected
    selected:boolean - determines if an interviewer is selected or not and displays the name and applies appropriate styles if selected.
  Finally, the <InterviewerListItem> should receive a function called setInterviewer
    setInterviewer:function - is run when the <InterviewerListItem> is clicked. This function receives the interviewer's id as an argument. It sets the selected interviewer.

## InterviewerList  component 
  holds all the <InterviewerListItem> components together.
  receives three props:
  1. interviewers:array - an array of all interviewers
  2. setInterviewer:function - a function that accepts an interviewer id. This function will simply be passed down to the <InterviewerListItem>
  3. interviewer:number - a number that represents the id of the currently selected interviewer

## appointment component
  a user will be able to create, edit and delete an appointment within the appointment component.
  the component will display differently depending on what kind of task the user is completing. 
    each of these views (Empty, Show, Form, Confirm, Status and Error) will be child components of the <Appointment> component.



