import { Form } from "@remix-run/react";
import { Fragment, useEffect, useState } from "react";
import { RiFileCopyLine } from "react-icons/ri";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";

export const meta = () => {
  return {
    title: "Meta Tags Generator - Sharp Seo Tools",
    description:
      "Meta Tags Generator is an online tools that let you generate meta tags for your website more easily",
    keywords:
      "seo, meta, meta tags, open graph, ranking, social share, keywords, sharp seo tools",
  };
};

const initialValues = {
  siteTitle: "",
  siteDescription: "",
  siteKeywords: "",
  allowIndex: "index",
  allowFollow: "follow",
  charset: "utf-8",
  siteLanguage: "English",
  enableViewport: false,
  enableOptionalTags: false,
  searchEngineRevisit: "1 day",
  siteAuthor: "",
};

export default function OpenGraphGenerator() {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.checked });
  };

  const handleCopy = () => {
    let textToCopy = `
    <meta http-equiv="Content-Type" content="text/html; charset=${
      values.charset
    }">
    ${
      values.enableViewport
        ? '<meta name="viewport" content="width=device-width,initial-scale=1">'
        : ""
    }
    <meta name="title" content="${values.siteTitle}">
    <meta name="description" content="${values.siteDescription}">
    <meta name="keywords" content="${values.siteKeywords}">
    <meta name="robots" content="${values.allowIndex}, ${values.allowFollow}">
    <meta name="language" content="${values.siteLanguage}">`;

    if (values.enableOptionalTags) {
      textToCopy += `
      <meta name="revisit-after" content="${values.searchEngineRevisit}">
      <meta name="author" content="${values.siteAuthor}">`;
    }

    if (copy(textToCopy)) {
      toast.success("Text Copied.");
    }
  };

  useEffect(() => {
    console.log(values);
  }, [values]);

  return (
    <>
      <div className="text-center px-4 mt-12 mb-8 flex flex-col items-center justify-center">
        <h2 className="font-bold text-2xl tracking-wide">
          Online Meta Tags Generator
        </h2>
        <p className="text-sm text-gray-500 tracking-wide mt-2 max-w-xl">
          Whether you want to generate Open Graph meta tags you can simply use
          this tool to generate it.
        </p>
      </div>
      <section className="bg-white rounded-md p-4">
        <div className="mb-5 border-b border-gray-100 flex justify-between items-center pb-3">
          <h2 className="font-semibold text-xl">Enter Website Details</h2>
        </div>
        <Form method="post" autoComplete="off" onSubmit={() => false}>
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-2">
              <div>
                <label
                  htmlFor="siteTitle"
                  className="font-medium mb-3 block text-base">
                  Site Title
                </label>
                <input
                  id="siteTitle"
                  name="siteTitle"
                  maxLength={60}
                  placeholder="Website Title (Up to 60 characters)"
                  onChange={handleChange}
                  className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"></input>
              </div>
            </div>
            <div>
              <label
                htmlFor="siteDescription"
                className="font-medium mb-3 block text-base">
                Site Description
              </label>
              <textarea
                id="siteDescription"
                name="siteDescription"
                placeholder="Website Description (Up to 150 characters)"
                onChange={handleChange}
                className="w-full flex-grow self-stretch border border-gray-200 p-2 rounded-md resize-none text-base outline-none"
                maxLength={150}
                rows={3}></textarea>
            </div>

            <div>
              <label
                htmlFor="siteKeywords"
                className="font-medium mb-3 block text-base">
                Keywords (Separate with commas)
              </label>
              <textarea
                id="siteKeywords"
                name="siteKeywords"
                placeholder="eg: keyword1, keyword2, keyword3"
                onChange={handleChange}
                className="w-full flex-grow self-stretch border border-gray-200 p-2 rounded-md resize-none text-base outline-none"
                maxLength={200}
                rows={3}></textarea>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="mt-4">
              <label
                htmlFor="allowIndex"
                className="font-medium mb-3 block text-base">
                Allow robots to index your website?
              </label>
              <select
                id="allowIndex"
                name="allowIndex"
                onChange={handleChange}
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none after:w-10">
                <option value="index">Yes</option>
                <option value="noindex">No</option>
              </select>
            </div>
            <div className="mt-4">
              <label
                htmlFor="allowFollow"
                className="font-medium mb-3 block text-base">
                Allow robots to follow all links?
              </label>
              <select
                id="allowFollow"
                name="allowFollow"
                onChange={handleChange}
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none after:w-10">
                <option value="follow">Yes</option>
                <option value="nofollow">No</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="charset"
                className="font-medium mb-3 block text-base">
                Charset
              </label>
              <select
                id="charset"
                name="charset"
                onChange={handleChange}
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none after:w-10">
                <option value="utf-8">UTF-8</option>
                <option value="utf-16">UTF-16</option>
                <option value="iso-8859-1">ISO-8859-1</option>
                <option value="windows-1252">WINDOWS-1252</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="siteLanguage"
                className="font-medium mb-3 block text-base">
                What is your site primary language?
              </label>
              <select
                id="siteLanguage"
                name="siteLanguage"
                onChange={handleChange}
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none after:w-10">
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Spanish">Spanish</option>
                <option value="Russian">Russian</option>
                <option value="Arabic">Arabic</option>
                <option value="Japanese">Japanese</option>
                <option value="Korean">Korean</option>
                <option value="Hindi">Hindi</option>
                <option value="Portuguese">Portuguese</option>
                <option value="N/A">No Language Tag</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4 mt-6  border-gray-100 pt-3  bg-gray-50 px-4 border rounded-md">
            <label className="font-medium mb-3  text-base flex items-center space-x-2">
              <input
                type="checkbox"
                name="enableViewport"
                onChange={handleCheckboxChange}
              />
              <span>Enable Viewport</span>
            </label>
            <label className="font-medium mb-3  text-base flex items-center space-x-2">
              <input
                type="checkbox"
                name="enableOptionalTags"
                onChange={handleCheckboxChange}
              />
              <span>Optional Meta Tags</span>
            </label>
          </div>

          {values.enableOptionalTags && (
            <div className="grid grid-cols-2 gap-5 mt-4">
              <div>
                <label
                  htmlFor="searchEngineRevisit"
                  className="font-medium mb-3 block text-base">
                  Search engines should revisit this page after
                </label>
                <select
                  id="searchEngineRevisit"
                  name="searchEngineRevisit"
                  onChange={handleChange}
                  className="w-full border border-gray-200 p-2 rounded-md text-base outline-none after:w-10">
                  <option value="1 day">1 day</option>
                  <option value="2 days">2 days</option>
                  <option value="3 days">3 days</option>
                  <option value="4 days">4 days</option>
                  <option value="5 days">5 days</option>
                  <option value="6 days">6 days</option>
                  <option value="7 days">7 days</option>
                  <option value="8 days">8 days</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="siteAuthor"
                  className="font-medium mb-3 block text-base">
                  Author
                </label>
                <input
                  id="siteAuthor"
                  name="siteAuthor"
                  maxLength={60}
                  placeholder="Website Author"
                  onChange={handleChange}
                  className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"></input>
              </div>
            </div>
          )}
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
          &lt;meta http-equiv="Content-Type" content="text/html; charset=
          {values.charset}"&gt;
          <br />
          {values.enableViewport && (
            <>
              &lt;meta name="viewport"
              content="width=device-width,initial-scale=1"&gt; <br />
            </>
          )}
          &lt;meta name="title" content="{values.siteTitle}"&gt;
          <br />
          &lt;meta name="description" content="{values.siteDescription}"&gt;
          <br />
          &lt;meta name="keywords" content="{values.siteKeywords}"&gt;
          <br />
          &lt;meta name="robots" content="
          {`${values.allowIndex}, ${values.allowFollow}`}"&gt;
          <br />
          &lt;meta name="language" content="{values.siteLanguage}"&gt;
          <br />
          {values.enableOptionalTags && (
            <>
              &lt;meta name="revisit-after" content="
              {values.searchEngineRevisit}
              "&gt;
              <br />
              &lt;meta name="author" content="{values.siteAuthor}"&gt;
              <br />
            </>
          )}
        </div>
      </section>
      <section className="bg-white rounded-md p-4 mt-5">
        <h2 className="font-semibold mb-3 text-xl border-b border-gray-100 pb-3">
          About Meta Tags Generator
        </h2>
        <div className="text-base text-gray-500 font-light">
          <p>
            Meta Tags Generator is one of smartest free online tool from Sharp
            SEO Tools for generating Meta Tags.
          </p>
          <p className="mt-1">
            This Meta Tags Generator tool let you to generate Meta tags for your
            website. The Meta tags are more important tags for today's website.
            you may seen that the search results shown in search engines which
            is actually depends on these meta tags,
          </p>
          <p className="mt-1">
            The Meta tags helps to boost your website presence and ranking in
            search engines and also these tags are the helping to reach your
            website to appropriate users.
          </p>
        </div>
      </section>
    </>
  );
}
