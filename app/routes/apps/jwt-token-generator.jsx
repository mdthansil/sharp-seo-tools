import { useFetcher } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import {
  RiAddCircleFill,
  RiFileCopyLine,
  RiIndeterminateCircleFill,
} from "react-icons/ri";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { JWT } from "../../modules.server";

export const meta = () => {
  return {
    title: "Online QR Code Generator  - Sharp Seo Tools",
    description:
      "QR Code Generator is an online tools that let you generate QR Code instantly for you, It supports URL, VCard, Text, WIFI, Email, SMS, Phone etc...",
    keywords:
      "qrcode, qr code, qr code generator, barcode, barcode generator, online qr, keywords",
  };
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = JSON.parse(await formData.get("data"));
  const token = JWT.sign(data.payload, data.secret, {
    algorithm: data.algorithm,
    subject: data.subject,
    expiresIn: parseInt(data.expiry),
  });
  return token;
};

const initialPayload = [
  {
    key: "",
    value: "",
  },
];

const initialValues = {
  algorithm: "HS256",
  secret: "",
  expiry: 60 * 60 * 24,
  subject: "",
  payload: {},
};

export default function JwtTokenGenerator() {
  const jwtForm = useFetcher();
  const [payload, setPayload] = useState(initialPayload);
  const [values, setValues] = useState(initialValues);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handlePayload = (e, index) => {
    const _oldData = [...payload];
    _oldData[index][e.target.name] = e.target.value;

    setPayload(_oldData);
  };

  const addNewPayload = (e) => {
    setPayload([
      ...payload,
      {
        key: "",
        value: "",
      },
    ]);
  };

  const removePayload = (e, index) => {
    const prevPayload = [...payload];
    prevPayload.splice(index, 1);
    setPayload(prevPayload);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const _values = { ...values };
    _values.payload = payload.reduce(
      (old, item) => ({ ...old, [item.key]: item.value }),
      {}
    );

    jwtForm.submit({ data: JSON.stringify(_values) }, { method: "post" });
  };

  const handleResult = () => {
    copy(result);
    toast.success("Text Copied.");
  };

  useEffect(() => {
    if (jwtForm.data) {
      setResult(jwtForm.data);
    }
  }, [jwtForm.data]);

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
        <div className="mb-5 border-b border-gray-100 flex justify-between items-center pb-3">
          <h2 className="font-semibold text-xl">Enter App Details</h2>
        </div>
        <jwtForm.Form
          method="post"
          autoComplete="off"
          className="mt-5"
          onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-5 mt-4">
            <div>
              <label
                htmlFor="algorithm"
                className="font-medium mb-3 block text-base">
                Algorithm
              </label>
              <select
                id="algorithm"
                name="algorithm"
                value={values.algorithm}
                onChange={handleChange}
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none">
                <option value="HS256">HS256</option>
                <option value="HS384">HS384</option>
                <option value="HS512">HS512</option>
                {/* <option value="RS256">RS256</option>
                <option value="RS384">RS384</option>
                <option value="RS512">RS512</option>
                <option value="PS256">PS256</option>
                <option value="PS384">PS384</option>
                <option value="PS512">PS512</option>
                <option value="ES256">ES256</option>
                <option value="ES384">ES384</option>
                <option value="ES512">ES512</option>
                <option value="none">None</option> */}
              </select>
            </div>
            <div>
              <label
                htmlFor="secret"
                className="font-medium mb-3 block text-base ">
                Secret / Private Key
              </label>
              <input
                id="secret"
                name="secret"
                placeholder="Secret Key"
                required
                onChange={handleChange}
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="expiry"
                className="font-medium mb-3 block text-base ">
                Expiry (In Seconds)
              </label>
              <input
                id="expiry"
                name="expiry"
                type={"number"}
                placeholder="eg: 3600 "
                onChange={handleChange}
                min={0}
                className="w-full border native-appearance-none border-gray-200 p-2 rounded-md text-base outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="font-medium mb-3 block text-base ">
                Subject (Optional)
              </label>
              <input
                id="subject"
                name="subject"
                placeholder="eg: 123456789"
                onChange={handleChange}
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            <div className="mt-5 font-medium text-base flex items-center justify-between -mb-2">
              <h3>Payload (Key, Value)</h3>
              <p className="text-xs italic text-gray-500">
                This key, value data will convert to Json format.
              </p>
            </div>
            {payload.map((item, index) => {
              return (
                <div className="grid grid-cols-2 gap-5 " key={index}>
                  <input
                    name="key"
                    placeholder="Key"
                    className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"
                    onChange={(e) => handlePayload(e, index)}
                    value={payload[index].key}
                  />
                  <div className="flex items-center space-x-2 flex-shrink-0 flex-grow">
                    <input
                      name="value"
                      placeholder="Value"
                      className="w-full  border border-gray-200 p-2 rounded-md text-base outline-none"
                      onChange={(e) => handlePayload(e, index)}
                      value={payload[index].value}
                    />
                    {payload.length > 1 && index != payload.length - 1 ? (
                      <button
                        type="button"
                        className="text-red-500"
                        onClick={(e) => removePayload(e, index)}>
                        <RiIndeterminateCircleFill fontSize={24} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="text-green-500"
                        onClick={addNewPayload}>
                        <RiAddCircleFill fontSize={24} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 gap-5">
            <div className="mt-5 font-medium text-base flex items-center justify-between -mb-2">
              <h3>Payload Preview</h3>
            </div>
            <pre className=" border border-gray-100 bg-gray-50/50 p-4 font-normal rounded-md font-mono">
              {JSON.stringify(
                payload.reduce(
                  (old, item) => ({ ...old, [item.key]: item.value }),
                  {}
                ),
                null,
                2
              )}
            </pre>
          </div>

          <div className="flex justify-center space-x-3 mt-7">
            <button className="bg-primary text-sm text-white px-5 py-2 block rounded-md hover:bg-opacity-90">
              Generate JWT Token
            </button>
          </div>
        </jwtForm.Form>
      </section>

      {jwtForm.data && jwtForm.state == "idle" && (
        <section className="bg-white rounded-md p-4 mt-5">
          <div className="mb-3 border-b border-gray-100 flex justify-between items-center pb-3">
            <h2 className="font-semibold text-xl">Results</h2>
            <div className="flex items-center space-x-2">
              <button
                className="border border-primary/80 text-primary/80 hover:bg-gray-100 flex space-x-1 items-center rounded-md py-1 px-2 uppercase text-sm font-medium tracking-wide"
                onClick={handleResult}>
                <RiFileCopyLine /> <span>Copy</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <textarea
              readOnly
              rows={4}
              className="w-full p-2 resize-none border border-gray-100 rounded-md text-base outline-none"
              onFocus={(e) => e.target.select()}
              value={jwtForm.data || ""}></textarea>
          </div>
        </section>
      )}
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
