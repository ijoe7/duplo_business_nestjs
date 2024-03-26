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
git clone <repository-url>


