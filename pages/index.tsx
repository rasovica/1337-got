import React, {useContext} from 'react';
import {DataContext} from "../utils/dataProvider";

export default () => {
    const data = useContext(DataContext);

    return (
        <div>
            { data.characters.map(item => <div key={item.name}>{item.name}</div>) }
        </div>
    )
}
