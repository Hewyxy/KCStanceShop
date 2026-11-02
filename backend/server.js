require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  }),
);

app.use(express.json({ limit: "20kb" }));

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[char];
  });
}

function createQuoteEmail(data) {
  const {
    name,
    email,
    phone,
    year,
    make,
    model,
    service,
    budget,
    contact,
    details,
    estimatedQuote,
  } = data;

  const customerName = escapeHtml(name);
  const customerEmail = escapeHtml(email);
  const customerPhone = escapeHtml(phone || "Not provided");
  const vehicle = [year, make, model].filter(Boolean).map(escapeHtml).join(" ");

  const safeVehicle = vehicle || "Vehicle not specified";
  const safeService = escapeHtml(service);
  const safeBudget = escapeHtml(budget);
  const safeContact = escapeHtml(contact);
  const safeEstimate = escapeHtml(estimatedQuote || "Custom estimate required");
  const safeDetails = escapeHtml(details).replace(/\r?\n/g, "<br>");

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <body style="margin:0;padding:0;background:#111110;font-family:Arial,Helvetica,sans-serif;color:#e8e6e3;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#111110;padding:28px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px;background:#151514;border:1px solid #3a3835;">

                <tr>
                  <td style="padding:28px 30px;background:#1d1d1b;border-bottom:1px solid #3a3835;">
                    <p style="margin:0;color:#d8d2cc;font-size:12px;font-weight:bold;letter-spacing:3px;">KC STANCE SHOP</p>
                    <p style="margin:8px 0 0;color:#92908d;font-size:10px;letter-spacing:2px;">WEBSITE · NEW INQUIRY</p>
                    <h1 style="margin:24px 0 8px;font-size:28px;line-height:1.2;color:#e8e6e3;">New Quote Request</h1>
                    <p style="margin:0;color:#92908d;font-size:14px;line-height:1.6;">A customer has submitted a new project inquiry.</p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:26px 30px;">
                    <p style="margin:0 0 18px;color:#92908d;font-size:11px;font-weight:bold;letter-spacing:2px;">CUSTOMER INFORMATION</p>

                    <p style="margin:0 0 5px;color:#92908d;font-size:12px;">Customer name</p>
                    <p style="margin:0 0 18px;font-size:17px;font-weight:bold;color:#e8e6e3;">${customerName}</p>

                    <p style="margin:0 0 5px;color:#92908d;font-size:12px;">Email address</p>
                    <p style="margin:0 0 18px;font-size:14px;">
                      <a href="mailto:${customerEmail}" style="color:#d8d2cc;text-decoration:underline;">${customerEmail}</a>
                    </p>

                    <p style="margin:0 0 5px;color:#92908d;font-size:12px;">Phone</p>
                    <p style="margin:0 0 18px;font-size:14px;color:#e8e6e3;">${customerPhone}</p>

                    <p style="margin:0 0 5px;color:#92908d;font-size:12px;">Preferred contact method</p>
                    <p style="margin:0;font-size:14px;color:#e8e6e3;">${safeContact}</p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:26px 30px;border-top:1px solid #3a3835;">
                    <p style="margin:0 0 18px;color:#92908d;font-size:11px;font-weight:bold;letter-spacing:2px;">VEHICLE & PROJECT</p>

                    <h2 style="margin:0 0 18px;font-size:23px;color:#e8e6e3;">${safeVehicle}</h2>

                    <p style="margin:0 0 5px;color:#92908d;font-size:12px;">Requested service</p>
                    <p style="margin:0 0 18px;font-size:15px;font-weight:bold;color:#d8d2cc;">${safeService}</p>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#1d1d1b;border:1px solid #3a3835;">
                      <tr>
                        <td style="padding:16px;">
                          <p style="margin:0 0 8px;color:#92908d;font-size:10px;letter-spacing:2px;">ESTIMATED QUOTE</p>
                          <p style="margin:0;font-size:22px;font-weight:bold;color:#e8e6e3;">${safeEstimate}</p>
                          <p style="margin:10px 0 0;color:#92908d;font-size:12px;">Customer budget: ${safeBudget}</p>
                        </td>
                      </tr>
                    </table>

                    <p style="margin:24px 0 10px;color:#92908d;font-size:11px;font-weight:bold;letter-spacing:2px;">PROJECT DETAILS</p>
                    <div style="padding:16px;background:#1d1d1b;border-left:3px solid #d8d2cc;font-size:14px;line-height:1.8;color:#e8e6e3;">${safeDetails}</div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:20px 30px;background:#1d1d1b;border-top:1px solid #3a3835;">
                    <p style="margin:0 0 8px;color:#92908d;font-size:10px;letter-spacing:1px;">KC STANCE SHOP · QUOTE NOTIFICATION</p>
                    <p style="margin:0;color:#92908d;font-size:11px;line-height:1.6;">This estimate is preliminary and is not a final quote. Confirm pricing and project requirements with the customer.</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const text = `
KC STANCE SHOP — NEW QUOTE REQUEST

CUSTOMER INFORMATION
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Preferred contact: ${contact}

VEHICLE
${vehicle || "Vehicle not specified"}

PROJECT
Service: ${service}
Estimated quote: ${estimatedQuote || "Custom estimate required"}
Customer budget: ${budget}

PROJECT DETAILS
${details}

Note: This estimate is preliminary, not a final quote.
  `.trim();

  return { html, text };
}


