# Playwright E2E Test Suite

E2E test automation for UI and API testing using Playwright.

## Coverage

### UI Testing
- **Application:** SauceDemo [https://www.saucedemo.com/]
- **Features:** Login and Cart Management

### API Testing
- **Application:** Petstore API [https://www.petstore.swagger.io/]
- **Endpoint:** /pet and /store

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
4. Install Playwright
    ```
   npx playwright install
   ```

## Running the tests

- To run all the tests (UI + API):
  ```
  npm test
  ```
- To run UI tests only:
  ```
  npm run test:ui
  ```
- To run API tests only:
  ```
  npm run test:api
  ```
- To run loginTest test class:
  ```
  npx playwright test tests/e2e/loginTest.spec.js
  ```
- To run cartTest test class:
  ```
  npx playwright test tests/e2e/cartTest.spec.js
  ```
- To run all tests in a visible browser
  ```
  npm run test:headed
  ```
- To run all tests and generate an Allure report
  ```
  npm run report
  ```