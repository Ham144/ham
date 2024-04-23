import Image from "next/image";



export default function Home() {
  return (
    <main className="flex flex-col mx-auto ">
      <div className="flex max-md:flex-col-reverse max-md:px-5   justify-center sm:w-[80%] w-full mx-auto items-center">
        <div className="">
          <h1 className="text-3xl text-left flex w-[70%] justify-center font-bold ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, nihil? Commodi, alias.</h1>
          <div className="flex gap-x-4  mt-6">
            <button className="bg-sekunder w-52">Ask me</button>
            <button className="bg-primer w-52">Buy now</button>
          </div>
        </div>
        <Image src={"/nasigorengtelur.png"} width={300} height={300} alt="nasigorengsosis" />
      </div>
    </main>
  )
}