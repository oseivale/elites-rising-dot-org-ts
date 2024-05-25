"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import style from "./contact-form.module.css";
import { nunito_sans } from "@/fonts/fonts";

interface FormData {
  name: string;
  email: string;
  message: string;
  location: string;
  occupation: string;
  age: string;
  phone: string;
  topic: string; // New dropdown field
}

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    occupation: "",
    location: "",
    age: "",
    phone: "",
    topic: "", // Initialize with an empty string or a default value
  });

  const handleChange = (e: any): void => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /*
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    // Call your API route to send email
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log(data); // You can handle the response accordingly
  };
*/
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Email sent successfully!");
      setFormData({
        name: "",
        email: "",
        message: "",
        occupation: "",
        location: "",
        age: "",
        phone: "",
        topic: "", // Initialize with an empty string or a default value
      });
    } else {
      alert("Failed to send email.");
    }
  };

  return (
    <form
      className={`${nunito_sans.className} ${style.form}`}
      onSubmit={handleSubmit}
    >
      <label className={style.formLabel}>
        Full Name
        <input
          className={style.formInput}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="ex: John Smith"
          required
        />
      </label>

      <label className={style.formLabel}>
        Please specify what area you are located in
        <input
          className={style.formInput}
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="ex: Scarborough, ON"
          required
        />
      </label>

      <label className={style.formLabel}>
        Age range
        <select
          className={style.formSelect}
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        >
          <option value="choose-age" disabled selected>
            Choose one
          </option>
          <option value="1">13-16 years old</option>
          <option value="2">17-20 years old</option>
          <option value="3">21-25 years old</option>
          <option value="4">26-30 years old</option>
          <option value="5">31-35 years old</option>
        </select>
      </label>
      <label className={style.formLabel}>
        Are you:
        <select
          className={style.formSelect}
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          required
        >
          <option value="choose-occupation" disabled selected>
            Choose one
          </option>
          <option value="studying">Studying</option>
          <option value="working">Working</option>
          <option value="neither">Neither studying nor working</option>
        </select>
      </label>

      <label className={style.formLabel}>
        Would you like to:
        <select
          className={style.formSelect}
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          required
        >
          <option value="choose-mentor" disabled selected>
            Choose one
          </option>

          <option value="mentor">Become a Mentor</option>
          <option value="mentee">Be paired with a Mentor</option>
        </select>
      </label>

      <label className={style.formLabel}>
        Email
        <input
          className={style.formInput}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="ex: john@mail.com"
          required
        />
      </label>
      <label className={style.formLabel}>
        Phone Number
        <input
          className={style.formInput}
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="ex: (416) 555-5555"
          required
        />
      </label>

      <label className={style.formLabel}>
        Anything else you'd like to share?
        <textarea
          className={style.formInput}
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us a bit about yourself..."
          required
        />
      </label>

      <button className={style.submitButton} type="submit">
        Send
      </button>
    </form>
  );
}

export default ContactForm;
