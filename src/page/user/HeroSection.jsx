function HeroSection() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-content">
        <p className="hero-subtitle">Fresh Coffee & Milk Tea</p>

        <h1>ChunChun Coffee</h1>

        <p>
          Không gian ấm cúng, đồ uống chất lượng, hương vị phù hợp
          cho mọi ngày.
        </p>

        <div className="hero-actions">
          <a href="#menu" className="btn-primary">
            Xem menu
          </a>

          <a href="#contact" className="btn-secondary">
            Đặt bàn ngay
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;