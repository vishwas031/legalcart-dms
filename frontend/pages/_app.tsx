import "../styles/globals.css";
import { wrapper } from "../src/store";
import NProgress from "nprogress";
import Router from "next/router";
import { AppProps, AppContext, AppInitialProps } from "next/app";
import { useEffect, FC } from "react";
import { HIDE_ALERT } from "../src/store/types/alert.types";
import { HIDE_LOADER } from "../src/store/types/loader.types";
import { ConfigProvider, Layout, Image } from "antd";
import Link from "next/link";

const { Content, Header } = Layout;

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp: FC<AppProps> = (props: AppProps) => {
  const { Component, pageProps } = props;

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FA8C16",
        },
      }}
    >
      <Layout className="site-layout layout min-h-screen">
        <Header className="header-nav align-middle flex items-center bg-white sticky">
          <Link href={"/"}>
            <Image
              src={
                "https://lever-client-logos.s3.us-west-2.amazonaws.com/dcdefa1b-2c4c-4436-be2c-c513d29e0b99-1631728731630.png" // temporary
              }
              preview={false}
              className="logo-nav cursor-pointer"
            />
          </Link>
        </Header>
        <Content className="site-layout-background m-2 p-8 bg-white">
          <Component {...pageProps} />
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export async function getServerSideProps({
  Component,
  ctx,
}: AppContext): Promise<AppInitialProps> {
  ctx.store.dispatch({ type: HIDE_ALERT });
  ctx.store.dispatch({ type: HIDE_LOADER });
  return {
    pageProps: {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
    },
  };
}

export default wrapper.withRedux(MyApp);
