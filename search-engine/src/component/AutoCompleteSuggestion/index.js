import React, { Component } from 'react';
import data from '../../data/data.json'
class AutoCompleteSuggestion extends Component {
    constructor(props){
        super(props);
        this.state={selectedBookId:null};
    }
    onSelectOfBook=(id)=>{
        this.setState({selectedBookId:id})
        this.props.onSelectOfBookFromSuggestion(id)
    }
    render(){
    return(
    <div>
        <ul className="options" style={{listStyleType:'none',margin:'0px'}}>{this.props.suggestionIds.map((id,index)=>{
        let className;
        if (this.state.selectedBookId===id) {
            className = 'option-active';
        }
       return(<li className={className} onClick={()=>this.onSelectOfBook(id)}>{data.titles[id]}</li>);
        })}</ul></div>)
    }
}
export default AutoCompleteSuggestion;