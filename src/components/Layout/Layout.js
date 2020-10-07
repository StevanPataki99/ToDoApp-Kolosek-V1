import React, {Component} from 'react';

import classes from './Layout.module.css';
import TaskCreator from '../TaskCreator/TaskCreator';
import TaskView from '../TasksView/TasksView';

class Layout extends Component {
    render () {
        return (
            <div className={classes.Layout}>
                <TaskCreator />
                <TaskView />
            </div>

        );
    }
}

export default Layout;