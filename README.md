React Boilerplate
=================

Boilerplate code for react.

Installing
----------

`npm install` - To install all the dependencies.

Commands
--------

* `npm start` - To start the dev server (webpack-dev-server)  

* `npm run build` - To build the bundled distribution (created in the `dist/` directory)  

Webpack Configurations
----------------------

In this repository all the webpack configurations are present in the `config` directory. There are in total **3** configurations:
* `webpack.config.dev.js` - It is the configuration file used by the `webpack-dev-server` to serve the app in development. It doesn't do a lot of optimizations and mainly is used for hot-module-reloading.  

* `webpack.config.prod.js` - It is the webpack configuration file, used to build the production ready app. It does optimizations like compressing the images, extracting the css and injecting both css and javascript in the `index.html`.  
