export default function AboutPage() {
    return (
        <div className="w-full min-h-screen flex">
            <div className="join join-vertical md:w-[50%] mx-auto mt-12  hover:shadow-2xl">

                <div className="collapse collapse-arrow join-item border border-base-300 hover:bg-slate-300">
                    <input type="radio" name="my-accordion-4" checked="checked" />
                    <div className="collapse-title text-xl font-medium ">
                        What is this website purposed for?
                    </div>
                    <div className="collapse-content">
                        <p>Selling a variety of Fried rice from different countries, because i believe that majority of people likes the taste of it</p>
                    </div>
                </div>

                <div className="collapse collapse-arrow join-item border border-base-300 hover:bg-slate-300">
                    <input type="radio" name="my-accordion-4" checked="checked" />
                    <div className="collapse-title text-xl font-medium ">
                        What is your name?
                    </div>
                    <div className="collapse-content">
                        <p>I am Yafiz ham, you can call me Ham</p>
                    </div>
                </div>

                <div className="collapse collapse-arrow join-item border border-base-300 hover:bg-slate-300">
                    <input type="radio" name="my-accordion-4" checked="checked" />
                    <div className="collapse-title text-xl font-medium ">
                        What is your hobby?
                    </div>
                    <div className="collapse-content">
                        <p>My hobby is coding</p>
                    </div>
                </div>

                <div className="collapse collapse-arrow join-item border border-base-300 hover:bg-slate-300">
                    <input type="radio" name="my-accordion-4" checked="checked" />
                    <div className="collapse-title text-xl font-medium ">
                        Have you get married?
                    </div>
                    <div className="collapse-content">
                        <p>that&apos;s weird question, i don&apos;t even have girlfriend my entire life </p>
                    </div>
                </div>

                <div className="collapse collapse-arrow join-item border border-base-300 hover:bg-slate-300">
                    <input type="radio" name="my-accordion-4" checked="checked" />
                    <div className="collapse-title text-xl font-medium ">
                        Are you stright?
                    </div>
                    <div className="collapse-content">
                        <p>Yes, Sure </p>
                    </div>
                </div>

                <div className="collapse collapse-arrow join-item border border-base-300 hover:bg-slate-300">
                    <input type="radio" name="my-accordion-4" checked="checked" />
                    <div className="collapse-title text-xl font-medium ">
                        Your favorite music?
                    </div>
                    <div className="collapse-content">
                        <p>there are tons, but for general i like Phonk recently</p>
                    </div>
                </div>

                <div className="collapse collapse-arrow join-item border border-base-300 hover:bg-slate-300">
                    <input type="radio" name="my-accordion-4" checked="checked" />
                    <div className="collapse-title text-xl font-medium ">
                        How many hours you code perday?
                    </div>
                    <div className="collapse-content">
                        <p>Around 6 hrs a day, but sometimes i don&apos;t code at all for one day if got no free time</p>
                    </div>
                </div>

                <div className="collapse collapse-arrow join-item border border-base-300 hover:bg-slate-300">
                    <input type="radio" name="my-accordion-4" checked="checked" />
                    <div className="collapse-title text-xl font-medium ">
                        Whats stack you had to make this done?
                    </div>
                    <div className="collapse-content">
                        <p>As i make about page, the dependencies and tech I used are: Tailwind, Mongoose, Nextjs, MongoDB, React, NextAuth, Daisy, react icons, postcss, bun and yea maybe thats all</p>
                    </div>
                </div>

                <div className="collapse collapse-arrow join-item border border-base-300 hover:bg-slate-300">
                    <input type="radio" name="my-accordion-4" checked="checked" />
                    <div className="collapse-title text-xl font-medium ">
                        Why did you build this website?
                    </div>
                    <div className="collapse-content">
                        <p>To showcase my skills, to practice my coding skills, to get job soon because i really need job.</p>
                    </div>
                </div>


            </div>
        </div>
    )
}