import { Link } from "react-router-dom";
import dashboardImage from "../assets/hormix-dashboard.png";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 80,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const LandingPage = () => {
  return (
    <main>
      {/* HERO */}
      <section className="hero-section">
        <div className="hero-container">
          {/* TEXTOS */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <button className="glass-button">
              Controla tus gastos hormiga
            </button>

            <h1 className="hero-title">
              Toma el control de tu dinero con <span>HormiX</span>
            </h1>

            <p className="hero-description">
              Visualiza tus gastos, analiza tus hábitos financieros y elimina
              esos pequeños consumos que afectan tu economía.
            </p>

            <div className="hero-buttons">
              <Link to="/login" className="primary-btn">
                Iniciar sesión
              </Link>

              <Link to="/register" className="secondary-btn">
                Registrarse
              </Link>
            </div>
          </motion.div>

          {/* IMAGEN */}
          <motion.div
            className="hero-image-container"
            initial={{
              opacity: 0,
              scale: 0.8,
              x: 100,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
          >
            <div className="hero-glow"></div>

            <img
              src={dashboardImage}
              alt="Dashboard HormiX"
              className="hero-image"
            />
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <motion.section
        className="features-section"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
        }}
      >
        <div className="section-header">
          <h2 className="section-title">
            Todo lo que necesitas para manejar tus gastos
          </h2>

          <p className="section-description">
            Herramientas diseñadas para ayudarte a mejorar tus finanzas.
          </p>
        </div>

        <div className="features-grid">
          {/* CARD 1 */}
          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="feature-icon">
              <i className="fi fi-tr-dashboard-monitor"></i>
            </div>

            <h3 className="feature-title">Dashboard Inteligente</h3>

            <p className="feature-text">
              Visualiza estadísticas, tendencias y movimientos financieros.
            </p>
          </motion.div>

          {/* CARD 2 */}
          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="feature-icon">
              <i className="fi fi-tr-usd-circle"></i>
            </div>

            <h3 className="feature-title">Registro de Gastos</h3>

            <p className="feature-text">
              Guarda cada gasto fácilmente y mantén el control de tu dinero.
            </p>
          </motion.div>

          {/* CARD 3 */}
          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="feature-icon">
              <i className="fi fi-tr-data-report"></i>
            </div>

            <h3 className="feature-title">Reportes Mensuales</h3>

            <p className="feature-text">
              Analiza tus hábitos financieros mediante gráficos dinámicos.
            </p>
          </motion.div>

          {/* CARD 4 */}
          <motion.div
            className="feature-card"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="feature-icon">
              <i className="fi fi-tr-padlock-check"></i>
            </div>

            <h3 className="feature-title">Seguridad</h3>

            <p className="feature-text">
              Tus datos estarán protegidos y disponibles cuando los necesites.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="cta-section"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
        }}
      >
        <div className="cta-container">
          <div className="cta-glow"></div>

          <div className="cta-content">
            <h2 className="cta-title">
              Empieza hoy a mejorar tus finanzas
            </h2>

            <p className="cta-description">
              Miles de pequeños gastos pueden convertirse en grandes problemas.
            </p>

            <Link to="/register" className="primary-btn">
              Crear cuenta gratis
            </Link>
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="footer">
        © 2026 HormiX — Control inteligente de gastos hormiga.
      </footer>
    </main>
  );
};

export default LandingPage;