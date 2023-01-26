import React, { useState, useEffect } from "react";
import { Layout, Menu, Avatar, Divider, Button } from "antd";
import { useMediaQuery } from "react-responsive";

import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Lobby from "./Page/Lobby";
import Wallet from "./Page/Wallet";
import Game from "./Game";
import GameSider from "./Game/Components/Sider";
import { UserOutlined } from "@ant-design/icons";
import * as Icons from "react-feather";
import walletIcon from "./Assets/Images/wallet.svg";
import { Switch, Route, useHistory, Link, useLocation } from "react-router-dom";
import variables from "./variables";
import "./App.sass";
import AuthService from "./Services/auth.service"

const { Sider, Content } = Layout;

const AppHelper = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({
    query: `(min-width: ${variables.breakpoints.desktop})`,
  });
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if( AuthService.getCurrentUser() == null ) {
      history.push('/landing')
    } else {
      history.push('/')
    }
  }, [history]);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Layout className={"main-layout"}>
        {isDesktopOrLaptop && (
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className={"p1 text-center space-between my-sider"}>
              <Icons.ArrowLeft
                color={"white"}
                className={"arrow-left"}
                onClick={history.goBack}
              />
              <Icons.Menu
                className={"menu-icon"}
                color={"white"}
                onClick={toggle}
              />
            </div>
            <div className={"text-center"}>
              <Avatar
                // src={'http://lorempixel.com/100/100/'}
                size={{ lg: 100, xl: 100, xxl: 100 }}
              />
              <div className={"pt1"}>
                <p className={"bold"}>Lukas John</p>
                <p>$23000</p>
                <Divider />
              </div>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to={"/"}>Lobby</Link>
              </Menu.Item>
              <Menu.Item
                key="2"
                icon={<img src={walletIcon} width={22} height={18} alt="" />}
              >
                <Link to={"/Wallet"}>My Wallet</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<Icons.Heart />}>
                <Link to={"/game"}>My Game</Link>
              </Menu.Item>
              <Button onClick={() => {AuthService.logout();  history.push('/landing');}}>Log Out</Button>
            </Menu>
            <div
              style={{
                position: "absolute",
                bottom: "5%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Link
                to={"/Help"}
                className={"p1 text-center space-between my-sider"}
              >
                <Icons.HelpCircle color={"white"} />
                <div style={{ paddingLeft: "16px" }} className={"arrow-left"}>
                  <p style={{ color: "white" }}>Help</p>
                </div>
              </Link>
            </div>
          </Sider>
        )}
        <Layout className="site-layout">
          <Header />
          <Content
            className="site-layout-background"
            style={{
              background: "#10101A",
            }}
          >
            <Switch>
              <Route path="/" exact>
                <Lobby />
              </Route>
              <Route path={"/temp"} exact>
                <h2>Temp</h2>
              </Route>
              <Route path="/Wallet" exact>
                <Wallet />
              </Route>
              <Route path="/Help" exact>
                <h2>Help</h2>
              </Route>
              <Route path="/Game" exact>
                <Game />
              </Route>
            </Switch>
          </Content>
          {!isDesktopOrLaptop && <Footer />}
        </Layout>
        {isDesktopOrLaptop && location.pathname === "/game" && (
          <GameSider desktop />
        )}
      </Layout>
    </>
  );
};

export default AppHelper;
