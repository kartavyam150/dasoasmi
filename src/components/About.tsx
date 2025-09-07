import React from 'react';
import { FaInstagram } from 'react-icons/fa';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h1>About Dasoasmi</h1>
      <p>
        Dasoasmi is an application designed to provide easy access to a collection of shlokas.
        Our goal is to create a serene and insightful experience for users seeking spiritual
        wisdom and knowledge.
      </p>
      <p>
        This platform allows you to browse, search, and contemplate various shlokas, offering
        a digital sanctuary for reflection and learning. We strive to present the content
        in a clear, accessible, and meaningful way.
      </p>
      <p>
        Developed with passion and dedication, Dasoasmi is continuously evolving to enhance
        your experience. We welcome feedback and suggestions to improve our service.
      </p>
      <h2>Our Mission</h2>
      <p>
        To preserve and propagate ancient wisdom through modern technology, making profound
        spiritual texts accessible to everyone, everywhere.
      </p>
      <h2>Contact Us</h2>
      <p>
        If you have any questions, suggestions, or feedback, please feel free to reach out to us.
      </p>
      <div className="social-links">
        <a href="https://www.instagram.com/_dasoasmi_" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={15} /> Follow us on Instagram
        </a>
      </div>
    </div>
  );
};

export default About;