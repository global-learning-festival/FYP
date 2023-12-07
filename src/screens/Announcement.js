import React from 'react'

const Announcement = () => {
  return (
  <>
  {/* First set of 3 cards */}
    <div className='flex justify-center mt-5'>
      <div class="block mx-4 max-w-sm p-6 bg-white border border-gray-200 rounded-md shadow">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-black">
          Announcement 1
        </h5>
        <p class="font-normal text-gray-500">
          Here are announcement 1 contents.
        </p>
      </div>
      <div class="block mx-4 max-w-sm p-6 bg-white border border-gray-200 rounded-md shadow">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-black">
          Announcement 2
        </h5>
        <p class="font-normal text-gray-500">
          Here are announcement 1 contents.
        </p>
      </div>
      <div class="block mx-4 max-w-sm p-6 bg-white border border-gray-200 rounded-md shadow">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-black">
          Announcement 3
        </h5>
        <p class="font-normal text-gray-500">
          Here are announcement 1 contents.
        </p>
      </div>
    </div>

    {/* Second set of 3 cards */}
    <div className='flex justify-center mt-5'>
      <div class="block mx-4 max-w-sm p-6 bg-white border border-gray-200 rounded-md shadow">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-black">
          Announcement 4
        </h5>
        <p class="font-normal text-gray-500">
          Here are announcement 1 contents.
        </p>
      </div>
      <div class="block mx-4 max-w-sm p-6 bg-white border border-gray-200 rounded-md shadow">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-black">
          Announcement 5
        </h5>
        <p class="font-normal text-gray-500">
          Here are announcement 1 contents.
        </p>
      </div>
      <div class="block mx-4 max-w-sm p-6 bg-white border border-gray-200 rounded-md shadow">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-black">
          Announcement 6
        </h5>
        <p class="font-normal text-gray-500">
          Here are announcement 1 contents.
        </p>
      </div>
    </div>
  </>

  )
}

export default Announcement