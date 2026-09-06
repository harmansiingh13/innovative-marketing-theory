import { validationSchema } from "@/sections/ContactSection/elements/ContactForm/validationSchema";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const getRequiredEnv = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
};

const RESEND_API_KEY = getRequiredEnv("RESEND_API_KEY");
const EMAIL_FROM = getRequiredEnv("EMAIL_FROM");
const CONTACT_EMAIL = getRequiredEnv("CONTACT_EMAIL");

const resend = new Resend(RESEND_API_KEY);

const formatConsultationDateTime = (value?: string) => {
  if (!value) {
    return {
      date: "Not provided",
      time: "Not provided",
    };
  }

  const [datePart, timePart] = value.split("T");

  if (!datePart || !timePart) {
    return {
      date: "Not provided",
      time: "Not provided",
    };
  }

  const [year, month, day] = datePart.split("-");
  const [hours, minutes] = timePart.split(":").map(Number);

  const date = new Date(Number(year), Number(month) - 1, Number(day));

  const time = new Date(2000, 0, 1, hours, minutes);

  return {
    date: date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    time: time.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  };
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the incoming form data
    const result = validationSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check your form details.",
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    // Use the validated form data
    const {
      fullName,
      phoneNumber,
      workEmail,
      companyName,
      designation,
      businessOverview,
      consultationDate,
    } = result.data;

    const { date: meetingDate, time: meetingTime } = formatConsultationDateTime(consultationDate);

    const { data: emailData, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: [CONTACT_EMAIL],
      replyTo: workEmail || undefined,
      subject: `New Consultation Request – ${fullName}`,
      text: `
            Hi Team,

            ${fullName} has booked a consultation through the website.

            Email: ${workEmail || "Not provided"} | Phone: ${phoneNumber}
            Company: ${companyName} | Title: ${designation}
            Business: ${businessOverview || "Not provided"}
            Meeting: ${
              consultationDate
                ? `Meeting: ${meetingDate} at ${meetingTime} (IST)`
                : "Meeting: Not provided"
            }

            Please follow up accordingly.
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Failed to send message",
        },
        { status: 500 },
      );
    }

    console.log("Email sent successfully:", emailData?.id);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
      emailId: emailData?.id,
    });
  } catch (error) {
    console.error("Contact form submission failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message",
      },
      { status: 500 },
    );
  }
}
