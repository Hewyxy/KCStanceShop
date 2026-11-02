import { useEffect, useState } from "react";
import {
  getServices,
  getAvailability,
  createAppointment,
} from "../services/bookingApi";
import "./BookingModal.css";

function getLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatTime(value) {
  const date = new Date(value);

  return date.toLocaleTimeString("en-US", {
    timeZone: "America/Chicago",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function BookingModal({ isOpen, onClose, vehicleType }) {
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [loadingServices, setLoadingServices] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;

    async function loadServices() {
      setLoadingServices(true);
      setStatus("");

      try {
        const result = await getServices();
        const list = Array.isArray(result) ? result : result.services || [];

        if (cancelled) return;

        setServices(list);

        const selected = list.find((service) => {
          const name = service.name.toLowerCase();

          if (vehicleType === "suv") {
            return name.includes("suv") || name.includes("truck");
          }

          return name.includes("sedan") || name.includes("coupe");
        });

        if (selected) {
          setServiceId(String(selected.id));
        } else {
          setStatus("Could not find the selected service.");
        }
      } catch (error) {
        if (!cancelled) {
          setStatus(error.message);
        }
      } finally {
        if (!cancelled) setLoadingServices(false);
      }
    }

    loadServices();

    return () => {
      cancelled = true;
    };
  }, [isOpen, vehicleType]);

  useEffect(() => {
    if (!isOpen || !serviceId || !date) {
      setSlots([]);
      return;
    }

    let cancelled = false;

    async function loadSlots() {
      setLoadingSlots(true);
      setSelectedSlot("");
      setStatus("");

      try {
        const result = await getAvailability(serviceId, date);

        if (cancelled) return;

        const availableSlots = Array.isArray(result)
          ? result
          : result.slots || result.availableSlots || [];

        setSlots(
          availableSlots.map((slot) => ({
            ...slot,
            startAt: slot.startAt || slot.start_at,
            endAt: slot.endAt || slot.end_at,
          })),
        );
      } catch (error) {
        if (!cancelled) setStatus(error.message);
      } finally {
        if (!cancelled) setLoadingSlots(false);
      }
    }

    loadSlots();

    return () => {
      cancelled = true;
    };
  }, [isOpen, serviceId, date]);

  if (!isOpen) return null;

  async function handleSubmit(event) {
    event.preventDefault();

    if (!selectedSlot) {
      setStatus("Please select an available time.");
      return;
    }

    const form = new FormData(event.currentTarget);

    setSending(true);
    setStatus("");

    try {
      await createAppointment({
        serviceId: Number(serviceId),
        customerName: form.get("customerName"),
        customerPhone: form.get("customerPhone"),
        customerEmail: form.get("customerEmail"),
        startAt: selectedSlot,
        notes: form.get("notes"),
      });

      setSuccess(true);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setSending(false);
    }
  }

  const selectedService = services.find(
    (service) => String(service.id) === serviceId,
  );

  return (
    <div
      className="booking-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="booking-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
      >
        <button
          type="button"
          className="booking-close"
          onClick={onClose}
          aria-label="Close booking"
        >
          ×
        </button>

        {success ? (
          <div className="booking-success">
            <span className="booking-eyebrow">KC STANCE SHOP / BOOKING</span>
            <h2 id="booking-title">REQUEST RECEIVED.</h2>
            <p>
              Your appointment request has been submitted. It is pending
              confirmation from the shop.
            </p>
            <button type="button" className="booking-submit" onClick={onClose}>
              DONE
            </button>
          </div>
        ) : (
          <>
            <span className="booking-eyebrow">
              KC STANCE SHOP / APPOINTMENTS
            </span>
            <h2 id="booking-title">BOOK YOUR SLOT.</h2>
            <p className="booking-description">
              Choose a date and available time for your window tinting
              appointment.
            </p>

            {status && (
              <p className="booking-error" role="alert">
                {status}
              </p>
            )}

            {loadingServices ? (
              <p>Loading services...</p>
            ) : (
              <form className="booking-form" onSubmit={handleSubmit}>
                <div className="booking-service-info">
                  <span>SERVICE</span>
                  <strong>{selectedService?.name || "Window Tinting"}</strong>
                  {selectedService?.price_min != null &&
                    selectedService?.price_max != null && (
                      <p className="booking-price">
                        Estimated price: $
                        {Number(selectedService.price_min).toLocaleString(
                          "en-US",
                        )}
                        {" – "}$
                        {Number(selectedService.price_max).toLocaleString(
                          "en-US",
                        )}
                      </p>
                    )}
                  {selectedService?.duration_minutes && (
                    <small>{selectedService.duration_minutes} minutes</small>
                  )}
                </div>

                <label htmlFor="booking-date">APPOINTMENT DATE</label>
                <input
                  id="booking-date"
                  type="date"
                  value={date}
                  min={getLocalDate(new Date())}
                  onChange={(event) => setDate(event.target.value)}
                  required
                />

                <label>AVAILABLE TIMES</label>

                {!date ? (
                  <p className="booking-hint">
                    Select a date to see available times.
                  </p>
                ) : loadingSlots ? (
                  <p>Checking availability...</p>
                ) : slots.length === 0 ? (
                  <p className="booking-hint">
                    No available times for this date. Please try another day.
                  </p>
                ) : (
                  <div className="booking-slots">
                    {slots.map((slot) => (
                      <button
                        type="button"
                        key={slot.startAt}
                        className={
                          selectedSlot === slot.startAt
                            ? "booking-slot selected"
                            : "booking-slot"
                        }
                        onClick={() => setSelectedSlot(slot.startAt)}
                      >
                        {slot.startAt ? formatTime(slot.startAt) : slot.label}
                      </button>
                    ))}
                  </div>
                )}

                <label htmlFor="booking-name">FULL NAME</label>
                <input
                  id="booking-name"
                  name="customerName"
                  autoComplete="name"
                  required
                  maxLength={100}
                />

                <label htmlFor="booking-phone">PHONE NUMBER</label>
                <input
                  id="booking-phone"
                  name="customerPhone"
                  type="tel"
                  autoComplete="tel"
                  required
                  maxLength={30}
                />

                <label htmlFor="booking-email">EMAIL ADDRESS</label>
                <input
                  id="booking-email"
                  name="customerEmail"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                />

                <label htmlFor="booking-notes">NOTES (OPTIONAL)</label>
                <textarea
                  id="booking-notes"
                  name="notes"
                  rows={3}
                  maxLength={1000}
                  placeholder="Anything we should know about your vehicle?"
                />

                <button
                  type="submit"
                  className="booking-submit"
                  disabled={
                    sending || loadingSlots || !selectedSlot || !serviceId
                  }
                >
                  {sending ? "SUBMITTING..." : "REQUEST APPOINTMENT ↗︎"}
                </button>

                <p className="booking-hint">
                  Your appointment is not confirmed until the shop approves your
                  request.
                </p>
              </form>
            )}
          </>
        )}
      </section>
    </div>
  );
}
