### Project Overview

This project consists of a **frontend** built with **React** and **TypeScript** that interacts with NASA's EONET (Earth Observatory Natural Event Tracker) API to display natural events like wildfires, storms, and volcanic activity. The **backend** is developed using **Express** and **Node.js** (also in **TypeScript**), serving as an API gateway for handling requests, fetching data from the NASA EONET API, and managing user-specific features.

### AWS Cloud and Infrastructure

The entire application is hosted on **AWS Cloud** using modern cloud services such as **EC2**, **ECR**, and **S3**. **Pulumi**, an Infrastructure as Code (IaC) tool, is used to define, deploy, and manage the cloud infrastructure. This allows the automated and consistent provisioning of resources such as compute, storage, and networking components, ensuring a seamless and scalable deployment pipeline.

### Key Technologies

- **Frontend**: React, TypeScript, NASA EONET API [Frontend](./client/README.md)
- **Backend**: Express, Node.js, TypeScript [Backend](./server/README.md)
- **Cloud**: AWS Cloud (EC2, ECR, S3)
- **Infrastructure as Code (IaC)**: [Pulumi](./infra/README.md)

This setup allows efficient deployment, development, and scaling of the application while keeping infrastructure automated and manageable.

# Features to Be Added to the Project

This project aims to enhance the existing functionality and improve the user experience by adding new features and optimizing the workflow. Below is a list of planned features and improvements:

## Planned Features

1. **More Refined Search Option for NASA EONET API**  
   The current integration with NASA's EONET API allows users to search for events. However, we plan to enhance the search functionality with additional filters and refined search parameters, such as:
   - Date range filters for past events
   - Geolocation-based filtering for events near a specific region

2. **Modal for Detailed Coordinates Information**  
   To provide more context on marked locations, we will implement a modal that pops up when a user clicks on a coordinate marker. This modal will display:
   - Latitude and Longitude details
   - Relevant event information (from NASA EONET) like, id and source link, etc
   - Option to bookmark the event for future reference

3. **CI/CD Pipeline for Automated Deployment**  
   We will set up a Continuous Integration/Continuous Deployment (CI/CD) pipeline to streamline the deployment process. This will automate testing, building, and deploying the application to the production environment, ensuring that:
   - Code changes are automatically tested and reviewed
   - Builds are created and deployed without manual intervention
   - Deployments are triggered after successful code merges or pull requests

4. **Writing More Test Cases**  
   We will extend the test coverage by including the following types of tests:
   - **Integration Tests**: To ensure that different parts of the system (APIs, services, UI components) work together as expected.
   - **End-to-End Tests**: To simulate real user interactions and test the entire flow of the application from start to finish.
   - Additional **Unit Tests** for newly added features.

5. **UI Tweaks for Enhanced Usability and Responsiveness**  
   To improve the user experience, we plan to:
   - Make the user interface more responsive across different device types (desktop, tablet, mobile)
   - Enhance the overall look and feel with intuitive navigation and better UI/UX practices
   - Add tooltips, contextual help, and animations to improve user guidance and accessibility