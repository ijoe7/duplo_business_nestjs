# Duplo Platform Backend Implementation

This repository contains the backend implementation for the Duplo platform, which aims to onboard businesses and enable them to manage their inventory through the platform. The implementation follows the technical requirements provided in the task description.

## Features Implemented

### Order Management
- Implemented functionality to create new orders for registered businesses.
- Added endpoints to retrieve orders for a specific business and for today.

### External API Integration
- Integrated with the government tax authority's API for tax logging purposes.
- Implemented functionality to make POST requests to the tax authority's API.
- Handled potential delays in API responses (up to 15-35 seconds).

## Implementation Details

### Database Setup
- Utilized TypeORM for PostgreSQL integration and MongoDB integration.
- Defined entities and schemas for orders and items in both PostgreSQL and MongoDB databases.
- Established relationships between orders and items in PostgreSQL.

### Axios Instance Setup
- Created Axios instance for making HTTP requests.
- Implemented interceptors to handle request and response logging.
- Adjusted interceptors to exclude logging for tax logging purposes.

### Routes
- Defined routes for order management and external API integration as per the provided specifications.
- Implemented controller methods to handle HTTP requests.
- Utilized service methods to interact with the databases.

## Installation and Usage

1. Clone the repository to your local machine:
git clone <https://github.com/ijoe7/duplo_business_nestjs.git>


2. Install dependencies:
        
        cd duplo-platform-backend
        npm install

3. Set up PostgreSQL and MongoDB databases:
   - Create a PostgreSQL database locally using Docker Compose:
     - Ensure that Docker is installed on your machine.
     - Create a `docker-compose.yml` file in the root directory of your project with the following content:

     ```yaml
     version: '3.8'
     services:
       postgres:
         image: postgres
         ports:
           - "5432:5432"
         environment:
           POSTGRES_DB: your_database_name
           POSTGRES_USER: your_database_user
           POSTGRES_PASSWORD: your_database_password
     ```
     Replace `your_database_name`, `your_database_user`, and `your_database_password` with your desired values or use the  value already stipulated.
     
     - Run the following command to start the PostgreSQL container:

     ```
     docker-compose up -d
     ```

     This command will start the PostgreSQL container in the background.
  - An alternative is to locally run the Postgres App and properly configure the `.env` file.
  - Ensure that the MongoDB URI is added and configured properly in the `.env` file.

4. Run the application:
      *     npm start
      *     npm run start:dev (Nodemon)

5. Access the API endpoints as described in the documentation.

## Postman Documentation

The documentation for the API endpoints is available on Postman. You can access it using the following link:

[Postman Documentation](https://documenter.getpostman.com/view/15642679/2sA35D5Nwb)

### Implemented Endpoints

- **Order Management**
  - `POST /orders`: Create a new order and transaction information is generated and saved.
  - `GET /orders/:businessId`: Retrieve all orders for a specific business.
  - `GET /orders/today/:businessId`: Retrieve orders for a specific business for today.

- **Transaction Management**
  - `GET /transactions/:businessId`: Retrieve all transactions for a specific business.
  - `GET /transactions/today/:businessId`: Retrieve transactions for a specific business for today.

- **Credit Score Calculation**
  - `GET /orders/calculateCreditScore/:businessId`: Calculate and return the credit score for a business.

- **External API Integration**
  - `POST /orders/log-tax`: Endpoint to make POST requests to the government tax authority's API for tax logging purposes.

## Docker Repository

You can also pull the Docker image of this application from the following repository:

  *   docker pull ijoe7/duplo-business-task

## Possible Enhancements and Future Features

While the current implementation meets the specified requirements, there are several areas where additional features and improvements could be made to enhance the functionality and usability of the Duplo platform. Here are some possible enhancements:

### User Management
- Create endpoints to handle user authentication and authorization.
- Implement guards to restrict access to certain endpoints based on user roles.

### Business Management
- Develop endpoints to allow business owners to create and manage their business accounts.
- Implement features for business account verification and approval.

### Inventory Management
- Enhance order curating functionality to support more advanced inventory management features, such as stock tracking and alerts.
- Introduce endpoints for managing inventory items, categories, and suppliers.

### Reporting and Analytics
- Create endpoints for generating reports on order history, sales performance, and inventory turnover.
- Implement analytics features to provide insights into business performance and trends.

### Security and Performance
- Enhance error handling to provide more informative error messages and improve the robustness of the application.
- Implement performance optimizations to ensure fast response times, especially for endpoints with large datasets.

### Documentation and Testing
- Improve documentation for code and API endpoints to make it easier for developers to understand and use the application.
- Implement unit tests, integration tests, and end-to-end tests to ensure the reliability and correctness of the application.

### Possible Endpoint Routes
- **User Management**
  - `POST /users`: Create a new user account.
  - `POST /login`: Authenticate user credentials and generate access tokens.
  - `GET /users/:id`: Retrieve user details by ID.
  - `PUT /users/:id`: Update user information.

- **Business Management**
  - `POST /businesses`: Create a new business account.
  - `GET /businesses/:id`: Retrieve business details by ID.
  - `PUT /businesses/:id`: Update business information.

- **Inventory Management**
  - `POST /inventory/items`: Create a new inventory item.
  - `GET /inventory/items/:id`: Retrieve inventory item details by ID.
  - `PUT /inventory/items/:id`: Update inventory item information.

## Contributors

- [Segun Iyanda](https://github.com/ijoe7)

<!-- ## License

This project is licensed under the [MIT License](LICENSE). -->




