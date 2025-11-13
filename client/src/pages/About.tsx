import React from 'react';
import { useUser } from '../context/usercontext';

const About = () => {
  const { user, users, setUser, setUsers } = useUser();
  setUser({ name: 'Mike' });

  return <div>About</div>;
};

export default About;
