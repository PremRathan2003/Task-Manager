import React, { Component } from 'react';
import './index.css'
class PriorityFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPriority: 'ALL',
    };
  }

  handlePriorityChange = (event) => {
    this.setState({
      selectedPriority: event.target.value,
    });
    this.props.filterByPriority(event.target.value);
  };

  render() {
    return (
      <div className="priority-filter">
        <label>
          <input
            type="radio"
            value="ALL"
            checked={this.state.selectedPriority === 'ALL'}
            onChange={this.handlePriorityChange}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            value="HIGH"
            checked={this.state.selectedPriority === 'HIGH'}
            onChange={this.handlePriorityChange}
          />
          High
        </label>
        <label>
          <input
            type="radio"
            value="LOW"
            checked={this.state.selectedPriority === 'LOW'}
            onChange={this.handlePriorityChange}
          />
          Low
        </label>
      </div>
    );
  }
}

export default PriorityFilter;
