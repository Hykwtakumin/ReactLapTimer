import * as React from "react";
import { render } from "react-dom";
import { StyleSheet, css } from "aphrodite";
import { Layout, Button, Icon } from "antd";
import "antd/dist/antd.css";
const { Content } = Layout;

const styles = StyleSheet.create({
  timerArea: {
    fontFamily: "sans-serif",
    textAlign: "center"
  },
  controlerArea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    listStyleType: "none",
    fontFamily: "sans-serif",
    textAlign: "center"
  }
});

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

  handleResetButton = () => {
    this.setState({ isStarted: false, seconds: 0 });
  };

  handleTimerButton = () => {
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

  handleIcon = (): string => {
    if (this.state.isStarted) {
      return "pause";
    } else {
      return "caret-right";
    }
  };

  render() {
    return (
      <div>
        <Layout>
          <Content>
            <h1 className={css(styles.timerArea)}>{this.state.seconds} 秒</h1>
            <div className={css(styles.controlerArea)}>
              <Button
                onClick={this.handleTimerButton}
                icon={this.handleIcon()}
                size="large"
              >
                {!this.state.isStarted ? "Start" : "Stop"}
              </Button>

              <Button onClick={this.handleResetButton} icon="redo" size="large">
                Reset
              </Button>

              <Button onClick={this.handleResetButton} icon="plus" size="large">
                Lap
              </Button>
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default LapTimer;
