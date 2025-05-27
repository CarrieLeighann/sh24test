import React from "react";

export function PostcodeChecker() {

    const handleSubmit= async (event) => {
        event.preventDefault();

          const submittedPostcode = event.target.postcode.value;

          const postcodeCheckerURL = `http://postcodes.io/postcodes/${submittedPostcode}`;

          const response = await fetch(postcodeCheckerURL, {method: 'GET'}).then((response) => {
  if (response.status === 200) {
    return response.json();
  }
  throw new Error('Something went wrong');
})
.then((responseJson) => {
  // Do something with the response
})
.catch((error) => {
  console.log(error)
});
;
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
        </div>
    )
}

