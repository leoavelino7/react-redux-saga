import React, { Component } from 'react';
import { connect } from "react-redux";

import { AppContext } from "./data/services/AppContext";

import * as TodoActions from "./data/actions/TodoActions";
import * as UserActions from "./data/actions/UserActions";

import NewTodoItem from "./views/components/NewTodoItem";
import TodoList from "./views/components/TodoList";

import './App.css';

class App extends Component {
  componentDidMount() {
   this.props.dispatch(TodoActions.list());
  }

  render() {
    const { props } = this,
      { dispatch, todoList } = props;

    return (
      <div className="App">
          <AppContext.Provider value={props}>
            <NewTodoItem onAdd={(description) => { dispatch(TodoActions.create(description)) }}/>
            <hr />
            <button className="tw-btn" onClick={() => { dispatch(TodoActions.clear()) }}>Limpar</button>
            <hr />
            <TodoList items={todoList} onRemove={(itemId) => { dispatch(TodoActions.remove(itemId)) }} onUpdate={ (item) => { dispatch(TodoActions.update(item)) }} />
            <hr />
            <button className="tw-btn" onClick={() => { dispatch(UserActions.login("admin", "admin123")) }}>Login</button>
            &nbsp;
            <button className="tw-btn" onClick={() => { dispatch(UserActions.logout()) }}>Logout</button>
          </AppContext.Provider>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  todoList: state.TodoReducer,
  account: state.UserReducer
});

export default connect(mapStateToProps)(App);
