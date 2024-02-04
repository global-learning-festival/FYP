import React, { useState } from 'react';
import { useCollapse } from 'react-collapsed';
import map from "../images/sp_map.png";
import { BsPlus, BsDash } from 'react-icons/bs';
import "../styles/App.css";
import {
  Collapse,
  initTE,
} from "tw-elements";

initTE({ Collapse });

// function Collapsible() {
//   const [isExpanded1, setExpanded1] = useState(false);
//   const [isExpanded2, setExpanded2] = useState(false);
//   const [isExpanded3, setExpanded3] = useState(false);

//   const { getCollapseProps: getCollapseProps1, getToggleProps: getToggleProps1 } = useCollapse({ isExpanded: isExpanded1 });
//   const { getCollapseProps: getCollapseProps2, getToggleProps: getToggleProps2 } = useCollapse({ isExpanded: isExpanded2 });
//   const { getCollapseProps: getCollapseProps3, getToggleProps: getToggleProps3 } = useCollapse({ isExpanded: isExpanded3 });

//   const handleToggle1 = () => {
//     setExpanded1(!isExpanded1);
//     setExpanded2(false);
//     setExpanded3(false);
//   };

//   const handleToggle2 = () => {
//     setExpanded1(false);
//     setExpanded2(!isExpanded2);
//     setExpanded3(false);
//   };

