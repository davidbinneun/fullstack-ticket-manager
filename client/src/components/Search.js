import React from 'react';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: "", data: [] };
    
        this.handleChange = this.handleChange.bind(this);
      }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <div>
            <form>
            <input type="text" onChange={this.handleChange} />
            </form>
            {this.state.value}
            </div>
        )
    }
}