import React from 'react';
import WasteList from './WasteList';

const Favourite = ({favList, removeFromFavList, addToFavList}) => {
    return (
        <div className="fav-list-wrapper">
            <h3 className="title-fav mt-5">Favourites</h3>
            <WasteList
                items={favList}
                favList={favList}
                removeFromFavList={removeFromFavList}
                addToFavList={addToFavList}
            />
        </div>
    );
}

export default Favourite;