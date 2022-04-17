import { Form, useActionData } from "@remix-run/react";
import caseChanger from "underscore.string";

export const action = async ({ request }) => {
  let form = await request.formData();
  let { input, caseType } = Object.fromEntries(form);

  const res = {
    body: "",
    errors: [],
  };

  if (input) {
    switch (caseType) {
      case "upperCase":
        res.body = input.toUpperCase();
        break;
      case "lowerCase":
        res.body = input.toLowerCase();
        break;
      case "camelCase":
        res.body = caseChanger.camelize(input);
        break;
      case "titleCase":
        res.body = caseChanger.titleize(input);
        break;
      case "capitalize":
        res.body = caseChanger.capitalize(input);
        break;
      case "deCapitalize":
        res.body = caseChanger.decapitalize(input);
        break;
      case "swapCase":
        res.body = caseChanger.swapCase(input);
        break;
      case "snakeCase":
        res.body = caseChanger.underscored(input);
        break;
      case "slugCase":
        res.body = caseChanger.slugify(input);
        break;
      default:
        res.body = input;
    }
  } else {
    res.errors.push("Please enter a valid text");
  }
  return res;
};

export const meta = () => {
  return {
    title: "Text Case Changer - Sharp Seo Tools",
    description:
      "Text Case Changer is a online tools which help to to convert text to Uppercase, Lowercase, Title Case, Snake Case etc.",
    keywords:
      "text tools, uppercase, lowercase, camel case, title case, text case changer",
  };
};

export default function TextCaseChanger() {
  const data = useActionData();

  return (
    <>
      <div className="text-center px-4 mt-12 mb-8 flex flex-col items-center justify-center">
        <h2 className="font-bold text-2xl tracking-wide">
          Online Text Case Changer
        </h2>
        <p className="text-sm text-gray-500 tracking-wide mt-2 max-w-xl">
          Whether you want to change the case of text to uppercase , lowercase
          etc, You can simply enter text in to text then choose relevant option
          and click the convert button.
        </p>
      </div>
      <section className="bg-white rounded-md p-4">
        <Form method="post">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="input"
                className="font-medium mb-3 block text- text-base">
                Enter Text to change the case
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
                Converted Text
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
          <div className="border border-gray-100 rounded-md grid grid-cols-6 p-4 gap-3 mt-4 bg-gray-50 ">
            <label className="flex space-x-1 items-center">
              <input type="radio" name="caseType" value="upperCase" />
              <span>UPPERCASE</span>
            </label>
            <label className="flex space-x-1 items-center">
              <input type="radio" name="caseType" value="lowerCase" />
              <span>lowercase</span>
            </label>
            <label className="flex space-x-1 items-center">
              <input type="radio" name="caseType" value="camelCase" />
              <span>camelCase</span>
            </label>
            <label className="flex space-x-1 items-center">
              <input type="radio" name="caseType" value="titleCase" />
              <span>TitleCase</span>
            </label>
            <label className="flex space-x-1 items-center">
              <input type="radio" name="caseType" value="capitalize" />
              <span>Capitalize</span>
            </label>
            <label className="flex space-x-1 items-center">
              <input type="radio" name="caseType" value="deCapitalize" />
              <span>de Capitalize</span>
            </label>
            <label className="flex space-x-1 items-center">
              <input type="radio" name="caseType" value="swapCase" />
              <span>sWAP cASE</span>
            </label>
            <label className="flex space-x-1 items-center">
              <input type="radio" name="caseType" value="snakeCase" />
              <span>snake_case</span>
            </label>

            <label className="flex space-x-1 items-center">
              <input type="radio" name="caseType" value="slugCase" />
              <span>slug-case</span>
            </label>
          </div>
          <div className="flex justify-center space-x-3 mt-5">
            <button
              type="submit"
              className="bg-primary text-white px-5 py-2 block rounded-md hover:bg-opacity-90">
              Change Case
            </button>
          </div>
        </Form>
      </section>
      <section className="bg-white rounded-md p-4 mt-5">
        <h2 className="font-semibold mb-3 text-xl border-b border-gray-100 pb-3">
          About Text Case Change
        </h2>
        <div className="text-base text-gray-500 font-light">
          <p>
            Sharp SEO Tools bring you the smartest and fastest online Text Case
            Changer tool for free!
          </p>
          <p className="mt-1">
            This Text Case Change tool is extremely helpful to transform text
            cases to different forms like Uppercase ,lowercase , CamelCase,
            SnakeCase, Capitalize etc. This tool is very handy for all kind of
            users who are working with text.
          </p>
        </div>
      </section>
    </>
  );
}
