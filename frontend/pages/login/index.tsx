import Head from "next/head";

import { wrapper } from "../../src/store";
import { initializeUser } from "../../serverSideProps";
import { Form } from "antd";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Log In</title>
      </Head>
      <Form></Form>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
  await initializeUser(ctx);
  return null;
});

export default LoginPage;
