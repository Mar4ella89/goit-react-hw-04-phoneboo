import { nanoid } from 'nanoid';
// import { Component } from 'react';
import { useEffect, useState } from 'react';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(
    window.localStorage.getItem('contacts') ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // componentDidMount() {
  //     const contacts = localStorage.getItem('contacts');
  //     const parsedContacts = JSON.parse(contacts);

  //     if (parsedContacts) {
  //       this.setState({ contacts: parsedContacts });
  //     }
  //   }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const isDublicate = (name, number) => {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();

    // const { contacts } = this.state;

    const contactData = contacts.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedName ||
        number.toLowerCase() === normalizedNumber
      );
    });

    return Boolean(contactData);
  };

  const addContact = ({ name, number }) => {
    if (isDublicate(name, number)) {
      return alert(`Name ${name} or number ${number} is already in contacts`);
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevContacts => [...contact, ...prevContacts]);
  };

  const changeFilter = event => setFilter(event.currentTarget.value);

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter);
    });
  };

  // const { filter } = this.state;
  const visibleContacts = getVisibleContacts();

  return (
    <>
      <div className={css.container}>
        <div>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={addContact} />
        </div>
        <div>
          <h2>Contacts</h2>

          <Filter value={filter} onChange={changeFilter} />

          <ContactList
            contacts={visibleContacts}
            onDeleteContact={deleteContact}
          />
        </div>
      </div>
    </>
  );
};
