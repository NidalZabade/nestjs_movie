const roles = {
  1: 'admin',
  2: 'user',
  3: 'guest',
};

const getRole = (roleId: number) => {
  return roles[roleId];
};

export default getRole;
