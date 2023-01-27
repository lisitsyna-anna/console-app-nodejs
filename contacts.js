const fs = require('fs').promises;
const path = require('path');
const uniqid = require('uniqid');
const contactsPath = path.resolve('./db/contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);

    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async contactId => {
  try {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === contactId);

    if (!result) {
      return null;
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async contactId => {
  try {
    const contacts = await listContacts();
    const findedIndex = contacts.findIndex(contact => contact.id === contactId);
    if (findedIndex === -1) {
      return null;
    }
    const [removedContact] = contacts.splice(findedIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return removedContact;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();

    const newContact = {
      id: uniqid(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return newContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
