import React from 'react';
import './RedditImageListItem.css'

function RedditImageListItem(props) {
    // console.log(props);
    if(props.data !== undefined)
    return (
        <div className="reddit-list-item">
            <div className="reddit-list-item-title">{props.data.title}</div>
            <div className="reddit-list-image-list-container">
                <img 
                    className="reddit-list-image"
                    src={props.data.thumbnail}
                    alt={props.data.title}
                    onClick={() => {
                        props.showDetails(props.data);
                    }} />
            </div>
        </div>
    );
}

export default RedditImageListItem;