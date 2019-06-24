import React, { Component } from "react";
import { AppContext } from "../../data/services/AppContext";
import * as UserActions from "../../data/actions/UserActions";

class NewTodoItem extends Component {
    static contextType = AppContext;

    static defaultProps = {
        onAdd: () => {}
    }

    constructor(props) {
        super(props);
        this.state = {
            description: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.add = this.add.bind(this);
        this.authenticated = this.authenticated.bind(this);
    }

    handleChange(event) {
        const { target } = event,
            { name, value } = target;

        this.setState({
            [name]: value
        })
    }

    authenticated() {
        const { user, token } = this.context.account;
        return (user && token);
    }

    add(event) {
        event.preventDefault();
        
        if(this.authenticated()) {
           const { description } = this.state;
           if(description) {
               this.setState({description: ""});
               this.props.onAdd(description);
           } 
        }else {
            console.error("Unauthorized action");
            console.warn("Perform authentication");
        }
    }

    render() {
        const { state } = this;

        return (
            <form onSubmit={this.add}>
                <input 
                    className="tw-input" 
                    type="text" 
                    placeholder="New item" 
                    name="description" 
                    value={state.description} 
                    onChange={this.handleChange} />
                <button className="tw-btn">Adicionar</button>
            </form>
        );
    }
}

export default NewTodoItem;