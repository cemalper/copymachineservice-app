const pathGenerator = (name, path) => ({ name, path });

export default [
  pathGenerator('customer', '/customer'),
  pathGenerator('device', '/device'),
  pathGenerator('cpp', '/agreement/cpp'),
  pathGenerator('service:', '/agreement/service'),
  pathGenerator('paid', 'agreement/paid')
];
