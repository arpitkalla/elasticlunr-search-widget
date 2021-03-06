import React from "react";

import SearchResult from "./SearchResult";
import PageNumbers from "./PageNumbers";
import ReactOutsideEvent from 'react-outside-event';

var $ = require('jquery');

/**
 * Panel with results that should appear right under
 * the input field as soon as the user types in a few letters.
 */
class Results extends React.Component {

  /*
     If the user clicks outside of the Results list,
     elsewhere than the Input field, then the results
     list should hide (i.e. make an "empty" search).
  */
  onOutsideEvent = (event) => {
    if(event.target.id != 'elnr-sw-search-field') {
      this.props.getSearchResults("");
    }
  }

  render() {
    var currentPageIndex = this.props.selectedPage;
    var currentPage = this.props.searchResults[currentPageIndex];
    var resultsDivs = [];
    if(currentPage) {
      for (var i = 0; i < currentPage.length; i++) {
        resultsDivs.push(
          <SearchResult
            id={"search-result-" + i}
            key={"search-result-" + i}
            link={currentPage[i].doc.link}
            title={currentPage[i].doc.title}
            text={currentPage[i].doc.preview}
          />
        );
      }
    }
    return (
      resultsDivs.length > 0 ?
        <div id="resultsPanel" className="resultsPanel">
          <div className="suggestionGroupClass" id="suggestions">
              {
                resultsDivs.map(
                  function(result){
                   return result;
                  }
                )
              }
          </div>
          <PageNumbers
            searchResults={this.props.searchResults}
            selectedPage={this.props.selectedPage}
            selectPage={this.props.selectPage}
            id="paginator"
            key="paginator"
          />
        </div>
          : null
    );
  }
}

export default ReactOutsideEvent(Results, ['click']);
