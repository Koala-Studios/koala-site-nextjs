import React from "react";
import testimonials from "../../assets/testimonials.json";
import styles from "../../styles/Sections.module.css";

const Testimonials = () => {
  return (
    <section className={styles.testimonials_section}>
      <h2>Testimonials</h2>
      <div className={styles.testimonial_container}>
        {testimonials.testimonials.map((item) => (
          <TestimonialCard
            name={item.name}
            description={item.description}
            role={item.role}
          />
        ))}
      </div>
    </section>
  );
};

interface CardProps {
  role: string;
  name: string;
  description: string;
}

const TestimonialCard: React.FC<CardProps> = ({ name, role, description }) => {
  return (
    <div className={styles.testimonial_card}>
      <p>"{description}"</p>
      <div>
        <p>{name}</p>
        <p>{role}</p>
      </div>
    </div>
  );
};

export default Testimonials;
