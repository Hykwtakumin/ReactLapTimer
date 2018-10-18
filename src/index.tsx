import * as React from "react";
import { render } from "react-dom";
import { StyleSheet, css } from "aphrodite";
import LapTimer from "./components/LapTimer.tsx";
import { Layout, Button, Icon } from "antd";
import "antd/dist/antd.css";
const { Header, Content, Footer } = Layout;

const styles = StyleSheet.create({
  headerArea: {
    color: "	#ffffff"
  },
  contentArea: {
    fontFamily: "sans-serif",
    textAlign: "center"
  }
});

const App = () => (
  <div className={css(styles.contentArea)}>
    <Layout>
      <Header>
        <h1 className={css(styles.headerArea)}>React Lap Timer</h1>
      </Header>
      <Content>
        <h2>A lap timer implemented by react.</h2>
        <LapTimer defaultState={{ isStarted: false, seconds: 0 }} />
      </Content>
      <Footer>
        <a href="https://github.com/Hykwtakumin/ReactLapTimer">view source</a>
      </Footer>
    </Layout>
  </div>
);

render(<App />, document.getElementById("root"));
