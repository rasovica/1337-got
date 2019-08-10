import App, {Container} from 'next/app'
import React from 'react'
import {DataProvider} from "../utils/dataProvider";
import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        background-color: #000;
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
        return <Container>
            <DataProvider>
                <Component {...pageProps} />
            </DataProvider>
            <GlobalStyle/>
        </Container>
    }
}
