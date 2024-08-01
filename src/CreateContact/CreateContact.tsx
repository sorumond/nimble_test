import { Button, TextField } from "@mui/material"
import './CreateContact.css'
import { useState } from "react";

const apiUrl = 'https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1/contact';

function CreateContant() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [nameError, setNameError] = useState(false);

    function onSubmit(): void {
        if (validate()) {
            const contactData = {
                record_type: 'person',
                privacy: {
                    edit: null,
                    read: null,
                },
                owner_id: null,
                fields: {
                    'first name': [{ value: firstName, modifier: '', label: 'first name' }],
                    'last name': [{ value: lastName, modifier: '', label: 'last name' }],
                    'email': [{ value: email, modifier: '', label: 'email' }]
                }
            }
            fetch(`${apiUrl}`, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn',
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(contactData)
            })
                .catch((error) => console.log(error));
            console.log(contactData);
        }

    }

    function validate() {
        if ((firstName || lastName) && validateEmail(email)) {
            setNameError(false);
            setEmailError(false);
            console.log(validateEmail(email));
            return true;
        } else {
            setNameError(firstName === '' && lastName === '');
            console.log(validateEmail(email));
            setEmailError(validateEmail(email) ? false : true)
            return false
        }
    }

    return (
        <div className="create-contact">
            <div className="create-contact__title">Create Contact</div>
            <div className="create-contact__field">
                <div className="">First Name</div>
                <TextField fullWidth error={nameError} helperText={'First Name or Second Name required'} className="" onChange={(event) => { setFirstName(event.target.value) }}></TextField>
            </div>
            <div className="create-contact__field">
                <div className="">Last Name</div>
                <TextField fullWidth error={nameError} helperText={'First Name or Second Name required'} className="" onChange={(event) => { setlastName(event.target.value) }}></TextField>
            </div>
            <div className="create-contact__field">
                <div className="">Email</div>
                <TextField fullWidth error={emailError} helperText={'valid email required'} className="" onChange={(event) => { setEmail(event.target.value) }}></TextField>
            </div>
            <Button variant="outlined" className="create-contact__button" onClick={onSubmit}>Add Contact</Button>
        </div >
    )
}

const validateEmail = (email: string) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default CreateContant