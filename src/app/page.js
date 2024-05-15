"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function Home() {
  const router = useRouter();
  const images = ["/nasigorengayam.png", "/nasigorengsosis.png", "/nasigorengtelur.png"]
  const [imagesrc, setimagesrc] = useState(images[1])

  const inter = () => {
    let i = 0;
    const jumping = setInterval(() => {
      setimagesrc(images[i])
      if (i == images.length - 1) {
        i = 0
      }
      else {
        i++
      }
    }, 10000);
    clearInterval(jumping)
  }

  useEffect(() => {
    inter()
  }, [])


  return (
    <main className="flex  mx-auto 
    min-h-screen ">
      <div className="w-full h-screen flex flex-col justify-center  items-center ">
        <Image src={imagesrc} className="md:w-[600px] h-fit max-md:w-[200px] animate-bounce-slow" alt="logo" width={800} height={800} />
      </div>
      <div className="flex ">

      </div>

    </main >
  )
}