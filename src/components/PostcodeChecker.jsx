import React, { useState } from "react";

const allowedLSOAPrefix = ['Southwark', 'Lambeth'];
const exceptionPostcodes = ['SH24 1AA', 'SH24 1AA'];


/* This component allows users to input their postcode 
and determine if their area is served by the company or not */
export function PostcodeChecker() {

    const [postcodeResultMessage, setPostcodeResultMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const submittedPostcode = event.target.elements.postcode.value;

        if (exceptionPostcodes.includes(submittedPostcode)) {
            //no need to call api
            setPostcodeResultMessage("This postcode is within the area we serve!");
        } else {
            const postcodeCheckerURL = `http://postcodes.io/postcodes/${submittedPostcode}`;
            
            fetch(postcodeCheckerURL, {method: 'GET'}).then((response) => {
                /* the api will return a 404 response when the postcode format is not valid and throw error */
                if (response.status === 200) {
                    const parsedResponse = response.json();
                    parsedResponse.then((response) => {
                        /* this pathway assumes valid responses from the api
                         error handling could be added to respond to scenarios where this is not the case */
                        const lsoa = response.result.lsoa;
                        const LSOAPrefix = lsoa.split(" ")[0];
                        const isAllowedPostcode = allowedLSOAPrefix.includes(LSOAPrefix);
                        setPostcodeResultMessage( isAllowedPostcode ? "This postcode is within the area we serve!" : "Sorry, but we do not serve this postcode")
                    });
                } else throw new Error('Not a valid postcode');
            }).catch((error) => {
                console.log(error)
                setPostcodeResultMessage("Please enter a valid postcode");
            });
        }
    }

    return (
        <div>
            <h3>Postcode Checker</h3>
            <p> To check whether we service your postcode please enter your postcode below</p>
            <form onSubmit={handleSubmit}>
                <input type="text" name="postcode" placeholder="Enter your postcode"/>
                <button type="submit">Enter</button>
            </form>
            <p>{postcodeResultMessage}</p>
        </div>
    )
}

