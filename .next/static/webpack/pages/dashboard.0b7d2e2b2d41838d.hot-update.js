"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/dashboard",{

/***/ "./pages/dashboard/index.js":
/*!**********************************!*\
  !*** ./pages/dashboard/index.js ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _component_dashboard_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../component/dashboard/index */ \"./component/dashboard/index.js\");\n/* harmony import */ var _component_general_mobilenavmenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../component/general/mobilenavmenu */ \"./component/general/mobilenavmenu.js\");\n/* harmony import */ var _component_general_nav__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../component/general/nav */ \"./component/general/nav.js\");\n\n\n\n\n\nvar _s = $RefreshSig$();\nfunction Dashboard() {\n    _s();\n    var ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false), showMobileMenu = ref[0], setShowMobileMenu = ref[1];\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"pageHolder\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_component_general_nav__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                setShowMobileMenu: setShowMobileMenu\n            }, void 0, false, {\n                fileName: \"/Users/user/RecipePlatform/recipe-platform-frontend/pages/dashboard/index.js\",\n                lineNumber: 11,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_component_dashboard_index__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                fileName: \"/Users/user/RecipePlatform/recipe-platform-frontend/pages/dashboard/index.js\",\n                lineNumber: 12,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/user/RecipePlatform/recipe-platform-frontend/pages/dashboard/index.js\",\n        lineNumber: 10,\n        columnNumber: 10\n    }, this);\n}\n_s(Dashboard, \"Hdw5EO+DplCNBEJcNuH8tsP7WZ4=\");\n_c = Dashboard;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Dashboard); /*\n<MobileNav />\n*/ \nvar _c;\n$RefreshReg$(_c, \"Dashboard\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9kYXNoYm9hcmQvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUFnQztBQUM0QjtBQUNDO0FBQ2hCOztBQUU3QyxTQUFTSSxTQUFTLEdBQUc7O0lBRW5CLElBQTRDSixHQUFlLEdBQWZBLCtDQUFRLENBQUMsS0FBSyxDQUFDLEVBUDdELGNBT3VCLEdBQXVCQSxHQUFlLEdBQXRDLEVBUHZCLGlCQU8wQyxHQUFJQSxHQUFlLEdBQW5CO0lBRXhDLHFCQUFPLDhEQUFDTyxLQUFHO1FBQUNDLFNBQVMsRUFBQyxZQUFZOzswQkFDOUIsOERBQUNMLDhEQUFHO2dCQUFDRyxpQkFBaUIsRUFBRUEsaUJBQWlCOzs7OztvQkFBSTswQkFDN0MsOERBQUNMLGtFQUFjOzs7O29CQUFHOzs7Ozs7WUFDaEI7Q0FDUDtHQVJRRyxTQUFTO0FBQVRBLEtBQUFBLFNBQVM7QUFVbEIsK0RBQWVBLFNBQVMsRUFBQyxDQUV6Qjs7RUFFRSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9kYXNoYm9hcmQvaW5kZXguanM/NmQ4ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IERhc2hib2FyZEluZGV4IGZyb20gJy4uLy4uL2NvbXBvbmVudC9kYXNoYm9hcmQvaW5kZXgnXG5pbXBvcnQgTW9iaWxlTmF2IGZyb20gXCIuLi8uLi9jb21wb25lbnQvZ2VuZXJhbC9tb2JpbGVuYXZtZW51XCJcbmltcG9ydCBOYXYgZnJvbSBcIi4uLy4uL2NvbXBvbmVudC9nZW5lcmFsL25hdlwiXG5cbmZ1bmN0aW9uIERhc2hib2FyZCgpIHtcblxuICBjb25zdCBbc2hvd01vYmlsZU1lbnUsIHNldFNob3dNb2JpbGVNZW51XSA9IHVzZVN0YXRlKGZhbHNlKVxuXG4gIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInBhZ2VIb2xkZXJcIj5cbiAgICAgIDxOYXYgc2V0U2hvd01vYmlsZU1lbnU9e3NldFNob3dNb2JpbGVNZW51fSAvPlxuICAgICAgPERhc2hib2FyZEluZGV4IC8+XG4gIDwvZGl2PlxufVxuXG5leHBvcnQgZGVmYXVsdCBEYXNoYm9hcmQ7XG5cbi8qXG48TW9iaWxlTmF2IC8+XG4qLyJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsIkRhc2hib2FyZEluZGV4IiwiTW9iaWxlTmF2IiwiTmF2IiwiRGFzaGJvYXJkIiwic2hvd01vYmlsZU1lbnUiLCJzZXRTaG93TW9iaWxlTWVudSIsImRpdiIsImNsYXNzTmFtZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/dashboard/index.js\n");

/***/ })

});