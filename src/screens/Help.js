import React, { useState }  from 'react';
import { useCollapse } from 'react-collapsed';
import map from "../images/sp_map.png";
function Collapsible() {
  const [isExpanded1, setExpanded1] = useState(false);
  const [isExpanded2, setExpanded2] = useState(false);
  const [isExpanded3, setExpanded3] = useState(false);

  const { getCollapseProps: getCollapseProps1, getToggleProps: getToggleProps1 } = useCollapse({ isExpanded: isExpanded1 });
  const { getCollapseProps: getCollapseProps2, getToggleProps: getToggleProps2 } = useCollapse({ isExpanded: isExpanded2 });
  const { getCollapseProps: getCollapseProps3, getToggleProps: getToggleProps3 } = useCollapse({ isExpanded: isExpanded3 });

  const handleToggle1 = () => {
    setExpanded1(!isExpanded1);
    setExpanded2(false);
    setExpanded3(false);
  };

  const handleToggle2 = () => {
    setExpanded1(false);
    setExpanded2(!isExpanded2);
    setExpanded3(false);
  };

  const handleToggle3 = () => {
    setExpanded1(false);
    setExpanded2(false);
    setExpanded3(!isExpanded3);
  };
  return (

    <div className='container'>
      <div className="relative">
        <img
          className="w-full h-auto"
          src={map}
          alt="map"
        />
      </div>
      <div>

        <p className='font-normal text-gray-500'>ISATE2024 will be held in person at Singapore Polytechnic,Singapore.
          The address is 500 Dover Road, Singapore 139651.</p>
        <h5 className='mb-2 font-bold tracking-tight'>Transportation</h5>
        <p className='font-normal text-gray-500'>The most convenient way to reach Singapore Polytechnic is to use the Mass Rapid Transit (MRT) system. The nearest station is EW22 Dover Station which is on the Green Line.</p>
        <p className='font-normal text-gray-500'>Bus services include numbers 14, 74, 105, 106, 147, 166 185</p>
        <a href='https://apps.apple.com/sg/app/mytransport-sg/id1306661188' target="_blank">https://apps.apple.com/sg/app/mytransport-sg/id1306661188</a>
        <br></br>
        <a href='https://play.google.com/store/apps/details?id=sg.gov.lta.mytransportsg&hl=en_SG&gl=US' target="_blank">https://play.google.com/store/apps/details?id=sg.gov.lta.mytransportsg&hl=en_SG&gl=US</a>
        <h5 className='mb-2 font-bold tracking-tight'>Medical Information</h5>
        <p className='text-decoration-underline'>Emergency Services:</p>
        <p >Contact 995 for any emergency assistance.</p>
        <p className='text-decoration-underline'>First Aid Stations:</p>
        <p >Provide information on the location of first aid stations or medical assistance within the conference venue.</p>
        <p className='text-decoration-underline'>Medical Facilities Nearby:</p>
        <p >Offer details about the nearest hospitals, clinics, or medical facilities in case of more serious medical issues.</p>
        <p className='text-decoration-underline'>Emergency Evacuation Plan:</p>
        <p >Outline the emergency evacuation plan, including assembly points and procedures, in case of a medical emergency that requires the evacuation of the venue.</p>
        <p className='text-decoration-underline'>Allergies and Dietary Restrictions:</p>
        <p >Encourage attendees to notify organizers of any allergies or dietary restrictions during the registration process to ensure that catering meets their needs.</p>
        <p className='text-decoration-underline'>Medication Storage:</p>
        <p >If applicable, provide information on where attendees can store medications safely.</p>
        <p className='text-decoration-underline'>On-Site Medical Staff:</p>
        <p >Specify if there are medical professionals or a medical team available on-site during the conference.</p>
        <p className='text-decoration-underline'>Health and Safety Guidelines:</p>
        <p >Communicate any health and safety guidelines or protocols that attendees should be aware of, especially in the context of the ongoing global health situation.</p>
        <p className='text-decoration-underline'>COVID-19 Information:</p>
        <p >If relevant, include information related to COVID-19 precautions, testing facilities, and guidelines.</p>
      </div>
      <div className='border-primary rounded border-black p-4'>
        <div className="collapsible">
          <div className="header" {...getToggleProps1({ onClick: handleToggle1 })}>
            {isExpanded1 ? 'How many people will be participating?' : 'How many people will be participating?'}
          </div>
          <div {...getCollapseProps1()}>
            <div className="content1">
              SP will host an International Learning Festival that will see about 400 external guests joining 500 SP staff in this event.
            </div>
          </div>

        </div>
      </div>
      <div className='border-primary rounded border-black p-4'>
        <div className="collapsible">
          <div className="header" {...getToggleProps2({ onClick: handleToggle2 })}>
            {isExpanded2 ? 'Will there be food provided throughout this event?' : 'Will there be food provided throughout this event?'}
          </div>
          <div {...getCollapseProps2()}>
            <div className="content2">
              Now you can see the hidden content. <br /><br />
              Click again to hide...
            </div>
          </div>

        </div>
      </div>

      <div className='border-primary rounded border-black p-4'>
      <div className="collapsible">
        <div className="header" {...getToggleProps3({ onClick: handleToggle3 })}>
          {isExpanded3 ? 'How do i get to the venue?' : 'How do i get to the venue?'}
        </div>
        <div {...getCollapseProps3()}>
          <div className="content3">
            Now you can see the hidden content. <br /><br />
            Click again to hide...
          </div>
        </div>

      </div>
      </div>
      <p > If you need more information on ISATE 2024, please contact the ISATE 2024 Secretariat at ISATE 2024 Secretariat@sp.edu.sg</p>
      <p>Recipients of this email address are:
        <br />
        • Christopher Tan
        <br />
        • Mark Nivan Singh
        <br />
        • Cheah Sin Moh
      </p>
      <h5 className='mb-2 font-bold tracking-tight'>Photo Credits</h5>
      <p>
        • Splash image on home page - Copyright 2023, Singapore Tourism Board. Used by permission.
        <br />
        • About ISATE section - Copyright 2023, Vocational Training Council. Used by permission.
      </p>
    </div>
  )
}

export default Collapsible;