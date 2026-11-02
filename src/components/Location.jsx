function Location() {
  return (
    <section className="location">
      <div className="location-info">
        <h2>Visit Our Olathe Shop</h2>
        <p>19333 W 151st Terrace, Olathe, KS 66062</p>

        <a
          href="https://www.google.com/maps/place/Kcstanceshop+Wrap+Tint+%26+PPF/@38.8545482,-94.810449,17z/data=!4m15!1m8!3m7!1s0x87c0be7899e755db:0x42b0e032e37f4d1d!2s19333+W+151st+Terrace,+Olathe,+KS+66062!3b1!8m2!3d38.8545482!4d-94.810449!16s%2Fg%2F11q2nf6ct2!3m5!1s0x87c0bb53df83cef7:0x95eeb64bc76826e4!8m2!3d38.8539419!4d-94.8099954!16s%2Fg%2F11rjtsckqw!5m1!1e4?entry=ttu&g_ep=EgoyMDI2MTAyOC4wIKXMDSoASAFQAw%3D%3D"
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
