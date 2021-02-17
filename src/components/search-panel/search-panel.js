import React, { Component } from "react";
import ItemStatusFilter from "../item-status-filter";
import './search-panel.scss';

export default class SearchPanel extends Component {
    state = {
        term: ''
    };

    onSearchChange = (e) => {
        const term = e.target.value;
        this.setState({ term });
        this.props.onSearchChange(term);
    };

    render() {
        return (
            <div className='search-panel'>
                <input
                    className='form-control'
                    type="search"
                    placeholder='type to search'
                    value={this.state.term}
                    onChange={this.onSearchChange} />
            </div>
        );
    }
}
