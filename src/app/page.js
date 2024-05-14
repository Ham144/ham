"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";



export default function Home() {
  const router = useRouter();
  return (
    <main className="flex flex-col mx-auto ">
      <div className="flex max-md:flex-col-reverse max-md:px-5   justify-center sm:w-[80%] w-full mx-auto items-center">
        <div className="">
          <h1 className="text-3xl text-left flex w-[70%] justify-center font-bold ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, nihil? Commodi, alias.</h1>
          <div className="flex gap-x-4  mt-6">
            <button className="bg-sekunder w-52" onClick={() => window.open("https://web.whatsapp.com/send/?phone=%2B6288262794010&text&type=phone_number&app_absent=0")}>Ask me</button>
            <button className="bg-primer w-52">Buy now</button>
          </div>
        </div>
        <Image src={"/nasigorengtelur.png"} width={300} height={300} alt="nasigorengsosis" />
      </div>
    </main>
  )
}