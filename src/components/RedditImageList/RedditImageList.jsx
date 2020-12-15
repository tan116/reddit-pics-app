import React, { Component } from 'react';
import './RedditImageList.css'
import ModalDetailsView from '../ModalDetailsView/ModalDetailsView';
import RedditImageListItem from './RedditImageListItem/RedditImageListItem';

class RedditImageList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            completeList: [], // stores the complete list
            showDetailsView: false,
            searchText: '',
        }
        this.showDetails = this.showDetails.bind(this);
        this.closeDetails = this.closeDetails.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });
        fetch('http://www.reddit.com/r/pics/.json?jsonp=')
        .then(response => response.json())
        .then(response => {
        //   console.log('api response - ' + JSON.stringify(response));
          this.setState({
            loading: false,
            completeList: response.data.children });
        }
      );
    }

    showDetails(data) {
        this.setState({
            showDetailsView: true,
            detailsViewData: data,
        })
    }

    closeDetails() {
        this.setState({
            showDetailsView: false,
            detailsViewData: null,
        })
    }

    render() {
        let listToShow = this.state.completeList;
        if(this.state.searchText.length >= 3)
            listToShow = this.state.completeList.filter(item => item.data.title.toLowerCase().includes(this.state.searchText.toLowerCase()));

        return (
            <div className="reddit-list-page">

                <div className="reddit-list-container">
                    {/* header */}
                    <header className="reddit-list-header">Reddit List</header>

                    {/* search box */}
                    <input
                        type="text"
                        className="reddit-list-search-input"
                        placeholder="Search by title..."
                        onChange={(e) => { this.setState({ searchText: e.target.value}); }} />
                    
                    {/* render list */}
                    { listToShow.length > 0 ?
                        listToShow.map((val, key) => {
                            return (
                                <RedditImageListItem 
                                    key={key}
                                    data={val.data}
                                    showDetails={this.showDetails} />
                            )
                        })
                        : <div className="reddit-list-message">
                            {this.state.loading ? 'Loading...' : 'No results'}
                            </div>
                    }
                </div>

                {/* render item details in a modal view */}
                <ModalDetailsView show={this.state.showDetailsView} data={this.state.detailsViewData} closeDetails={this.closeDetails} />
            </div>
        );
    }
}

export default RedditImageList;