# Playwright E2E Test Suite

This is a test suite for Demo Web Application (https://www.saucedemo.com/), built with Playwright, TypeScript,
JavaScript and reports generated with Allure.

## Let's start

### Prerequisites

- **Node.js** [https://nodejs.org/]
- **Allure Command Line** [https://docs.qameta.io/allure/]

### Installing

1. Clone the repository:
   ```
   git clone https://github.com/biamtt/playwrightTest.git
   ```

2. Navigate to the project folder:
   ```
   cd playwrightTest
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Running the tests

- To run all the tests:
  ```
  npm run test
  ```
- To run loginTest test class:
  ```
  npm run test:login
  ```
- To run cartTest test class:
  ```
  npm run test:cart
  ```
- To run all tests in UI Mode
  ```
  npm run test:ui
  ```
- To run all tests in a visible browser
  ```
  npm run test:headed
  ```
- To run all tests and generate an Allure report
  ```
  npm run test:report
  ```