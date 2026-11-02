require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

const pool = require("./db");

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

app.get("/api/services", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, description, duration_minutes, price
      FROM public.services
      WHERE is_active = TRUE
      ORDER BY name ASC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Get services error:", error.message);

    res.status(500).json({
      message: "Unable to load services.",
    });
  }
});

app.get("/api/availability", async (req, res) => {
  const { serviceId, date } = req.query;

  // Validate service ID and date format.
  if (
    !/^\d+$/.test(String(serviceId || "")) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(String(date || ""))
  ) {
    return res.status(400).json({
      message: "A valid serviceId and date (YYYY-MM-DD) are required.",
    });
  }

  const parsedDate = new Date(`${date}T00:00:00.000Z`);

  if (
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.toISOString().slice(0, 10) !== date
  ) {
    return res.status(400).json({
      message: "Please provide a valid date.",
    });
  }

  try {
    // Confirm that the selected service exists and is active.
    const serviceResult = await pool.query(
      `SELECT id FROM public.services
       WHERE id = $1 AND is_active = TRUE`,
      [serviceId],
    );

    if (serviceResult.rowCount === 0) {
      return res.status(404).json({
        message: "Service not found.",
      });
    }

    const result = await pool.query(
      `
      WITH selected_service AS (
        SELECT id, duration_minutes
        FROM public.services
        WHERE id = $1 AND is_active = TRUE
      ),
      business_day AS (
        SELECT
          ($2::date + opens_at) AS opens_local,
          ($2::date + closes_at) AS closes_local
        FROM public.business_hours
        WHERE day_of_week = EXTRACT(DOW FROM $2::date)::SMALLINT
          AND is_closed = FALSE
      ),
      local_slots AS (
        SELECT
          generated.slot_start_local,
          generated.slot_start_local
            + make_interval(mins => service.duration_minutes)
            AS slot_end_local
        FROM selected_service AS service
        CROSS JOIN business_day AS hours
        CROSS JOIN LATERAL generate_series(
          hours.opens_local,
          hours.closes_local
            - make_interval(mins => service.duration_minutes),
          make_interval(mins => service.duration_minutes)
        ) AS generated(slot_start_local)
      ),
      utc_slots AS (
        SELECT
          slot_start_local,
          slot_end_local,
          slot_start_local AT TIME ZONE 'America/Chicago' AS start_at,
          slot_end_local AT TIME ZONE 'America/Chicago' AS end_at
        FROM local_slots
      )
      SELECT
        start_at,
        end_at,
        to_char(slot_start_local, 'HH12:MI AM') AS start_time,
        to_char(slot_end_local, 'HH12:MI AM') AS end_time
      FROM utc_slots AS slot
      WHERE slot.start_at >= NOW() + INTERVAL '48 hours'

        AND NOT EXISTS (
          SELECT 1
          FROM public.appointments AS appointment
          WHERE appointment.status IN ('pending', 'confirmed')
            AND tstzrange(
              appointment.start_at,
              appointment.end_at,
              '[)'
            ) && tstzrange(slot.start_at, slot.end_at, '[)')
        )

        AND NOT EXISTS (
          SELECT 1
          FROM public.blocked_times AS blocked
          WHERE tstzrange(
            blocked.start_at,
            blocked.end_at,
            '[)'
          ) && tstzrange(slot.start_at, slot.end_at, '[)')
        )

      ORDER BY slot.start_at ASC
      `,
      [serviceId, date],
    );

    return res.json(result.rows);
  } catch (error) {
    console.error("Get availability error:", error.message);

    return res.status(500).json({
      message: "Unable to load available time slots.",
    });
  }
});

