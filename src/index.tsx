import * as React from "react";
import { render } from "react-dom";
import { StyleSheet, css } from "aphrodite";
import Hello from "./Hello";
import LapTimer from "./LapTimer.tsx";
import { Layout, Button, Icon } from "antd";
import "antd/dist/antd.css";
const { Header, Content, Footer } = Layout;

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>
    <Layout>
      <Header>This is Header</Header>
      <Content>
        <Hello name="CodeSandbox" />
        <h2>Start editing to see some magic happen {"\u2728"}</h2>
        <Content>
          <h1>React Lap Timer</h1>
          <LapTimer defaultState={{ isStarted: false, seconds: 0 }} />
        </Content>
      </Content>
      <Footer>This is Footer</Footer>
    </Layout>
  </div>
);

render(<App />, document.getElementById("root"));
