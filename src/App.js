import React, { Component } from 'react';

import TodoActions from "./data/actions/TodoActions";
import TodoStore from "./data/stores/TodoStore";

import NewTodoItem from "./views/components/NewTodoItem";
import TodoList from "./views/components/TodoList";

import './App.css';

async function getTodoState() {
  return {
    todoList: await TodoStore.getAll()
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: []
    }

    this._onChange = this._onChange.bind(this);
    this._onChange();
  }

  componentDidMount() {
    TodoStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange);
  }

  async _onChange() {
    this.setState(await getTodoState());
  }

  render() {
    const { state } = this;
    return (
      <div className="App">
          <NewTodoItem onAdd={TodoActions.create}/>
          <hr />
          <button className="tw-btn" onClick={TodoActions.clear}>Limpar</button>
          <hr />
          <TodoList items={state.todoList} onRemove={TodoActions.remove} onUpdate={TodoActions.update} />
      </div>
    );
  }
}

export default App;
