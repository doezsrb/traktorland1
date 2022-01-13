import Header from "../../components/Header/header";
import Footer from "../../components/Footer/footer";
import Head from "next/head";
import Wrapper from "../../components/UI/Wrapper/wrapper";
import Cart from "../../components/Cart/cart";
import useCart from "../../util/useCart";

const generalLayout = (props) => {
  const { isCartOpened, toggleCart } = useCart();
  return (
    <>
      <Head>
        <title>TraktorLand</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        ></link>
        {/* <link href="hamburger.css" rel="stylesheet"></link> */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Header />
      <Wrapper click={toggleCart} isOpened={isCartOpened} />
      <Cart />
      {props.children}
      <Footer />
    </>
  );
};

export default generalLayout;
