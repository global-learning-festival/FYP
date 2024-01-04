import React from 'react'
import map from "../images/sp_map.png";
const Help = () => {
  return (
  
  <div className="relative">
        <img
          className="w-full h-auto"
          src={map}
          alt="map"
        />
        
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
      Emergency Services:
Contact 995 for any emergency assistance.

First Aid Stations:
Provide information on the location of first aid stations or medical assistance within the conference venue.

Medical Facilities Nearby:
Offer details about the nearest hospitals, clinics, or medical facilities in case of more serious medical issues.

Emergency Evacuation Plan:
Outline the emergency evacuation plan, including assembly points and procedures, in case of a medical emergency that requires the evacuation of the venue.

Allergies and Dietary Restrictions:
Encourage attendees to notify organizers of any allergies or dietary restrictions during the registration process to ensure that catering meets their needs.

Medication Storage:
If applicable, provide information on where attendees can store medications safely.

On-Site Medical Staff:
Specify if there are medical professionals or a medical team available on-site during the conference.

Health and Safety Guidelines:
Communicate any health and safety guidelines or protocols that attendees should be aware of, especially in the context of the ongoing global health situation.

COVID-19 Information:
If relevant, include information related to COVID-19 precautions, testing facilities, and guidelines.
       </div>
      </div>
    
    
    
    
  )
}

export default Help