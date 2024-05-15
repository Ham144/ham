"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function Home() {
  const router = useRouter();
  const images = ["/nasigorengayam.png", "/nasigorengsosis.png", "/nasigorengtelur.png"]
  const [imagesrc, setimagesrc] = useState(images[1])
  const


    useEffect(() => {
      setimagesrc(images)
    }, [inter])

  return (
    <main className="flex  mx-auto 
    min-h-screen ">
      <div className="w-full h-screen flex flex-col justify-center  items-center">
        <Image src={imagesrc} className=" animate-bounce-slow" alt="logo" width={800} height={800} />
        <div className="shadow-sm blur-md bg-black w-[300px] h-[10px] mt-[-60px] animate-ping-slow">
        </div>
      </div>
      <div className="flex ">

      </div>

    </main >
  )
}