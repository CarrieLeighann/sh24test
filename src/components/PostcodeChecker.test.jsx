/**
 * @jest-environment jsdom
 */

import {render, screen, waitFor} from '@testing-library/react';
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event';
import { PostcodeChecker } from "./PostcodeChecker";

//mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200, result: { lsoa: 'Southwark 3'} }),
    status: 200,
  })
);

let container, user;

beforeAll(() => {
  user = userEvent.setup()
})

beforeEach(() => {
 container = render(<PostcodeChecker/>);
})

test('renders as expected', async () => {
  await expect(container).toMatchSnapshot();
});

test('exception postcodes are accepted', async () => {
   
  const postcodeInput = await screen.findByRole('textbox');
  const submitButton = await screen.findByText('Enter');

  await user.type(postcodeInput, 'SH24 1AA');
  user.click(submitButton);
  
  await waitFor(() => {
  expect(screen.getByText('This postcode is within the area we serve!')).toBeVisible();
  });
  await expect(container).toMatchSnapshot();
});

test('valid lsoa postcodes are accepted', async () => {
const postcodeInput = await screen.findByRole('textbox');
  const submitButton = await screen.findByText('Enter');

  await user.type(postcodeInput, 'SE1 7QD');
  user.click(submitButton);

  await waitFor(() => {
  expect(screen.getByText('This postcode is within the area we serve!')).toBeVisible();
  });

});

test('invalid lsoa postcodes are rejected', async () => {

  fetch.mockImplementationOnce(() =>  Promise.resolve({
      json: () => Promise.resolve({ status: 200, result: { lsoa: 'Bathgate 2'} }),
      status: 200,
    })
  );

  const postcodeInput = await screen.findByRole('textbox');
  const submitButton = await screen.findByText('Enter');

  await user.type(postcodeInput, 'EH48 1AS');
  user.click(submitButton);

   await waitFor(() => {
  expect(screen.getByText('Sorry, but we do not serve this postcode')).toBeVisible();
  });

});

test('invalid postcodes throw error', async () => {

  fetch.mockImplementationOnce(() => Promise.resolve({status: 404}));

  const postcodeInput = await screen.findByRole('textbox');
  const submitButton = await screen.findByText('Enter');

   await user.type(postcodeInput, 'SE1 7QD');
  user.click(submitButton);

   await waitFor(() => {
  expect(screen.getByText('Please enter a valid postcode')).toBeVisible();
  });

});