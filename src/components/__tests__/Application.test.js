import React from "react"; //  We are rendering `<Application />` down below, so we need React.createElement

import { render, cleanup } from "@testing-library/react";
/* We import our helper functions from the react-testing-library
   The render function allows us to render Components
*/

import Application from "components/Application";

afterEach(cleanup);

//a test that renders a React Component
it("renders without crashing", () => {
  render(<Application />);
});
