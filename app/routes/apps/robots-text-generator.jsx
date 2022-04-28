import { Form, useActionData, useTransition } from "@remix-run/react";
import { Fragment, useEffect, useState } from "react";
import {
  RiAddCircleFill,
  RiFileCopyLine,
  RiIndeterminateCircleFill,
} from "react-icons/ri";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";

export const meta = () => {
  return {
    title: "Open Graph Generator - Sharp Seo Tools",
    description:
      "Open Graph Generator is an online tools that let you generate Open graph meta tags for your website more easily",
    keywords:
      "seo, meta, meta tags, open graph, ranking, social share, keywords",
  };
};

const initialValues = {
  default: "Allow: /",
  crawlDelay: "",
  sitemap: "",
  google: "",
  googleImage: "",
  googleMobile: "",
  msnSearch: "",
  yahoo: "",
  yahooMm: "",
  yahooBlogs: "",
  ask: "",
  gigaBlast: "",
  dmozChecker: "",
  nutch: "",
  alexa: "",
  baidu: "",
  naver: "",
  msnPicSearch: "",
};

export const action = async ({ request }) => {
  const form = await request.formData();
  const data = Object.fromEntries(form);

  const directories = form.getAll("directory");
  delete data.directory;
  data.directories = directories;
  return data;
};

