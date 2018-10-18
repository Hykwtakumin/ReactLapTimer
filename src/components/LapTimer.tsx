import * as React from "react";
import { render } from "react-dom";
import { StyleSheet, css } from "aphrodite";
import { Layout, Button, Icon, List } from "antd";
import "antd/dist/antd.css";
const { Content, Footer } = Layout;

const styles = StyleSheet.create({
  container: {
    fontFamily: "sans-serif",
    textAlign: "center"
  },
  timerArea: {
    fontSize: "3rem"
  },
  controlerArea: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    listStyleType: "none",
    marginBottom: "3%"
  },
  lapListArea: {
    width: "60%",
    alignSelf: "center",
    textAlign: "center"
  }
});

interface defaultProps {
  defaultState: defaultState;
}

interface defaultState {
  isStarted: boolean; //タイマーが作動しているか否か
  seconds: number; //カウントしている
  laps: Array<number>;
}

class LapTimer extends React.Component<defaultProps, defaultState> {
  constructor(props: defaultProps) {
    super(props);
    const { isStarted, seconds, laps } = props.defaultState;
    this.state = {
      isStarted: isStarted,
      seconds: seconds,
      laps: laps
    };
  }

  //秒を分に変換
  formatTime = (time: number): String => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    const m = `0${minutes}`.slice(-2);
    const s = `0${seconds}`.slice(-2);

    return `${m}:${s}`;
  };

  //ラップタイムをDLできるようにする
  handleSaveButton = () => {
    this.timerStop();
    const time = this.state.seconds; //最終的なタイム
    const laps = this.state.laps.map((lap, index) => {
      return `Lap${index + 1}:${this.formatTime(lap)} +${this.formatTime(
        time - lap
      )}秒`;
    });

    const results = {
      time: this.formatTime(time),
      laps: laps
    };

    location.href =
      "data:application/octet-stream," +
      encodeURIComponent(JSON.stringify(results));
  };

  handleLapButton = () => {
    const lapSeconds = this.state.seconds; //Lapボタンを押した時点での秒数
    const laps = this.state.laps;
    laps.push(lapSeconds);
    this.setState({ laps: laps });
  };

  //タイマーとラップをリセット
  handleResetButton = () => {
    this.timerStop();
    this.setState({ isStarted: false, seconds: 0, laps: [] });
  };

  //タイマーの測定/停止
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

  componentWillUnmount() {
    clearInterval(this.counter);
  }

  render() {
    return (
      <div className={css(styles.container)}>
        <Layout>
          <Content>
            <h1 className={css(styles.timerArea)}>
              {this.formatTime(this.state.seconds)}秒
            </h1>
            <div className={css(styles.controlerArea)}>
              <Button onClick={this.handleResetButton} icon="redo" size="large">
                Reset
              </Button>

              <Button
                onClick={this.handleTimerButton}
                icon={this.handleIcon()}
                size="large"
              >
                {!this.state.isStarted ? "Start" : "Stop"}
              </Button>

              <Button onClick={this.handleLapButton} icon="plus" size="large">
                Lap
              </Button>
            </div>
          </Content>
          <Content className={css(styles.lapListArea)}>
            <List
              header={<div>Laps</div>}
              bordered
              dataSource={this.state.laps}
              renderItem={item => (
                <List.Item>
                  Lap{this.state.laps.indexOf(item) + 1} :
                  {this.formatTime(item)}
                  {`+${this.formatTime(this.state.seconds - item)}秒`}
                </List.Item>
              )}
            />
          </Content>
          <Footer>
            <Button onClick={this.handleSaveButton} icon="download">
              タイムを保存する
            </Button>
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default LapTimer;
