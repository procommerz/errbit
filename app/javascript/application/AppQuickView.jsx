// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import _ from 'underscore'

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class AppQuickView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      report: {}
    };

    window.AppQuickView = this;
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
      <div className="row">
        <div className="col-sm">
          <div className="label">{this.state.report.message}</div>
          <button className="btn btn-primary">OK</button>
        </div>
        <div className="col-sm"></div>
        <div className="col-sm"></div>
      </div>
    </div>)
  }

  updateData() {
    window.fetch(`/api/v1/problems/status_report?app_id=0`, { method: 'GET', mode: 'same-origin', credentials: 'include' }).then(r => r.json().then((data) => {
      this.setState({report: data});
    }));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if ($('app-quick-view')[0]) {
    ReactDOM.render(
      <AppQuickView name="React" />,
      $('app-quick-view')[0],
    )
  }
});

