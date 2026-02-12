import { useState, useEffect } from "react";

export default function ContactForm({ addContact, updateContact, editing, setEditing, contacts }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (editing !== null && contacts[editing]) {
      const contact = contacts[editing];
      setName(contact.name);
      setEmail(contact.email);
      setPhone(contact.phone);
    } else {
      setName("");
      setEmail("");
      setPhone("");
    }
  }, [editing, contacts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = { name, email, phone };

    if (editing !== null) {
      updateContact(newContact);
    } else {
      addContact(newContact);
    }

    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <form className="bg-white p-6 rounded shadow-md space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold">
        {editing !== null ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        placeholder="Name"
        className="w-full p-2 border border-gray-300 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border border-gray-300 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Phone"
        className="w-full p-2 border border-gray-300 rounded"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <button
        type="submit"
        className={`w-full py-2 rounded text-white ${
          editing !== null ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"
        } transition`}
      >
        {editing !== null ? "Update Contact" : "Add Contact"}
      </button>
    </form>
  );
}
