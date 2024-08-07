"use client"

import Image from "next/image";
import { LuDatabaseBackup } from "react-icons/lu";
import { SiAdobephotoshop, SiAffinitydesigner } from "react-icons/si";
import { GiConfrontation } from "react-icons/gi";
import { FaFacebook } from "react-icons/fa6";
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";


export default function ContactPage() {

    function getLinkedin(e) {
        const url = "www.linkedin.com/in/yafiz-ham-b589051a9"
        e.preventDefault();
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    return (

        <div className="min-h-screen  mx-auto flex duration-300">

            <div class="grid grid-cols-2 mx-auto mt-1 shadow-lg w-full rounded-sm max-md:grid-cols-1 pb-14">
                <figure class="flex flex-col items-center justify-center p-8 text-center bg-orange-50 border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700 hover:bg-gradient-to-br hover:from-orange-300 hover:to-yellow-300">
                    <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                        <p class="font-extrabold text-3xl flex gap-4"><LuDatabaseBackup />Back-end and Apis</p>
                    </blockquote>
                    <figcaption class="flex items-center justify-center ">
                        <Image class="rounded-full w-9 h-9" src="/ham.png" alt="profile picture" width={300} height={300} />
                        <div class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                            <div>Yafiz Ham</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400 ">Developer at parent&apos;s house</div>
                        </div>
                    </figcaption>
                    <div class="flex items-start gap-5  justify-start mt-3">
                        <a href="https://github.com/Ham144/" target="_blank" rel="noopener noreferrer">
                            <FaGithub size={37} href="" className="hover:bg-white p-2 rounded-md" />
                        </a>

                        <a href="https://x.com/hambebe144" target="_blank" rel="noopener noreferrer">
                            <FaTwitter size={37} href="" className="hover:bg-white p-2 rounded-md " />
                        </a>

                        <a href="https://www.youtube.com/@myafizhambb144" target="_blank" rel="noopener noreferrer">
                            <FaYoutube size={37} href="" className="hover:bg-white p-2 rounded-md " />
                        </a>
                        <a href="http://www.linkedin.com/in/yafiz-ham-b589051a9" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={37} className="hover:bg-white p-2 rounded-md " />
                        </a>
                    </div>
                </figure>

                <figure class="flex flex-col items-center justify-center p-8 text-center bg-orange-50 border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700 hover:bg-gradient-to-br hover:from-orange-300 hover:to-yellow-300">
                    <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                        <p class="font-extrabold text-3xl flex gap-4"><GiConfrontation />Front-end and UIs</p>
                    </blockquote>
                    <figcaption class="flex items-center justify-center ">
                        <Image class="rounded-full w-9 h-9" src="/ham.png" alt="profile picture" width={300} height={300} />
                        <div class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                            <div>Yafiz Ham</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400 ">Developer at parent&apos;s house</div>
                        </div>
                    </figcaption>
                    <div class="flex items-start gap-5  justify-start mt-3">
                        <a href="https://github.com/Ham144/" target="_blank" rel="noopener noreferrer">
                            <FaGithub size={37} href="" className="hover:bg-white p-2 rounded-md" />
                        </a>


                        <a href="https://x.com/hambebe144" target="_blank" rel="noopener noreferrer">
                            <FaTwitter size={37} href="" className="hover:bg-white p-2 rounded-md " />
                        </a>

                        <a href="https://www.youtube.com/@myafizhambb144" target="_blank" rel="noopener noreferrer">
                            <FaYoutube size={37} href="" className="hover:bg-white p-2 rounded-md " />
                        </a>
                        <a href="http://www.linkedin.com/in/yafiz-ham-b589051a9" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={37} className="hover:bg-white p-2 rounded-md " />
                        </a>
                    </div>
                </figure>

                <figure class="flex flex-col items-center justify-center p-8 text-center bg-orange-50 border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700 hover:bg-gradient-to-br hover:from-orange-300 hover:to-yellow-300">
                    <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                        <p class="font-extrabold text-3xl flex gap-4"><SiAffinitydesigner />Design and UXs</p>
                    </blockquote>
                    <figcaption class="flex items-center justify-center ">
                        <Image class="rounded-full w-9 h-9" src="/ham.png" alt="profile picture" width={300} height={300} />
                        <div class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                            <div>Yafiz Ham</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400 ">Developer at parent&apos;s house</div>
                        </div>

                    </figcaption>
                    <div class="flex items-start gap-5  justify-start mt-3">
                        <a href="https://github.com/Ham144/" target="_blank" rel="noopener noreferrer">
                            <FaGithub size={37} href="" className="hover:bg-white p-2 rounded-md" />
                        </a>


                        <a href="https://x.com/hambebe144" target="_blank" rel="noopener noreferrer">
                            <FaTwitter size={37} href="" className="hover:bg-white p-2 rounded-md " />
                        </a>

                        <a href="https://www.youtube.com/@myafizhambb144" target="_blank" rel="noopener noreferrer">
                            <FaYoutube size={37} href="" className="hover:bg-white p-2 rounded-md " />
                        </a>
                        <a href="http://www.linkedin.com/in/yafiz-ham-b589051a9" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={37} className="hover:bg-white p-2 rounded-md " />
                        </a>
                    </div>
                </figure>

                <figure class="flex flex-col items-center rounded-none justify-center p-8 text-center bg-orange-50 border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700 hover:bg-gradient-to-br hover:from-orange-300 hover:to-yellow-300">
                    <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                        <p class="font-extrabold text-3xl flex gap-4"><SiAdobephotoshop /> Models and Images</p>
                    </blockquote>
                    <figcaption class="flex items-center justify-center ">
                        <Image class="rounded-full w-9 h-9" src="/ham.png" alt="profile picture" width={300} height={300} />
                        <div class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                            <div>Yafiz Ham</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400 ">Developer at parent&apos;s house</div>
                        </div>
                    </figcaption>
                    <div class="flex items-start gap-5  justify-start mt-3">
                        <a href="https://github.com/Ham144/" target="_blank" rel="noopener noreferrer">
                            <FaGithub size={37} href="" className="hover:bg-white p-2 rounded-md" />
                        </a>


                        <a href="https://x.com/hambebe144" target="_blank" rel="noopener noreferrer">
                            <FaTwitter size={37} href="" className="hover:bg-white p-2 rounded-md " />
                        </a>

                        <a href="https://www.youtube.com/@myafizhambb144" target="_blank" rel="noopener noreferrer">
                            <FaYoutube size={37} href="" className="hover:bg-white p-2 rounded-md " />
                        </a>
                        <a href="http://www.linkedin.com/in/yafiz-ham-b589051a9" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={37} className="hover:bg-white p-2 rounded-md " />
                        </a>
                    </div>
                </figure>

            </div>


        </div>
    )
}
