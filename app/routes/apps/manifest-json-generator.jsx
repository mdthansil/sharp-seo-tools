import { Form, useActionData, useTransition } from "@remix-run/react";
import React, { useState } from "react";
import { RiDownloadLine, RiFileCopyLine } from "react-icons/ri";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { saveAs } from "file-saver";

export const meta = () => {
  return {
    title: "Online Robots.txt Generator  - Sharp Seo Tools",
    description:
      "Robots.txt Generator is an online tools that let you generate Robots.txt for your website instantly",
    keywords: "seo, meta, meta tags, robots.txt, ranking, keywords",
  };
};

export const action = async ({ request }) => {
  const form = await request.formData();
  const data = Object.fromEntries(form);

  const directories = form.getAll("directory");
  delete data.directory;
  data.directories = directories;
  return data;
};

const initialValues = {
  appName: "",
  shortName: "",
  appDescription: "",
  displayMode: "standalone",
  orientation: "",
  applicationScope: "/",
  startUrl: "/",
  themeColor: "#ffff00",
  backgroundColor: "#ff0000",
};

export default function ManifestJsonGenerator() {
  const actionData = useActionData();
  const transition = useTransition();

  const [values, setValues] = useState(initialValues);

  // const handleResult = (action) => {
  //   let textData = "";

  //   textData += actionData?.google
  //     ? `User-agent:Googlebot\n${actionData?.google}\n`
  //     : "";
  //   textData += actionData?.googleImage
  //     ? `User-agent:googlebot-image\n${actionData?.googleImage}\n`
  //     : "";
  //   textData += actionData?.googleMobile
  //     ? `User-agent:googlebot-mobile\n${actionData?.googleMobile}\n`
  //     : "";
  //   textData += actionData?.msnSearch
  //     ? `User-agent:MSNBot\n${actionData?.msnSearch}\n`
  //     : "";
  //   textData += actionData?.yahoo
  //     ? `User-agent:Slurp\n${actionData?.yahoo}\n`
  //     : "";
  //   textData += actionData?.yahooMm
  //     ? `User-agent:yahoo-mmcrawler\n${actionData?.yahooMm}\n`
  //     : "";
  //   textData += actionData?.yahooBlogs
  //     ? `User-agent:yahoo-blogs/v3.9\n${actionData?.yahooBlogs}\n`
  //     : "";
  //   textData += actionData?.ask ? `User-agent:Teoma\n${actionData?.ask}\n` : "";
  //   textData += actionData?.gigaBlast
  //     ? `User-agent:Gigabot\n${actionData?.gigaBlast}\n`
  //     : "";
  //   textData += actionData?.dmozChecker
  //     ? `User-agent:Robozilla\n${actionData?.dmozChecker}\n`
  //     : "";
  //   textData += actionData?.nutch
  //     ? `User-agent:Nutch\n${actionData?.nutch}\n`
  //     : "";
  //   textData += actionData?.alexa
  //     ? `User-agent:ia_archiver\n${actionData?.alexa}\n`
  //     : "";
  //   textData += actionData?.baidu
  //     ? `User-agent:baiduspider\n${actionData?.baidu}\n`
  //     : "";
  //   textData += actionData?.naver
  //     ? `User-agent:naverbot\n${actionData?.naver}\n`
  //     : "";
  //   textData += actionData?.naver
  //     ? `User-agent:yeti\n${actionData?.naver}\n`
  //     : "";
  //   textData += actionData?.msnPicSearch
  //     ? `User-agent:psbot\n${actionData?.msnPicSearch}\n`
  //     : "";
  //   textData += actionData?.defaultValue
  //     ? `User-agent:*\n${actionData?.defaultValue}\n`
  //     : "";
  //   textData += actionData?.crawlDelay
  //     ? `Crawl-delay:\n${actionData?.crawlDelay}\n`
  //     : "";
  //   if (actionData?.directories?.length > 0) {
  //     actionData?.directories?.forEach((dir, index) => {
  //       textData += `Disallow:${dir}\n`;
  //     });
  //   }
  //   textData += actionData?.sitemap ? `Sitemap:${actionData?.sitemap}` : "";
  //   if (action === "copy") {
  //     if (copy(textData)) {
  //       toast.success("Text Copied.");
  //     }
  //   }
  //   if (action === "download") {
  //     saveAs(
  //       new Blob([textData], { type: "text/plain;charset=utf-8" }),
  //       "robots.txt"
  //     );
  //     toast.success("Downloading Started.");
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <>
      <div className="text-center px-4 mt-8 mb-5 flex flex-col items-center justify-center rounded-md  py-6 bg-white">
        <h2 className="font-bold text-2xl">Online Manifest Generator</h2>
        <p className="text-sm text-gray-500  mt-1 max-w-xl">
          Whether you want to generate Manifest for your website you can simply
          use this tool to generate it.
        </p>
      </div>
      <section className="bg-white rounded-md p-8">
        <div className="mb-5 border-b border-gray-100 flex justify-between items-center pb-3">
          <h2 className="font-semibold text-xl">Enter App Details</h2>
        </div>
        <Form method="post" autoComplete="off">
          <div className="grid grid-cols-2 gap-x-5 gap-y-3">
            <div>
              <label
                htmlFor="appName"
                className="font-medium mb-3 block text-sm text-gray-600">
                App Name
              </label>
              <input
                id="appName"
                name="appName"
                placeholder="App Name"
                onChange={handleChange}
                value={values.appName}
                className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="shortName"
                className="font-medium mb-3 block text-sm text-gray-600">
                Short Name
              </label>
              <input
                id="shortName"
                name="shortName"
                placeholder="Short Name"
                onChange={handleChange}
                value={values.shortName}
                className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none"
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="appDescription"
                className="font-medium mb-3 block text-sm text-gray-600">
                App Description
              </label>
              <textarea
                id="appDescription"
                name="appDescription"
                placeholder="App Description (Up to 60 characters)"
                onChange={handleChange}
                className="w-full flex-grow self-stretch border border-gray-200 p-2 rounded-md resize-none text-sm outline-none"
                maxLength={200}
                value={values.appDescription}
                rows={2}></textarea>
            </div>
            <div>
              <label
                htmlFor="displayMode"
                className="font-medium mb-3 block text-sm text-gray-600">
                Display Mode
              </label>
              <select
                id="displayMode"
                name="displayMode"
                value={values.displayMode}
                onChange={handleChange}
                className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none">
                <option value="browser">Browser</option>
                <option value="standalone">Standalone</option>
                <option value="minimal-ui">Minimal UI</option>
                <option value="fullscreen">Fullscreen</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="orientation"
                className="font-medium mb-3 block text-sm text-gray-600">
                Orientation
              </label>
              <select
                id="orientation"
                name="orientation"
                value={values.orientation}
                onChange={handleChange}
                className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none">
                <option value="">Any</option>
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="applicationScope"
                className="font-medium mb-3 block text-sm text-gray-600">
                Application Scope
              </label>
              <input
                id="applicationScope"
                name="applicationScope"
                placeholder="Application Scope (Default: /)"
                onChange={handleChange}
                value={values.applicationScope}
                className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none"
              />
              <span className="text-gray-400 text-xs italic tracking-wide">
                The scope of your domain that this manifest applies to
              </span>
            </div>
            <div>
              <label
                htmlFor="startUrl"
                className="font-medium mb-3 block text-sm text-gray-600">
                Start URL
              </label>
              <input
                id="startUrl"
                name="startUrl"
                placeholder="Start URL (Default: /)"
                onChange={handleChange}
                value={values.startUrl}
                className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none"
              />
              <span className="text-gray-400 text-xs italic tracking-wide">
                Your homescreen shortcut will load this URL
              </span>
            </div>
            <div>
              <label
                htmlFor="themeColor"
                className="font-medium mb-3 block text-sm text-gray-600">
                Theme Color
              </label>
              <div className="flex space-x-2 items-center">
                <div
                  style={{ backgroundColor: values.themeColor }}
                  className="flex-shrink-0 self-stretch w-10 border border-gray-200 rounded-md"></div>
                <input
                  id="themeColor"
                  name="themeColor"
                  placeholder="Theme Color (eg: #ff0000)"
                  onChange={handleChange}
                  value={values.themeColor}
                  className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none"
                />
              </div>
            </div>
            <div className="relative">
              <label
                htmlFor="backgroundColor"
                className="font-medium mb-3 block text-sm text-gray-600">
                Background Color
              </label>
              <div className="flex space-x-2 items-center">
                <div
                  style={{ backgroundColor: values.backgroundColor }}
                  className="flex-shrink-0 self-stretch w-10 border border-gray-200 rounded-md"></div>
                <input
                  id="backgroundColor"
                  name="backgroundColor"
                  placeholder="Background Color (eg: #000000)"
                  onChange={handleChange}
                  value={values.backgroundColor}
                  className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none"
                />
              </div>
            </div>
            <div className="col-span-2">
              <label
                htmlFor="icon"
                className="font-medium mb-3 block text-sm text-gray-600">
                Icons
              </label>
              <input
                type="file"
                id="icon"
                name="icon"
                onChange={() => {}}
                placeholder="Background Color (eg: #000000)"
                className="w-full text-gray-600 file:bg-primary/10  file:uppercase file:text-primary file:border-0 file:rounded-l-sm file:mr-4 file:py-2 file:px-4 border border-gray-200  rounded-md text-sm outline-none"
              />
              <span className="text-gray-400 text-xs italic tracking-wide">
                Please upload a 512x512 image for the icon and we'll generate
                the remaining sizes
              </span>
            </div>
          </div>

          <div className="flex justify-center space-x-3 mt-7">
            <button
              type="submit"
              className="bg-primary text-sm text-white px-5 py-2 block rounded-md hover:bg-opacity-90">
              Generate Manifest.json
            </button>
          </div>
        </Form>
      </section>

      {transition.state == "submitting" ? (
        <div className="text-center p-2">Preparing...</div>
      ) : (
        ""
      )}

      {actionData && (
        <section className="bg-white rounded-md p-4 mt-5">
          <div className="mb-3 border-b border-gray-100 flex justify-between items-center pb-3">
            <h2 className="font-semibold text-xl">Results</h2>
            <div className="flex items-center space-x-2">
              <button className="border border-primary/80 text-primary/80 hover:bg-gray-100 flex space-x-1 items-center rounded-md py-1 px-2 uppercase text-sm font-medium tracking-wide">
                <RiDownloadLine /> <span>Robots.txt</span>
              </button>
              <button className="border border-primary/80 text-primary/80 hover:bg-gray-100 flex space-x-1 items-center rounded-md py-1 px-2 uppercase text-sm font-medium tracking-wide">
                <RiFileCopyLine /> <span>Copy</span>
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-500 font-mono"></div>
        </section>
      )}
      <section className="bg-white rounded-md p-4 mt-5">
        <h2 className="font-semibold mb-3 text-xl border-b border-gray-100  pb-3">
          About Robots.txt Generator
        </h2>
        <div className="text-sm text-gray-500 font-light">
          <p>
            Robots.txt Generator is one of smartest free online tool from Sharp
            SEO Tools for generating Robots.txt for your website.
          </p>
          <p className="mt-1">
            Robots.txt is a file that can be placed in the root folder of your
            website to help search engines index your site more appropriately.
            Search engines such as Google use website crawlers, or robots that
            review all the content on your website. There may be parts of your
            website that you do not want them to crawl to include in user search
            results, such as admin page. You can add these pages to the file to
            be explicitly ignored.
          </p>
          <p className="mt-1">
            Robots.txt files use something called the Robots Exclusion Protocol.
            This website will easily generate the file for you with inputs of
            pages to be excluded. And this small text file will help you to
            improve your website SEO and increase the ranking in Search Engines.
          </p>
        </div>
      </section>
    </>
  );
}
