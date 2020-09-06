import React from "react";
import SearchFilter from ".";
import data from "../../data/data.json";

class SearchFilterService {
  getSearchResult(query, noOfResults) {
    let count = 0;
    const countMatchWithIdList = {};
    const querySplit = query.split(" ");
    
    for (let i = querySplit.length; i > 0 && count !== noOfResults; i--) {
      count =count + this.getSearchResultForParticularLength(querySplit, countMatchWithIdList, i);
      if(count>noOfResults){
          break;
      }  
    }
    console.log(countMatchWithIdList);
    let idList=this.getAllFinalTitles(querySplit,countMatchWithIdList,noOfResults);
    return idList;
  }
  getAllFinalTitles(queryArray,countMatchWithIdList,noOFResult){
     let idsArray=[]; 
     for(let i=queryArray.length;i>0;i--){
        if(!countMatchWithIdList[i]){
            continue;
        }
        countMatchWithIdList[i].sort(function(a,b){
            return b.count-a.count;
        })
        for(let j=0;j<countMatchWithIdList[i].length;j++){
            let match=countMatchWithIdList[i][j];
            if(idsArray.indexOf(match.id)>=0){
                continue;
            }
            idsArray.push(match.id); 
            if(idsArray.length===noOFResult){
                break;
            }
        }
        if(idsArray.length===noOFResult){
            break;
        }
    }
    return idsArray;
  }
  getSummaryIdMap(summaries) {
    const summaryIdMap = {};
    summaries.forEach((summary) => {
      summaryIdMap[summary.id] = summary.summary;
    });
    return summaryIdMap;
  }
  getSearchResultForParticularLength(
    queryArray,
    countMatchWithIdList,
    sizeOFWindow
  ) {
    let tempString = null;
    let matchCount = 0;
    let totalCount=0;
    for (let i = 0; i < queryArray.length; i = i + sizeOFWindow) {
      tempString = queryArray.slice(i, i+sizeOFWindow).join(" ");
      data.summaries.forEach(summary  => {
        matchCount = summary.summary.toLowerCase().split(tempString.toLowerCase()).length - 1;
        if (matchCount <= 0) {
          return;
        }
        if (!countMatchWithIdList[sizeOFWindow]) {
          countMatchWithIdList[sizeOFWindow] = [];
        }
        countMatchWithIdList[sizeOFWindow].push({id:summary.id,count:matchCount});
        totalCount += matchCount;
      });
      return totalCount;
    }
  }
}
export default new SearchFilterService();
