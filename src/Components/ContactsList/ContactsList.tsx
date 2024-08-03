import './ContactsList.css'
import { useGetContactsQuery } from "../../services/contacts";
import { ContactItem, IContact } from './ContactItem/ContactItem';

export interface IGetContact {
    data: IContactsList
}

interface IContactsList {
    resources: Array<IContact>
}

export interface IContactFields {
    ["first name"]?: Array<{ [key: string]: string }>,
    ["last name"]?: Array<{ [key: string]: string }>,
    ["email"]?: Array<{ [key: string]: string }>
}

function ContactsList() {
    const { data } = useGetContactsQuery<IGetContact>('')

    return (
        <div className="contacts-list">
            <div className="contacts-list__title">Contacts List</div>
            <div className="contacts-list__container">
                {data?.resources && data.resources.map((contact) => {
                    return (
                        <ContactItem contact={contact}></ContactItem>
                    )
                })}
            </div>
        </div>
    )
}

export default ContactsList