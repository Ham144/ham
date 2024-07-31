"use client"
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Popular from './components/Popular';
import AboutSection from './components/AboutSection';
import WhyChooseUs from './components/WhyChooseUs';

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];

const App = () => {
  const [menuLength, setMenuLength] = useState(0)
  const [popular, setPopular] = useState(["xmnmxni", "nxmnxmnx", "nxmnxm"])

  function getMenuLength() {
    const res = axios.get("/api/menuitems").then(res => {
      setPopular([res.data[1], res.data[5], res.data[3]])
      setMenuLength(res.data.length)
    })
  }

  useEffect(() => {
    getMenuLength()
  }, [])
  return (
    <>
      <div className='flex-col pb-12 md:px-9 px-2 min-h-screen mx-auto max-md:py-4 max-md:w-screen overflow-x-hidden'>
        <div className='md:flex flex-1 mx-auto  items-center md:py-[100px]'>
          <div className='lg:w-[50%] flex flex-col gap-5 flex-1 '>
            <h1 className='md:text-8xl text-5xl  font-bold font-sans text-gray-700  text-wrap drop-shadow-lg max-md:z-20 max-md:text-center'>
              Do You Like Fried Rice..??
            </h1>
            <p className='description lg:opacity-60  text-wrap max-md:z-20 '>
              Welcome to Nasi Goreng, your go-to destination for the most delicious and mouth-watering fried rice menus. Whether you're a fan of classic fried rice or adventurous flavors, we've got something for everyone. Explore our extensive collection of menus, tips, and cooking techniques to elevate your fried rice taste level.
            </p>
            <div className='flex gap-4 items-center max-md:flex-col'>
              <div className="chat chat-start flex max-md:flex-col">
                <div className="chat-image avatar max-md:hidden">
                  <div className="w-10 rounded-full ">
                    <img alt="" src="/main-logo.png" />
                  </div>
                </div>
                <div className='flex  items-center gap-5 '>
                  <div className="chat-bubble max-md:w-full  bg-orange-400 shadow-md text-white">Awesome vary options for you..!!</div>
                  <p className='max-md:py-8 text-2xl badge lg:p-6 bg-orange-400 shadow-md font-extrabold max-md:self-end max-md:w-[40%] max-md:text-sm max-md:flex-col max-md:text-white max-md:rounded-lg max-md:bg-gradient-to-tr max-md:from-orange-500 max-md:to-yellow-300 '>{
                    menuLength
                  }+ <span className='text-sm px-3 '>masterpieces</span></p>
                </div>

              </div>
              <button className='btn lg:animate-bounce hover:animate-none rounded-xl shadow-lg max-md:flex-1 max-md:flex glass bg-orange-500 max-md:w-full'>Explore Menu 👀</button>

            </div>
          </div>
          <div className='lg:w-[50%] flex flex-col mx-auto flex-1 max-md:absolute max-md:top-56 max-md:opacity-40 '>
            <Image src={"/home-page.png"} className='scale-x-[-1] drop-shadow-lg pr-0  max-md:w-screen max-md:mx-auto ' width={1000} height={1000} />
          </div>
        </div>
        <h2 className='text-2xl text-center font-mono text-orange-500 py-4'>Popular</h2>
        <div className='grid md:grid-cols-3  gap-5 mx-auto items-center lg:w-[95%] w'>
          {popular && popular.length > 1 ?
            popular.map((item) => (
              <Popular popular={item} />
            ))
            :
            <span className="loading loading-spinner w-[300px] h-[300px] mx-auto self-center"></span>
          }
        </div>
        <AboutSection />
        <WhyChooseUs />
      </div>
    </>
  )
}

export default App

//TODO: rapikan untuk versi mobile