//   const handleToggle3 = () => {
//     setExpanded1(false);
//     setExpanded2(false);
//     setExpanded3(!isExpanded3);
//   };

  const Help = () => {

  return (
    <div className='container mx-auto p-4'>
      <div className="relative mb-4">
        <img
          className="w-full h-auto"
          src={map}
          alt="map"
        />
      </div>
      <div className="mx-auto">
        <p className='font-normal text-gray-500 mb-4'>ISATE2024 will be held in person at Singapore Polytechnic, Singapore.
          The address is 500 Dover Road, Singapore 139651.</p>
        <div className="bg-gray-100 rounded-xl p-4 mb-4">
          <h5 className='mb-3 font-bold text-center'>Transportation</h5>
          <p className='font-normal text-gray-500 mb-3'>The most convenient way to reach Singapore Polytechnic is to use the Mass Rapid Transit (MRT) system. The nearest station is EW22 Dover Station which is on the Green Line.</p>
            <div className='bg-white rounded-xl py-2 mb-3'>
              <p className='font-normal text-gray-500 text-center'>Bus services include numbers: <br/>14, 74, 105, 106, 147, 166 185</p>
            </div>
            <div className="flex justify-center space-x-4">
              <a
                href='https://apps.apple.com/sg/app/mytransport-sg/id1306661188'
                target="_blank"
                className="text-blue-500 hover:underline inline-block"
              >
                iOS App
              </a>
              <a
                href='https://play.google.com/store/apps/details?id=sg.gov.lta.mytransportsg&hl=en_SG&gl=US'
                target="_blank"
                className="text-blue-500 hover:underline inline-block"
              >
                Android App
              </a>
          </div>
        </div>
        
    <div id="accordionExample">
      <div
        className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
        <h2 className="mb-0" id="headingOne">
          <button
            className="group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
            type="button"
            data-te-collapse-init
            data-te-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne">
            <div>
             <p>How many people will be participating?</p>
            </div>
            <span
              className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </button>
        </h2>
        <div
          id="collapseOne"
          className="!visible"
          data-te-collapse-item
          data-te-collapse-show
          aria-labelledby="headingOne"
          data-te-parent="#accordionExample">
          <div className="px-5 py-4">
          <div>
            <p>SP will host an International Learning Festival that will see about 400 external guests joining 500 SP staff in this event.</p>
          </div>
          </div>
        </div>
      </div>
      <div
        className="border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
        <h2 className="mb-0" id="headingTwo">
          <button
            className="group relative flex w-full items-center rounded-none border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
            type="button"
            data-te-collapse-init
            data-te-collapse-collapsed
            data-te-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo">
            <div>
              <p>Will there be food provided?</p>
            </div>
            <span
              className="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </button>
        </h2>
        <div
          id="collapseTwo"
          className="!visible hidden"
          data-te-collapse-item
          aria-labelledby="headingTwo"
          data-te-parent="#accordionExample">
          <div className="px-5 py-4">
          <div>
            <p>Yes, Of Course!</p>
          </div>
          </div>
        </div>
      </div>
      <div
        className="rounded-b-lg border border-t-0 border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
        <h2 className="accordion-header mb-0" id="headingThree">
          <button
            className="group relative flex w-full items-center border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)] [&[data-te-collapse-collapsed]]:rounded-b-[15px] [&[data-te-collapse-collapsed]]:transition-none"
            type="button"
            data-te-collapse-init
            data-te-collapse-collapsed
            data-te-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree">
            <div>
              <p>How do I get to the venue?</p>
            </div>
            <span
              className="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </button>
        </h2>
        <div
          id="collapseThree"
          className="!visible hidden"
          data-te-collapse-item
          aria-labelledby="headingThree"
          data-te-parent="#accordionExample">
          <div className="px-5 py-4">
          <div>
            <p>Do follow the steps above.</p>
          </div>
          </div>
        </div>
      </div>
    </div>

        {/* <div className='border-primary rounded border-black p-2 mb-4' style={{ border: '2px solid red', width: '100%' }}>
        <div className="collapsible flex justify-between">
          <div className="header" {...getToggleProps1({ onClick: handleToggle1 })}>
            {isExpanded1 ? (
              <span>
                How many people will be participating? <BsDash style={{ display: 'inline-block', color: 'red', fontSize: '150%', marginLeft: '4px', marginBottom: '2px' }} />
              </span>
            ) : (
              <span>
                How many people will be participating? <BsPlus style={{ display: 'inline-block', color: 'red', fontSize: '150%', marginLeft: '4px', marginBottom: '2px' }} />
              </span>
            )}
          </div>
          <div {...getCollapseProps1()}>
            <div className="content1">
              SP will host an International Learning Festival that will see about 400 external guests joining 500 SP staff in this event.
            </div>
          </div>
        </div>
      </div>
      <div className='border-primary rounded border-black p-2 mb-4' style={{ border: '2px solid red', width: '100%' }}>
        <div className="collapsible">
          <div className="header" {...getToggleProps2({ onClick: handleToggle2 })}>
            {isExpanded2 ? (
              <>
                Will there be food provided? <BsDash style={{ display: 'inline-block', color: 'red', fontSize: '150%', marginLeft: '4px', marginBottom: '2px' }} />
              </>
            ) : (
              <>
                Will there be food provided? <BsPlus style={{ display: 'inline-block', color: 'red', fontSize: '150%', marginLeft: '4px', marginBottom: '2px' }} />
              </>
            )}
          </div>
          <div {...getCollapseProps2()}>
            <div className="content2">
              Yes, Of Course!
            </div>
          </div>
        </div>
      </div>
      <div className='border-primary rounded border-black p-2 mb-4' style={{ border: '2px solid red', width: '100%' }}>
        <div className="collapsible">
          <div className="header" {...getToggleProps3({ onClick: handleToggle3 })}>
            {isExpanded3 ? (
              <>
                How do I get to the venue? <BsDash style={{ display: 'inline-block', color: 'red', fontSize: '150%', marginLeft: '4px', marginBottom: '2px' }} />
              </>
            ) : (
              <>
                How do I get to the venue? <BsPlus style={{ display: 'inline-block', color: 'red', fontSize: '150%', marginLeft: '4px', marginBottom: '2px' }} />
              </>
            )}
          </div>
          <div {...getCollapseProps3()}>
            <div className="content3">
              Do follow the steps above.
            </div>
          </div>
        </div>
      </div> */}
      
        <div className="bg-gray-100 rounded-xl p-4 mb-4 mt-4">
          <h5 className='mb-3 font-bold text-center'>Medical Information</h5>
          <h4 className='text-md font-bold mb-2'>Emergency Services:</h4>
          <p className='mb-3'>Contact 995 for any emergency assistance.</p>
          <h4 className='text-md font-bold mb-2'>First Aid Stations:</h4>
          <p className='mb-3'>Provide information on the location of first aid stations or medical assistance within the conference venue.</p>
          <h4 className='text-md font-bold mb-2'>Medical Facilities Nearby:</h4>
          <p className='mb-3'>Offer details about the nearest hospitals, clinics, or medical facilities in case of more serious medical issues.</p>
          <h4 className='text-md font-bold mb-2'>Emergency Evacuation Plan:</h4>
          <p className='mb-3'>Outline the emergency evacuation plan, including assembly points and procedures, in case of a medical emergency that requires the evacuation of the venue.</p>
          <h4 className='text-md font-bold mb-2'>Allergies and Dietary Restrictions:</h4>
          <p className='mb-3'>Encourage attendees to notify organizers of any allergies or dietary restrictions during the registration process to ensure that catering meets their needs.</p>
          <h4 className='text-md font-bold mb-2'>Medication Storage:</h4>
          <p className='mb-3'>If applicable, provide information on where attendees can store medications safely.</p>
          <h4 className='text-md font-bold mb-2'>On-Site Medical Staff:</h4>
          <p className='mb-3'>Specify if there are medical professionals or a medical team available on-site during the conference.</p>
          <h4 className='text-md font-bold mb-2'>Health and Safety Guidelines:</h4>
          <p className='mb-3'>Communicate any health and safety guidelines or protocols that attendees should be aware of, especially in the context of the ongoing global health situation.</p>
          <h4 className='text-md font-bold mb-2'>COVID-19 Information:</h4>
          <p className='mb-3'>If relevant, include information related to COVID-19 precautions, testing facilities, and guidelines.</p>
        </div>
      </div>
      
      <div className='mb-4'>
        <p className='mb-2'>If you need more information on ISATE 2024, please contact the ISATE 2024 Secretariat at ISATE 2024 Secretariat@sp.edu.sg</p>
        <p>Recipients of this email address are:
          <br />
           - Christopher Tan
          <br />
           - Mark Nivan Singh
          <br />
          - Cheah Sin Moh
        </p>
      </div>
      
      <div className='bg-gray-100 rounded-xl p-4'>
        <h5 className='mb-3 font-bold text-center'>Photo Credits</h5>
        <p className='mb-2'>
          Splash image on the home page <br /> - Copyright 2023, Singapore Tourism Board. Used by permission.
        </p>
        <p>
          About ISATE section <br /> - Copyright 2023, Vocational Training Council. Used by permission.
        </p>
      </div>
    </div>
  );
}

export default Help;

