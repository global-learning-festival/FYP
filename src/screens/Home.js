import React from 'react';
import Hero from "../images/Hero.png";
import Programme from "../images/Programme.png";

const Home = () => {
  return (
    <>
    <div className="relative">
        <img
          className="w-full h-auto blur-[1px] brightness-75"
          src={Hero}
          alt="Hero"
        />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold xl:text-3xl md:text-xl">
        INTERNATIONAL LEARNING FESITVAL
      </div>
    </div>

  <div className='flex'>
    <div class="max-w-[25%] my-3 mx-3 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <img class="rounded-t-lg object-cover w-full h-28" src={Programme} alt="" />
        <div class="p-3">
            <h5 class="text-lg font-bold text-black">ISATE Council Meeting</h5>
            <p class="font-normal text-gray-700 text-sm">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        </div>
    </div>

    <div class="max-w-[25%] my-3 mx-3 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <img class="rounded-t-lg object-cover w-full h-28" src={Programme} alt="" />
        <div class="p-3">
            <h5 class="text-lg font-bold text-black">ISATE Council Meeting</h5>
            <p class="font-normal text-gray-700 text-sm">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        </div>
    </div>

    <div class="max-w-[25%] my-3 mx-3 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <img class="rounded-t-lg object-cover w-full h-28" src={Programme} alt="" />
        <div class="p-3">
            <h5 class="text-lg font-bold text-black">ISATE Council Meeting</h5>
            <p class="font-normal text-gray-700 text-sm">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        </div>
    </div>

    <div class="max-w-[25%] my-3 mx-3 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <img class="rounded-t-lg object-cover w-full h-28" src={Programme} alt="" />
        <div class="p-3">
            <h5 class="text-lg font-bold text-black">ISATE Council Meeting</h5>
            <p class="font-normal text-gray-700 text-sm">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        </div>
    </div>
    </div>

    </>
  )
}

export default Home