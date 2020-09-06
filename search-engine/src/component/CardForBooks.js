import React, { Component } from 'react';

class CardForBooks extends Component{
    render(){
    return(<div style={{width:this.props.width,boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2)',
    padding:'16px',textAlign:'center',backgroundColor:'#f1f1f1',height:'260px'}}>
        <h2 style={{height:'15%'}}>{this.props.title}</h2>
    <p style={{fontSize:'14px',fontFamily:'sans-serif',height:'50%'}}>{this.props.summary}</p>
    <h4 style={{height:'35%'}}>{this.props.author}</h4>
        </div>)
    }

}
export default CardForBooks;