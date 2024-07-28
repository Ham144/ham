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
      <div className='flex-col pb-12 md:px-9 px-2 min-h-screen mx-auto '>
        <div className='md:flex flex-1 mx-auto  items-center md:py-[100px]'>
          <div className='w-[50%] flex flex-col gap-5 flex-1'>
            <h1 className='md:text-8xl font-bold font-serif text-wrap drop-shadow-lg'>
              Do You Like Fried Rice..??
            </h1>
            <p className='description opacity-60 text-wrap'>
              Welcome to Nasi Goreng, your go-to destination for the most delicious and mouth-watering fried rice menus. Whether you're a fan of classic fried rice or adventurous flavors, we've got something for everyone. Explore our extensive collection of menus, tips, and cooking techniques to elevate your fried rice taste level.
            </p>
            <div className='flex gap-4 items-center'>
              <button className='btn rounded-xl shadow-lg bg-orange-400'>Explore Menu</button>
              <div className="chat chat-start ">
                <div className="chat-image avatar ">
                  <div className="w-10 rounded-full ">
                    <img alt="" src="/main-logo.png" />
                  </div>
                </div>
                <div className='flex items-center gap-5 '>
                  <div className="chat-bubble bg-orange-400 shadow-md text-white">Awesome vary options for you..!!</div>
                  <p className='text-2xl badge p-4 bg-orange-400 shadow-md font-extrabold'>{
                    menuLength
                  }+ <span className='text-sm px-3'>masterpieces</span></p>
                </div>

              </div>
            </div>
          </div>
          <div className='w-[50%] flex flex-col mx-auto flex-1'>
            <Image src={"/home-page.png"} className='scale-x-[-1] drop-shadow-lg pr-0' width={1000} height={1000} />
          </div>
        </div>
        <h2 className='text-2xl text-center font-mono text-orange-500 py-4'>Popular</h2>
        <div className='grid md:grid-cols-3  gap-5 mx-auto items-center w-[95%]'>
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

//TODO: buat payment page dan hubungkan juga ke fast buy di menu(Nasigoreng.js) 
//TODO: tambah produk
//TODO: rapikan untuk versi mobile