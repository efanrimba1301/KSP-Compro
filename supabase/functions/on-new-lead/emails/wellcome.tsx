import { Html, Body, Heading, Text } from "npm:@react-email/components@0.0.22";
import React from "npm:react@18.3.1";

type WellcomeProps = { name: string };

export default function Wellcome({ name }: WellcomeProps) {
    return (
        <Html>
            <head>
                <meta content="width=device-width" name="viewport" />
                <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
                <meta name="x-apple-disable-message-reformatting" />
                <meta content="IE=edge" http-equiv="X-UA-Compatible" />
                <meta name="x-apple-disable-message-reformatting" />
                <meta content="telephone=no,address=no,email=no,date=no,url=no" name="format-detection" />
                <style>
                    @media (prefers-color-scheme: dark){li::marker{color:#c4c4c4}}
                </style>
            </head>
            <body dir="ltr" lang="en">
                <!--$--><!--html--><!--head--><!--body-->
                <table border="0" width="100%" cellpadding="0" cellspacing="0" role="presentation" align="center">
                    <tbody>
                        <tr>
                            <td
                                dir="ltr"
                                lang="en"
                                style="font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:1em;min-height:100%;line-height:155%;color:#ffffff"
                            >
                                <table
                                    align="center"
                                    width="100%"
                                    border="0"
                                    cellpadding="0"
                                    cellspacing="0"
                                    role="presentation"
                                    style="max-width:800px;align:center;width:100%;border-radius:14px;background-color:#000000;color:#ffffff;border-width:12px;line-height:155%;border-style:solid"
                                >
                                    <tbody>
                                        <tr style="width:100%">
                                            <td style="padding-top:24px;padding-right:24px;padding-bottom:24px;padding-left:24px">
                                                <h1
                                                    style="margin:0;padding:0;font-size:2.25em;line-height:1.44em;padding-top:0.389em;font-weight:600"
                                                >
                                                    <strong>Thanks for reaching out</strong>
                                                </h1>
                                                <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                                    Hi
                                                    <!-- -->{{{name}}}<!-- -->,
                                                </p>
                                                <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                                    We&#x27;ve received your message through our contact form, and we appreciate you taking the time
                                                    to get in touch. The Kebetulan Serius team is reviewing your details now.
                                                </p>
                                                <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                                    <strong>Company : </strong><strong>{{{company}}}</strong>
                                                </p>
                                                <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                                    <strong>Services : </strong><strong>{{{services_required}}}</strong>
                                                </p>
                                                <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                                    <strong>Budget ranges : </strong><strong>{{{budget_range}}}</strong>
                                                </p>
                                                <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                                    <strong>Project detail : </strong><strong>{{{project_detail}}}</strong>
                                                </p>
                                                <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                                    One of our team members will contact you within 24 hours to discuss your needs and next steps. If
                                                    you have anything to add in the meantime, simply reply to this email.
                                                </p>
                                                <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                                    Talk soon,<br />The Kebetulan Serius Team
                                                </p>
                                                <table
                                                    align="center"
                                                    width="100%"
                                                    border="0"
                                                    cellpadding="0"
                                                    cellspacing="0"
                                                    role="presentation"
                                                    class="node-footer"
                                                    style="font-size:0.8em"
                                                >
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                                                                    Kebetulan Serius •
                                                                    <!-- -->kebetulanserius@gmail.com<br />©<!-- -->
                                                                    2026 Kebetulan Serius. All rights reserved.
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!--/$-->
            </body>
        </Html>
    );
}