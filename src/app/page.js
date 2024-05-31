"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "../../public/styling/style.css"


export default function Home() {
  const router = useRouter();
  const images = ["/nasigorengayam.png", "/nasigorengsosis.png", "/nasigorengtelur.png"]
  const [imagesrc, setimagesrc] = useState(images[1])
  const [topSale, setTopSale] = useState([])


  async function fetchingTopSale() {
    const temp = []
    const res = await fetch("/api/menuitems")
    if (res.ok) {
      const data = await res.json()
      for (let i = 0; i < 3; i++) {
        temp.push(data[Math.random() * data.length | 0])
      }
    }
    setTopSale(temp)
  }

  console.log(topSale)
  useEffect(() => {
    fetchingTopSale()
  }, [])


  return (
    <>
      <div className="container-xxl py-5 bg-dark hero-header ">
        <div className="container my-5 py-5 ">
          <div className="row align-items-center g-5 ">
            <div className="col-lg-6 text-center  text-lg-start ">
              <div>
                <div className="badge text-white my-4 gap-2 py-8 glass md:w-[50%]  px-1">
                  Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
                  diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
                  lorem sit clita duo justo magna dolore erat amet
                </div>
              </div>


              <div className="dropdown">
                <label tabIndex={0} className="btn m-1">Do not click this</label>
                <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-orange-400 text-primary-content">
                  <div className="card-body ">
                    <h3 className="card-title">Browse Menu ?</h3>
                    <button className="btn" onClick={() => router.push("/menu")}>
                      why not
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 text-center text-lg-end overflow-hidden">
              <Image className="img-fluid mx-auto" src="/img/hero.png" alt="" width={500} height={500} />
            </div>
          </div>
        </div>
      </div>
      {/* Navbar & Hero End */}
      <div className="flex flex-wrap w-[52%] pb-20 mx-auto">

        {
          topSale.length > 0 ?
            topSale.map((item) => (
              <div className="card mt-2 px-4 card-side bg-base-100 hover:bg-base-200 shadow-xl mb-5 w-full h-44" key={item?._id}>
                <figure><Image src={item?.photoUrl} className="w-full  bg-cover" width={`200`} height={`200`} alt="Movie" /></figure>
                <div className="card-body w-[60%] h-full flex justify-center">
                  <h2 className="card-title uppercase">{item?.menuItem}</h2>
                  <div className="dropdown">
                    <label tabIndex={0} className="btn m-1">Description</label>
                    <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-primary text-primary-content">
                      <div className="card-body">
                        <h3 className="card-title">Description</h3>
                        <p>{item?.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="card-actions justify-end ">
                    <button className="btn bg-orange-400 " onClick={() => { router.push("/menu") }}>Look</button>
                  </div>
                </div>
              </div>
            ))
            : <span className="loading loading-spinner loading-lg"></span>
        }
      </div>
    </>

  )
}