export default function RobotsTextGenerator() {
  const actionData = useActionData();
  const transition = useTransition();
  console.log(actionData);

  const [restrictedDir, setRestrictedDir] = useState(["/cgi-bin/"]);

  const addRestrictedDir = (e) => {
    setRestrictedDir([...restrictedDir, ""]);
  };

  const removeRestrictedDir = (e, index) => {
    console.log(index);
    const prevDirs = [...restrictedDir];
    prevDirs.splice(index, 1);
    setRestrictedDir(prevDirs);
  };

  const handleRestrictedDir = (e, index) => {
    const _newElements = [...restrictedDir];
    _newElements[index] = e.target.value;
    setRestrictedDir(_newElements);
  };

  const handleCopy = () => {
    // let textToCopy = `
    // <meta property="og:title" content="${values.siteTitle}">
    // <meta property="og:site_name" content="${values.siteName}">
    // <meta property="og:url" content="${values.siteUrl}">
    // <meta property="og:description" content="${values.siteDescription}" >
    // <meta property="og:type" content="${values.type}">
    // `;
    // let images = values.images.map(
    //   (image) => `    <meta property="og:image" content="${image}">`
    // );
    // textToCopy += images.join("\n");
    // if (copy(textToCopy)) {
    //   toast.success("Text Copied.");
    // }
  };
  useEffect(() => {
    console.log(restrictedDir);
  }, [restrictedDir]);

  return (
    <>
      <div className="text-center px-4 mt-12 mb-8 flex flex-col items-center justify-center">
        <h2 className="font-bold text-2xl tracking-wide">
          Online Open Graph Generator
        </h2>
        <p className="text-sm text-gray-500 tracking-wide mt-2 max-w-xl">
          Whether you want to generate Open Graph meta tags you can simply use
          this tool to generate it.
        </p>
      </div>
      <section className="bg-white rounded-md p-8">
        <div className="mb-5 border-b border-gray-100 flex justify-between items-center pb-3">
          <h2 className="font-semibold text-xl">Enter Meta Details</h2>
        </div>
        <Form method="post" autoComplete="off">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="defaultValue"
                className="font-medium mb-3 block text-base">
                defaultValue - All Robots are
              </label>
              <select
                id="defaultValue"
                name="defaultValue"
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none">
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="crawlDelay"
                className="font-medium mb-3 block text-base">
                Crawl Delay
              </label>
              <select
                id="crawlDelay"
                name="crawlDelay"
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none">
                <option value="">Default - No Delay</option>
                <option value="5">5 Seconds </option>
                <option value="10">10 Seconds </option>
                <option value="20">20 Seconds </option>
                <option value="60">60 Seconds </option>
                <option value="120">120 Seconds </option>
              </select>
            </div>
            <div className="col-span-2">
              <label
                htmlFor="sitemap"
                className="font-medium mb-3 block text-base">
                Sitemap (Leave blank if you don't have)
              </label>
              <input
                id="sitemap"
                name="sitemap"
                placeholder="Sitemap URL eg: https://example.com/sitemap.xml"
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"></input>
            </div>
          </div>

          <div className="mt-5 text-gray-700">
            <h3>Search Robots</h3>
          </div>

          <div className="grid grid-cols-3 gap-5 mt-4">
            <div>
              <label
                htmlFor="google"
                className="font-medium mb-3 block text-base">
                Google
              </label>
              <select
                id="google"
                name="google"
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="googleImage"
                className="font-medium mb-3 block text-base">
                Google Image
              </label>
              <select
                id="googleImage"
                name="googleImage"
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="googleMobile"
                className="font-medium mb-3 block text-base">
                Google Mobile
              </label>
              <select
                id="googleMobile"
                name="googleMobile"
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="msnSearch"
                className="font-medium mb-3 block text-base">
                MSN Search
              </label>
              <select
                id="msnSearch"
                name="msnSearch"
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="yahoo"
                className="font-medium mb-3 block text-base">
                Yahoo
              </label>
              <select
                id="yahoo"
                name="yahoo"
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="yahooMm"
                className="font-medium mb-3 block text-base">
                Yahoo MM
              </label>
              <select
                id="yahooMm"
                name="yahooMm"
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="yahooBlogs"
                className="font-medium mb-3 block text-base">
                Yahoo Blogs
              </label>
              <select
                id="yahooBlogs"
                name="yahooBlogs"
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label htmlFor="ask" className="font-medium mb-3 block text-base">
                Ask/Teoma
              </label>
              <select
                id="ask"
                name="ask"
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="gigaBlast"
                className="font-medium mb-3 block text-base">
                GigaBlast
              </label>
              <select
                id="gigaBlast"
                name="gigaBlast"
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="dmozChecker"
                className="font-medium mb-3 block text-base">
                DMOZ Checker
              </label>
              <select
                id="dmozChecker"
                name="dmozChecker"
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="nutch"
                className="font-medium mb-3 block text-base">
                Nutch
              </label>
              <select
                id="nutch"
                name="nutch"
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="alexa"
                className="font-medium mb-3 block text-base">
                Alexa/Wayback
              </label>
              <select
                id="alexa"
                name="alexa"
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="baidu"
                className="font-medium mb-3 block text-base">
                Baidu
              </label>
              <select
                id="baidu"
                name="baidu"
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="naver"
                className="font-medium mb-3 block text-base">
                Naver
              </label>
              <select
                id="naver"
                name="naver"
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="msnPicSearch"
                className="font-medium mb-3 block text-base">
                MSN Pic Search
              </label>
              <select
                id="msnPicSearch"
                name="msnPicSearch"
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
          </div>

          <div className="mt-6 text-gray-700 flex items-center justify-between">
            <h3>Restricted Directories</h3>
            <p className="text-xs italic">
              The path is relative to root and must contain a trailing slash "/"
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {restrictedDir.map((dir, index) => {
              return (
                <div className="mt-2 flex items-center space-x-2" key={index}>
                  <input
                    id="directory"
                    name="directory"
                    placeholder="Directory Path"
                    value={dir}
                    onChange={(e) => handleRestrictedDir(e, index)}
                    className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"></input>
                  {restrictedDir.length > 1 &&
                  index != restrictedDir.length - 1 ? (
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={(e) => removeRestrictedDir(e, index)}>
                      <RiIndeterminateCircleFill fontSize={24} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="text-green-500"
                      onClick={addRestrictedDir}>
                      <RiAddCircleFill fontSize={24} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-center space-x-3 mt-7">
            <button
              type="submit"
              className="bg-primary text-white px-5 py-2 block rounded-md hover:bg-opacity-90">
              Generate Robots.txt
            </button>
          </div>
        </Form>
      </section>
      {/* {transition.state == "submitting" ? "loading" : ""} */}

      {actionData && (
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
            {/* &lt;meta property="og:title" content="{values.siteTitle}"&gt;
          <br />
          &lt;meta property="og:site_name" content="{values.siteName}"&gt;
          <br />
          &lt;meta property="og:url" content="{values.siteUrl}"&gt;
          <br />
          &lt;meta property="og:description" content="{values.siteDescription}"
          &gt;
          <br />
          &lt;meta property="og:type" content="{values.type}"&gt;
          <br /> */}
            {/* {values.images.map((image, index) => {
            return (
              <Fragment key={index + Date.now()}>
                &lt;meta property="og:image" content="{image}"&gt;
                <br />
              </Fragment>
            );
          })} */}
          </div>
        </section>
      )}
      <section className="bg-white rounded-md p-4 mt-5">
        <h2 className="font-semibold mb-3 text-xl border-b border-gray-100 pb-3">
          About Open Graph Generator
        </h2>
        <div className="text-base text-gray-500 font-light">
          <p>
            Open Graph generator is one of smartest free online tool from Sharp
            SEO Tools for generating Open Graph Tags.
          </p>
          <p className="mt-1">
            This Open Graph generator tool let you to generate Open Graph Meta
            tags for your website. The Meta tags are more important tags for
            today's website. you may seen that preview of hyper links when we
            share some url's on social media platforms, those previews are
            generated from the Open Graph meta tags.
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
