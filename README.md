# Interview Scheduler
a React-based single-page application that allows users to book and manage appointments with interviewers.

## Tech Stack 
- React, HTML, SASS, JavaScript, PostgreSQL
- Axios Testing includes Jest, Storybook

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

## Scheduler-api server
Link to the Scheduler-api repo: https://github.com/lighthouse-labs/scheduler-api

How it looks on the browser:
!['api server'](https://user-images.githubusercontent.com/114049732/228948919-f908b869-9495-4f88-bab9-77b7ed25b056.png)

To run API server for testing, follow instructions in scheduler-api repository.

To run the server, run: `npm start`, then locate the web on the browser.

To run the server so it returns an error when saving/deleting for testing the client's error handling capabilities: `npm run error`

The client runs on port 8000, and the API server runs on port 8001. Run both for the app to work.

## Overview
Homepage:
!['browser'](https://user-images.githubusercontent.com/114049732/228948979-64355f17-8e89-46f2-bcf9-1f89a0987109.png)

How users can manage their appointments:
https://github.com/Dango3010/scheduler/assets/114049732/3c55e2a2-9675-4f2c-bca3-8132d41ca1ee
