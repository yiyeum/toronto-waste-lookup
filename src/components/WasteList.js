import React from 'react';
import WasteListItem from './WasteListItem';

const WasteList = (props) => {

    return (
        <div>
            {
                props.items.map((item, index) =>
                    <WasteListItem
                        item={item}
                        key={index}
                        {...props}
                    />
                )
            }
        </div>
    )
};

export default WasteList;