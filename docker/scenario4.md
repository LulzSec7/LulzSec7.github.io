# Dockerizing Node.js applications 
## Step 1 - Base Image
>Set the FROM <image>:<tag>, RUN <command> and WORKDIR <directory> on separate lines to configure the base environment for deploying your application.
```bash
FROM node:7-alpine
RUN mkdir -p /src/app
WORKDIR /src/app
```
---
## Step 2 - NPM Install
>The next stage is to install the dependencies required to run the application. For Node.js this means running NPM install.
>The following two lines are required in order Dockerfile to run npm install.
```bash
COPY package.json /src/app/package.json
RUN npm install
```
---
## Step 3 - Configuring Application
>Create the desired steps in the Dockerfile to finish the deployment of the application.
>We can copy the entire directory where our Dockerfile is using COPY . <dest dir>
>Once the source code has been copied, the ports the application requires to be accessed is defined using EXPOSE <port>.
>Finally, the application needs to be started. One neat trick when using Node.js is to use the npm start command.
```bash
COPY . /src/app
EXPOSE 3000
CMD ["npm","start"]
```
---
## Step 4 - Building & Launching Container
>To launch your application inside the container you first need to build an image.
```bash
docker build -t my-nodejs-app .
```
>The command to launch the built image is 
```bash
docker run -d --name my-running-app -p 3000:3000 my-nodejs-app
```
>You can test the container is accessible using curl
```bash
curl http://docker:3000
```
---
## Step 5 - Environment Variables
>With Docker, environment variables can be defined when you launch the container. For example with Node.js applications, you should define an environment variable for NODE_ENV when running in production.

>Using -e option, you can set the name and value as _-e NODEENV=production
```bash
docker run -d --name my-production-running-app -e NODE_ENV=production -p 3000:3000 my-nodejs-app
```
---