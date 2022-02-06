import React from "react";
import Head from "next/head";

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="/chslogo.png" type="image/x-icon" />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: "Conant CS Tutoring",
  keywords:
    "Conant High School, Computer Science, Conant High School Computer Science, Tutoring, Computer Science Tutoring",
  description:
    "This the dashboard of the Conant High School Tutoring Helpdesk website where our tutors will answer your questions relating to your Computer Science Classes",
};

export default Meta;
