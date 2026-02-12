import { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import { CONTACTS_API } from "../assets/api"; // import the variable

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [editing, setEditing] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch(CONTACTS_API, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Failed to fetch contacts:", text);
        return;
      }

      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  const addContact = async (contact) => {
    try {
      const res = await fetch(CONTACTS_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contact),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Failed to add contact:", text);
        return;
      }

      const newContact = await res.json();
      setContacts([...contacts, newContact]);
    } catch (err) {
      console.error("Error adding contact:", err);
    }
  };

  const updateContact = async (updated) => {
    if (editing === null) return;
    const contactId = contacts[editing]._id;

    try {
      const res = await fetch(`${CONTACTS_API}/${contactId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updated),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Failed to update contact:", text);
        return;
      }

      const updatedContact = await res.json();
      setContacts(
        contacts.map((c, i) => (i === editing ? updatedContact : c))
      );
      setEditing(null);
    } catch (err) {
      console.error("Error updating contact:", err);
    }
  };

  const deleteContact = async (index) => {
    const contactId = contacts[index]._id;

    try {
      const res = await fetch(`${CONTACTS_API}/${contactId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Failed to delete contact:", text);
        return;
      }

      setContacts(contacts.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Error deleting contact:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Contact Manager</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <ContactForm
        addContact={addContact}
        updateContact={updateContact}
        editing={editing}
        setEditing={setEditing}
        contacts={contacts}
      />

      <ul className="mt-6 space-y-4">
        {contacts.map((c, i) => (
          <li
            key={c._id || i}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{c.name}</p>
              <p className="text-gray-600">{c.email}</p>
              <p className="text-gray-600">{c.phone}</p>
            </div>
            <div className="space-x-2">
              <button
                className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                onClick={() => setEditing(i)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                onClick={() => deleteContact(i)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
