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

  function fetchingTopSale() {
    let temp = []
    const arr = []
    fetch("/api/menuitems").then(res => res.json()).then(data => temp = data)
    for (let i = 0; i < 3; i++) {
      arr.push(temp[Math.random() * temp.length | 0])
    }
    setTopSale(arr)

  }

  useEffect(() => {
    fetchingTopSale()
  }, [])

  console.log(topSale)

  return (
    <>
      <div className="container-xxl py-5 bg-dark hero-header ">
        <div className="container my-5 py-5 ">
          <div className="row align-items-center g-5 ">
            <div className="col-lg-6 text-center  text-lg-start ">
              <div>
                <div className="badge text-white my-4 gap-2 py-4 glass">
                  Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
                  diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
                  lorem sit clita duo justo magna dolore erat amet
                </div>
              </div>


              <div className="dropdown">
                <label tabIndex={0} className="btn m-1">Do not click this</label>
                <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-orange-400 text-primary-content">
                  <div className="card-body">
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
      <div className="flex flex-col">

        {
          topSale.length > 0 ?
            topSale.map((item) => (
              <div className="card card-side bg-base-100 shadow-xl" key={item?._id}>
                <figure><Image src={item.photo_url} alt="Movie" /></figure>
                <div className="card-body">
                  <h2 className="card-title">New movie is released!</h2>
                  <p>Click the button to watch on Jetflix app.</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Watch</button>
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