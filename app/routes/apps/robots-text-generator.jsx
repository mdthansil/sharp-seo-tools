import { Form, useActionData, useTransition } from "@remix-run/react";
import React, { Fragment, useEffect, useState } from "react";
import {
  RiAddCircleFill,
  RiDownloadLine,
  RiFileCopyLine,
  RiIndeterminateCircleFill,
} from "react-icons/ri";
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

  const handleResult = (action) => {
    let textData = "";

    textData += actionData?.google
      ? `User-agent:Googlebot\n${actionData?.google}\n`
      : "";
    textData += actionData?.googleImage
      ? `User-agent:googlebot-image\n${actionData?.googleImage}\n`
      : "";
    textData += actionData?.googleMobile
      ? `User-agent:googlebot-mobile\n${actionData?.googleMobile}\n`
      : "";
    textData += actionData?.msnSearch
      ? `User-agent:MSNBot\n${actionData?.msnSearch}\n`
      : "";
    textData += actionData?.yahoo
      ? `User-agent:Slurp\n${actionData?.yahoo}\n`
      : "";
    textData += actionData?.yahooMm
      ? `User-agent:yahoo-mmcrawler\n${actionData?.yahooMm}\n`
      : "";
    textData += actionData?.yahooBlogs
      ? `User-agent:yahoo-blogs/v3.9\n${actionData?.yahooBlogs}\n`
      : "";
    textData += actionData?.ask ? `User-agent:Teoma\n${actionData?.ask}\n` : "";
    textData += actionData?.gigaBlast
      ? `User-agent:Gigabot\n${actionData?.gigaBlast}\n`
      : "";
    textData += actionData?.dmozChecker
      ? `User-agent:Robozilla\n${actionData?.dmozChecker}\n`
      : "";
    textData += actionData?.nutch
      ? `User-agent:Nutch\n${actionData?.nutch}\n`
      : "";
    textData += actionData?.alexa
      ? `User-agent:ia_archiver\n${actionData?.alexa}\n`
      : "";
    textData += actionData?.baidu
      ? `User-agent:baiduspider\n${actionData?.baidu}\n`
      : "";
    textData += actionData?.naver
      ? `User-agent:naverbot\n${actionData?.naver}\n`
      : "";
    textData += actionData?.naver
      ? `User-agent:yeti\n${actionData?.naver}\n`
      : "";
    textData += actionData?.msnPicSearch
      ? `User-agent:psbot\n${actionData?.msnPicSearch}\n`
      : "";
    textData += actionData?.defaultValue
      ? `User-agent:*\n${actionData?.defaultValue}\n`
      : "";
    textData += actionData?.crawlDelay
      ? `Crawl-delay:\n${actionData?.crawlDelay}\n`
      : "";
    if (actionData?.directories?.length > 0) {
      actionData?.directories?.forEach((dir, index) => {
        textData += `Disallow:${dir}\n`;
      });
    }
    textData += actionData?.sitemap ? `Sitemap:${actionData?.sitemap}` : "";
    if (action === "copy") {
      if (copy(textData)) {
        toast.success("Text Copied.");
      }
    }
    if (action === "download") {
      saveAs(
        new Blob([textData], { type: "text/plain;charset=utf-8" }),
        "robots.txt"
      );
      toast.success("Downloading Started.");
    }
  };

  return (
    <>
      <div className="text-center px-4 mt-8 mb-5 flex flex-col items-center justify-center bg-white rounded-md  py-6">
        <h2 className="font-bold text-2xl">Online Robots.txt Generator</h2>
        <p className="text-sm text-gray-500  mt-1 max-w-xl">
          Whether you want to generate Robots.txt for your website you can
          simply use this tool to generate it.
        </p>
      </div>
      <section className="bg-white rounded-md p-8">
        <div className="mb-5 border-b border-gray-100 flex justify-between items-center pb-3">
          <h2 className="font-semibold text-xl">Select Details</h2>
        </div>
        <Form method="post" autoComplete="off">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="defaultValue"
                className="font-medium mb-3 block text-sm text-gray-600">
                Default - All Robots are
              </label>
              <select
                id="defaultValue"
                name="defaultValue"
                className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none">
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="crawlDelay"
                className="font-medium mb-3 block text-sm text-gray-600">
                Crawl Delay
              </label>
              <select
                id="crawlDelay"
                name="crawlDelay"
                className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none">
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
                className="font-medium mb-3 block text-sm text-gray-600">
                Sitemap (Leave blank if you don't have)
              </label>
              <input
                id="sitemap"
                name="sitemap"
                placeholder="Sitemap URL eg: https://example.com/sitemap.xml"
                className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none"></input>
            </div>
          </div>

          <div className="mt-5 text-gray-700">
            <h3>Search Robots</h3>
          </div>

          <div className="grid grid-cols-3 gap-5 mt-4">
            <div>
              <label
                htmlFor="google"
                className="font-medium mb-3 block text-sm text-gray-600">
                Google
              </label>
              <select
                id="google"
                name="google"
                className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="googleImage"
                className="font-medium mb-3 block text-sm text-gray-600">
                Google Image
              </label>
              <select
                id="googleImage"
                name="googleImage"
                className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="googleMobile"
                className="font-medium mb-3 block text-sm text-gray-600">
                Google Mobile
              </label>
              <select
                id="googleMobile"
                name="googleMobile"
                className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="msnSearch"
                className="font-medium mb-3 block text-sm text-gray-600">
                MSN Search
              </label>
              <select
                id="msnSearch"
                name="msnSearch"
                className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="yahoo"
                className="font-medium mb-3 block text-sm text-gray-600">
                Yahoo
              </label>
              <select
                id="yahoo"
                name="yahoo"
                className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="yahooMm"
                className="font-medium mb-3 block text-sm text-gray-600">
                Yahoo MM
              </label>
              <select
                id="yahooMm"
                name="yahooMm"
                className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="yahooBlogs"
                className="font-medium mb-3 block text-sm text-gray-600">
                Yahoo Blogs
              </label>
              <select
                id="yahooBlogs"
                name="yahooBlogs"
                className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="ask"
                className="font-medium mb-3 block text-sm text-gray-600">
                Ask/Teoma
              </label>
              <select
                id="ask"
                name="ask"
                className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="gigaBlast"
                className="font-medium mb-3 block text-sm text-gray-600">
                GigaBlast
              </label>
              <select
                id="gigaBlast"
                name="gigaBlast"
                className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="dmozChecker"
                className="font-medium mb-3 block text-sm text-gray-600">
                DMOZ Checker
              </label>
              <select
                id="dmozChecker"
                name="dmozChecker"
                className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="nutch"
                className="font-medium mb-3 block text-sm text-gray-600">
                Nutch
              </label>
              <select
                id="nutch"
                name="nutch"
                className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="alexa"
                className="font-medium mb-3 block text-sm text-gray-600">
                Alexa/Wayback
              </label>
              <select
                id="alexa"
                name="alexa"
                className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="baidu"
                className="font-medium mb-3 block text-sm text-gray-600">
                Baidu
              </label>
              <select
                id="baidu"
                name="baidu"
                className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="naver"
                className="font-medium mb-3 block text-sm text-gray-600">
                Naver
              </label>
              <select
                id="naver"
                name="naver"
                className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="msnPicSearch"
                className="font-medium mb-3 block text-sm text-gray-600">
                MSN Pic Search
              </label>
              <select
                id="msnPicSearch"
                name="msnPicSearch"
                className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none">
                <option value="">Same as Default</option>
                <option value="Allow: /">Allowed</option>
                <option value="Disallow: /">Refused</option>
              </select>
            </div>
          </div>

          <div className="mt-5 text-gray-700 flex items-center justify-between">
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
                    className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none"></input>
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
              className="bg-primary text-sm text-white px-5 py-2 block rounded-md hover:bg-opacity-90">
              Generate Robots.txt
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
              <button
                className="border border-primary/80 text-primary/80 hover:bg-gray-100 flex space-x-1 items-center rounded-md py-1 px-2 uppercase text-sm font-medium tracking-wide"
                onClick={() => handleResult("download")}>
                <RiDownloadLine /> <span>Robots.txt</span>
              </button>
              <button
                className="border border-primary/80 text-primary/80 hover:bg-gray-100 flex space-x-1 items-center rounded-md py-1 px-2 uppercase text-sm font-medium tracking-wide"
                onClick={() => handleResult("copy")}>
                <RiFileCopyLine /> <span>Copy</span>
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-500 font-mono">
            {actionData?.google ? (
              <>
                User-agent:Googlebot
                <br />
                {actionData?.google}
                <br />
              </>
            ) : (
              ""
            )}

            {actionData?.googleImage ? (
              <>
                User-agent:googlebot-image
                <br />
                {actionData?.googleImage}
                <br />
              </>
            ) : (
              ""
            )}

            {actionData?.googleMobile ? (
              <>
                User-agent:googlebot-mobile
                <br />
                {actionData?.googleMobile}
                <br />
              </>
            ) : (
              ""
            )}

            {actionData?.msnSearch ? (
              <>
                User-agent:MSNBot
                <br />
                {actionData?.msnSearch}
                <br />
              </>
            ) : (
              ""
            )}

            {actionData?.yahoo ? (
              <>
                User-agent:Slurp
                <br />
                {actionData?.yahoo}
                <br />
              </>
            ) : (
              ""
            )}

            {actionData?.yahooMm ? (
              <>
                User-agent:yahoo-mmcrawler
                <br />
                {actionData?.yahooMm}
                <br />
              </>
            ) : (
              ""
            )}

            {actionData?.yahooBlogs ? (
              <>
                User-agent:yahoo-blogs/v3.9
                <br />
                {actionData?.yahooBlogs}
                <br />
              </>
            ) : (
              ""
            )}

            {actionData?.ask ? (
              <>
                User-agent:Teoma
                <br />
                {actionData?.ask}
                <br />
              </>
            ) : (
              ""
            )}

            {actionData?.gigaBlast ? (
              <>
                User-agent:Gigabot
                <br />
                {actionData?.gigaBlast}
                <br />
              </>
            ) : (
              ""
            )}

            {actionData?.dmozChecker ? (
              <>
                User-agent:Robozilla
                <br />
                {actionData?.dmozChecker}
                <br />
              </>
            ) : (
              ""
            )}

            {actionData?.nutch ? (
              <>
                User-agent:Nutch
                <br />
                {actionData?.nutch}
                <br />
              </>
            ) : (
              ""
            )}

            {actionData?.alexa ? (
              <>
                User-agent:ia_archiver
                <br />
                {actionData?.alexa}
                <br />
              </>
            ) : (
              ""
            )}

            {actionData?.baidu ? (
              <>
                User-agent:baiduspider
                <br />
                {actionData?.baidu}
                <br />
              </>
            ) : (
              ""
            )}

            {actionData?.naver ? (
              <>
                User-agent:naverbot
                <br />
                {actionData?.naver}
                <br />
                User-agent: yeti
                <br />
                {actionData?.naver}
                <br />
              </>
            ) : (
              ""
            )}

            {actionData?.msnPicSearch ? (
              <>
                User-agent:psbot
                <br />
                {actionData?.msnPicSearch}
                <br />
              </>
            ) : (
              ""
            )}

            {actionData?.defaultValue ? (
              <>
                User-agent:*
                <br />
                {actionData?.defaultValue}
                <br />
              </>
            ) : (
              ""
            )}

            {actionData?.crawlDelay ? (
              <>
                Crawl-delay: {actionData?.crawlDelay}
                <br />
              </>
            ) : (
              ""
            )}

            {actionData?.directories?.length > 0
              ? actionData?.directories?.map((dir, index) => {
                  return (
                    <React.Fragment key={index}>
                      Disallow: {dir}
                      <br />
                    </React.Fragment>
                  );
                })
              : ""}

            {actionData?.sitemap ? <>Sitemap: {actionData?.sitemap}</> : ""}
          </div>
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
