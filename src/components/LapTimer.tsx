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
  laps: Array<number>; //ラップタイムが格納される配列
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

  //ラップタイムをJSON形式でDLできるようにする
  handleSaveButton = () => {
    this.timerStop();
    const time = this.state.seconds;
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

  //ラップタイムを追加
  handleLapButton = () => {
    const lapSeconds = this.state.seconds; //Lapボタンを押した時点での秒数を
    const laps = this.state.laps;
    laps.push(lapSeconds); //配列に格納していく(後でリスト状に表示する)
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

  //タイマー処理
  //secondsに1足す処理をtimerStart()で毎秒呼ぶ
  timer = () => {
    const currentSeconds = this.state.seconds as number;
    this.setState({ seconds: currentSeconds + 1 });
  };

  //JSのsetIntervalｊはさほど正確ではないので注意
  //厳密に測定する場合はwindow.perfomance.now()を使うと良い
  timerStart = () => {
    if (!this.state.isStarted) {
      this.setState({ isStarted: true });
      this.counter = setInterval(this.timer, 1000);
    }
  };

  //Timerを停止させる
  timerStop = () => {
    if (this.state.isStarted) {
      clearInterval(this.counter);
      this.setState({ isStarted: false });
    }
  };

  //再生と停止とでアイコンを分けて返す
  handleIcon = (): string => {
    if (this.state.isStarted) {
      return "pause";
    } else {
      return "caret-right";
    }
  };

  //componentがDOMから削除される時タイマーも削除する
  componentWillUnmount() {
    clearInterval(this.counter);
  }

  //描画していく
  //JSXではJSの中にHTMLを書ける
  render() {
    return (
      <div className={css(styles.container)}>
        <Layout>
          <Content>
            {/* フォーマットした時間を表示する部分 */}
            <h1 className={css(styles.timerArea)}>
              {this.formatTime(this.state.seconds)}秒
            </h1>
            <div className={css(styles.controlerArea)}>
              {/* リセットボタン */}
              <Button onClick={this.handleResetButton} icon="redo" size="large">
                Reset
              </Button>
              {/* 測定開始/停止ボタン */}
              <Button
                onClick={this.handleTimerButton}
                icon={this.handleIcon()}
                size="large"
              >
                {!this.state.isStarted ? "Start" : "Stop"}
              </Button>
              {/* ラップタイム追加ボタン */}
              <Button onClick={this.handleLapButton} icon="plus" size="large">
                Lap
              </Button>
            </div>
          </Content>
          {/* 配列に格納したラップタイムをリスト状に表示 */}
          <Content className={css(styles.lapListArea)}>
            <List
              header={<div>Laps</div>}
              bordered
              dataSource={this.state.laps}
              renderItem={item => (
                <List.Item>
                  {/* ラップタイム追加ボタンを押した段階での秒数 */}
                  Lap{this.state.laps.indexOf(item) + 1} :
                  {this.formatTime(item)}
                  {`+${this.formatTime(this.state.seconds - item)}秒`}
                </List.Item>
              )}
            />
          </Content>
          <Footer>
            {/* ラップタイムダウンロードボタン */}
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
