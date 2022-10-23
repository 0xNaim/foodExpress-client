import Head from 'next/head';
import CartView from '../../components/cart/CartView';
import Layout from '../../components/layout';

const Cart = () => {
  return (
    <>
      <Head>
        <title>Cart || FoodExpress</title>
      </Head>

      <Layout>
        <CartView />
      </Layout>
    </>
  );
};

export default Cart;
