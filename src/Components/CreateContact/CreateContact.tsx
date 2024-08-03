import './CreateContact.css'
import { Button, TextField } from "@mui/material"
import { useState } from "react";
import { useAddContactMutation } from "../../services/contacts";
import { validateEmailHelper } from "../../helpers/helpers";
import { IContactData } from '../../interfaces/interfaces';

function CreateContant() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [addContact] = useAddContactMutation();

    function onSubmit(): void {
        if (validate()) {
            const contactData: IContactData = {
                record_type: 'person',
                privacy: {
                    edit: null,
                    read: null,
                },
                owner_id: null,
                fields: {}
            }

            if (firstName)
                contactData.fields['first name'] = [{ value: firstName, modifier: '', label: 'first name' }]

            if (lastName)
                contactData.fields['last name'] = [{ value: lastName, modifier: '', label: 'last name' }]

            if (email)
                contactData.fields['email'] = [{ value: email, modifier: '', label: 'email' }]

            addContact(contactData);
            resetFields();
        }
    }

    function resetFields() {
        setFirstName('');
        setlastName('');
        setEmail('');
    }

    function validate() {
        if ((firstName || lastName) && validateEmailHelper(email)) {
            setNameError(false);
            setEmailError(false);
            return true;
        } else {
            setNameError(firstName === '' && lastName === '');
            setEmailError(validateEmailHelper(email) ? false : true)
            return false
        }
    }

    return (
        <div className="create-contact">
            <div className="create-contact__title">Create Contact</div>
            <div className="create-contact__field">
                <div className="">First name</div>
                <TextField fullWidth error={nameError} helperText={nameError ? "First name or Last name required" : ""} value={firstName} onChange={(event) => { setFirstName(event.target.value) }}></TextField>
            </div>
            <div className="create-contact__field">
                <div className="">Last name</div>
                <TextField fullWidth error={nameError} helperText={nameError ? "First name or Last name required" : ""} value={lastName} onChange={(event) => { setlastName(event.target.value) }}></TextField>
            </div>
            <div className="create-contact__field">
                <div className="">Email</div>
                <TextField fullWidth error={emailError} helperText={emailError ? "Invalid email address" : ""} value={email} onChange={(event) => { setEmail(event.target.value) }}></TextField>
            </div>
            <Button variant="outlined" className="create-contact__button" onClick={onSubmit}>Add Contact</Button>
        </div >
    )
}

export default CreateContant