"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { lazy, useEffect, useState } from "react";
import "../../public/styling/style.css"
import { Suspense } from "react";
const TopSale = lazy(() => import('./components/TopSale'));

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
      {
        <Suspense fallback={
          <span className="loading loading-ring loading-lg text-center mx-auto flex flex-1"></span>
        }>
          <TopSale topSale={topSale} />
        </Suspense>

      }

    </>

  )
}