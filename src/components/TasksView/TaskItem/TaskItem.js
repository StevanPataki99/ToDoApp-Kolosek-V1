import React from 'react';

import classes from './TaskItem.module.css';

const taskItem = (props) => {
    return(
        <div className={classes.TaskItem}>
            <p onClick={props.complete}>{props.task}</p>
            <button onClick={props.clicked}>Remove</button>
        </div>

    );
}

export default taskItem;