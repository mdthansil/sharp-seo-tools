import { Form } from "@remix-run/react";
import { Fragment, useState } from "react";
import { RiFileCopyLine } from "react-icons/ri";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";

export const meta = () => {
  return {
    title: "Open Graph Generator - Sharp Seo Tools",
    description:
      "Open Graph Generator is an online tools that let you generate Open graph meta tags for your website more easily",
    keywords:
      "seo, meta, meta tags, open graph, ranking, social share, keywords",
  };
};

const initialValues = {
  siteTitle: "",
  siteName: "",
  siteUrl: "",
  siteDescription: "",
  type: "article",
  images: [""],
};

export default function OpenGraphGenerator() {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImagesCount = (e) => {
    const currentImageCount = values.images.length;
    const newImagesCount = e.target.value;

    if (currentImageCount < newImagesCount) {
      const _prevElements = values.images;
      const _newElements = Array(
        parseInt(newImagesCount - currentImageCount)
      ).fill("");
      setValues({ ...values, images: _prevElements.concat(_newElements) });
    }
    if (currentImageCount > newImagesCount) {
      const _prevElements = values.images;
      _prevElements.splice(currentImageCount - newImagesCount);
      setValues({
        ...values,
        images: _prevElements,
      });
    }
  };

  const handleImages = (e) => {
    const imageUrl = e.target.value;
    const index = e.target.getAttribute("data-index");
    const _newElements = values.images;
    _newElements[index] = imageUrl;
    setValues({ ...values, images: _newElements });
  };

  const handleCopy = () => {
    let textToCopy = `
    <meta property="og:title" content="${values.siteTitle}">
    <meta property="og:site_name" content="${values.siteName}">
    <meta property="og:url" content="${values.siteUrl}">
    <meta property="og:description" content="${values.siteDescription}" >
    <meta property="og:type" content="${values.type}">
    `;
    let images = values.images.map(
      (image) => `    <meta property="og:image" content="${image}">`
    );

    textToCopy += images.join("\n");

    if (copy(textToCopy)) {
      toast.success("Text Copied.");
    }
  };

  return (
    <>
      <div className="text-center px-4 mt-12 mb-8 flex flex-col items-center justify-center">
        <h2 className="font-bold text-2xl tracking-wide">
          Online Open Graph Generator
        </h2>
        <p className="text-sm text-gray-500 tracking-wide mt-2 max-w-xl">
          Whether you want to generate Open Graph meta tags you can simply use
          this tool to generate it.
        </p>
      </div>
      <section className="bg-white rounded-md p-4">
        <div className="mb-5 border-b border-gray-100 flex justify-between items-center pb-3">
          <h2 className="font-semibold text-xl">Enter Meta Details</h2>
        </div>
        <Form method="post" autoComplete="off" onSubmit={() => false}>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <div>
                <label
                  htmlFor="siteTitle"
                  className="font-medium mb-3 block text-base">
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
                  className="font-medium mb-3 block text-base">
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
                  className="font-medium mb-3 block text-base">
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
                  className="font-medium mb-3 block text-base">
                  Description
                </label>
                <textarea
                  id="siteDescription"
                  name="siteDescription"
                  placeholder="Website Description (Up to 200 characters)"
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
                className="font-medium mb-3 block text-base">
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
                className="font-medium mb-3 block text-base">
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
              {Array(parseInt(values.images.length))
                .fill("")
                .map((_, index) => {
                  return (
                    <label
                      key={index}
                      className="font-medium mb-3 block text-base">
                      Image URL {index + 1}
                      <input
                        name="imageUrl"
                        onChange={handleImages}
                        data-index={index}
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
        <div className="mb-3 border-b border-gray-100 flex justify-between items-center pb-3">
          <h2 className="font-semibold text-xl">Results</h2>
          <button
            className="border border-primary/80 text-primary/80 hover:bg-gray-100 flex space-x-1 items-center rounded-md py-1 px-2"
            onClick={handleCopy}>
            <RiFileCopyLine /> <span>Copy</span>
          </button>
        </div>

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
          {values.images.map((image, index) => {
            return (
              <Fragment key={index + Date.now()}>
                &lt;meta property="og:image" content="{image}"&gt;
                <br />
              </Fragment>
            );
          })}
        </div>
      </section>
      <section className="bg-white rounded-md p-4 mt-5">
        <h2 className="font-semibold mb-3 text-xl border-b border-gray-100 pb-3">
          About Open Graph Generator
        </h2>
        <div className="text-base text-gray-500 font-light">
          <p>
            Open Graph generator is one of smartest free online tool from Sharp
            SEO Tools for generating Open Graph Tags.
          </p>
          <p className="mt-1">
            This Open Graph generator tool let you to generate Open Graph Meta
            tags for your website. The Meta tags are more important tags for
            today's website. you may seen that preview of hyper links when we
            share some url's on social media platforms, those previews are
            generated from the Open Graph meta tags.
          </p>
          <p className="mt-1">
            The Meta tags helps to boost your website presence and ranking in
            search engine and also these tags are the helping to reach your
            website to appropriate users.
          </p>
        </div>
      </section>
    </>
  );
}
