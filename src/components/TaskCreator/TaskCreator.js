import React, {Component} from 'react';

import classes from './TaskCreator.module.css';

import axios from '../../axios-ctrl';
import uniqid from 'uniqid';

class TaskCreator extends Component {

    state = {
        task: ''
    }

    taskInputHandler = (event) => {
        this.setState({task: event.target.value});
    }

    taskCreateHandler = () => {
        if (this.state.task !== '') {
            const task = {
                id: uniqid(),
                title: this.state.task,
                completed: false
            }

            axios.post('/todos', task)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                    alert("Something went wrong!");
                });
                this.setState({task: ''});
        }
    }

    render () {
        return (
            <div className={classes.TaskCreator}>
                <input placeholder='Enter Task' value={this.state.task} onChange={this.taskInputHandler} type='text'/>
                <br/>
                <button onClick={this.taskCreateHandler}>ADD</button>
            </div>

        );
    }
}

export default TaskCreator;