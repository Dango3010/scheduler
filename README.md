# Interview Scheduler

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Screenshots
Homepage:
!['browser'](https://user-images.githubusercontent.com/114049732/228948979-64355f17-8e89-46f2-bcf9-1f89a0987109.png)

When adding a new appointment:
!['browser'](https://user-images.githubusercontent.com/114049732/228949039-2ec6180d-185b-476b-a74d-26da7e413c6c.png)

## Scheduler-api server
Link to the repo: https://github.com/lighthouse-labs/scheduler-api

How it looks on the browser:
!['api server'](https://user-images.githubusercontent.com/114049732/228948919-f908b869-9495-4f88-bab9-77b7ed25b056.png)

To run API server for testing, follow instructions in scheduler-api repository.

To run the server, run: `npm start`, then locate the web on the browser.

To run the server so it returns an error when saving/deleting for testing the client's error handling capabilities: `npm run error`

The client runs on port 8000, and the API server runs on port 8001. Run both for the app to work.

<!-- 
The server provides endpoints for three resource types: days, appointments, and interviewers. 
Below is a list of all routes available from the scheduler-api:
  "GET_DAYS":         http://localhost:8001/api/days,
  "GET_APPOINTMENTS": http://localhost:8001/api/appointments,
  "GET_INTERVIEWERS": http://localhost:8001/api/interviewers,

run `npm run error` to configure the API server with a TEST_ERROR environment variable.
-->

<!-- TESTING OUT THE TOOLS
I. to try the live reloading feature of the Webpack development server.
1. open the project directory in VS Code
2. add the contents of the sidebar (given below) to the Application component in the src/components/Application.js file
<img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu"></nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
3. save the changes

II. Storybook
  Follow the steps below to try the component testing environment.
1. Close the webpack-dev-server process (Ctrl+C should kill the process)
2. From the root directory of the project and type npm run storybook
3. Connect to the Storybook server using your browser
4. Expand the list of stories for the Button component
we will use Storybook to implement the Button component.
  we'll use the stories defined in stories/index.js to test the different functionality required.
This environment can be used to iterate on styles because it provides a basic interface to test all states. 
  with larger applications some styles may only be applied after a long login flow and some edge case errors. 
  Immediate feedback is possible when looking at the component in isolation.
Once you have confirmed that the environment is working, you can shut down the server. We run the Storybook server on port 9009 which means you can run it in parallel with webpack-dev-server.

The @storybook/addon-actions addon is used to display the data received by event handlers.
  The addon-actions addon for Storybook is already installed in your Interview Scheduler project. You can read about it on its documentation page, @storybook/addon-actions, but you should not install it.
  To display the "Actions" panel in Storybook, press A.

III. Jest
The Jest environment allows us to test components without a browser. The default tests are very simple. They only confirm that each component can render without throwing an exception.

Follow the steps below to try the automated testing capabilities of the Jest framework.
1. Run the 'npm run test' command to start the Jest testing environment
2. Press a to run all tests if prompted
3. Confirm that the existing tests pass
The two existing tests should both pass.

Watch Usage in Jest:
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press q to quit watch mode.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press w to show more options 
 › Press o to only run tests for the files that have changed.
 › Press Enter to trigger a test run.

When the test runner starts, it checks for changes to the files. If there are none, it will wait for changes before running the tests. We can press the a key to run all tests.

Follow the steps below to make a failing test.
1. Remove the return <></>; line from the Button component
2. Save the src/components/Button.js file
The test runner is in "watch" mode. When we save a file, it will notice the change and run the tests against the latest code.
The output should now contain a lot of red text. The application is broken because the Button component does not return anything.

note: We are running Jest in the "Host" environment to speed up the start time. 
  It also removes some of the challenges with watching files for updates. 
  If we run the tests within the vagrant "Guest" environment, then the tests will not run automatically.

TOTAL TOOL COMMANDS
in package.json:
"scripts": {
  "start": "react-scripts start",
}
  "test": "react-scripts test",
  "storybook": "start-storybook -p 9009 -s public --ci"
A developer can run npm start, npm test or npm run storybook to start their preferred environment.

-->