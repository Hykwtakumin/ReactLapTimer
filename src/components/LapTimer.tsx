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
  isStarted: boolean; //タイマーが作動しているか否か
  seconds: number; //カウントしている
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

  formatTime = (): String => {
    const time = this.state.seconds;

    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time / 100) % 60);
    const mSeconds = time % 1000;

    const m = `0${minutes}`.slice(-2);
    const s = `0${seconds}`.slice(-2);
    const ms = `0${time}`.slice(-2);

    return `${m}:${s}:${ms}`;
  };

  handleResetButton = () => {
    this.timerStop();
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
      this.counter = setInterval(this.timer, 10);
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

  componentWillUnmount() {
    clearInterval(this.counter);
  }

  render() {
    return (
      <div>
        <Layout>
          <Content>
            <h1 className={css(styles.timerArea)}>{this.formatTime()} 秒</h1>
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
