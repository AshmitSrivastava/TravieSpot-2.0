import React from 'react'
import './Services.css'
import img1 from './serviceimages/img1.png'
import img2 from './serviceimages/img2.png'
import img3 from './serviceimages/img3.png'
import img4 from './serviceimages/img4.png'
import img5 from './serviceimages/img5.png'
import img6 from './serviceimages/img6.png'
const Services = () => {
  return (
   <>
   <div className="safe">SAFE TRAVELS!!!</div>
   <div className="container">
       <div className="services">
           <div className="service">
               <div className="serviceimg"><img src={img1}/></div> 
               <div class="service-content">
                   <h2>Flight Booking</h2>
                   <p>Book flights to your dream destinations.</p>
               </div>
           </div>
           <div className="service">
               <div className="serviceimg"><img src={img2}/></div>
               <div className="service-content">
                   <h2>Hotel Reservations</h2>
                   <p>Find and book hotels for your stay.</p>
               </div>
           </div>
           <div className="service">
           <div className="serviceimg"><img src={img3}/></div>
               <div class="service-content">
                   <h2>Travel Packages</h2>
                   <p>Explore our curated travel packages.</p>
               </div>
           </div>
           <div className="service">
           <div className="serviceimg"><img src={img4}/></div>
               <div class="service-content">
                   <h2>Car Rentals</h2>
                   <p>Rent a car for convenient travel.</p>
               </div>
           </div>
           <div className="service">
           <div className="serviceimg"><img src={img5}/></div>
               <div className="service-content">
                   <h2>Tour Guides</h2>
                   <p>Hire experienced tour guides for your trip.</p>
               </div>
           </div>
           <div className="service">
           <div className="serviceimg"><img src={img6}/></div>
               <div className="service-content">
                   <h2>Travel Insurance</h2>
                   <p>Stay protected with travel insurance.</p>
               </div>
           </div>
       </div>
   </div>
   </>
  )
}

export default Services