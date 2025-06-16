"use client";
import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import {
  FormControl,
  OutlinedInput,
  MenuItem,
  Select,
  Button,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import { sendEmail } from "@/actions/sendEmail";

import { MdEmail } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const subjects = [
  "General Inquiry",
  "Technical Support",
  "Feature Request",
  "Feedback / Suggestion",
  "Bug Report",
  "Billing Question",
  "Other",
];

function getStyles(subject, contactSubject, theme) {
  return {
    fontWeight:
      contactSubject === subject
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  };
}

const DialogBox = ({title, description, open, setOpen, fullScreen}) => {

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

const ContactPage = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");

  const resetFields = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const isFormValid = (formData) => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const isValidName = (name) => {
    return /^[A-Za-z]+( [A-Za-z]+)*$/.test(name.trim());
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  };

  const isValidMessage = (message) => {
    return message.trim().length > 10;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }
    setError("");
    setInfo("");
    setOpen(false);

    setIsLoading(true);
    if (!isFormValid(formData)) {
      setIsLoading(false);
      setError("All fields are required!");
      setOpen(true);
      return;
    }

    if (!isValidName(formData.name)) {
      setIsLoading(false);
      setError("Name should only contain alphabets and space in between!");
      setOpen(true);
      return;
    }
    if (!isValidEmail(formData.email)) {
      setIsLoading(false);
      setError("Invalid email!");
      setOpen(true);
      return;
    }
    if (!isValidMessage(formData.message)) {
      setIsLoading(false);
      setError("Message must contain more than 10 characters!");
      setOpen(true);
      return;
    }

    const response = await sendEmail(formData);
    if (response.error) {
      setIsLoading(false);
      setError(response.error);
      setOpen(true);
      return;
    }
    if (response.apiError) {
      setIsLoading(false);
      setError(response.apiError);
      setOpen(true);
      return;
    }

    setIsLoading(false);
    setInfo("Thank you for your message. We'll get back to you soon.");
    setOpen(true);
    resetFields();
  };

  return (
    <main className="flex flex-col gap-y-10">
      {info !== "" && (
        <DialogBox title={"Successfully sent message!"} description={info} open={open} setOpen={setOpen} fullScreen={fullScreen}/>
      )}
      {error !== "" && (
        <DialogBox title={"Field Error!"} description={error} open={open} setOpen={setOpen} fullScreen={fullScreen}/>
      )}
      <section className="flex flex-col gap-y-2 w-full items-center text-center mb-4">
        <h1 className="text-4xl font-semibold">Contact Us</h1>
        <p className="text-lg text-gray-500">
          Have questions? We'd love to hear from you. Send us a message and
          we'll respond as soon as possible.
        </p>
      </section>
      <section className="flex flex-row gap-x-10 w-full mx-auto max-w-5xl">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-y-5 w-full max-w-lg shadow-md border-1 border-gray-300 p-10 rounded-xl"
        >
          <h2 className="text-2xl font-semibold text-center">
            Send Us a Message
          </h2>
          <div className="flex flex-col w-full">
            <div className="font-semibold mb-2">Full Name</div>
            <OutlinedInput
              fullWidth
              placeholder="Your full name"
              name="name"
              value={formData.name}
              // error
              aria-label="name input"
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="font-semibold mb-2">Email Address</div>
            <OutlinedInput
              name="email"
              type="email"
              fullWidth
              placeholder="you@example.com"
              value={formData.email}
              // error
              aria-label="email input"
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="font-semibold mb-2">Subject</div>
            <FormControl sx={{ width: "100%" }}>
              <Select
                name="subject"
                displayEmpty
                value={formData.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected === "") {
                    return <em>Select a Subject</em>;
                  }

                  return selected;
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "select subject" }}
              >
                <MenuItem disabled value="">
                  <em>Select a Subject</em>
                </MenuItem>
                {subjects.map((subject) => (
                  <MenuItem
                    key={subject}
                    value={subject}
                    style={getStyles(subject, formData.subject, theme)}
                  >
                    {subject}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="flex flex-col w-full">
            <div className="font-semibold mb-2">Message</div>
            <OutlinedInput
              name="message"
              fullWidth
              placeholder="Your message here"
              value={formData.message}
              multiline
              rows={4}
              // error
              aria-label="message input"
              onChange={(e) => handleChange("message", e.target.value)}
            />
          </div>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={!isFormValid(formData)}
          >
            Send Message
          </Button>
        </form>
        <div className="flex flex-col gap-y-10 w-full">
          <div className="p-10 flex flex-col gap-y-5 shadow-md border-1 border-gray-300 rounded-xl">
            <h2 className="text-2xl font-semibold">Get in Touch</h2>
            <div className="flex items-start flex-row gap-x-5">
              <div className="flex items-center justify-center p-3 bg-[rgb(129,175,255)] text-2xl w-fit h-fit rounded-xl">
                <MdEmail />
              </div>
              <div className="flex flex-col gap-y-1">
                <h3 className="font-semibold text-lg">Email</h3>
                <p className="text-gray-700">support@heartcrop.com</p>
                <p className="text-gray-500">
                  We'll respond within 24-48 hours
                </p>
              </div>
            </div>
          </div>
          <div className="p-10 flex flex-col gap-y-5 shadow-md border-1 border-gray-300 rounded-xl">
            <h2 className="text-2xl font-semibold">FAQ</h2>
            <p className="text-gray-500">
              Before contacting us, you might want to check our frequently asked
              questions.
            </p>
            <Link
              href={"/#faq"}
              className="text-[rgb(25,118,210)] flex flex-row gap-x-2 items-center"
            >
              <span>View FAQ Section</span>
              <span className="flex items-center justify-center text-xl">
                <FaAngleRight />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
