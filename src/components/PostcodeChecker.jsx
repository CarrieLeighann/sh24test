import React, { useState } from "react";

const allowedLSOAPrefix = ['Southwark', 'Lambeth'];
const exceptionPostcodes = ['SH24 1AA', 'SH24 1AA'];

export function PostcodeChecker() {

    const [postcodeResultMessage, setPostcodeResultMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const submittedPostcode = event.target.postcode.value;

        if (exceptionPostcodes.includes(submittedPostcode)) {
            setPostcodeResultMessage("This postcode is within the area we serve!");
        } else {
            const postcodeCheckerURL = `http://postcodes.io/postcodes/${submittedPostcode}`;
            
            fetch(postcodeCheckerURL, {method: 'GET'}).then((response) => {
                if (response.status === 200) {
                    const parsedResponse = response.json();
                    parsedResponse.then((response) => {
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
            <h3>Check whether we service your area</h3>
            <p> Please enter your postcode below</p>
            <form onSubmit={handleSubmit}>
                <label for="postcode">Postcode: </label>
                <input type="text" id="postcode" name="postcode" />
                <button type="submit">Enter</button>
            </form>
            <p>{postcodeResultMessage}</p>
        </div>
    )
}

