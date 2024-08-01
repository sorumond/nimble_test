import ContactsList from './Components/ContactsList/ContactsList'
import CreateContant from './Components/CreateContact/CreateContact'
import './App.css'

function App() {
  return (
    <div className='main'>
      <div className='main__container'>
        <div className='main__create-contact-container'>
          <CreateContant></CreateContant>
        </div>
        <div className='main__contacts-list-container'>
          <ContactsList></ContactsList>
        </div>
      </div>
    </div>
  )
}

export default App
