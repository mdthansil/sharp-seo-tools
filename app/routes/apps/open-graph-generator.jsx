import { Form, useActionData } from "@remix-run/react";
import { Fragment, useEffect, useState } from "react";
import caseChanger from "underscore.string";

export const action = async ({ request }) => {
  let form = await request.formData();
  let { input, caseType } = Object.fromEntries(form);

  const res = {
    body: "",
    errors: [],
  };

  if (input) {
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

const initialValues = {
  siteTitle: "",
  siteName: "",
  siteUrl: "",
  siteDescription: "",
  type: "article",
  images: {},
};

export default function TextCaseChanger() {
  const data = useActionData();

  const [values, setValues] = useState(initialValues);
  const [imagesCount, setImagesCount] = useState(1);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImagesCount = (e) => {
    setImagesCount(e.target.value);
  };

  const handleImages = (e) => {
    setValues({
      ...values,
      images: {
        ...values.images,
        [e.target.getAttribute("data-name")]: e.target.value,
      },
    });
  };

  useEffect(() => {
    console.log(values);
  }, [values]);

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
        <Form method="post" autoComplete="off">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <div>
                <label
                  htmlFor="siteTitle"
                  className="font-medium mb-3 block text- text-base">
                  Site Title
                </label>
                <input
                  id="siteTitle"
                  name="siteTitle"
                  placeholder="Website Title"
                  onChange={handleChange}
                  className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"></input>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="siteName"
                  className="font-medium mb-3 block text- text-base">
                  Site Name
                </label>
                <input
                  id="siteName"
                  name="siteName"
                  placeholder="Website Name"
                  onChange={handleChange}
                  className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"></input>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="siteUrl"
                  className="font-medium mb-3 block text- text-base">
                  Site URL
                </label>
                <input
                  id="siteUrl"
                  name="siteUrl"
                  placeholder="Website URL"
                  onChange={handleChange}
                  className="w-full border border-gray-200 p-2 rounded-md text-base outline-none"></input>
              </div>
            </div>
            <div>
              <div className="h-full flex flex-col">
                <label
                  htmlFor="siteDescription"
                  className="font-medium mb-3 block text- text-base">
                  Description
                </label>
                <textarea
                  id="siteDescription"
                  name="siteDescription"
                  placeholder="Website Description"
                  onChange={handleChange}
                  className="w-full flex-grow self-stretch border border-gray-200 p-2 rounded-md resize-none text-base outline-none"
                  maxLength={200}></textarea>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="mt-4">
              <label
                htmlFor="type"
                className="font-medium mb-3 block text- text-base">
                Type
              </label>
              <select
                id="type"
                name="type"
                onChange={handleChange}
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none after:w-10">
                <option value="article">Article</option>
                <option value="book">Book</option>
                <option value="books.author">Book Author</option>
                <option value="books.genre">Book Genre</option>
                <option value="business.business">Business</option>
                <option value="fitness.course">Fitness Course</option>
                <option value="music.album">Music Album</option>
                <option value="music.musician">Music Musician</option>
                <option value="music.playlist">Music Playlist</option>
                <option value="music.radio_station">Music Radio Station</option>
                <option value="music.song">Music Song</option>
                <option value="object">Object (Generic Object)</option>
                <option value="place">Place</option>
                <option value="product">Product</option>
                <option value="product.group">Product Group</option>
                <option value="product.item">Product Item</option>
                <option value="profile">Profile</option>
                <option value="quick_election.election">Election</option>
                <option value="restaurant">Restaurant</option>
                <option value="restaurant.menu">Restaurant Menu</option>
                <option value="restaurant.menu_item">
                  Restaurant Menu Item
                </option>
                <option value="restaurant.menu_section">
                  Restaurant Menu Section
                </option>
                <option value="video.episode">Video Episode</option>
                <option value="video.movie">Video Movie</option>
                <option value="video.tv_show">Video TV Show</option>
                <option value="video.other">Video Other</option>
                <option value="website">Website</option>
              </select>
            </div>
            <div className="mt-4">
              <label
                htmlFor="imagesCount"
                className="font-medium mb-3 block text- text-base">
                Number Of Images
              </label>
              <select
                id="imagesCount"
                name="imagesCount"
                onChange={handleImagesCount}
                className="w-full border border-gray-200 p-2 rounded-md text-base outline-none after:w-10">
                {Array(10)
                  .fill("")
                  .map((_, index) => {
                    return (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>

          <div>
            <div className="mt-4">
              {Array(parseInt(imagesCount))
                .fill("")
                .map((_, index) => {
                  return (
                    <label
                      key={index}
                      className="font-medium mb-3 block text- text-base">
                      Image URL {index + 1}
                      <input
                        name="imageUrl"
                        onChange={handleImages}
                        data-name={`imageUrl${index + 1}`}
                        placeholder="Image URL"
                        className="w-full border mt-4 border-gray-200 p-2 rounded-md text-base outline-none"></input>
                    </label>
                  );
                })}
            </div>
          </div>

          <div className="flex justify-center space-x-3 mt-5">
            {/* <button
              type="submit"
              className="bg-primary text-white px-5 py-2 block rounded-md hover:bg-opacity-90">
              Generate Open Graph Tags
            </button> */}
          </div>
        </Form>
      </section>
      <section className="bg-white rounded-md p-4 mt-5">
        <h2 className="font-semibold mb-3 text-xl border-b border-gray-100 pb-3">
          Result
        </h2>
        <div className="text-base text-gray-500 font-mono">
          &lt;meta property="og:title" content="{values.siteTitle}"&gt;
          <br />
          &lt;meta property="og:site_name" content="{values.siteName}"&gt;
          <br />
          &lt;meta property="og:url" content="{values.siteUrl}"&gt;
          <br />
          &lt;meta property="og:description" content="{values.siteDescription}"
          &gt;
          <br />
          &lt;meta property="og:type" content="{values.type}"&gt;
          <br />
          {Object.values(values.images).map((url, index) => {
            return (
              <Fragment key={index}>
                &lt;meta property="og:image" content="{url}"&gt;
                <br />
              </Fragment>
            );
          })}
        </div>
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
