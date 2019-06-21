import React, { Component } from 'react';
import { connect } from "react-redux";

import * as TodoActions from "./data/actions/TodoActions";

import NewTodoItem from "./views/components/NewTodoItem";
import TodoList from "./views/components/TodoList";

import './App.css';

class App extends Component {
  render() {
    const { props } = this,
      { dispatch, todoList } = props;

    return (
      <div className="App">
          <NewTodoItem onAdd={(description) => { dispatch(TodoActions.create(description)) }}/>
          <hr />
          <button className="tw-btn" onClick={() => { dispatch(TodoActions.clear()) }}>Limpar</button>
          <hr />
          <TodoList items={todoList} onRemove={(itemId) => { dispatch(TodoActions.remove(itemId)) }} onUpdate={ (item) => { dispatch(TodoActions.update(item)) }} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todoList: state.TodoReducer
});

export default connect(mapStateToProps)(App);
