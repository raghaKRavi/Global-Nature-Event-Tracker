FROM node:20

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Step 4: Install the project dependencies inside the container
RUN npm install

RUN npm install -g typescript

# Step 5: Copy the rest of the application code to the container
COPY . .

RUN tsc

# Step 6: Expose the port on which the app runs (optional, depends on your app)
EXPOSE 8080

# Step 7: Specify the command to run your application
CMD ["npm", "start"]
