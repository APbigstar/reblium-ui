# Reblium-Cloud

This is a cloud platform for the desktop version of reblium studio.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Authentication](#authentication)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** installed on your machine. You can download it from [Node.js official website](https://nodejs.org/).
- **Git** installed for version control. Download it from [Git official website](https://git-scm.com/).
- **Netlify CLI** installed globally for local development and deployment. Instructions provided below.

## Installation

Follow these steps to set up the project locally:

1. **Download the Repository**

2. **Upload it on your own github repository**

3. **Login into Netlify**

4. **connect your uploaded repository with netlify**

5. **go to build setting and add to build command: npm run**

6. **Open the repository in your coding editor**

7. **Install Project Dependencies**
```bash npm install ```

8. **Install Netlify CLI Globally**
If you don't have Netlify CLI installed globally, run:
```bash npm install -g netlify-cli ```


## Local Development
To run the project locally, follow these steps:

**Login to Netlify**
If this is your first time using Netlify CLI, you'll need to log in:
```bash netlify login ```


Start the Development Server
```bash netlify dev ```
This command will start a local development server at http://localhost:8888 (default port).




## Authentication
Certain features of the project require user authentication. Follow these steps to obtain and configure your authentication token:

**Login to Beta Reblium**

Navigate to beta.reblium.com in your browser.
Log in with your credentials.
Obtain the Authentication Token

After logging in, you will be redirected to a URL similar to:
https://beta.reblium.com/dashboard=token=YOUR_TOKEN_HERE

Paste the /dashboard=token=YOUR_TOKEN_HERE behind localhost:8888
example localhost:8888/dashboard=token=YOUR_TOKEN_HERE


