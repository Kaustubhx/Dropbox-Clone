import Image from 'next/image'
import { UserButton } from "@clerk/nextjs";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className=''>
      <div className='flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800'>
        <div className='p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-5'>
          <h1 className='text-5xl font-bold'>
            Welcome To Dropbox <br />
            <br />
            Storing everything for you and your business needs. All in one place
          </h1>

          <p className='pb-20'>
            Enhance your personal storage with Dropbox, offering a simple and efficient way to upload, organize, and access files from anywhere. Securely store important documents and media, and experience the convenience of easy life management and sharing in one centralize solution.
          </p>

          <Link
            href={'/dashboard'}
            className='flex cursor-pointer bg-blue-500 p-5 w-fit'
          >
            Try it for free!
            <ArrowRight className='ml-10' />
          </Link>
        </div>

        <div className='bg-[#1e1919] dark:bg-slate-800 h-full p-10'>
          <video autoPlay muted className='rounded-lg' >
            <source
              src='https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4 '
              type='video/mp4'
            />
            Your Browser does not support video
          </video>
        </div>
      </div>
    </main>
  )
}
