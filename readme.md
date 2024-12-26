# Twitter Trends Project

This project demonstrates a full-stack implementation for scraping Twitter trends using Selenium, ProxyMesh, and MongoDB. The project is divided into two main components: frontend and server.

## Directory Structure
```
project-directory/
|-- frontend/
|-- server/
```

### Frontend
- The `frontend` folder contains the React.js code for the user interface.

### Server
- The `server` folder contains the backend code for scraping, data handling, and API endpoints.

## Setup Instructions

### Environment Variables
Ensure the following environment variables are set up in the `server` folder for the project to work:

- `MONGODB_URL`: MongoDB connection string.
- `X_USERNAME`: ProxyMesh username.
- `X_EMAIL`: ProxyMesh email.
- `X_PASSWORD`: ProxyMesh password.

### Proxy Chrome Extension
The ProxyMesh Chrome extension requires the following updates:

#### Variables to Update in `background.js`
- `PROXY_USERNAME`: Your ProxyMesh username.
- `PROXY_PASSWORD`: Your ProxyMesh password.

#### Proxy Configuration
Ensure the configuration in `background.js` includes the correct ProxyMesh URL and port:
```javascript
const config = {
  mode: "fixed_servers",
  rules: {
    singleProxy: {
      scheme: "http",
      host: "in.proxymesh.com", // Proxy server address
      port: parseInt(31280)      // Proxy port
    },
    bypassList: ["foobar.com"]
  }
};
```

### Creating the Proxy Extension Zip File
1. Navigate to the `server/proxy-extension` folder.
2. Compress these files into a zip file named `proxy-extension.zip`.
3. Place this zip file in the `server` folder.

### Installation and Running

#### Server
1. Install dependencies by running:
   ```bash
   npm install
   ```
2. Start the server using:
   ```bash
   nodemon server.js
   ```
   or
   ```bash
   node server.js
   ```

#### Frontend
1. Navigate to the `frontend` folder.
2. Install dependencies by running:
   ```bash
   npm install
   ```
3. Start the frontend using:
   ```bash
   npm run dev
   ```

## Notes
- Ensure the MongoDB connection string is correct and the database is accessible.
- Verify that the ProxyMesh credentials are correctly entered in the extension.
- Test the API endpoints to confirm data retrieval.

With everything set up, you should be able to scrape Twitter trends, save them to MongoDB, and display them in the frontend.