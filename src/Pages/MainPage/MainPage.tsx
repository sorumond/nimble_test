
import ContactsList from '../../Components/ContactsList/ContactsList'
import CreateContant from '../../Components/CreateContact/CreateContact'
import './MainPage.css'

function MainPage() {
    return (
        <div className='main-page'>
            <div className='main-page__container'>
                <div className='main-page__create-contact-container'>
                    <CreateContant></CreateContant>
                </div>
                <div className='main-page__contacts-list-container'>
                    <ContactsList></ContactsList>
                </div>
            </div>
        </div>
    )
}

export default MainPage
