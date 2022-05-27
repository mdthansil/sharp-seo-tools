import { Form, useFetcher } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { RiDownloadLine, RiFileCopyLine } from "react-icons/ri";
import { v1 as uuid1, v4 as uuid4 } from "uuid";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { BCrypt } from "../../modules.server";

export const meta = () => {
  return {
    title: "Online QR Code Generator  - Sharp Seo Tools",
    description:
      "QR Code Generator is an online tools that let you generate QR Code instantly for you, It supports URL, VCard, Text, WIFI, Email, SMS, Phone etc...",
    keywords:
      "qrcode, qr code, qr code generator, barcode, barcode generator, online qr, keywords",
  };
};

const actions = {
  generateHash: "hash",
  validateHash: "verify",
};

export const action = async ({ request }) => {
  const form = await request.formData();
  const formData = Object.fromEntries(form);

  if (formData?.action == actions.generateHash) {
    const { rounds, plainText } = formData;
    const _salt = await BCrypt.genSalt(parseInt(rounds));
    const _hash = await BCrypt.hash(plainText, _salt);
    return _hash;
  }

  if (formData?.action == actions.validateHash) {
    const { hashToVerify, textToVerify } = formData;
    const _valid = await BCrypt.compare(textToVerify, hashToVerify);
    return _valid;
  }

  return null;
};

const initialValues = {
  rounds: 10,
  plainText: "",
  hashToVerify: "",
  textToVerify: "",
};

export default function BCryptGenerator() {
  const compareForm = useFetcher();
  const generatorForm = useFetcher();

  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleResult = (action) => {
    if (action === "copy") {
      if (copy(generatorForm.data)) {
        toast.success("Text Copied.");
      }
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
          {typeof generatorForm.data !== "undefined" && (
            <div className="flex items-center space-x-2">
              <button
                className="border border-primary/80 text-primary/80 hover:bg-gray-100 flex space-x-1 items-center rounded-md py-1 px-2 uppercase text-sm font-medium tracking-wide"
                onClick={() => handleResult("copy")}>
                <RiFileCopyLine /> <span>Copy</span>
              </button>
            </div>
          )}
        </div>
        <generatorForm.Form method="post" autoComplete="off" className="mt-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <div>
                <label
                  htmlFor="rounds"
                  className="font-medium mb-3 block text-base">
                  Rounds
                </label>
                <input
                  id="rounds"
                  name="rounds"
                  placeholder="Salt Rounds"
                  onChange={handleChange}
                  type={"number"}
                  value={values.rounds}
                  min={1}
                  max={20}
                  className="w-full border border-gray-300 p-2 rounded-md text-base outline-none"></input>
                <p className="text-xs italic text-gray-500 mt-1">
                  Number between 1 and 20
                </p>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="plainText"
                  className="font-medium mb-3 block text-base">
                  Plain Text
                </label>
                <input
                  id="plainText"
                  name="plainText"
                  placeholder="Text to hash"
                  onChange={handleChange}
                  value={values.plainText}
                  required
                  className="w-full border border-gray-300 p-2 rounded-md text-base outline-none"
                />
              </div>
            </div>
            <div>
              <div className="h-full flex flex-col">
                <label
                  htmlFor="results"
                  className="font-medium mb-3 block text-base">
                  Hash:
                </label>
                <textarea
                  id="results"
                  name="results"
                  placeholder="Generated Hash."
                  readOnly
                  value={generatorForm.data || ""}
                  onFocus={(e) => e.target.select()}
                  className="w-full flex-grow self-stretch border border-gray-300 p-2 rounded-md  text-base outline-none"></textarea>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-3 mt-7">
            <button
              name="action"
              value={"hash"}
              disabled={generatorForm.state === "submitting"}
              className="bg-primary text-sm text-white px-5 py-2 block rounded-md hover:bg-opacity-90">
              {generatorForm.state == "submitting"
                ? "Generating Hash..."
                : "Generate Hash"}
            </button>
          </div>
        </generatorForm.Form>
      </section>

      <section className="bg-white rounded-md p-8 mt-5">
        <div className="mb-5 border-b border-gray-200 flex justify-between items-center pb-3">
          <h2 className="font-semibold text-xl">Hash Verifier</h2>
        </div>
        <compareForm.Form method="post" autoComplete="off" className="mt-5">
          <div className="grid grid-cols-2 gap-5">
            <div className="h-full flex flex-col">
              <label
                htmlFor="hashToVerify"
                className="font-medium mb-3 block text-base">
                Hash Text
              </label>
              <textarea
                required
                id="hashToVerify"
                name="hashToVerify"
                placeholder="Hash to Verify"
                value={values.hashToVerify}
                onChange={handleChange}
                className="w-full flex-grow self-stretch border border-gray-300 p-2 rounded-md  text-base outline-none"
                rows={3}></textarea>
            </div>

            <div className="h-full flex flex-col">
              <label
                htmlFor="textToVerify"
                className="font-medium mb-3 block text-base">
                Plain Text
              </label>
              <textarea
                required
                id="textToVerify"
                name="textToVerify"
                placeholder="Text to Verify"
                value={values.textToVerify}
                onChange={handleChange}
                className="w-full flex-grow self-stretch border border-gray-300 p-2 rounded-md  text-base outline-none"
                rows={3}></textarea>
            </div>
          </div>

          {typeof compareForm.data !== "undefined" && (
            <div
              className={`border text-sm tracking-wide py-3 px-2 rounded-md text-center mt-5 ${
                compareForm.data == true
                  ? "border-green-300 bg-green-100 text-green-500"
                  : "border-red-300 bg-red-100 text-red-500"
              }`}>
              {compareForm.data == true ? "Match!" : "Not Matching!"}
            </div>
          )}

          <div className="flex justify-center space-x-3 mt-7">
            <button
              name="action"
              value={"verify"}
              disabled={compareForm.state === "submitting"}
              className="bg-primary text-sm text-white px-5 py-2 block rounded-md hover:bg-opacity-90">
              {compareForm.state == "submitting"
                ? "Verifying hash..."
                : "Verify Hash"}
            </button>
          </div>
        </compareForm.Form>
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
