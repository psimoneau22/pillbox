/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Pillbox = __webpack_require__(1);

	(function () {
	    var testData = [{ name: "test this", val: "val1" }, { name: "test that", val: "val2" }, { name: "check something", val: "val3" }, { name: "check something else", val: "val4" }, { name: "else do that", val: "val5" }, { name: "here", val: "val6" }, { name: "there", val: "val7" }];

	    mockAjaxCall = function (url, data) {
	        console.log("MockAjaxCall: " + url + " : " + JSON.stringify(data));
	        var filter = data.filter;

	        return new Promise(function (resolve, reject) {

	            var result = $.grep(testData, function (item) {
	                return item.name.toLowerCase().indexOf(filter.toLowerCase()) != -1;
	            });

	            resolve(result);
	        });
	    };

	    var handleSearch = function (filter, resp) {
	        mockAjaxCall("~/someServiceUrl.svc", { filter: filter }).then(function (data) {
	            resp(data);
	        }.bind(this));
	    };

	    ReactDOM.render(React.createElement(Pillbox, { search: handleSearch }), document.getElementById("test"));
	})();

/***/ },
/* 1 */
/***/ function(module, exports) {

	var PillboxItem = React.createClass({
	    displayName: "PillboxItem",

	    handleRemove: function () {
	        this.props.onRemove(this.props.item);
	    },
	    render: function () {
	        return React.createElement(
	            "div",
	            { className: "col-md-4 pillbox-selected-item" },
	            React.createElement(
	                "div",
	                { className: "pillbox-selected-item-header" },
	                React.createElement("span", { className: "glyphicon glyphicon-remove", onClick: this.handleRemove })
	            ),
	            React.createElement(
	                "div",
	                { className: "" },
	                React.createElement("span", { className: "glyphicon glyphicon-th" })
	            ),
	            React.createElement(
	                "div",
	                { className: "" },
	                this.props.item.name
	            )
	        );
	    }
	});

	var Pillbox = React.createClass({
	    displayName: "Pillbox",

	    getInitialState: function () {
	        return { items: [], selectedItems: [], value: "", isOpen: false };
	    },
	    handleInput: function () {
	        var filterText = this.refs.input.value;
	        this.setState({ value: filterText });

	        if (!filterText || !filterText.length) {
	            this.setState({ items: [], isOpen: false });
	            return;
	        }

	        this.search(filterText);
	    },
	    handleDropdown: function () {
	        if (this.state.isOpen) {
	            this.setState({ isOpen: false });
	            return;
	        }

	        this.props.search("", this.handleSearchResult);
	    },
	    handleAddItem: function (item) {
	        if (!this.state.selectedItems.some(function (current) {
	            return item.val == current.val;
	        })) {
	            this.state.selectedItems.push(item);
	            this.setState({ selectedItems: this.state.selectedItems, items: [], value: "" });
	        }
	        this.closeMenu();
	        this.refs.input.focus();
	    },
	    search: function (filterText) {
	        this.props.search(filterText, this.handleSearchResult);
	    },
	    handleSearchResult: function (data) {
	        this.setState({ items: data, isOpen: data.length > 0 });
	    },
	    handleRemove: function (item) {
	        var index = this.state.selectedItems.findIndex(function (current) {
	            return current.val == item.val;
	        });

	        if (index >= 0) {
	            this.state.selectedItems.splice(index, 1);
	            this.setState({ selectedItems: this.state.selectedItems });
	        }
	    },
	    closeMenu: function () {
	        this.setState({ isOpen: false });
	    },
	    render: function () {

	        var items = this.state.items.map(function (item, index) {
	            return React.createElement(
	                "li",
	                { key: index, onClick: this.handleAddItem.bind(this, item) },
	                React.createElement(
	                    "a",
	                    { href: "#" },
	                    item.name
	                )
	            );
	        }.bind(this));

	        var dropdownClass = "dropdown" + (this.state.isOpen ? " open" : "");

	        var selectedItems = this.state.selectedItems.map(function (item, index) {
	            return React.createElement(PillboxItem, { key: item.val, item: item, onRemove: this.handleRemove });
	        }.bind(this));

	        return React.createElement(
	            "div",
	            { className: "pillbox container" },
	            React.createElement(
	                "div",
	                { className: "row" },
	                React.createElement(
	                    "div",
	                    { className: "col-md-4" },
	                    React.createElement(
	                        "div",
	                        { className: "input-group" },
	                        React.createElement("input", { className: "form-control", ref: "input", type: "text", onChange: this.handleInput, value: this.state.value, onBlur: this.closeMenu }),
	                        React.createElement(
	                            "div",
	                            { className: "input-group-btn" },
	                            React.createElement(
	                                "button",
	                                { className: "btn btn-default dropdown", type: "button", onClick: this.handleDropdown, onBlur: this.closeMenu },
	                                React.createElement("span", { className: "caret" })
	                            )
	                        )
	                    )
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: dropdownClass },
	                React.createElement(
	                    "ul",
	                    { ref: "results", className: "dropdown-menu" },
	                    items
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "row pillbox-selected-container" },
	                selectedItems
	            )
	        );
	    }
	});

	module.exports = Pillbox;

/***/ }
/******/ ]);