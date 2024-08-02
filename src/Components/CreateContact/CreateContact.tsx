import { Button, TextField } from "@mui/material"
import { useState } from "react";
import { useAddContactsMutation } from "../../services/contacts";
import './CreateContact.css'
import { IContactFields } from "../ContactsList/ContactsList";

interface IContactData {
    [key: string]: any,
    fields: IContactFields
}

function CreateContant() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [addContact] = useAddContactsMutation();

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
        if ((firstName || lastName) && validateEmail(email)) {
            setNameError(false);
            setEmailError(false);
            return true;
        } else {
            setNameError(firstName === '' && lastName === '');
            setEmailError(validateEmail(email) ? false : true)
            return false
        }
    }

    return (
        <div className="create-contact">
            <div className="create-contact__title">Create Contact</div>
            <div className="create-contact__field">
                <div className="">First Name</div>
                <TextField fullWidth error={nameError} helperText={'First Name or Second Name required'} className="" value={firstName} onChange={(event) => { setFirstName(event.target.value) }}></TextField>
            </div>
            <div className="create-contact__field">
                <div className="">Last Name</div>
                <TextField fullWidth error={nameError} helperText={'First Name or Second Name required'} className="" value={lastName} onChange={(event) => { setlastName(event.target.value) }}></TextField>
            </div>
            <div className="create-contact__field">
                <div className="">Email</div>
                <TextField fullWidth error={emailError} helperText={'valid email required'} className="" value={email} onChange={(event) => { setEmail(event.target.value) }}></TextField>
            </div>
            <Button variant="outlined" className="create-contact__button" onClick={onSubmit}>Add Contact</Button>
        </div >
    )
}

const validateEmail = (email: string) => {
    // eslint-disable-next-line
    return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

export default CreateContant