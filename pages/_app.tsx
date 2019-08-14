import App, {Container} from 'next/app';
import React from 'react';
import {createGlobalStyle} from "styled-components";

import {DataProvider} from "../utils/dataProvider";
import {NavigationComponent} from "../components/navigationComponents";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Raleway:300&display=optional');
    
    :root {
      --green: #4fe4c1;
      --red: #f97242;
      --blue: #4a90e4;
      --shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }
    html {
      overflow: hidden;
    }
    
    body {
        margin: 0;
    
        background-color: var(--blue);

        font-family: 'Raleway', sans-serif;
        font-weight: 300;
    }
`;

export default class MyApp extends App {
    static async getInitialProps ({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return {pageProps}
    }

    render () {
        const {Component, pageProps} = this.props;
        return (
            <Container>
                <NavigationComponent/>
                <DataProvider>
                    <Component {...pageProps} />
                </DataProvider>
                <GlobalStyle/>
            </Container>
        )
    }
}
