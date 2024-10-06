# Deployment Guide: React & Node.js Application with Pulumi on AWS

Follow the steps below to install dependencies, configure AWS credentials, and deploy the infrastructure and application using **Pulumi**.

## Prerequisites

Before starting, ensure the following:

1. **Pulumi**: Make sure Pulumi is installed and you are logged into your Pulumi account.
   - Install Pulumi if not already installed: 
     ```bash
     curl -fsSL https://get.pulumi.com | sh
     ```
   - Log in to your Pulumi account:
     ```bash
     pulumi login
     ```
   - For more installation options, refer to the official [Pulumi installation guide](https://www.pulumi.com/docs/get-started/install/).

2. **Node.js**: Ensure Node.js is installed (v14.x or higher recommended).
   - Check version:
     ```bash
     node -v
     ```

3. **AWS CLI**: Ensure AWS CLI is installed and configured.
   - Install AWS CLI if needed: [AWS CLI Installation Guide](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
   - Configure credentials:
     ```bash
     aws configure
     ```
     You will need to provide:
     - AWS Access Key ID
     - AWS Secret Access Key
     - Default region (e.g., `eu-west-1`)
     - Default output format (e.g., `json`)

4. **AWS Credentials with Sufficient Permissions**: Ensure your AWS credentials have sufficient permissions to create and manage EC2, S3, and ECR resources. Permissions should include:
   - `AmazonEC2FullAccess`
   - `AmazonS3FullAccess`
   - `AmazonEC2ContainerRegistryFullAccess`

## Steps to Set Up and Deploy

### 1. Clone the Repository

If you haven't already, clone the repository:

```bash
git clone https://github.com/raghaKRavi/Global-Nature-Event-Tracker.git 
cd /infra
```

### 2. Install Dependencies
Navigate to the project directory and install all necessary dependencies:

```bash
npm install
```
This will install all frontend, backend, and Pulumi dependencies.

### 3. Pulumi Configuration
Ensure Pulumi is configured to use AWS as the cloud provider. The necessary Pulumi configuration files should be present in your project (Pulumi.yaml, Pulumi.<stack>.yaml, etc.).

You can view the current stack settings using:

```bash
pulumi config
```

### 4. Deploying Resources via Pulumi
Once all dependencies are installed and AWS credentials are configured, you can create the required AWS resources (such as EC2, S3, and ECR) using Pulumi.

Preview the changes to ensure the correct resources will be created:

```bash
pulumi preview
```
Deploy the resources to AWS using:

```bash
pulumi up
```
Pulumi will prompt you to confirm the creation of resources. Review the output and type y to proceed with the deployment.

### 5. Accessing Your Application
Once Pulumi has successfully provisioned the resources, you can access the application:

Frontend: Hosted via EC2 or S3 (depending on your setup).
Backend: Hosted on EC2 or AWS Lambda, depending on the architecture.
Pulumi will output any relevant endpoints or infrastructure details after the deployment is complete.

### 6. Managing Infrastructure
To make changes to your infrastructure or application, modify the Pulumi program and re-run:

```bash
pulumi up
```
### 7. Destroying Resources
To clean up all AWS resources created by Pulumi, run:

```bash
pulumi destroy
```