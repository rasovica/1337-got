import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import React from "react";

type MyDocumentProps = {
    styleTags: React.ReactChildren
}

export default class MyDocument extends Document<MyDocumentProps> {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        const sheet = new ServerStyleSheet();

        ctx.renderPage((App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        );

        const styleTags = sheet.getStyleElement();

        return { ...initialProps, styleTags };
    };

    render() {
        return (
            <html>
                <Head>
                    {this.props.styleTags}
                </Head>
            <body>
                <Main />
                <NextScript />
            </body>
            </html>
        );
    };
}
