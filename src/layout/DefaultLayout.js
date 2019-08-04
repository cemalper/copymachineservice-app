import React, { useState } from 'react';
import { Layout } from 'antd';
import Menu from './DefaultMenu';
import './DefaultLayout.scss';

const { Header, Sider, Content } = Layout;

const DefaultLayout = props => {
  const [collapsed] = useState(false);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/*<Sider trigger={null} collapsible collapsed={collapsed}>*/}
      <Sider>
        <div className="logo">{collapsed ? 'FTS' : 'HERMAK'}</div>
        <Menu />
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
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>{props.children}</Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
