import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    
    const header = screen.getByText(/contact form/i);

    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toContainElement(header);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);

    const shortFirstName = 'Jim';

    const firstNameInput = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameInput, shortFirstName);

    await waitFor(() => {
        const errorMessage = screen.queryByTestId(/error/i);
        expect(errorMessage).toBeInTheDocument();
    });
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    await waitFor(() => {
        const errorMessages = screen.queryAllByTestId(/error/i);
        expect(errorMessages[0]).toBeInTheDocument();
        expect(errorMessages[1]).toBeInTheDocument();
        expect(errorMessages[2]).toBeInTheDocument();
    });
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);

    const firstName = 'Jimmy';
    const lastName = 'Neutron';

    const firstNameInput = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameInput, firstName);

    const lastNameInput = screen.getByLabelText(/last name*/i);
    userEvent.type(lastNameInput, lastName);

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    await waitFor(() => {
        const errorMessage = screen.queryByTestId(/error/i);
        expect(errorMessage).toBeInTheDocument();
    });
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);

    const invalidEmail = 'jimmyn736';

    const emailInput = screen.getByLabelText(/email*/i);
    userEvent.type(emailInput, invalidEmail);

    const emailErrorMessage = screen.getByText(/email must be a valid email address/i);

    expect(emailErrorMessage).toBeInTheDocument();
    expect(emailErrorMessage).toContainElement(emailErrorMessage);
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    const lastNameErrorMessage = screen.getByText(/lastname is a required field/i);
    
    expect(lastNameErrorMessage).toBeInTheDocument();
    expect(lastNameErrorMessage).toContainElement(lastNameErrorMessage);
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);

    const firstName = 'Jimmy';
    const lastName = 'Neutron';
    const email = 'jimmyn736@gmail.com';

    const firstNameInput = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameInput, firstName);

    const lastNameInput = screen.getByLabelText(/last name*/i);
    userEvent.type(lastNameInput, lastName);

    const emailInput = screen.getByLabelText(/email*/i);
    userEvent.type(emailInput, email);

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    await waitFor(() => {
        const displayedFirstName = screen.queryByTestId(/firstnamedisplay/i);
        expect(displayedFirstName).toBeInTheDocument();

        const displayedLastName = screen.queryByTestId(/lastnamedisplay/i);
        expect(displayedLastName).toBeInTheDocument();

        const displayedEmail = screen.queryByTestId(/emaildisplay/i);
        expect(displayedEmail).toBeInTheDocument();

        const displayedMessage = screen.queryByTestId(/messagedisplay/i);
        expect(displayedMessage).not.toBeInTheDocument();
    });
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);

    const firstName = 'Jimmy';
    const lastName = 'Neutron';
    const email = 'jimmyn736@gmail.com';
    const message = 'Lukewarm take: Jimmy Neutron was a very mediocre show.'

    const firstNameInput = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameInput, firstName);

    const lastNameInput = screen.getByLabelText(/last name*/i);
    userEvent.type(lastNameInput, lastName);

    const emailInput = screen.getByLabelText(/email*/i);
    userEvent.type(emailInput, email);

    const messageInput = screen.getByLabelText(/message/i);
    userEvent.type(messageInput, message);

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    await waitFor(() => {
        const displayedFirstName = screen.queryByTestId(/firstnamedisplay/i);
        expect(displayedFirstName).toBeInTheDocument();

        const displayedLastName = screen.queryByTestId(/lastnamedisplay/i);
        expect(displayedLastName).toBeInTheDocument();

        const displayedEmail = screen.queryByTestId(/emaildisplay/i);
        expect(displayedEmail).toBeInTheDocument();

        const displayedMessage = screen.queryByTestId(/messagedisplay/i);
        expect(displayedMessage).toBeInTheDocument();
    });
});
