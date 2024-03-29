import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td>{props.todo.todo_description}</td>
        <td>{props.todo.todo_responsible}</td>
        
        {props.todo.todo_priority === "High" ? (
        <td bgcolor="red">{props.todo.todo_priority}</td>
      ) : props.todo.todo_priority === "Medium" ?(
        <td bgcolor="grey">{props.todo.todo_priority}</td>
      ):props.todo.todo_priority === "Low" ?(
        <td bgcolor="green">{props.todo.todo_priority}</td>
      ):(<td>{props.todo.todo_priority}</td>)}
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>
    </tr>
);

export default class TodosList extends Component {
    constructor(props) {
        super(props);
        // initialize the state with an empty todos array
        this.state = {todos: []};
    }

    // To retrieve the todos data from the database --> use the componentDidMount lifecycle method
    componentDidMount() {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    todoList() {
        return this.state.todos.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}