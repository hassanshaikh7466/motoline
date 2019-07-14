import React from 'react'
import MediaQuery from 'react-responsive'
import './AboutUs.css'

function AboutUs(){
        return(
            <div>
            <MediaQuery minDeviceWidth={1280}>
            <div className="AboutUs">
            <div className="AboutUsHeader">
            Who are we?
            </div>
            <div className="AboutUsText">
            <p>
                Motoline is an e-commerce enterprise by Nawaz Auto Parts (established in 1988).
                Nawaz Auto Parts has been serving the entire people of entire mining belt of Goa with commercial vehicle spare parts for the past 30 years
                and has proven to be a trusted brand. The modern version of this 30 years old enterprise will ensure the same trust and quality
                with both car and commercial vehicle spare parts.
            </p>
            </div>
            </div>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1280}>
            <div className="AboutUsPortrait">
            <div className="AboutUsHeaderPortrait">
            Who are we?
            </div>
            <div className="AboutUsTextPortrait">
            <p>
                Motoline is an e-commerce enterprise by Nawaz Auto Parts (established in 1988).
                Nawaz Auto Parts has been serving the entire people of entire mining belt of Goa with commercial vehicle spare parts for the past 30 years
                and has proven to be a trusted brand. The modern version of this 30 years old enterprise will ensure the same trust and quality
                with both car and commercial vehicle spare parts.
            </p>
            </div>
            </div>
            </MediaQuery>
            </div>
        )
}

export default AboutUs;