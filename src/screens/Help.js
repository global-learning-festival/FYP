import React, { useState } from 'react';
import { useCollapse } from 'react-collapsed';
import map from "../images/sp_map.png";
import { BsPlus, BsDash } from 'react-icons/bs';
import "../styles/App.css";
import Accordion from 'react-bootstrap/Accordion';

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

      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>How many people will be participating?</Accordion.Header>
          <Accordion.Body>
          SP will host an International Learning Festival that will see about 400 external guests joining 500 SP staff in this event.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Will there be food provided?</Accordion.Header>
          <Accordion.Body>
          Yes, Of Course!
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>How do I get to the venue?</Accordion.Header>
          <Accordion.Body>
          Do follow the steps above.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      
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

