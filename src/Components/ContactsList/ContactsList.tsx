import './ContactsList.css'
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useDeleteContactMutation, useGetContactsQuery } from "../../services/contacts";
import { Link } from "react-router-dom";

function ContactsList() {
    const { data } = useGetContactsQuery('')
    const [deleteContact] = useDeleteContactMutation();

    function onDeleteButton(contactId: string) {
        deleteContact(contactId);
    }

    return (
        <div>
            <div>Contacts List</div>
            <div className="contacts__container">
                {data?.resources && data.resources.map((contact) => {
                    return (
                        <div key={contact.id} className="contact-item" >
                            <Link to={`contact/${contact.id}`}>
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
                                <IconButton onClick={() => { onDeleteButton(contact.id) }} className="contact-item__delete-button">
                                    <CloseIcon></CloseIcon>
                                </IconButton>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ContactsList