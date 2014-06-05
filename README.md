# AngularJS application using jCrop and canvas

This application uses AngularJS directives and routing to provide a demonstration of file upload, crop, and final images. The application is unique becuase it will maintain the image throughout the routes and use them within the individual directives. The final screen is the cropped image which could be exported and sent to a server.

##  Installation
Install [Node.js](http://nodejs.org/), [Grunt](http://gruntjs.com/getting-started#installing-the-cli), [Bower](http://bower.io/)

Clone the repository
```sh
$ git clone git@github.com:giftcards/angularjs-canvas-crop.git canvas-crop
```

Navigate to the new folder
```sh
$ cd canvas-crop
```

Install dependencies
```sh
$ npm install
$ bower install
```

Serve the application and monitor source files for changes
```sh
$ grunt serve
```

Grunt will automatically open a new browser to the application (with live reload enabled)