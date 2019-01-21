import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { HtmlToReact } from '../helpers';

const WasteListItem = ({ item, favList, removeFromFavList, addToFavList }) => {

    return (
        <div className="row waste-list">

            <div className="col-1">
                <FontAwesomeIcon
                    icon="star"
                    className={favList.includes(item) ? 'waste-list-fav-icon-filled' : 'waste-list-fav-icon'}
                    onClick={favList.includes(item) ? () => (removeFromFavList(item)) : (() => addToFavList(item))}
                />
            </div>

            <div className="col-5 waste-list-title">{item.title}</div>
            <div className="col-6 waste-list-desc">{HtmlToReact(item.body)}</div>
        </div>
    );
}

export default WasteListItem;