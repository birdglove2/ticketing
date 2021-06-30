module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./api/build-client.js":
/*!*****************************!*\
  !*** ./api/build-client.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst buildClient = ({\n  req\n}) => {\n  if (true) {\n    // we are on the server!\n    // requests should be made to http://SERVICE-NAME.NAMESPACE.svc.cluster.local\n    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({\n      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',\n      headers: req.headers\n    });\n  } else {}\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (buildClient);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcGkvYnVpbGQtY2xpZW50LmpzP2UxOTYiXSwibmFtZXMiOlsiYnVpbGRDbGllbnQiLCJyZXEiLCJheGlvcyIsImNyZWF0ZSIsImJhc2VVUkwiLCJoZWFkZXJzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFFQSxNQUFNQSxXQUFXLEdBQUcsQ0FBQztBQUFFQztBQUFGLENBQUQsS0FBYTtBQUMvQixZQUFtQztBQUNqQztBQUNBO0FBQ0EsV0FBT0MsNENBQUssQ0FBQ0MsTUFBTixDQUFhO0FBQ2xCQyxhQUFPLEVBQUUsaUVBRFM7QUFFbEJDLGFBQU8sRUFBRUosR0FBRyxDQUFDSTtBQUZLLEtBQWIsQ0FBUDtBQUlELEdBUEQsTUFPTyxFQU1OO0FBQ0YsQ0FmRDs7QUFpQmVMLDBFQUFmIiwiZmlsZSI6Ii4vYXBpL2J1aWxkLWNsaWVudC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5cbmNvbnN0IGJ1aWxkQ2xpZW50ID0gKHsgcmVxIH0pID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gd2UgYXJlIG9uIHRoZSBzZXJ2ZXIhXG4gICAgLy8gcmVxdWVzdHMgc2hvdWxkIGJlIG1hZGUgdG8gaHR0cDovL1NFUlZJQ0UtTkFNRS5OQU1FU1BBQ0Uuc3ZjLmNsdXN0ZXIubG9jYWxcbiAgICByZXR1cm4gYXhpb3MuY3JlYXRlKHtcbiAgICAgIGJhc2VVUkw6ICdodHRwOi8vaW5ncmVzcy1uZ2lueC1jb250cm9sbGVyLmluZ3Jlc3Mtbmdpbnguc3ZjLmNsdXN0ZXIubG9jYWwnLFxuICAgICAgaGVhZGVyczogcmVxLmhlYWRlcnMsXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gd2UgYXJlIG9uIHRoZSBicm93c2VyIVxuICAgIC8vIHJlcXVlc3RzIGNhbiBiZSBtYWRlIHdpdGggYSBiYXNlIHVybCBvZiAnJ1xuICAgIHJldHVybiBheGlvcy5jcmVhdGUoe1xuICAgICAgYmFzZVVybDogJy8nLFxuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBidWlsZENsaWVudDtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./api/build-client.js\n");

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _api_build_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api/build-client */ \"./api/build-client.js\");\n\nvar _jsxFileName = \"/Users/birddddddddd/Desktop/Coding/Microservices/Ticketing/client/pages/index.js\";\n\n\n\nconst LandingPage = ({\n  currentUser\n}) => {\n  return currentUser ? /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"h1\", {\n    children: \"You are signed in\"\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 6,\n    columnNumber: 24\n  }, undefined) : /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"h1\", {\n    children: \"You are NOT signed in\"\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 6,\n    columnNumber: 53\n  }, undefined);\n};\n\nLandingPage.getInitialProps = async context => {\n  const client = Object(_api_build_client__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(context);\n  const {\n    data\n  } = await client.get('/api/users/currentuser');\n  return data;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (LandingPage);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9pbmRleC5qcz80NGQ4Il0sIm5hbWVzIjpbIkxhbmRpbmdQYWdlIiwiY3VycmVudFVzZXIiLCJnZXRJbml0aWFsUHJvcHMiLCJjb250ZXh0IiwiY2xpZW50IiwiYnVpbGRDbGllbnQiLCJkYXRhIiwiZ2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBRUE7O0FBRUEsTUFBTUEsV0FBVyxHQUFHLENBQUM7QUFBRUM7QUFBRixDQUFELEtBQXFCO0FBQ3ZDLFNBQU9BLFdBQVcsZ0JBQUc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBSCxnQkFBZ0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBbEQ7QUFDRCxDQUZEOztBQUlBRCxXQUFXLENBQUNFLGVBQVosR0FBOEIsTUFBT0MsT0FBUCxJQUFtQjtBQUMvQyxRQUFNQyxNQUFNLEdBQUdDLGlFQUFXLENBQUNGLE9BQUQsQ0FBMUI7QUFDQSxRQUFNO0FBQUVHO0FBQUYsTUFBVyxNQUFNRixNQUFNLENBQUNHLEdBQVAsQ0FBVyx3QkFBWCxDQUF2QjtBQUNBLFNBQU9ELElBQVA7QUFDRCxDQUpEOztBQU1lTiwwRUFBZiIsImZpbGUiOiIuL3BhZ2VzL2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuaW1wb3J0IGJ1aWxkQ2xpZW50IGZyb20gJy4uL2FwaS9idWlsZC1jbGllbnQnO1xuXG5jb25zdCBMYW5kaW5nUGFnZSA9ICh7IGN1cnJlbnRVc2VyIH0pID0+IHtcbiAgcmV0dXJuIGN1cnJlbnRVc2VyID8gPGgxPllvdSBhcmUgc2lnbmVkIGluPC9oMT4gOiA8aDE+WW91IGFyZSBOT1Qgc2lnbmVkIGluPC9oMT47XG59O1xuXG5MYW5kaW5nUGFnZS5nZXRJbml0aWFsUHJvcHMgPSBhc3luYyAoY29udGV4dCkgPT4ge1xuICBjb25zdCBjbGllbnQgPSBidWlsZENsaWVudChjb250ZXh0KTtcbiAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBjbGllbnQuZ2V0KCcvYXBpL3VzZXJzL2N1cnJlbnR1c2VyJyk7XG4gIHJldHVybiBkYXRhO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTGFuZGluZ1BhZ2U7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiPzcwYzYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiYXhpb3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///axios\n");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react/jsx-dev-runtime\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIj9jZDkwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InJlYWN0L2pzeC1kZXYtcnVudGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react/jsx-dev-runtime\n");

/***/ })

/******/ });