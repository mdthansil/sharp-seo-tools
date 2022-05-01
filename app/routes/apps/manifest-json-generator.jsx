import { useFetcher } from "@remix-run/react";
import {
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import React, { useCallback, useEffect, useState } from "react";
import { RiFileCopyLine } from "react-icons/ri";
import { HexColorPicker } from "react-colorful";
import toast from "react-hot-toast";
import copy from "copy-to-clipboard";
import { saveAs } from "file-saver";
import { Sharp } from "../../modules.server";
import JSZip from "jszip";

export const meta = () => {
  return {
    title: "Online Manifest Generator  - Sharp Seo Tools",
    description:
      "Manifest Generator is an online tools that let you generate Manifest.json for your website instantly",
    keywords:
      "seo, meta, meta tags, robots.txt, manifest.json, pwa, progressive web app, ranking, keywords, install, web app",
  };
};

export const action = async ({ request }) => {
  const zip = new JSZip();
  const icons = {
    icon_192x192: "",
    icon_256x256: "",
    icon_384x384: "",
    icon_512x512: "",
  };

  const uploadHandler = unstable_createMemoryUploadHandler({
    maxFileSize: 2_097_152,
  });
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );
  try {
    const data = Object.fromEntries(formData);
    const {
      iconExtension,
      iconType,
      appName,
      shortName,
      appDescription,
      displayMode,
      orientation,
      applicationScope,
      startUrl,
      themeColor,
      backgroundColor,
    } = data;

    // Preparing images
    const icon = await data.icon.arrayBuffer();
    icons.icon_192x192 = await (
      await Sharp(Buffer.from(icon, "binary")).resize(192, 192).toBuffer()
    ).toString("base64");

    icons.icon_256x256 = await (
      await Sharp(Buffer.from(icon, "binary")).resize(256, 256).toBuffer()
    ).toString("base64");

    icons.icon_384x384 = await (
      await Sharp(Buffer.from(icon, "binary")).resize(384, 384).toBuffer()
    ).toString("base64");

    icons.icon_512x512 = await (
      await Sharp(Buffer.from(icon, "binary")).resize(512, 512).toBuffer()
    ).toString("base64");

    zip.file(`icon-192x192.${iconExtension}`, icons.icon_192x192, {
      base64: true,
    });
    zip.file(`icon-256x256.${iconExtension}`, icons.icon_256x256, {
      base64: true,
    });
    zip.file(`icon-384x384.${iconExtension}`, icons.icon_384x384, {
      base64: true,
    });
    zip.file(`icon-512x512.${iconExtension}`, icons.icon_512x512, {
      base64: true,
    });

    const manifestText = `
    {
      ${appName && `"name":"${appName}",`}
      ${shortName && `"short_name":"${shortName}",`}
      ${appDescription && `"description":"${appDescription}",`}
      ${themeColor && `"theme_color":"${themeColor}",`}
      ${backgroundColor && `"background_color":"${backgroundColor}",`}
      ${displayMode && `"display":"${displayMode}",`}
      ${orientation && `"orientation":"${orientation}",`}
      ${applicationScope && `"scope":"${applicationScope}",`}
      ${startUrl && `"start_url":"${startUrl}",`}
      "icons": [
        {
          "src": "/icon-192x192.${iconExtension}",
          "sizes": "192x192",
          "type": "${iconType}"
        },
        {
          "src": "/icon-256x256.${iconExtension}",
          "sizes": "256x256",
          "type": "${iconType}"
        },
        {
          "src": "/icon-384x384.${iconExtension}",
          "sizes": "384x384",
          "type": "${iconType}"
        },
        {
          "src": "/icon-512x512.${iconExtension}",
          "sizes": "512x512",
          "type": "${iconType}"
        }
      ]
    }
    `;

    zip.file(
      `manifest.json`,
      manifestText.replace(/^\s*$(?:\r\n?|\n)/gm, "").replace(/^\s{1,4}/gm, "")
    );

    let zipBase64 = await zip.generateAsync({ type: "base64" });
    zipBase64 = `data:application/zip;base64,${zipBase64}`;

    return zipBase64;
  } catch (e) {
    return null;
  }
};

const initialValues = {
  appName: "",
  shortName: "",
  appDescription: "",
  displayMode: "standalone",
  orientation: "",
  applicationScope: "/",
  startUrl: "/",
  themeColor: "#36de18",
  backgroundColor: "#00c6ff",
  icon: {
    name: "",
    type: "",
    extension: "",
  },
};

const colorPicker = Object.freeze({
  none: 0,
  themeColor: 1,
  backgroundColor: 2,
});

const allowedFormats = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/webp",
];

