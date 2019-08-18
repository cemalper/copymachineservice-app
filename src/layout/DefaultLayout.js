import React, { useState, useContext } from 'react';
import { Layout, Avatar, Icon, Menu, Dropdown } from 'antd';
import { AuthentationContext } from '../provider/AuthentationProvider';
import SiderMenu from './DefaultMenu';
import './DefaultLayout.scss';
import { useApolloClient } from 'react-apollo-hooks';

const { Header, Sider, Content } = Layout;

const DefaultLayout = props => {
  const [collapsed] = useState(false);
  const userInfo = useContext(AuthentationContext);
  const client = useApolloClient();
  const logout = () => {
    userInfo.logout();
    client.resetStore();
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/*<Sider trigger={null} collapsible collapsed={collapsed}>*/}
      <Sider>
        <div className="logo">{collapsed ? 'FTS' : 'HERMAK'}</div>
        <SiderMenu />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          {/*<Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          />*/}
          <div style={{ float: 'right', marginRight: 10 }}>
            <Dropdown overlay={<UserMenu logout={logout} />}>
              <Avatar>{userInfo.user.userName}</Avatar>
            </Dropdown>
          </div>
        </Header>

        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>{props.children}</Content>
      </Layout>
    </Layout>
  );
};

const UserMenu = ({ logout }) => (
  <Menu>
    <Menu.Item onClick={logout}>
      <span>
        <Icon type="logout" style={{ marginRight: '10px' }} />
        <span>Çıkış</span>
      </span>
    </Menu.Item>
  </Menu>
);

export default DefaultLayout;
