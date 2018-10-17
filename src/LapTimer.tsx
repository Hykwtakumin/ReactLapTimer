import * as React from "react";
import { render } from "react-dom";
import { StyleSheet, css } from "aphrodite";
import { Layout, Button, Icon } from "antd";
import "antd/dist/antd.css";
const { Content } = Layout;

interface defaultProps {
  defaultState: defaultState;
}

interface defaultState {
  isStarted: boolean;
  seconds: number;
}

class LapTimer extends React.Component<defaultProps, defaultState> {
  constructor(props: defaultProps) {
    super(props);
    const { isStarted, seconds } = props.defaultState;
    this.state = {
      isStarted: isStarted,
      seconds: seconds
    };
  }

  handleButtonClick = () => {
    if (!this.state.isStarted) {
      this.timerStart();
    } else {
      this.timerStop();
    }
  };

  timer = () => {
    const currentSeconds = this.state.seconds as number;
    this.setState({ seconds: currentSeconds + 1 });
  };

  timerStart = () => {
    if (!this.state.isStarted) {
      this.setState({ isStarted: true });
      this.counter = setInterval(this.timer, 1000);
    }
  };

  timerStop = () => {
    if (this.state.isStarted) {
      clearInterval(this.counter);
      this.setState({ isStarted: false });
    }
  };

  render() {
    return (
      <div>
        <Layout>
          <Content>
            <h1>{this.state.seconds} 秒</h1>
            <Button onClick={this.handleButtonClick}>
              {!this.state.isStarted ? "Start" : "Stop"}
            </Button>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default LapTimer;