export default function ManifestJsonGenerator() {
  const fetcher = useFetcher();
  const data = fetcher.data;

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialValues);
  const [activeColorPicker, setActiveColorPicker] = useState(0);

  const handleResult = (action) => {
    let textData = "";
    textData += "{\n";
    if (values.appName) {
      textData += `  "name": "${values.appName}",\n`;
    }
    if (values.shortName) {
      textData += `  "short_name": "${values.shortName}",\n`;
    }
    if (values.appDescription) {
      textData += `  "description": "${values.appDescription}",\n`;
    }
    if (values.themeColor) {
      textData += `  "theme_color": "${values.themeColor}",\n`;
    }
    if (values.backgroundColor) {
      textData += `  "background_color": "${values.backgroundColor}",\n`;
    }
    if (values.displayMode) {
      textData += `  "display": "${values.displayMode}",\n`;
    }
    if (values.orientation) {
      textData += `  "orientation": "${values.orientation}",\n`;
    }
    if (values.applicationScope) {
      textData += `  "scope": "${values.applicationScope}",\n`;
    }
    if (values.startUrl) {
      textData += `  "start_url": "${values.startUrl}",\n`;
    }

    textData += "}";

    if (action === "copy") {
      if (copy(textData)) {
        toast.success("Text Copied.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleColorPicker = (picker) => {
    setActiveColorPicker(picker);
  };

  const dismissColorPicker = () => {
    setActiveColorPicker(colorPicker.none);
  };

  const handleIconFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const { name, type, size } = file;
      if (size > 2_097_152) {
        setErrors({ ...errors, icon: "Image size too large (max 2mb)." });
        return;
      }
      if (!allowedFormats.includes(type)) {
        setErrors({
          ...errors,
          icon: "Invalid image (Valid formats: .png, .jpg, .jpeg, .gif)",
        });
        return;
      }
      setErrors({});
      setValues({
        ...values,
        icon: { name, type, extension: name?.split(".").pop() },
      });
    }
  };

  const handleSubmit = (e) => {
    if (Object.values(errors).length >= 1) {
      e.preventDefault();
    }
    if (!values.icon.name) {
      setErrors({ ...errors, icon: "Please select an image icon." });
      e.preventDefault();
    }
  };

  const download = useCallback(async () => {
    const zipFile = await fetch(data);
    saveAs(await zipFile.blob(), "manifest.zip");
  }, [data]);

  useEffect(() => {
    if (fetcher.state == "idle" && data) {
      download();
    }
  }, [data, fetcher.state, download]);

  return (
    <>
      {activeColorPicker != 0 && (
        <div
          className="fixed inset-0 bg-transparent overlay"
          onClick={dismissColorPicker}
        />
      )}
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
        <fetcher.Form
          method="post"
          autoComplete="off"
          encType="multipart/form-data"
          onSubmit={handleSubmit}>
          {values.icon.type ? (
            <input type="hidden" name="iconType" value={values.icon.type} />
          ) : (
            ""
          )}
          {values.icon.extension ? (
            <input
              type="hidden"
              name="iconExtension"
              value={values.icon.extension}
            />
          ) : (
            ""
          )}
          <div className="grid grid-cols-2 gap-x-5 gap-y-3">
            <div>
              <label
                htmlFor="appName"
                className="font-medium mb-3 block text-sm text-gray-600">
                App Name <span className="text-red-500 text-md">*</span>
              </label>
              <input
                id="appName"
                name="appName"
                placeholder="App Name"
                onChange={handleChange}
                value={values.appName}
                required
                className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="shortName"
                className="font-medium mb-3 block text-sm text-gray-600">
                Short Name <span className="text-red-500 text-md">*</span>
              </label>
              <input
                id="shortName"
                name="shortName"
                placeholder="Short Name"
                onChange={handleChange}
                value={values.shortName}
                required
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
                Start URL <span className="text-red-500 text-md">*</span>
              </label>
              <input
                id="startUrl"
                name="startUrl"
                placeholder="Start URL (Default: /)"
                onChange={handleChange}
                value={values.startUrl}
                required
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
              <div className="flex space-x-2 items-center relative">
                <div
                  style={{ backgroundColor: values.themeColor }}
                  className="flex-shrink-0 cursor-pointer self-stretch w-10 border border-gray-200 rounded-md"
                  onClick={() => handleColorPicker(colorPicker.themeColor)}
                />
                <input
                  id="themeColor"
                  name="themeColor"
                  placeholder="Theme Color (eg: #ff0000)"
                  onChange={handleChange}
                  value={values.themeColor}
                  className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none"
                />
                {activeColorPicker === colorPicker.themeColor && (
                  <div className="absolute top-10 -left-2 color-picker">
                    <HexColorPicker
                      color={values.themeColor}
                      onChange={(color) =>
                        setValues({ ...values, themeColor: color })
                      }
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="backgroundColor"
                className="font-medium mb-3 block text-sm text-gray-600">
                Background Color <span className="text-red-500 text-md">*</span>
              </label>
              <div className="flex space-x-2 items-center relative">
                <div
                  style={{ backgroundColor: values.backgroundColor }}
                  className="flex-shrink-0 self-stretch w-10 border cursor-pointer border-gray-200 rounded-md"
                  onClick={() => handleColorPicker(colorPicker.backgroundColor)}
                />
                <input
                  id="backgroundColor"
                  name="backgroundColor"
                  placeholder="Background Color (eg: #000000)"
                  onChange={handleChange}
                  value={values.backgroundColor}
                  required
                  className="w-full border border-gray-200 p-2 rounded-md text-sm outline-none"
                />
                {activeColorPicker === colorPicker.backgroundColor && (
                  <div className="absolute top-10 -left-2 color-picker">
                    <HexColorPicker
                      color={values.backgroundColor}
                      onChange={(color) =>
                        setValues({ ...values, backgroundColor: color })
                      }
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-2">
              <label className="font-medium mb-3 block text-sm text-gray-600">
                Icon (Max 2MB)
              </label>
              <input
                type="file"
                id="icon"
                name="icon"
                onChange={handleIconFile}
                placeholder="Background Color (eg: #000000)"
                className={`w-full text-gray-600 file:uppercase file:border-0 file:rounded-l-sm file:cursor-pointer cursor-pointer file:mr-4 file:py-2 file:px-4 border  rounded-md text-sm outline-none ${
                  errors?.icon
                    ? "border-red-500 file:bg-red-500/10 file:text-red-500"
                    : "border-gray-200 file:bg-primary/10 file:text-black"
                }`}
              />
              {errors?.icon ? (
                <span className="text-red-500 text-xs italic tracking-wide">
                  {errors?.icon}
                </span>
              ) : (
                <span className="text-gray-400 text-xs italic tracking-wide">
                  Please upload a 512x512 image for the icon and we'll generate
                  the remaining sizes
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-center space-x-3 mt-7">
            <button
              type="submit"
              className="bg-primary text-sm text-white px-5 py-2 block rounded-md hover:bg-opacity-90">
              Generate Manifest.json
            </button>
          </div>
        </fetcher.Form>
      </section>

      {fetcher.state == "submitting" ? (
        <div className="text-center p-2">Generating...</div>
      ) : (
        ""
      )}

      <section className="bg-white rounded-md p-4 mt-5">
        <div className="mb-3 border-b border-gray-100 flex justify-between items-center pb-3">
          <h2 className="font-semibold text-xl">Preview</h2>
          <div className="flex items-center space-x-2">
            <button
              className="border border-primary/80 text-primary/80 hover:bg-gray-100 flex space-x-1 items-center rounded-md py-1 px-2 uppercase text-sm font-medium tracking-wide"
              onClick={() => handleResult("copy")}>
              <RiFileCopyLine />
              <span>Copy</span>
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-500 font-mono ">
          {"{"}
          <ul>
            {values.appName ? (
              <li className="pl-5">{`"name": "${values.appName}",`}</li>
            ) : (
              ``
            )}
            {values.shortName ? (
              <li className="pl-5">{`"short_name": "${values.shortName}"`}</li>
            ) : (
              ``
            )}
            {values.appDescription ? (
              <li className="pl-5">{`"description": "${values.appDescription}",`}</li>
            ) : (
              ``
            )}
            {values.themeColor ? (
              <li className="pl-5">{`"theme_color": "${values.themeColor}",`}</li>
            ) : (
              ``
            )}
            {values.backgroundColor ? (
              <li className="pl-5">{`"background_color": "${values.backgroundColor}",`}</li>
            ) : (
              ``
            )}
            {values.displayMode ? (
              <li className="pl-5">{`"display": "${values.displayMode}",`}</li>
            ) : (
              ``
            )}
            {values.orientation ? (
              <li className="pl-5">{`"orientation": "${values.orientation}",`}</li>
            ) : (
              ``
            )}
            {values.applicationScope ? (
              <li className="pl-5">{`"scope": "${values.applicationScope}",`}</li>
            ) : (
              ``
            )}
            {values.startUrl ? (
              <li className="pl-5">{`"start_url": "${values.startUrl}",`}</li>
            ) : (
              ``
            )}
          </ul>
          {"}"}
        </div>
      </section>

      <section className="bg-white rounded-md p-4 mt-5">
        <h2 className="font-semibold mb-3 text-xl border-b border-gray-100  pb-3">
          About Manifest Generator
        </h2>
        <div className="text-sm text-gray-500 font-light">
          <p>
            Manifest Generator is one of smartest free online tool from Sharp
            SEO Tools for generating Manifest.json for your website.
          </p>
          <p className="mt-1">
            Web app manifest (i.e. manifest.json) is a JSON file that provides
            the necessary metadata for your Progressive Web App. With a
            properly-configured web app manifest, your PWA can behave more
            similarly to a native app — installable to home screen, and capable
            of smooth splash screen transitions.
          </p>
          <p className="mt-1">
            Configuring your web app manifest typically means describing how
            your PWA will look like on the user’s home screen, as well as how
            it’ll look when the user first launches your app. Additionally,
            behavior of the browser UI (whether it’ll be visible or hidden) is
            also configurable.
          </p>
          <p className="mt-1">
            Web app manifest is fully supported in Chrome, Edge, Android
            Browser, Chrome for Android, Firefox for Android, and Samsung
            Internet. It is partially supported in Safari.
          </p>
        </div>
      </section>
    </>
  );
}
