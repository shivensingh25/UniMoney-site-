import type { NextPage } from 'next';
import Hero from '../components/Hero';
import SocialProof from '../components/SocialProof';
import Founders from '../components/Founders';
import Problems from '../components/Problems';
import CustomerInsights from '../components/CustomerInsights';

const Home: NextPage = () => {
  return (
    <main>
      <Hero />
      <Problems />
      <CustomerInsights />
      <Founders />
      <SocialProof />
    </main>
  );
};

export default Home;
