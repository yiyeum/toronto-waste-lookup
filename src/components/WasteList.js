import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

let unescapeHTML = (escapedHTML) => {
    return escapedHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

const WasteList = ({ items, favList, removeFromFavList, addToFavList }) => {

    return (
        <div>
            {
                items.map((list, index) =>
                    <div key={index} className="row waste-list">
                        <div className="col-1"><FontAwesomeIcon icon="star" className={favList.includes(list) ? 'waste-list-fav-icon-filled' : 'waste-list-fav-icon'} onClick={favList.includes(list) ? () => (removeFromFavList(list)) : (() => addToFavList(list))} /></div>
                        <div className="col-5 waste-list-title">{list.title}</div>
                        <div className="col-6 waste-list-desc">{unescapeHTML(list.body)}</div>
                    </div>
                )
            }
        </div>
    )
};

export default WasteList;