import { useUser } from '../context/usercontext';

const Home = () => {
  const { user, setUser, users, setUsers } = useUser();
  console.log(user);
  return <div>Home</div>;
};

export default Home;
