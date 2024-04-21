import * as fs from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';

const contactsPath = path.join( 'db', 'contacts.json');

async function readContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

export async function listContacts() {
  const contacts = await readContacts();
  return contacts;
}

export async function getContactById(contactId) {
  const contacts = await readContacts();
  const searchedContact = contacts.find(e => e.id === contactId);
  return searchedContact || null;
}

export async function removeContact(contactId) {
  const contacts = await readContacts();
  const response = contacts.filter(e => e.id !== contactId);
  const removedContact = contacts.find(e => e.id === contactId);
  writeContacts(response);
  return removedContact || null;
}

export async function addContact(contact) {
  const newContact = {
    id: crypto.randomUUID(),
    ...contact,
  }
  const contacts = await readContacts();
  contacts.push(newContact);
  writeContacts(contacts);
  return newContact;
}
