import React from 'react';
import { Menu, Icon } from 'antd';
import useReactRouter from 'use-react-router';
import SubMenu from 'antd/lib/menu/SubMenu';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1348479_x0etaw58abi.js'
});

const IconText = ({ text, icon }) => (
  <span>
    <Icon type={icon} />
    <span>{text}</span>
  </span>
);
const IconFontText = ({ text, icon }) => (
  <span>
    <IconFont type={icon} />
    <span>{text}</span>
  </span>
);

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
        <IconText icon="printer" text="Cihaz" />
      </Menu.Item>
      <Menu.Item key="devicecost">
        <IconText icon="dollar" text="Cihaz Masraf" />
      </Menu.Item>
      <Menu.Item key="counter">
        <IconFontText icon="iconcounter" text="Numaratör" />
      </Menu.Item>
      <SubMenu title={<IconFontText icon="iconagreement" text="Antlaşmalar" />} key="agreement">
        <SubMenu key="cpp" title={<IconFontText icon="iconagreement" text="KopyaBaşı" />}>
          <Menu.Item key="cppagreement">
            <IconFontText icon="iconagreement" text="Sözleşme" />
          </Menu.Item>
          <Menu.Item key="cppagreementdevice">
            <IconText icon="printer" text="Cihaz" />
          </Menu.Item>
          <Menu.Item key="cppagreementcost">
            <IconText icon="dollar" text="Masraf" />
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="service">
          <IconFontText icon="iconservice" text="Servis" />
        </Menu.Item>
        <Menu.Item key="paid">
          <IconFontText icon="iconpaid" text="Ücretli" />
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default DefaultMenu;
