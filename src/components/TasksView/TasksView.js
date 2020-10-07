import React, {Component} from 'react';

import classes from './TaskView.module.css';

import TaskItem from './TaskItem/TaskItem';
import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-ctrl';

class TaskView extends Component {
    state = {
        tasks: null,
        reset: false
    }

    componentDidMount() {
        if (!this.state.tasks) {
            axios.get('/todos')
                .then(response => {
                    console.log(response);
                    this.setState({tasks: response.data.splice(0,10)});
                })
                .catch(error => {
                    console.log(error);
                    alert('Something went wrong!');
                })
        }
    }

    componentDidUpdate () {
        if (this.state.reset) {
            axios.get('/todos')
            .then(response => {
                console.log(response);
                this.setState({tasks: response.data.splice(0,10)});
            })
            .catch(error => {
                console.log(error);
                alert('Something went wrong!');
            });

            this.setState({reset: false});
        }


    }

    taskDeleteHandler = id => {
        axios.delete('/todos/' + id)
            .then(response => {
                console.log(response);
                this.setState({reset: true});
            })
            .catch(error => {
                console.log(error);
                alert('Something went wrong!');
            });
    }

    taskCompletedHandler = id => {
        axios.get('/todos/' + id)
            .then(response => {
                console.log(response);
                let newData = response.data;
                newData.completed = true;
                axios.put('/todos/' + id, newData)
                    .then(response => {
                        console.log(response);
                        this.setState({reset: true});
                    })
                    .catch(error => {
                        console.log(error);
                        alert('Something went wrong!');
                    });
            })
            .catch(error => {
                console.log(error);
                alert('Something went wrong!');
            });
    }
    
    render () {
        let tasks = <p>LOADING</p>;

        if (this.state.tasks) {
            const data = [...this.state.tasks];
            tasks = data.map( (value, index) => {
                return <TaskItem key={index} task={value.title} id={value.id} completed={value.completed} complete={() => this.taskCompletedHandler(value.id)} clicked={() => this.taskDeleteHandler(value.id)} />;
            });
        }
            
        return (
            <Aux>
                {tasks}
            </Aux>
        );
    }
}

export default TaskView;