// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import _ from 'underscore'

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Select from 'react-select';

const queryString = require('query-string');

class ProblemSearch extends React.Component {
  constructor(props) {
    super(props);

    this.periodOptions = [
      { value: '1', label: "last 24 hours" },
      { value: '2', label: "last 2 days" },
      { value: '7', label: "last week" },
      { value: '14', label: "last 2 weeks" },
      { value: '30', label: "last 30 days (slow)" },
      { value: '90', label: "last 90 days (slow)" },
      { value: '180', label: "6 mo. (very slow)" }
    ];

    this.state = {
      request_param1_name: window.searchQuery.request_param1_name || "",
      request_param1_value: window.searchQuery.request_param1_value || "",
      request_param2_name: window.searchQuery.request_param2_name || "",
      request_param2_value: window.searchQuery.request_param2_value || "",
      session_param_name: window.searchQuery.session_param_name || "",
      session_param_value: window.searchQuery.session_param_value || "",
      selectedPeriodOption: this.periodOptions[2]
    };

    window.ProblemSearch = this;

  }

  componentWillMount() {
    this.updateData()
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render(props) {
    return (<div className="bootstrap">
      <div className="form-group">
        <div className="row" style={{marginBottom: 5}}>
          <div className="col-sm"><h4>Request Parameter 1</h4></div>
        </div>
        <div className="row" style={{marginBottom: 10}}>
          <div className="col-sm">
            <input className={"form-control form-control-lg"} type="text"
                   onChange={(e) => { this.setState({request_param1_name: e.target.value}) }}
                   value={this.state.request_param1_name} placeholder="Request parameter 1 key (e.g. order_id)..."/>
          </div>
          <div className="col-sm">
            <input className={"form-control form-control-lg"} type="text"
                   onChange={(e) => { this.setState({request_param1_value: e.target.value}) }}
                   value={this.state.request_param1_value} placeholder="Parameter value..."/>
          </div>
        </div>

        <div className="row" style={{marginBottom: 5}}>
          <div className="col-sm"><h4>Request Parameter 2 (optional, works as AND condition)</h4></div>
        </div>
        <div className="row" style={{marginBottom: 10}}>
          <div className="col-sm">
            <input className={"form-control form-control-lg"} type="text"
                   onChange={(e) => { this.setState({request_param2_name: e.target.value}) }}
                   value={this.state.request_param2_name} placeholder="Request parameter 2 key..."/>
          </div>
          <div className="col-sm">
            <input className={"form-control form-control-lg"} type="text"
                   onChange={(e) => { this.setState({request_param2_value: e.target.value}) }}
                   value={this.state.request_param2_value} placeholder="Parameter value..."/>
          </div>
        </div>

        <div className="row" style={{marginBottom: 5}}>
          <div className="col-sm"><h4>Session Parameter</h4></div>
        </div>
        <div className="row" style={{marginBottom: 10}}>
          <div className="col-sm">
            <input className={"form-control form-control-lg"} type="text"
                   onChange={(e) => { this.setState({session_param_name: e.target.value}) }}
                   value={this.state.session_param_name} placeholder="Session parameter key (e.g. user_id)..."/>
          </div>
          <div className="col-sm">
            <input className={"form-control form-control-lg"} type="text"
                   onChange={(e) => { this.setState({session_param_value: e.target.value}) }}
                   value={this.state.session_param_value} placeholder="Parameter value..."/>
          </div>
        </div>

        <div className="row" style={{marginBottom: 10}}>
          <div className="col-sm-3">
            <Select
              onChange={(option) => { this.setState({selectedPeriodOption: option}) }}
              value={this.state.selectedPeriodOption}
              options={this.periodOptions} />
          </div>

          <div className="col-sm">
            <button className="btn btn-lg btn-primary btn-block" onClick={this.submitFilter.bind(this)}>Filter</button>
          </div>
        </div>
      </div>
    </div>)
  }

  submitFilter(e) {
    let params = {
      'q[days_ago]': this.state.selectedPeriodOption.value,
      'q[request_param1_name]': this.state.request_param1_name,
      'q[request_param1_value]': this.state.request_param1_value,
      'q[request_param2_name]': this.state.request_param2_name,
      'q[request_param2_value]': this.state.request_param2_value,
      'q[session_param_name]': this.state.session_param_name,
      'q[session_param_value]': this.state.session_param_value
    };

    console.log();

    //location.href = `/apps/${window.appId}/?q[days_ago]=${this.state.selectedPeriodOption}&q[request_param1_name]=${this.state.request_param1_name}&q[request_param1_value]=${this.state.request_param1_value}`
    location.href = `/apps/${window.appId}/?${queryString.stringify(params)}`
  }

  updateData() {

  }
}

document.addEventListener('DOMContentLoaded', function(e) {
  if ($('problem-search')[0]) {
    ReactDOM.render(
      <ProblemSearch name="React" />,
      $('problem-search')[0],
    )
  }
});

