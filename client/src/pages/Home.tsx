import { useUser } from '../contexts/userContext';

const Home = () => {
  const { user } = useUser();

  console.log(user);

  return <div>Home</div>;
};

export default Home;