app.post("/api/appointments", async (req, res) => {
  const {
    serviceId,
    customerName,
    customerPhone,
    customerEmail,
    startAt,
    notes,
  } = req.body;

  // Validate required fields.
  if (
    !/^\d+$/.test(String(serviceId || "")) ||
    typeof customerName !== "string" ||
    !customerName.trim() ||
    typeof customerPhone !== "string" ||
    !customerPhone.trim() ||
    typeof customerEmail !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail.trim()) ||
    typeof startAt !== "string" ||
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(
      startAt,
    )
  ) {
    return res.status(400).json({
      message:
        "Please provide valid customer details, service, and start time.",
    });
  }

  if (
    customerName.trim().length > 100 ||
    customerPhone.trim().length > 30 ||
    customerEmail.trim().length > 254 ||
    (notes != null && (typeof notes !== "string" || notes.length > 2000))
  ) {
    return res.status(400).json({
      message: "One or more fields exceed the allowed length.",
    });
  }

  const startDate = new Date(startAt);

  if (Number.isNaN(startDate.getTime())) {
    return res.status(400).json({
      message: "Invalid appointment start time.",
    });
  }

  try {
    // Check the service, notice period, and shop schedule.
    const check = await pool.query(
      `
      WITH requested AS (
        SELECT $2::timestamptz AS start_at
      ),
      local_time AS (
        SELECT
          start_at,
          start_at AT TIME ZONE 'America/Chicago' AS local_start
        FROM requested
      )
      SELECT
          s.id AS service_id,
          s.name AS service_name,
          s.duration_minutes,
          s.price,
        lt.start_at,
        lt.start_at + make_interval(mins => s.duration_minutes) AS end_at,
        (
          lt.start_at >= NOW() + INTERVAL '48 hours'
        ) AS enough_notice,
        (
          bh.is_closed = FALSE
          AND lt.local_start::time >= bh.opens_at
          AND (
            lt.local_start
            + make_interval(mins => s.duration_minutes)
          )::date = lt.local_start::date
          AND (
            lt.local_start
            + make_interval(mins => s.duration_minutes)
          )::time <= bh.closes_at
          AND MOD(
            EXTRACT(
              EPOCH FROM (lt.local_start::time - bh.opens_at)
            ) / 60,
            s.duration_minutes
          ) = 0
        ) AS within_business_hours
      FROM public.services s
      CROSS JOIN local_time lt
      LEFT JOIN public.business_hours bh
        ON bh.day_of_week =
          EXTRACT(DOW FROM lt.local_start)::SMALLINT
      WHERE s.id = $1
        AND s.is_active = TRUE
      `,
      [serviceId, startDate.toISOString()],
    );

    if (check.rowCount === 0) {
      return res.status(404).json({
        message: "Service not found or inactive.",
      });
    }

    const slot = check.rows[0];

    if (!slot.enough_notice) {
      return res.status(400).json({
        message: "Appointments must be booked at least 48 hours in advance.",
      });
    }

    if (!slot.within_business_hours) {
      return res.status(400).json({
        message:
          "The selected time is outside business hours or is not a valid slot.",
      });
    }

    // Check blocked times.
    const blocked = await pool.query(
      `
      SELECT 1
      FROM public.blocked_times
      WHERE tstzrange(start_at, end_at, '[)')
        && tstzrange($1::timestamptz, $2::timestamptz, '[)')
      LIMIT 1
      `,
      [slot.start_at, slot.end_at],
    );

    if (blocked.rowCount > 0) {
      return res.status(409).json({
        message: "The selected time is unavailable.",
      });
    }

    // Insert as pending. PostgreSQL's exclusion constraint
    // prevents overlapping pending/confirmed appointments.
    const result = await pool.query(
      `
      INSERT INTO public.appointments (
        service_id,
        customer_name,
        customer_phone,
        customer_email,
        notes,
        start_at,
        end_at,
        status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending')
      RETURNING
          id,
          service_id,
          customer_name,
          customer_phone,
          customer_email,
          notes,
          start_at,
          end_at,
          status,
          created_at
      `,
      [
        serviceId,
        customerName.trim(),
        customerPhone.trim(),
        customerEmail.trim(),
        notes?.trim() || null,
        slot.start_at,
        slot.end_at,
      ],
    );

    const appointment = result.rows[0];

    const serviceName = slot.service_name;
    const price =
      slot.price != null && Number.isFinite(Number(slot.price))
        ? Number(slot.price).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })
        : "Price to be confirmed by the shop";

    const appointmentDate = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago",
      dateStyle: "full",
    }).format(new Date(appointment.start_at));

    const formatTime = (date) =>
      new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Chicago",
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date(date));

    const appointmentTime = `${formatTime(appointment.start_at)} – ${formatTime(appointment.end_at)}`;

    const shopEmailPromise = process.env.SHOP_EMAIL
      ? transporter.sendMail({
          from: `"KC Stance Shop" <${process.env.SMTP_USER}>`,
          to: process.env.SHOP_EMAIL,
          replyTo: {
            name: appointment.customer_name,
            address: appointment.customer_email,
          },
          subject: `New Appointment Request — ${serviceName}`,
          text: `
NEW APPOINTMENT REQUEST

Customer: ${appointment.customer_name}
Phone: ${appointment.customer_phone}
Email: ${appointment.customer_email}

Service: ${serviceName}
Price: ${price}
Date: ${appointmentDate}
Time: ${appointmentTime}
Status: Pending

Notes: ${appointment.notes || "None"}

Please contact the customer to confirm the appointment.
      `.trim(),
          html: `
        <div style="background:#111110;color:#e8e6e3;padding:30px;font-family:Arial,sans-serif;">
          <div style="max-width:560px;margin:auto;background:#1d1d1b;padding:28px;border:1px solid #3a3835;">
            <p style="color:#d8d2cc;letter-spacing:3px;font-weight:bold;">KC STANCE SHOP</p>
            <h1 style="font-size:26px;margin-bottom:8px;">New appointment request.</h1>
            <p style="color:#92908d;">A customer has requested an appointment through your website.</p>

            <div style="margin:24px 0;padding:18px;background:#111110;border-left:3px solid #d8d2cc;">
              <p style="color:#92908d;font-size:12px;letter-spacing:1px;">APPOINTMENT DETAILS</p>
              <p><strong>Service:</strong> ${escapeHtml(serviceName)}</p>
              <p><strong>Estimated price:</strong> ${escapeHtml(price)}</p>
              <p><strong>Date:</strong> ${escapeHtml(appointmentDate)}</p>
              <p><strong>Time:</strong> ${escapeHtml(appointmentTime)}</p>
              <p><strong>Status:</strong> <span style="color:#e4c28a;">Pending confirmation</span></p>
            </div>

            <h3>Customer information</h3>
            <p><strong>Name:</strong> ${escapeHtml(appointment.customer_name)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(appointment.customer_phone)}</p>
            <p><strong>Email:</strong> ${escapeHtml(appointment.customer_email)}</p>

            <div style="margin:24px 0;padding:18px;background:#111110;border:1px solid #3a3835;">
              <p style="color:#92908d;font-size:12px;letter-spacing:1px;">CUSTOMER NOTES</p>
              <p style="white-space:pre-wrap;">${escapeHtml(appointment.notes || "No additional notes.")}</p>
            </div>

            <p style="color:#92908d;font-size:12px;line-height:1.7;">
              This appointment is not confirmed yet. Please contact the customer to confirm the requested time.
            </p>
            <p>KC Stance Shop Website</p>
          </div>
        </div>
      `,
        })
      : Promise.reject(new Error("SHOP_EMAIL is not configured"));
    const customerEmailPromise = transporter.sendMail({
      from: `"KC Stance Shop" <${process.env.SMTP_USER}>`,
      to: appointment.customer_email,
      subject: "We received your appointment request | KC Stance Shop",
      text: `
Hi ${appointment.customer_name},

Thank you for choosing KC Stance Shop!

We've received your appointment request.

Service: ${serviceName}
Estimated price: ${price}
Date: ${appointmentDate}
Time: ${appointmentTime}

Status: Pending confirmation

Your appointment is not confirmed until our team approves it. We'll follow up with you regarding your request.

Thank you,
KC Stance Shop
  `.trim(),
      html: `
    <div style="background:#111110;color:#e8e6e3;padding:30px;font-family:Arial,sans-serif;">
      <div style="max-width:560px;margin:auto;background:#1d1d1b;padding:28px;border:1px solid #3a3835;">
        <p style="color:#d8d2cc;letter-spacing:3px;font-weight:bold;">KC STANCE SHOP</p>
        <h1 style="font-size:28px;margin-bottom:8px;">We received your request.</h1>
        <p>Hi ${escapeHtml(appointment.customer_name)},</p>
        <p>
          Thank you for choosing KC Stance Shop! We've received your appointment request
          and our team will review the details.
        </p>

        <div style="margin:24px 0;padding:18px;background:#111110;border-left:3px solid #d8d2cc;">
          <p style="color:#92908d;font-size:12px;letter-spacing:1px;">APPOINTMENT DETAILS</p>
          <h2 style="margin:10px 0;">${escapeHtml(serviceName)}</h2>
          <p style="margin:8px 0;"><strong>Estimated price:</strong> ${escapeHtml(price)}</p>
          <p style="margin:8px 0;"><strong>Date:</strong> ${escapeHtml(appointmentDate)}</p>
          <p style="margin:8px 0;"><strong>Time:</strong> ${escapeHtml(appointmentTime)}</p>
          <p style="margin:8px 0;">
            <strong>Status:</strong>
            <span style="color:#e4c28a;">Pending confirmation</span>
          </p>
        </div>

        <p>
          Please note that your appointment is not confirmed yet.
          Our team will follow up to confirm your requested time.
        </p>

        <p style="color:#92908d;font-size:12px;line-height:1.7;">
          The displayed price is an estimate if applicable and may need to be confirmed by the shop.
        </p>

        <p>Thank you,<br>KC Stance Shop</p>
      </div>
    </div>
  `,
    });
    const [shopEmailResult, customerEmailResult] = await Promise.allSettled([
      shopEmailPromise,
      customerEmailPromise,
    ]);

    if (shopEmailResult.status === "rejected") {
      console.error("Shop appointment email failed:", shopEmailResult.reason);
    }

    if (customerEmailResult.status === "rejected") {
      console.error(
        "Customer appointment email failed:",
        customerEmailResult.reason,
      );
    }

    return res.status(201).json({
      message: "Appointment request submitted successfully.",
      appointment,
      emails: {
        shop: shopEmailResult.status === "fulfilled",
        customer: customerEmailResult.status === "fulfilled",
      },
    });
  } catch (error) {
    // PostgreSQL exclusion constraint: overlapping appointment.
    if (error.code === "23P01") {
      return res.status(409).json({
        message: "That time was just booked. Please select another slot.",
      });
    }

    console.error("Create appointment error:", error.message);

    return res.status(500).json({
      message: "Unable to create appointment.",
    });
  }
});

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

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

if (require.main === module) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`KCSTANCESHOP API listening on port ${port}`);
  });
}

module.exports = app;