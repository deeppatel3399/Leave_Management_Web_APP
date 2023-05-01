import React, { Component } from "react";
import OrgChart from "@balkangraph/orgchart.js";

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.divRef = React.createRef();
    this.state = {
      shouldUpdate: true,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.nodes !== this.props.nodes) {
      this.setState({ shouldUpdate: true });
    }
  }

  componentDidMount() {
    this.chart = new OrgChart(this.divRef.current, {
      nodes: this.props.nodes,
      nodeBinding: {
        field_0: "name",
        img_0: "img",
        field_1: "title"
      },
    });
  }

  componentDidUpdate() {
    if (this.state.shouldUpdate) {
      this.chart && this.chart.destroy();
      this.chart = new OrgChart(this.divRef.current, {
        nodes: this.props.nodes,

        nodeBinding: {
          field_0: "name",
          img_0: "img",
          field_1: "title"
        },
      });
      this.setState({ shouldUpdate: false });
    }
  }

  render() {
    return <div id="tree" ref={this.divRef}></div>;
  }
}
