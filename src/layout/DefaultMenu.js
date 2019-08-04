import React from 'react';
import { Menu, Icon } from 'antd';
import useReactRouter from 'use-react-router';
import SubMenu from 'antd/lib/menu/SubMenu';

const DefaultMenu = props => {
  const { history } = useReactRouter();
  //const [defaultSelectedKeys, setDefaultSelectedKeys] = useState([]);
  //   useEffect(() => {
  //     let myPath = paths.map(path => path.path);
  //     var regexToPath = pathToRegexp(myPath, '', { end: false });
  //     var result = regexToPath.exec(location.pathname);
  //     if (result && result[0]) {
  //       debugger;
  //       setDefaultSelectedKeys(trim([result[0], '/']));
  //     }
  //   }, [location.pathname]);

  const onSelect = ({ keyPath }) => {
    var url = keyPath.reduce((prev, current) => `${current}/${prev}`);
    history.push('/' + url);
  };
  return (
    <Menu theme="dark" mode="inline" onClick={onSelect}>
      <Menu.Item key="customer">
        <Icon type="user" />
        <span>Müşteri</span>
      </Menu.Item>
      <Menu.Item key="device">
        <Icon type="printer" />
        <span>Cihaz</span>
      </Menu.Item>
      <SubMenu title="Antlaşmalar" key="agreement">
        <Menu.Item key="cpp">Kopya Başı</Menu.Item>
        <Menu.Item key="service">Servis</Menu.Item>
        <Menu.Item key="paid">Ücretli</Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default DefaultMenu;
