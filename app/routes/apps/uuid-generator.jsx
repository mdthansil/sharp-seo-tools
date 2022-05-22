import { useFetcher } from "@remix-run/react";
import React, { useState } from "react";
import { RiDownloadLine, RiFileCopyLine } from "react-icons/ri";
import { v1 as uuid1, v4 as uuid4 } from "uuid";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { saveAs } from "file-saver";

export const meta = () => {
  return {
    title: "Online QR Code Generator  - Sharp Seo Tools",
    description:
      "QR Code Generator is an online tools that let you generate QR Code instantly for you, It supports URL, VCard, Text, WIFI, Email, SMS, Phone etc...",
    keywords:
      "qrcode, qr code, qr code generator, barcode, barcode generator, online qr, keywords",
  };
};

const initialValues = {
  uuidCount: 1,
  uuidVersion: 1,
};

export default function UUIDGenerator() {
  const formFetcher = useFetcher();

  const [values, setValues] = useState(initialValues);
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const _result = [];
    if (values.uuidVersion == 1) {
      for (let i = 1; i <= values.uuidCount; i++) {
        _result.push(uuid1());
      }
    }
    if (values.uuidVersion == 4) {
      for (let i = 1; i <= values.uuidCount; i++) {
        _result.push(uuid4());
      }
    }
    setResult(_result.join("\n"));
  };

  const handleResult = (action) => {
    if (action === "copy") {
      if (copy(result)) {
        toast.success("Text Copied.");
      }
    }
    if (action === "download") {
      saveAs(
        new Blob([result], { type: "text/plain;charset=utf-8" }),
        "uuids.txt"
      );
      toast.success("Downloading Started.");
    }
  };

  return (
    <>
      <div className="text-center px-4 mt-8 mb-5 flex flex-col items-center justify-center bg-white rounded-md  py-6">
        <h2 className="font-bold text-2xl">Online QR Code Generator</h2>
        <p className="text-sm text-gray-500  mt-1 max-w-xl">
          Whether you want to generate QR Code for URL, VCard, Text, WIFI, Email
          etc. you can simply use this tool to generate it.
        </p>
      </div>
      <section className="bg-white rounded-md p-8">
        <div className="mb-5 border-b border-gray-200 flex justify-between items-center pb-3">
          <h2 className="font-semibold text-xl">Generator</h2>
          {result !== "" && (
            <div className="flex items-center space-x-2">
              <button
                className="border border-primary/80 text-primary/80 hover:bg-gray-100 flex space-x-1 items-center rounded-md py-1 px-2 uppercase text-sm font-medium tracking-wide"
                onClick={() => handleResult("download")}>
                <RiDownloadLine /> <span>Download</span>
              </button>
              <button
                className="border border-primary/80 text-primary/80 hover:bg-gray-100 flex space-x-1 items-center rounded-md py-1 px-2 uppercase text-sm font-medium tracking-wide"
                onClick={() => handleResult("copy")}>
                <RiFileCopyLine /> <span>Copy</span>
              </button>
            </div>
          )}
        </div>
        <formFetcher.Form
          method="post"
          autoComplete="off"
          className="mt-5"
          onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <div>
                <label
                  htmlFor="uuidCount"
                  className="font-medium mb-3 block text-base">
                  Number of UUIDs to generate
                </label>
                <input
                  id="uuidCount"
                  name="uuidCount"
                  placeholder="UUID Count"
                  onChange={handleChange}
                  type={"number"}
                  value={values.uuidCount}
                  min={1}
                  max={100}
                  className="w-full border border-gray-300 p-2 rounded-md text-base outline-none"></input>
                <p className="text-xs italic text-gray-500 mt-1">
                  Number between 1 and 100
                </p>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="uuidVersion"
                  className="font-medium mb-3 block text-base">
                  UUID Version
                </label>
                <select
                  id="uuidVersion"
                  name="uuidVersion"
                  value={values.uuidVersion}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-md text-base outline-none">
                  <option value="1">Version-1</option>
                  <option value="4">Version-4</option>
                </select>
              </div>
            </div>
            <div>
              <div className="h-full flex flex-col">
                <label
                  htmlFor="results"
                  className="font-medium mb-3 block text-base">
                  Results:
                </label>
                <textarea
                  id="results"
                  name="results"
                  placeholder="Generated Results."
                  readOnly
                  value={result}
                  onFocus={(e) => e.target.select()}
                  className="w-full flex-grow self-stretch border border-gray-300 p-2 rounded-md  text-base outline-none"></textarea>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-3 mt-7">
            <button className="bg-primary text-sm text-white px-5 py-2 block rounded-md hover:bg-opacity-90">
              Generate UUID
            </button>
          </div>
        </formFetcher.Form>
      </section>

      <section className="bg-white rounded-md p-4 mt-5">
        <h2 className="font-semibold mb-3 text-xl border-b border-gray-100  pb-3">
          About QR Code Generator
        </h2>
        <div className="text-sm text-gray-500 font-light tracking-wide leading-5">
          <p>
            QR Code Generator is one of smartest free online tool from Sharp SEO
            Tools for generating QR Codes.
          </p>
          <p className="mt-1">
            QR code is the abbreviation for ‘Quick Response’ code. It is a
            registered trademark of Denso Wave Incorporated. The QR code is a
            two dimensional barcode that is readable by smart phones, tablets,
            computers with webcams.
          </p>
          <p className="mt-2">
            Over 4000 characters can be encoded in a single QR code. Once a QR
            code is generated it cannot be changed. If an attempt is made to
            change the code it will result in a different code being produced,
            and not the original one.
          </p>
          <p className="mt-2">
            In the future it’s expected that QR codes will replace the
            traditional bar codes on commercial items. There is no restriction
            on using QR codes for personal or commercial use. You will need to
            download the appropriate application to read QR codes on a smart
            phone. The QR code reader application is available across all types
            of smart phones.
          </p>
        </div>
      </section>
    </>
  );
}
