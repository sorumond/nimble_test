import './ContactItem.css';
import { NavLink } from "react-router-dom"
import { IconButton } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useDeleteContactMutation } from "../../../services/contacts";
import { useState } from "react";
import { IContact } from '../../../interfaces/interfaces';

export function ContactItem(props: { contact: IContact }) {
    const [deleteContact] = useDeleteContactMutation();
    const [contact] = useState<IContact>(props.contact);

    function onDeleteButton(contactId: string) {
        deleteContact(contactId);
    }
    return (
        <div className="contact-item" >
            <NavLink to={`contact/${contact.uuid}`}>
                <div className="contact-item__main-info">
                    <img className="contact-item__avatar" src={`${contact?.avatar_url}`} />
                    <div className="contact-item__text-info">
                        <div className="contact-item__name">
                            {contact?.fields["first name"]?.[0].value} {contact?.fields['last name']?.[0].value}
                        </div>
                        <div className="contact-item__email">{contact?.fields['email']?.[0].value}</div>
                    </div>
                </div>
                <div className="contact-item__tags-container">
                    {contact?.tags && contact?.tags.map((tag) => {
                        return (
                            <div key={`${contact.uuid}_${tag}`} className="contact-item__tag">{tag}</div>
                        )
                    })}
                </div>
            </NavLink>
            <IconButton onClick={(event) => {
                onDeleteButton(contact.uuid)
                event.stopPropagation();
            }}
                className="contact-item__delete-button">
                <CloseIcon></CloseIcon>
            </IconButton>
        </div>
    )
}