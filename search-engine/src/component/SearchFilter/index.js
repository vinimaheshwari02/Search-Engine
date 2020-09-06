import React, { Component } from 'react';
import SearchFilterService from './SearchFilterService';
import AutoCompleteSuggestion from '../AutoCompleteSuggestion';
import CardForBooks from '../CardForBooks';
import data from '../../data/data.json';

class SearchFilter extends Component {
    constructor(props){
        super(props);
        this.state={searchValue:null,titlesIds:null,selectedBookIds:[],visibleDropDown:false}
    }
    onSearchOfBooksFromQuery=()=>{
        let titlesIds=SearchFilterService.getSearchResult(this.state.searchValue,3); 
        this.setState({titlesIds:titlesIds,visibleDropDown:true});
    }
    onChangeOfSearchFilterValue=(e)=>{
        this.setState({searchValue:e.target.value});
    }
    onSelectOfBookFromSuggestion=(bookId)=>{
        let tempBookIds=this.state.selectedBookIds.slice();
        const index=tempBookIds.indexOf(bookId);
        if(index>=0){
            tempBookIds.splice(index,1)
        }
        tempBookIds.push(bookId);
        console.log(tempBookIds);
        this.setState({selectedBookIds:tempBookIds,visibleDropDown:false})
    }
    getWidthOfCard(i){
        if(3*i<=this.state.selectedBookIds.length){
            return '28%'
        }
        let noOfCard=(this.state.selectedBookIds.length-(3*(i-1)))%3;
        if(noOfCard===0){
            return '28%'
        }else if(noOfCard===2){
            return '42%'
        }else{
            return '84%';
        }
    }
    getBodyOfSearchBook(){
        const htmlRowBody=[];
        let i=1,j=0;
        const rowCount=Math.ceil(this.state.selectedBookIds.length/3);
        let colCount=0;
        while(i<=rowCount){
            const htmlColBody=[];
            while(j<this.state.selectedBookIds.length && j<i*3){
                colCount++;
                htmlColBody.push(<CardForBooks width={this.getWidthOfCard(i)} title={data.titles[this.state.selectedBookIds[j]]} 
                    summary={data.summaries[this.state.selectedBookIds[j]].summary} 
                    author={data.authors[this.state.selectedBookIds[j]].author}
                    ></CardForBooks>)
                    j++;
            }
            htmlRowBody.push(<div style={{display:'flex',justifyContent:'space-evenly',marginTop:'5%'}}>{htmlColBody}</div>)
            i++;
        }
        
        return htmlRowBody;
    }
    render(){
        return(
                <div>
                    <div  style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                       <div> 
                            <input  list="bookSuggestion" placeholder="Search Books" 
                                onChange={this.onChangeOfSearchFilterValue} size="40" 
                                style={{height:'30px'}}>

                            </input>
                       
                            <button style={{height:'35px',width:'70px',marginLeft:'5px',
                            backgroundColor: 'Transparent',borderRadius:'4px'}} 
                            onClick={this.onSearchOfBooksFromQuery}
                            disabled={ this.state.searchValue==null || 
                                this.state.searchValue.length===0}
                            >Submit</button>

                        </div>
                        {this.state.visibleDropDown && this.state.titlesIds &&
                        <AutoCompleteSuggestion suggestionIds={this.state.titlesIds} 
                        onSelectOfBookFromSuggestion={this.onSelectOfBookFromSuggestion}/>
                         }
                        {this.state.titlesIds==null && <div className="noBookSelected">No Book Selected</div>}
                    </div >
                    
                    <div>
                        {this.getBodyOfSearchBook()}
                    </div>
                </div>
                
        );
    }
}
export default SearchFilter;