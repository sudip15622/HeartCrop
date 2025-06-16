"use server"

import { Resend } from 'resend';
import EmailTemplate from '@/components/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);


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

export async function sendEmail(details) {
    try {
        if (!isValidName(details.name)) {
            return {
                success: false,
                error: "Name should only contain alphabets and space in between!"
            }
        }
        if (!isValidEmail(details.email)) {
            return {
                success: false,
                error: "Invalid email!"
            }
        }
        
        if (!isValidMessage(details.message)) {
            return {
                success: false,
                error: "Message must contain more than 10 characters!"
            }
        }

        const templateParams = {
            name: details.name,
            email: details.email,
            message: details.message,
            // subject: details.subject
        }
        const { data, error } = await resend.emails.send({
            from: 'Sudip Lamichhane <contact@sudip-lamichhane.com.np>',
            to: [process.env.MY_EMAIL],
            subject: details.subject,
            react: EmailTemplate(templateParams),
        });

        // console.log("Resend response:", { data, error });

        if (error) {
            return {
                success: false,
                error: "Cannot send message!"
            }
        }
        return {
            success: true,
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            apiError: "Something went wrong!"
        }
    }
}