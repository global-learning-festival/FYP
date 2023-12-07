import React from 'react'

const ImportantInfo = () => {
  return (
    <>
    {/* First row of 4 cards */}
    <div className='flex justify-center my-5 mx-20'>
      <div class="flex-1 block mx-2 max-w-sm p-6 bg-white border border-gray-200 rounded-md shadow">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-black">
          Wifi Passwords
        </h5>
        <p class="text-xs text-gray-500">
          Wi-Fi passwords for the conference venue will be shown here
        </p>
      </div>
      <div class="flex-1 block mx-2 max-w-sm p-6 bg-white border border-gray-200 rounded-md shadow">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-black">
          Emergency Contacts
        </h5>
        <p class="text-xs text-gray-500">
          Important phone numbers for onsite medical assistance, security, and conference organizers will be provided in case of emergencies.
        </p>
      </div>
      <div class="flex-1 block mx-2 max-w-sm p-6 bg-white border border-gray-200 rounded-md shadow">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-black">
          Lost and Found
        </h5>
        <p class="text-xs text-gray-500">
          Instructions on how to report lost items or find lost-and-found locations will be included.
        </p>
      </div>
      <div class="flex-1 block mx-2 max-w-sm p-6 bg-white border border-gray-200 rounded-md shadow">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-black">
          Photography and Recording Policy
        </h5>
        <p class="text-xs text-gray-500">
          Attendees will be informed about the conference's policy on photography, audio/video recording, and social media usage during sessions.
        </p>
      </div>
    </div>

    {/* Second row of 4 cards */}
    <div className='flex justify-center my-5 mx-20'>
      <div class="flex-1 block mx-2 max-w-sm p-6 bg-white border border-gray-200 rounded-md shadow">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-black">
          Dining and Refreshments
        </h5>
        <p class="text-xs text-gray-500">
          Details about meal times, refreshment stations, dietary options, and nearby eateries will be listed.
        </p>
      </div>
      <div class="flex-1 block mx-2 max-w-sm p-6 bg-white border border-gray-200 rounded-md shadow">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-black">
          Transportation
        </h5>
        <p class="text-xs text-gray-500">
          Information on transportation options to and from the venue, including public transit, parking details, and ride-sharing services, will be available.
        </p>
      </div>
      <div class="flex-1 block mx-2 max-w-sm p-6 bg-white border border-gray-200 rounded-md shadow">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-black">
          Lost Badge or Ticket
        </h5>
        <p class="text-xs text-gray-500">
          Instructions on what to do in case an attendee loses their conference badge or ticket will be included.
        </p>
      </div>
      <div class="flex-1 block mx-2 max-w-sm p-6 bg-white border border-gray-200 rounded-md shadow">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-black">
          Sustainability Efforts
        </h5>
        <p class="text-xs text-gray-500">
          Information on the conference's sustainability initiatives, such as recycling and reducing waste, will be highlighted.
        </p>
      </div>
    </div>
    </>
  )
}

export default ImportantInfo