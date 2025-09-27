import type { NextPage } from 'next';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import SocialProof from '../components/SocialProof';
import Founders from '../components/Founders';
import Problems from '../components/Problems';
import CustomerInsights from '../components/CustomerInsights';

const Home: NextPage = () => {
  return (
    <Layout>
      <Hero />
      <Problems />
      <CustomerInsights />
      <Founders />
      <SocialProof />
    </Layout>
  );
};

export default Home;
