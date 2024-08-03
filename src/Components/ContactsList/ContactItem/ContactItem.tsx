import './ContactItem.css';
import { NavLink } from "react-router-dom"
import { IContactFields } from "../ContactsList"
import { IconButton } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useDeleteContactMutation } from "../../../services/contacts";
import { useState } from "react";


export interface IContact {
    id: string,
    avatar_url: string,
    tags: Array<{
        id: string,
        tag: string
    }>,
    tags2: Array<string>,
    fields: IContactFields
}

export function ContactItem(props: { contact: IContact }) {
    const [deleteContact] = useDeleteContactMutation();
    const [contact] = useState<IContact>(props.contact);

    function onDeleteButton(contactId: string) {
        deleteContact(contactId);
    }
    return (
        <div className="contact-item" >
            <NavLink to={`contact/${contact.id}`}>
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
                    {contact?.tags2 && contact?.tags2.map((tag) => {
                        return (
                            <div key={`${contact.id}_${tag}`} className="contact-item__tag">{tag}</div>
                        )
                    })}
                </div>
            </NavLink>
            <IconButton onClick={(event) => {
                onDeleteButton(contact.id)
                event.stopPropagation();
            }}
                className="contact-item__delete-button">
                <CloseIcon></CloseIcon>
            </IconButton>
        </div>
    )
}