import './ContactsList.css'
import { useGetContactsQuery } from "../../services/contacts";
import { ContactItem } from './ContactItem/ContactItem';
import { IGetContact } from '../../interfaces/interfaces';

function ContactsList() {
    const { data } = useGetContactsQuery<IGetContact>('')

    return (
        <div className="contacts-list">
            <div className="contacts-list__title">Contacts List</div>
            <div className="contacts-list__container">
                {data?.resources && data.resources.map((contact) => {
                    return (
                        <ContactItem key={contact.id} contact={contact}></ContactItem>
                    )
                })}
            </div>
        </div>
    )
}

export default ContactsList