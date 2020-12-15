import React from 'react';

import './ModalDetailsView.css'

function ModalDetailsView(props) {
    // console.log('props.show = ' + props.show)
    // console.log('props.data = ' + JSON.stringify(props.data));

    if (!props.show) {
        return null;
    } else {
        return (
            <div className="modal-details-overlay"
                onClick={(e) => {
                    e.stopPropagation();
                    props.closeDetails();
                }}>
                <div className="modal-details-box">
                    <div className="modal-image-container">
                        <img className="modal-image" src={props.data.url_overridden_by_dest} alt={props.data.title} />
                    </div>
                    <div className="modal-details-container">
                        <div className="modal-details-title">{props.data.title}</div>
                        <div className="modal-details-subtext">{props.data.author}</div>
                        <div className="modal-details-smalltext">{props.data.ups} upvotes</div>
                        <div className="modal-details-smalltext">{props.data.total_awards_received} awards</div>
                        
                        { props.data.content_categories.map((val, key) => {
                            return (
                                <span key={key} className="modal-details-tags">#{val}</span>
                            )
                        })}
                        <br/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalDetailsView;