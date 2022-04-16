import { Form, useActionData } from "@remix-run/react";
import forge from "node-forge";

export const action = async ({ request }) => {
  let form = await request.formData();
  let { input } = Object.fromEntries(form);
  const res = {
    body: "",
    errors: [],
  };

  if (typeof input !== "undefined") {
    const md5 = forge.md.md5.create();
    md5.update(input);
    res.body = md5.digest().toHex();
  } else {
    res.errors.push("Please enter a valid text");
  }
  return res;
};

export const meta = () => {
  return {
    title: "MD5 Hash Generator - Sharp Seo Tools",
    description:
      "Free MD5 hash generator tool which calculate/generate MD5 hashes",
    keywords: "cryptography, hashing, encoding, md5",
  };
};

export default function MD5HashGenerator() {
  const data = useActionData();

  return (
    <>
      <div className="text-center px-4 mt-12 mb-8 flex flex-col items-center justify-center">
        <h2 className="font-bold text-2xl tracking-wide">
          Online MD5 Hash Generator
        </h2>
        <p className="text-sm text-gray-500 tracking-wide mt-2 max-w-xl">
          Whether you want to calculate/generate MD5 hash from text, You can
          simply enter text in to text box and click the generate button.
        </p>
      </div>
      <section className="bg-white rounded-md p-4">
        <Form method="post">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="input"
                className="font-medium mb-3 block text- text-base">
                Enter Text to generate MD5 Hash
              </label>
              <textarea
                id="input"
                name="input"
                placeholder="Write here..."
                className="w-full border border-gray-200 p-2 rounded-md resize-none text-base outline-none"
                rows={5}></textarea>
            </div>
            <div>
              <label
                htmlFor="output"
                className="font-medium mb-3 block text-base">
                Hash Output
              </label>
              <textarea
                id="output"
                readOnly
                placeholder="Output"
                className="w-full border border-gray-200 p-2 rounded-md resize-none text-base outline-none"
                rows={5}
                value={data?.body}></textarea>
            </div>
          </div>
          <div className="flex justify-center space-x-3 mt-5">
            <button
              type="submit"
              className="bg-primary text-white px-5 py-2 block rounded-md hover:bg-opacity-90">
              Generate MD5 hash
            </button>
          </div>
        </Form>
      </section>
      <section className="bg-white rounded-md p-4 mt-5">
        <h2 className="font-semibold mb-3 text-xl border-b border-gray-100 pb-3">
          About Online MD5 Hash Calculator/Generator
        </h2>
        <div className="text-base text-gray-500 font-light">
          <p>
            Sharp SEO Tools bring you the smartest and fastest online MD5
            Calculator/Generator tool for free!
          </p>
          <p className="mt-1">
            This online MD5 Hash Calculator/Generator tool is extremely helpful
            to Calculate/Generate MD5 Hashes. MD5 hashing mechanism commonly
            used to store secret data like password and other data's. <br /> The
            MD5 hash non-revisable means once you created a MD5 hash which
            cannot transform in to actual form.
          </p>
        </div>
      </section>
    </>
  );
}
