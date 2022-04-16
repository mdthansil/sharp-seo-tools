import { Form, useActionData } from "@remix-run/react";
import forge from "node-forge";

export const action = async ({ request }) => {
  let form = await request.formData();
  let { input, operation } = Object.fromEntries(form);
  const res = {
    body: "",
    errors: [],
  };

  if (!!input) {
    if (operation == "encode") {
      res.body = forge.util.encodeUtf8(input);
    }
    if (operation == "decode") {
      res.body = forge.util.decodeUtf8(input);
    }
  } else {
    res.errors.push("Please enter a valid text");
  }
  return res;
};

export const meta = () => {
  return {
    title: "UTF-8 Encoder/Decoder - Sharp Seo Tools",
    description:
      "UTF-8 Encoder/Decoder is a variable-width character encoding used for electronic communication. Defined by the Unicode Standard, ",
    keywords: "cryptography, hashing, encode, decode, utf, UTF-8",
  };
};

export default function UTF8EncoderDecoder() {
  const data = useActionData();

  return (
    <>
      <div className="text-center px-4 mt-12 mb-8 flex flex-col items-center justify-center">
        <h2 className="font-bold text-2xl tracking-wide">
          Online UTF-8 Encoder/Decoder
        </h2>
        <p className="text-sm text-gray-500 tracking-wide mt-2 max-w-xl">
          Whether you want to encode or decode your string to UTF-8, You can
          simply enter text in to text box and click relevant button either
          "Encode" or "Decode"
        </p>
      </div>
      <section className="bg-white rounded-md p-4">
        <Form method="post">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="input"
                className="font-medium mb-3 block text- text-base">
                Enter Text to Encode or Decode
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
                Encoded/Decoded Output
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
              value="encode"
              name="operation"
              className="bg-primary text-white px-5 py-2 block rounded-md hover:bg-opacity-90">
              Encode to UTF-8
            </button>
            <button
              type="submit"
              name="operation"
              value="decode"
              className="bg-primary text-white px-5 py-2 block rounded-md hover:bg-opacity-90">
              Decode from UTF-8
            </button>
          </div>
        </Form>
      </section>
      <section className="bg-white rounded-md p-4 mt-5">
        <h2 className="font-semibold mb-3 text-xl border-b border-gray-100 pb-3">
          About Online UTF-8 Encoder/Decoder
        </h2>
        <div className="text-base text-gray-500 font-light">
          <p>
            Sharp SEO Tools bring you the smartest and fastest online UTF-8
            Encoder/Decoder tool for free!
          </p>
          <p className="mt-1">
            This online UTF-8 Encoder/Decoder tool is extremely helpful to
            encode or decode Unicode characters, electronic communication. It
            represents each character with 8 bits since computers work with bits
            in groups of sizes that are powers of 2, but the first bit is always
            0 because it's not needed. Extended ASCII uses the left over space
            in ASCII to encode more characters.
          </p>
        </div>
      </section>
    </>
  );
}
