var React = require('react');
var ReactCssTransitionGroup = require('react-addons-css-transition-group');

var PillboxItem = React.createClass({
    handleRemove: function(){
        this.props.onRemove(this.props.item);
    },
    render: function(){
        return  <div className="col-md-4 pillbox-selected-item">
                    <div className="pillbox-selected-item-header"><span className="glyphicon glyphicon-remove" onClick={this.handleRemove} /></div>
                    <div className=""><span className="glyphicon glyphicon-th" /></div>
                    <div className="">{this.props.item.name}</div>                    
                </div>     
    }
});

var Pillbox = React.createClass({
    getInitialState: function(){
        return { items: [], selectedItems: [], value: "", isOpen: false };
    },
    handleInput: function(){
        var filterText = this.refs.input.value;
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
        this.refs.input.focus();
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
                
        var items = this.state.items.map(function(item, index){
            return <li key={item.val} onClick={this.handleAddItem.bind(this, item)}><a href="#">{item.name}</a></li> 
        }.bind(this));      
          
        var dropdownClass = "dropdown" + (this.state.isOpen ? " open" : "");
        
        var selectedItems = this.state.selectedItems.map(function(item, index){
            return <PillboxItem key={item.val} item={item} onRemove={this.handleRemove.bind(this, index)} />;
        }.bind(this));
                        
        return  <div className="pillbox container">          
                    <div className="row">
                        <div className="col-md-6">
                            <div className="input-group">
                                <input className="form-control" ref="input" type="text" onChange={this.handleInput} value={this.state.value}  />
                                <div className="input-group-btn">
                                    <button className="btn btn-default dropdown" type="button" onClick={this.handleDropdown} ><span className="caret" /></button>
                                </div>
                            </div> 
                        </div>              
                    </div>
                    <div className={dropdownClass}> 
                        <ul ref="results" className="dropdown-menu">{items}</ul>
                    </div>  
                    <div className="row">
                        <div className="col-md-6"> 
                            <div className="row pillbox-selected-container">
                                <ReactCssTransitionGroup transitionName="slide" transitionEnterTimeout={500} transitionLeaveTimeout={500} >
                                    {selectedItems}
                                </ReactCssTransitionGroup>
                            </div>
                        </div>
                    </div>
                </div>
    }    
});

module.exports = Pillbox;