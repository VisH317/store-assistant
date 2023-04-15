import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Nav from "~/Components/Nav/nav";
import { raleway } from "~/utils/fonts";

import { api } from "~/utils/api";


const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
        <Head>
            <title>Create T3 App</title>
            <meta name="description" content="Generated by create-t3-app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex min-h-screen flex-col bg-white">
            <Nav/>
            <div className={`h-1/2 p-10 w-full bg-slate-200 flex flex-row font-sans ${raleway.variable} py-20`}>
              <div className="w-1/2 flex justify-center items-center flex-col gap-5">
                <p className="font-semibold text-5xl hover:-translate-y-1 duration-300">Create AI Store Assistants in Minutes</p>
                <p className="text-lg font-light text-center w-[70%] hover:-translate-y-1 duration-300">Leveraging AI technology to create smart store assistants to make it easier for customers to find products, including people with a language barrier! Providing technology interfaces to real-world store locations</p>
                <button className='w-[30%] h-16 text-white bg-violet-500 text-2xl font-normal disabled:cursor-not-allowed cursor-pointer disabled:hover:bg-violet-50 rounded-md disabled:bg-violet-100 enabled:hover:bg-violet-600 enabled:hover:text-gray-200 enabled:hover:-translate-y-1 enabled:hover:shadow-md duration-300'>Get Started</button>
              </div>
              <div className="w-1/2 flex justify-start">
                <Image src="/undraw_shopping_app_flsj.svg" alt="bruh" width={650} height={100} className="ml-[10%] hover:-translate-y-1 duration-300"/>
              </div>
            </div>
            <div className={`p-10 w-full flex flex-row font-sans ${raleway.variable} py-20`}>
              <div className="w-1/2 flex justify-center">
                <Image src="/undraw_shopping_bags_tdby.svg" alt="bruh" width={700} height={100} className="hover:-translate-y-1 duration-300"/>
              </div>
              <div className="w-1/2 flex flex-col justify-center items-center gap-10">
                <p className="text-6xl">Very easy to use</p>
                <p className="text-6xl">Multiple languages</p>
                <p className="text-6xl">Easy to integrate</p>
              </div>
            </div>
        </main>
    </>
  );
};

export default Home;
