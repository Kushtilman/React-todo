import React, { Component } from "react";
import './add-item.scss';

export default class AddItem extends Component {

    state = {
        label: ''
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAddItem(this.state.label);
        this.setState({
            label: ''
        });
    };

    render() {
        return (
            <form
                className='add-item d-flex'
                onSubmit={this.onSubmit}
                action=''>
                <input type="text"
                       className='form-control'
                       onChange={this.onLabelChange}
                       placeholder='What needs to be done'
                       value={this.state.label}/>
                <button type='submit'
                        className='btn btn-outline-secondary'>
                        Add item
                    <i className="fa fa-plus-circle"/>
                </button>
            </form>
        )
    }
}
