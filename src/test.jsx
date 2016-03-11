var React = require("react");
var ReactDOM = require("react-dom");
var Pillbox = require("./pillbox");

(function(){
    var testData = [
        { name:"test this", val: "val1" },
        { name:"test that", val: "val2" },
        { name:"check something", val: "val3" },
        { name:"check something else", val: "val4" },
        { name:"else do that", val: "val5" },
        { name:"here", val: "val6" },
        { name:"there", val: "val7" }    
    ];

    mockAjaxCall = function(url, data){
        console.log("MockAjaxCall: " + url + " : " + JSON.stringify(data));
        var filter = data.filter;
        
        return new Promise(function(resolve, reject) {
            
            var result = $.grep(testData, function(item) {
                return item.name.toLowerCase().indexOf(filter.toLowerCase()) != -1; 
            });
            
            resolve(result);
        });   
    };
    
    var handleSearch = function(filter, resp){
        mockAjaxCall("~/someServiceUrl.svc", { filter: filter }).then(
            function(data){
                resp(data);
            }.bind(this)
        );
    };

    ReactDOM.render(<Pillbox search={handleSearch} />,    
        document.getElementById("test")
    );
})();
