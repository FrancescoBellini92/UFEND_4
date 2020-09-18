# Udacity Front End ND project 4

This repo contains a simple web page for performing sentiment analysis on text.

Source code is split in various modules, which are bundled via webpack.

BEM methodoloy has been applied to promote DRY code and style encapsulation, and a mobile-first approach was followed to good cross-device user experience.

API calls with sensitive data (i.e, API key) are done on the backend via a node-express server. This same server serves all assets to clients.

Client-side, js handles requests to-from the backend and UI update logic. Performance impact is kepts low by caching DOM elements. Logic runs in an enclosed main function to avoid exposing global variables.

A small suite of unit tests has been written to promote easier refactoring and code modularity

A service worker runs to ensure all assets are cached for offline functionality and quicker loading times 

App is deployed at https://ufend-sentiment-analysis.herokuapp.com/
#
## Dependencies

Please refer to package.json for dependencies

#
## How to run
Install all dependencies via npm install, then create and .env file with the variables specified in .env.example
Then:
- npm run dev : bundles all source code and serve via webpack-dev-server (be sure to set MODE to 'DEV' in your env file)
- npm run build: bundles all source code and assets for the node server to be served (be sure to set MODE to 'PROD' in your env file)
- npm start: run the node server (which is providing a small API as well as serving the main page) 
