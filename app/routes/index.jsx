import Sidebar from "~/components/Layout/Sidebar";
import AppIconCard from "~/components/AppIconCard";
import { Ri24HoursFill } from "react-icons/ri";
export default function Index() {
  return (
    <>
      <div className='text-center px-4 mt-12 mb-8'>
        <h2 className='font-bold text-xl tracking-wide'>
          Free SEO, Digital Marketing and Utility tools
        </h2>
        <p className='text-xs text-gray-500 tracking-wide mt-0.5'>
          The Best Free Seo, Digital Marketing &amp; Utility Tool You will ever
          need
        </p>
      </div>
      <div className='grid grid-cols-4 gap-5 mx-auto max-w-7xl'>
        <div className='col-span-3'>
          <section>
            <h2 className='font-semibold text-lg'>Hashing Tools</h2>
            <div className='grid grid-cols-3 gap-5 mt-2'>
              <AppIconCard
                icon={<Ri24HoursFill />}
                label='Base 64 Encoder/Decoder'
                path='/base64-encoder-decoder'
                isNew
              />
              <AppIconCard
                icon={<Ri24HoursFill />}
                label='URL Encoder/Decoder'
                path='/url-encoder-decoder'
                isNew
              />
              <AppIconCard
                icon={<Ri24HoursFill />}
                label='MD5 Generator'
                path='/md5-generator'
                isNew
              />
              <AppIconCard
                icon={<Ri24HoursFill />}
                label='JWT Token Generator'
                path='/jwt-token-generator'
                isNew
              />
              <AppIconCard
                icon={<Ri24HoursFill />}
                label='Encrypted Password Generator'
                path='/encrypted-password-generator'
                isNew
              />
            </div>
          </section>
          <section className='mt-6'>
            <h2 className='font-semibold text-lg'>Website Management Tools</h2>
            <div className='grid grid-cols-3 gap-5 mt-2'>
              <div className='col-span-2 grid grid-cols-2 gap-5'>
                <AppIconCard
                  icon={<Ri24HoursFill />}
                  label='Meta Tag Generator'
                  path='/meta-tag-generator'
                />
                <AppIconCard
                  icon={<Ri24HoursFill />}
                  label='Open Graph Generator'
                  path='/open-graph-generator'
                />
                <AppIconCard
                  icon={<Ri24HoursFill />}
                  label='Twitter Card Generator'
                  path='/twitter-card-generator'
                  isNew
                />
                <AppIconCard
                  icon={<Ri24HoursFill />}
                  label='Sitemap Generator'
                  path='/sitemap-generator'
                  isNew
                />
                <AppIconCard
                  icon={<Ri24HoursFill />}
                  label='Robot Text Generator'
                  path='/robot-text-generator'
                  isNew
                />
                <AppIconCard
                  icon={<Ri24HoursFill />}
                  label='Manifest.json Generator'
                  path='/manifest-json-generator'
                />
              </div>
              <div className='bg-white rounded-md flex items-center justify-center'>
                Ads
              </div>
            </div>
          </section>
          <section className='mt-6'>
            <h2 className='font-semibold text-lg'>Validation Tools</h2>
            <div className='grid grid-cols-3 gap-5 mt-2'>
              <AppIconCard
                icon={<Ri24HoursFill />}
                label='Open Graph Checker'
                path='/open-graph-checker'
                isNew
              />
              <AppIconCard
                icon={<Ri24HoursFill />}
                label='Meta Analyser'
                path='/meta-analyser'
                isNew
              />
            </div>
          </section>
          <div className='w-full bg-white flex items-center justify-center h-28 rounded-md mt-10'>
            ads
          </div>
          <section className='mt-6'>
            <h2 className='font-semibold text-lg'>Utility Tools</h2>
            <div className='grid grid-cols-3 gap-5 mt-2'>
              <div className='col-span-2 grid grid-cols-2 gap-5'>
                <AppIconCard
                  icon={<Ri24HoursFill />}
                  label='RGB to Hex'
                  path='/rgb-to-hex'
                />
                <AppIconCard
                  icon={<Ri24HoursFill />}
                  label='Hex to RBG'
                  path='/hex-to-rgb'
                  isNew
                />
                <AppIconCard
                  icon={<Ri24HoursFill />}
                  label='Email Text Extractor'
                  path='/email-text-extractor'
                />
                <AppIconCard
                  icon={<Ri24HoursFill />}
                  label='QR Code Generator'
                  path='/qr-code-generator'
                  isNew
                />
                <AppIconCard
                  icon={<Ri24HoursFill />}
                  label='What is my IP'
                  path='/what-is-my-ip'
                />
                <AppIconCard
                  icon={<Ri24HoursFill />}
                  label='What is my Screen Resolution'
                  path='/what-is-my-screen-resolution'
                  isNew
                />
              </div>
              <div className='bg-white rounded-md flex items-center justify-center'>
                Ads
              </div>
            </div>
          </section>
          <div className='w-full bg-white flex items-center justify-center h-28 rounded-md mt-10'>
            ads
          </div>
          <section className='mt-6'>
            <h2 className='font-semibold text-lg'>Binary Convertor Tools</h2>
            <div className='grid grid-cols-3 gap-5 mt-2'>
              <AppIconCard
                icon={<Ri24HoursFill />}
                label='Text to Binary'
                path='/text-to-binary'
                isNew
              />
              <AppIconCard
                icon={<Ri24HoursFill />}
                label='Binary to Text'
                path='/binary-to-text'
                isNew
              />
              <AppIconCard
                icon={<Ri24HoursFill />}
                label='Text to ASCII'
                path='/text-to-ascii'
                isNew
              />
            </div>
          </section>
          <div className='w-full bg-white flex items-center justify-center h-28 rounded-md mt-10'>
            ads
          </div>
          <section className='mt-6'>
            <h2 className='font-semibold text-lg'>Online Calculator</h2>
            <div className='grid grid-cols-3 gap-5 mt-2'>
              <AppIconCard
                icon={<Ri24HoursFill />}
                label='Age Calculator'
                path='/age-calculator'
                isNew
              />
              <AppIconCard
                icon={<Ri24HoursFill />}
                label='Percentage Calculator'
                path='/percentage-calculator'
                isNew
              />
              <AppIconCard
                icon={<Ri24HoursFill />}
                label='Average Calculator'
                path='/average-calculator'
                isNew
              />
              <AppIconCard
                icon={<Ri24HoursFill />}
                label='Discount Calculator'
                path='/discount-calculator'
                isNew
              />
            </div>
          </section>
        </div>
        <Sidebar />
      </div>
    </>
  );
}
