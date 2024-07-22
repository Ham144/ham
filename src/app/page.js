"use client"
import axios from 'axios';
import React from 'react'

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

  function showMenusLength() {
    const length = axios.get("/api/menuitems").then(res => res.data.length)
    return length
  }

  return (
    <>
      <div className='w-full flex flex-1 justify-center items-center px-4 mx-auto gap-5'>
        <div className='w-[50%] flex flex-col '>
          <h1 className='text-8xl font-bold font-mono text-wrap'>
            Do You Like Fried Rice..??
          </h1>
          <p className='description opacity-60 text-wrap'>
            Welcome to Nasi Goreng, your go-to destination for the most delicious and mouth-watering fried rice menus. Whether you're a fan of classic fried rice or adventurous flavors, we've got something for everyone. Explore our extensive collection of menus, tips, and cooking techniques to elevate your fried rice taste level.
          </p>
          <div className='flex gap-4 items-center'>
            <button className='btn rounded-lg bg-orange-400'>Explore Menu</button>
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img alt="" src="/main-logo.png" />
                </div>
              </div>
              <div className='flex flex-col'>

                <div className="chat-bubble bg-orange-400 text-white">Awesome vary options for you..!!</div>
                <p>{
                  showMenusLength()
                }</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

//buat single product page 
//buat payment page dan hubungkan juga ke fast buy di menu(Nasigoreng.js) 
//tambah produk
//rapikan untuk versi mobile