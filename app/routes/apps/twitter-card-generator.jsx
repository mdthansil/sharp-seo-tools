import { Form } from "@remix-run/react";
import { Fragment, useEffect, useState } from "react";
import { RiFileCopyLine } from "react-icons/ri";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";

export const meta = () => {
  return {
    title: "Twitter Card Generator - Sharp Seo Tools",
    description:
      "Twitter Card Generator is an online tools that let you generate Twitter Card meta tags for your website more easily",
    keywords:
      "seo, meta, meta tags, twitter card, open graph, ranking, social share, keywords",
  };
};

const initialValues = {
  cardType: "app",
  siteUsername: "",
  creatorUsername: "",
  siteTitle: "",
  siteDescription: "",
  imageUrl: "",
  imageAlt: "",
  appCountry: "",
  iPhoneAppId: "",
  iPadAppId: "",
  googlePlayAppId: "",
};

export default function TwitterCardGenerator() {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCopy = () => {
    let textToCopy = `
    <meta property="twitter:card" content="${values.cardType}">
    <meta property="twitter:site" content="${values.siteUsername}">
    <meta property="twitter:creator" content="${values.creatorUsername}">
    <meta property="twitter:title" content="${values.siteTitle}">
    <meta property="twitter:description" content="${values.siteDescription}" >
    <meta property="twitter:image" content="${values.imageUrl}">
    <meta property="twitter:image:alt" content="${values.imageAlt}">
    <meta property="twitter:app:country" content="${values.appCountry}">
    <meta property="twitter:app:id:iphone" content="${values.iPhoneAppId}">
    <meta property="twitter:app:id:ipad" content="${values.iPadAppId}">
    <meta property="twitter:app:id:googleplay" content="${values.googlePlayAppId}">
    `;

    if (copy(textToCopy)) {
      toast.success("Text Copied.");
    }
  };

  return (
    <>
      <div className="text-center px-4 mt-12 mb-8 flex flex-col items-center justify-center">
        <h2 className="font-bold text-2xl tracking-wide">
          Online Twitter Card Generator
        </h2>
        <p className="text-sm text-gray-500 tracking-wide mt-2 max-w-xl">
          Whether you want to generate Twitter Card meta tags you can simply use
          this tool to generate it.
        </p>
      </div>
      <section className="bg-white rounded-md p-4">
        <div className="mb-5 border-b border-gray-100 flex justify-between items-center pb-3">
          <h2 className="font-semibold text-xl">Enter Card Details</h2>
        </div>
        <Form method="post" autoComplete="off" onSubmit={() => false}>
          <div className="grid grid-cols-3 gap-5">
            <div>
              <label
                htmlFor="cardType"
                className="font-medium mb-3 block text-base">
                Type
              </label>
              <select
                id="cardType"
                name="cardType"
                onChange={handleChange}
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none after:w-10">
                <option selected="" value="app">
                  App
                </option>
                <option value="player">Player</option>
                <option value="product">Product</option>
                <option value="summary">Summary</option>
                <option value="summary_large_image">
                  Summary With Large Image
                </option>
              </select>
            </div>
            <div>
              <label
                htmlFor="siteUsername"
                className="font-medium mb-3 block text-base">
                Site Username
              </label>
              <input
                id="siteUsername"
                name="siteUsername"
                placeholder="eg: @Username"
                onChange={handleChange}
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"></input>
            </div>
            <div>
              <label
                htmlFor="creatorUsername"
                className="font-medium mb-3 block text-base">
                Creator Username
              </label>
              <input
                id="creatorUsername"
                name="creatorUsername"
                placeholder="eg: @Thansil"
                onChange={handleChange}
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"></input>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 mt-4">
            <div>
              <div>
                <label
                  htmlFor="siteTitle"
                  className="font-medium mb-3 block text-base">
                  Title
                </label>
                <input
                  id="siteTitle"
                  name="siteTitle"
                  placeholder="eg: My ABC Shop"
                  onChange={handleChange}
                  className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"></input>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="siteDescription"
                  className="font-medium mb-3 block text-base">
                  Description
                </label>
                <textarea
                  id="siteDescription"
                  name="siteDescription"
                  placeholder="Website Description (Up to 200 characters)"
                  onChange={handleChange}
                  className="w-full flex-grow self-stretch border border-gray-200 p-2 rounded-md resize-none text-base outline-none"
                  maxLength={200}
                  rows={4}></textarea>
              </div>
            </div>
            <div>
              <div>
                <label
                  htmlFor="imageUrl"
                  className="font-medium mb-3 block text-base">
                  Image
                </label>
                <input
                  id="imageUrl"
                  name="imageUrl"
                  placeholder="Image URL"
                  onChange={handleChange}
                  className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"></input>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="imageAlt"
                  className="font-medium mb-3 block text-base">
                  Image Alt
                </label>
                <textarea
                  id="imageAlt"
                  name="imageAlt"
                  placeholder="Image Alt Text (Up to 420 characters)"
                  onChange={handleChange}
                  className="w-full flex-grow self-stretch border border-gray-200 p-2 rounded-md resize-none text-base outline-none"
                  maxLength={420}
                  rows={4}></textarea>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div>
              <label
                htmlFor="appCountry"
                className="font-medium mb-3 block text-base">
                App Country (if not available in US store)
              </label>
              <input
                id="appCountry"
                name="appCountry"
                placeholder="App Country"
                onChange={handleChange}
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"></input>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5 mt-4">
            <div>
              <label
                htmlFor="iPhoneAppId"
                className="font-medium mb-3 block text-base">
                iPhone App ID
              </label>
              <input
                id="iPhoneAppId"
                name="iPhoneAppId"
                placeholder="eg : 307234931"
                onChange={handleChange}
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"></input>
            </div>
            <div>
              <label
                htmlFor="iPadAppId"
                className="font-medium mb-3 block text-base">
                iPad App ID
              </label>
              <input
                id="iPadAppId"
                name="iPadAppId"
                placeholder="eg: 307234931"
                onChange={handleChange}
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"></input>
            </div>
            <div>
              <label
                htmlFor="googlePlayAppId"
                className="font-medium mb-3 block text-base">
                Google Play App ID
              </label>
              <input
                id="googlePlayAppId"
                name="googlePlayAppId"
                placeholder="eg: com.android.app"
                onChange={handleChange}
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"></input>
            </div>
          </div>
        </Form>
      </section>
      <section className="bg-white rounded-md p-4 mt-5">
        <div className="mb-3 border-b border-gray-100 flex justify-between items-center pb-3">
          <h2 className="font-semibold text-xl">Results</h2>
          <button
            className="border border-primary/80 text-primary/80 hover:bg-gray-100 flex space-x-1 items-center rounded-md py-1 px-2 uppercase text-sm font-medium tracking-wide"
            onClick={handleCopy}>
            <RiFileCopyLine /> <span>Copy</span>
          </button>
        </div>

        <div className="text-base text-gray-500 font-mono">
          &lt;meta property="twitter:card" content="{values.cardType}"&gt;
          <br />
          &lt;meta property="twitter:site" content="{values.siteUsername}"&gt;
          <br />
          &lt;meta property="twitter:creator" content="{values.creatorUsername}
          "&gt;
          <br />
          &lt;meta property="twitter:title" content="{values.siteTitle}"&gt;
          <br />
          &lt;meta property="twitter:description" content="
          {values.siteDescription}" &gt;
          <br />
          &lt;meta property="twitter:image" content="{values.imageUrl}"&gt;
          <br />
          &lt;meta property="twitter:image:alt" content="{values.imageAlt}"&gt;
          <br />
          &lt;meta property="twitter:app:country" content="{values.appCountry}
          "&gt;
          <br />
          &lt;meta property="twitter:app:id:iphone" content="
          {values.iPhoneAppId}"&gt;
          <br />
          &lt;meta property="twitter:app:id:ipad" content="{values.iPadAppId}
          "&gt;
          <br />
          &lt;meta property="twitter:app:id:googleplay" content="
          {values.googlePlayAppId}"&gt;
        </div>
      </section>
      <section className="bg-white rounded-md p-4 mt-5">
        <h2 className="font-semibold mb-3 text-xl border-b border-gray-100 pb-3">
          About Twitter Card Generator
        </h2>
        <div className="text-base text-gray-500 font-light">
          <p>
            Twitter Card Generator is one of smartest free online tool from
            Sharp SEO Tools for generating Twitter Card Tags.
          </p>
          <p className="mt-1">
            This Twitter Card Generator tool let you to generate Twitter Card
            Meta tags for your website. The Meta tags are more important tags
            for today's website. you may seen that preview of hyper links when
            we share url's on twitter platform, those previews are generated
            from the Twitter Card meta tags.
          </p>
          <p className="mt-1">
            The Meta tags helps to boost your website presence and ranking in
            search engine and also these tags are the helping to reach your
            website to appropriate users.
          </p>
        </div>
      </section>
    </>
  );
}
