function Location() {
  return (
    <section className="location">
      <div className="location-info">
        <h2>Visit Our Shop</h2>
        <p>123 Main Street, Kansas City, KS</p>

        <a
          href="https://www.google.com/maps/search/?api=1&query=123+Main+Street+Kansas+City+KS"
          target="_blank"
          rel="noreferrer"
        >
          Get Directions →
        </a>
      </div>

      <iframe
        className="location-map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3107.0616385924745!2d-94.81257032365647!3d38.853946049266106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c0bb53df83cef7%3A0x95eeb64bc76826e4!2sKcstanceshop%20Wrap%20Tint%20%26%20PPF!5e0!3m2!1sru!2sus!4v1792527435302!5m2!1sru!2sus"
        title="Shop location on Google Maps"
        loading="lazy"
        allowFullScreen
      ></iframe>
    </section>
  );
}

export default Location;
