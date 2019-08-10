import React from "react";

export const LoadMore = ({children}) => {
    const scroll = () => {
        console.log(1);
    };

    return (
        <div onScroll={() => scroll()}>
            { children }
        </div>
    )
};
