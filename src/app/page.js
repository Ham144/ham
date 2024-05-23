"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "../../public/styling/style.css"


export default function Home() {
  const router = useRouter();
  const images = ["/nasigorengayam.png", "/nasigorengsosis.png", "/nasigorengtelur.png"]
  const [imagesrc, setimagesrc] = useState(images[1])



  return (
    <>
      <div className="container-xxl py-5 bg-dark hero-header ">
        <div className="container my-5 py-5 ">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 text-center  text-lg-start">
              <h1 className="text-3xl text-yellow-500 font-thin">
                Enjoy Our
                <br />
                Delicious Meal
              </h1>
              <p className="font-cursive text-white w-[50%] mx-auto flex-wrap">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
                diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
                lorem sit clita duo justo magna dolore erat amet
              </p>
              <button
                href=""
                className="bg-yellow-600 hover:bg-yellow-50 border px-4 py-1 rounded-lg"
              >
                Book A Table
              </button>
            </div>
            <div className="col-lg-6 text-center text-lg-end overflow-hidden">
              <Image className="img-fluid mx-auto" src="/img/hero.png" alt="" width={500} height={500} />
            </div>
          </div>
        </div>
      </div>
      {/* Navbar & Hero End */}
      {/* Service Start */}
      <div className="md:w-[50%] mx-auto px-5 h-screen" lazy="true" >
        <div className="container ">
          <div className="grid grid-cols-4 cursor-pointer gap-5 mt-5 mb-32">
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s" >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-user-tie text-primary mb-4" />
                  <h5>Master Chefs</h5>
                  <p>
                    Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                    amet diam
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-utensils text-primary mb-4" />
                  <h5>Quality Food</h5>
                  <p>
                    Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                    amet diam
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-cart-plus text-primary mb-4" />
                  <h5>Online Order</h5>
                  <p>
                    Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                    amet diam
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <i className="fa fa-3x fa-headset text-primary mb-4" />
                  <h5>24/7 Service</h5>
                  <p>
                    Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita
                    amet diam
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
      {/* Service End */}
    </>

  )
}