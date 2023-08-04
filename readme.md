# Travel assistant

## Description

Welcome to this short web-app!

In August 2023, when I applied for a job offer, I was challenged to create a travel assistant web app. It generally consists on creating a UI that the user can search a destination using city name and the backend use that city to fetch relevant data from diferent API's and create a rest API that will be consumed by the frontend and shows the result.

To meet the requirement of the challenge, I decided to use Next.js for the frontend and Node.js for the backend.

Based on the task provided, I have developed the following solution.

## Technologies
- ### Next.js
- ### Bootstrap
- ### Node.js

## Install and run the project
   To have this project running on your local environment, you just need to follow the steps below:

1. Clone the project

```bash
git clone https://github.com/MozerBuce/travelassistant.git
```

2. Install all dependencies

for both, frontend and backend directory is necessary to run the command below to install all necessary dependencies

```bash
npm install
```

3. Run the project

The backend is running on port 8080, you can use the command below to start the server and to start the frontend which uses port 30000

```bash
npm run dev
```

And to use the rest api you can go to http://localhost:8080/{city_name}

