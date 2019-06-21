import React, { Component } from 'react';
import { connect } from "react-redux";

import * as TodoActions from "./data/actions/TodoActions";

import NewTodoItem from "./views/components/NewTodoItem";
import TodoList from "./views/components/TodoList";

import './App.css';

class App extends Component {
  render() {
    const { props } = this,
      { dispatch } = props;

    return (
      <div className="App">
          <NewTodoItem onAdd={(description) => {dispatch(TodoActions.create(description))} }/>
          <hr />
          <button className="tw-btn" onClick={TodoActions.clear}>Limpar</button>
          <hr />
          <TodoList items={props.todoList} onRemove={TodoActions.remove} onUpdate={TodoActions.update} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todoList: state.todoList
});

export default connect(mapStateToProps)(App);
