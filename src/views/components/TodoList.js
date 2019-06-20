import React, { Component } from "react";

import TodoItem from "./TodoItem";

class TodoList extends Component {
    static defaultProps = {
        items: [],
        onRemove: () => {},
        onUpdate: () => {}
    }

    constructor(props) {
        super(props);

        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
    }

    remove(id) {
        const { props } = this;
        props.onRemove(id);
    }

    update(item) {
        const { props } = this;
        props.onUpdate(item);
    }

    render() {
        const { props } = this,
            { items } = props;

        if(items.length === 0) {
            return <div>No items</div>
        }

        return (
            <ul className="todo-list">
                {
                    items.map(item => (
                        <TodoItem 
                            key={item.id} 
                            item={item} 
                            onRemove={this.remove} 
                            onUpdate={this.update} />
                    ))
                }
            </ul>
        );
    }
}

export default TodoList;