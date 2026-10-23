import { useState } from "react";
import "./Navbar.css";

const link = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "Get a Quote", href: "/quote" },
];

export default function Navbar() {
  return (
    <header className="header">
      <nav className="navbar">
        <a href="/" className="logo-link">
          <img
            src="https://kcstanceshop.com/wp-content/uploads/2025/07/b010e7a5-1aa0-4482-ba5b-ecf2824e0f7c-1024x531.png"
            alt="KCStanceShop"
            className="logo"
          />
        </a>
        <ul>
          <li>
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li>
            <a className="nav-link" href="/services">
              Services
            </a>
          </li>
          <li>
            <a className="nav-link" id="senter" href="/gallery">
              Gallery
            </a>
          </li>
          <li>
            <a className="nav-link" href="/about">
              About
            </a>
          </li>
          <li>
            <a className="nav-link" href="/quote">
              Book Now!
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