app.post("/api/quote", async (req, res) => {
  const {
    name,
    email,
    phone,
    year,
    make,
    model,
    service,
    contact,
    details,
    estimatedQuote,
  } = req.body;

  if (!name || !email || !service || !contact || !details) {
    return res.status(400).json({
      message: "Please complete all required fields.",
    });
  }

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!validEmail) {
    return res.status(400).json({
      message: "Please provide a valid email address.",
    });
  }

  
  try {
    const { html, text } = createQuoteEmail(req.body);

    // 1. Send the quote request to the shop
    await transporter.sendMail({
      from: `"KC Stance Shop Website" <${process.env.SMTP_USER}>`,
      to: process.env.SHOP_EMAIL,
      replyTo: {
        name: String(name).trim(),
        address: String(email).trim(),
      },
      subject: `New Quote Request — ${service}`,
      text,
      html,
    });

    // 2. Send confirmation to the customer
    let confirmationSent = true;

    try {
      await transporter.sendMail({
        from: `"KC Stance Shop" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "We received your quote request | KC Stance Shop",
        text: `
Hi ${name},

Thank you for contacting KC Stance Shop!

We've received your quote request for ${service}.
Our team will review your project and get back to you.

Estimated quote: ${estimatedQuote || "Custom estimate required"}

Please note that this is a preliminary estimate, not a final quote.

Thank you,
KC Stance Shop
        `.trim(),
        html: `
          <div style="background:#111110;color:#e8e6e3;padding:30px;font-family:Arial,sans-serif;">
            <div style="max-width:560px;margin:auto;background:#1d1d1b;padding:28px;border:1px solid #3a3835;">
              <p style="color:#d8d2cc;letter-spacing:3px;font-weight:bold;">KC STANCE SHOP</p>
              <h1>We got your request.</h1>
              <p>Hi ${escapeHtml(name)},</p>
              <p>
                Thanks for reaching out! We've received your request for
                <strong>${escapeHtml(service)}</strong> and will review your project.
              </p>
              <div style="margin:24px 0;padding:18px;background:#111110;border-left:3px solid #d8d2cc;">
                <p style="color:#92908d;">INITIAL ESTIMATE</p>
                <h2>${escapeHtml(estimatedQuote || "Custom estimate required")}</h2>
              </div>
              <p style="color:#92908d;font-size:12px;line-height:1.7;">
                This is a preliminary estimate, not a final quote.
              </p>
              <p>Thank you,<br>KC Stance Shop</p>
            </div>
          </div>
        `,
      });
    } catch (confirmationError) {
      confirmationSent = false;
      console.error("Customer confirmation email error:", confirmationError);
    }

    // The shop's email was sent, so the request was received.
    return res.status(200).json({
      message: "Quote request sent successfully.",
      confirmationSent,
    });
  } catch (error) {
    console.error("Quote email error:", error);

    return res.status(500).json({
      message: "We couldn't send your request. Please try again later.",
    });
  }
});

module.exports = app;