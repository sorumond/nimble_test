import './ContactPage.css';
import { Button, TextField } from "@mui/material";
import { useGetContactQuery, usePutTagToContactMutation } from "../../services/contacts";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { IGetContact } from '../../interfaces/interfaces';


function ContactPage() {
    const contactId = useParams().contactId;
    const { data } = useGetContactQuery<IGetContact>(`${contactId}`);
    const [putTagToContact] = usePutTagToContactMutation()
    const [tagsString, setTagsString] = useState('');
    const navigate = useNavigate();

    function onAddTagButtonClick() {
        putTagToContact({
            contact_id: `${contactId}`,
            tags: tagsString.split(' ')
        })
    }

    function onBackButtonClick() {
        navigate('/');
    }

    return (
        <div className="contact-page">
            {data &&
                <div className="contact-page__container">
                    <Button variant="outlined" className="contact-page__back-button" onClick={onBackButtonClick}>Back</Button>
                    <div className="contact-page__main-info">
                        <img className="contact-page__avatar" src={`${data.resources[0].avatar_url}`} />
                        <div className="contact-page__text-info">
                            <div className="contact-page__name">{data.resources[0].fields['first name']?.[0].value} {data.resources[0].fields['last name']?.[0].value}</div>
                            <div className="contact-page__email">{data.resources[0].fields['email']?.[0].value}</div>
                        </div>
                    </div>
                    <div className="contact-page__tags">
                        <div className="contact-page__tags-title">Tags</div>
                        <div className="contact-page__tags-container">
                            {data.resources[0].tags.map((tag) => {
                                return (
                                    <div key={tag.id} className="contact-page__tag">{tag.tag}</div>
                                )
                            })}
                        </div>
                    </div>

                    <TextField fullWidth className="contact-page__text-field" onChange={(event) => { setTagsString(event.target.value) }}></TextField>
                    <Button variant="outlined" className="contact-page__add-button" onClick={onAddTagButtonClick}>Add Tag</Button>
                </div>}
        </div>
    );
}

export default ContactPage;