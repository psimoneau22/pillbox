var React = require('react');
var ReactCssTransitionGroup = require('react-addons-css-transition-group');

var PillboxSearch = function(props){
    var items = props.items.map(function(item, index){
            return <li key={item.val} onClick={props.handleAddItem}><a href="#">{item.name}</a></li> 
        }.bind(this)); 
        
    return  <div>
                <div className="row">
                    <div className="col-md-2">
                        <label>{props.label}</label>
                    </div>
                    <div className="col-md-10 col-md-offset-2">
                        <div className="input-group">
                            <input className="form-control" type="text" onChange={props.handleInput} value={props.value}  />
                            <div className="input-group-btn">
                                <button className="btn btn-default dropdown" type="button" onClick={props.handleDropdown} ><span className="caret" /></button>
                            </div>
                        </div> 
                    </div>              
                </div>
                <div className={props.dropdownClass}> 
                    <ul className="dropdown-menu">{items}</ul>
                </div>
            </div>;
};

var PillboxResults = function(props){
    var selectedItems = props.selectedItems.map(function(item, index){
            return <PillboxItem key={item.val} item={item} onRemove={props.handleRemove.bind(null, index)} />;
        }.bind(this));
        
    return  <div className="row">
                <div className="col-md-6"> 
                    <div className="row pillbox-selected-container">                        
                        {props.selectedItems}
                    </div>
                </div>
            </div>;
};

var PillboxItem = function(props) {    
    return  <div className="col-md-4 pillbox-selected-item">
                <div className="pillbox-selected-item-header"><span className="glyphicon glyphicon-remove" onClick={props.onRemove.bind(null, props.item)} /></div>
                <div className=""><span className="glyphicon glyphicon-th" /></div>
                <div className="">{props.item.name}</div>                    
            </div>         
};

var Pillbox = React.createClass({
    getInitialState: function(){
        return { items: [], selectedItems: [], value: "", isOpen: false };
    },
    handleInput: function(){
        var filterText = "t";
        this.setState({ value: filterText});
        
        if(!filterText || !filterText.length){
            this.setState({ items: [], isOpen: false});
            return;
        }
        
        this.search(filterText);        
    },
    handleDropdown: function() {
        if(this.state.isOpen){
            this.setState({ isOpen: false});
            return;
        }
        
        this.props.search("", this.handleSearchResult);
    },
    handleAddItem: function(item){
        if(!this.state.selectedItems.some(function(current){
            return item.val == current.val;
        })){
            var newSelectedItems = this.state.selectedItems.concat([item]);
            this.setState({ selectedItems: newSelectedItems, items: [], value: ""});
        }
        this.setState({ isOpen: false});
        //this.refs.input.focus();
    },
    search: function(filterText) {
        this.props.search(filterText, this.handleSearchResult);
    },
    handleSearchResult: function(data) {
        this.setState({ items: data, isOpen: data.length > 0 });
    },
    handleRemove: function(index){        
        var newSelectedItems = this.state.selectedItems.slice(); 
        newSelectedItems.splice(index, 1);
        this.setState({selectedItems: newSelectedItems });         
    },
    render: function(){             
          
        var dropdownClass = "dropdown" + (this.state.isOpen ? " open" : "");        
                        
        return  <div className="pillbox container">
                    <PillboxSearch 
                        label="Search Something" 
                        handleInput={this.handleInput} 
                        handleAddItem={this.handleAddItem}
                        handleDropdown={this.handleDropdown}
                        dropdownClass={dropdownClass} 
                        items={this.state.items}
                        value={this.state.value} />                      
                    <PillboxResults 
                        selectedItems={this.state.selectedItems}
                        handleRemove={this.handleRemove} />
                </div>
    }    
});

module.exports = Pillbox;