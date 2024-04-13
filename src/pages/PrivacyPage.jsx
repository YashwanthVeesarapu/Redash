import React from "react";
import MainLayout from "../layouts/MainLayout";

const PrivacyPage = () => {
  return (
    <MainLayout page={"privacy"}>
      <div className="privacy">
        <h1>Privacy Policy for Redash</h1>

        <p>Last Updated: [12/02/2023]</p>

        <h2>1. Information We Collect</h2>

        <h3>1.1 Personal Information</h3>
        <p>
          When you make a purchase, sign up for an account, or engage with our
          services, we may collect personal information such as your name,
          address, email address, phone number, and payment details.
        </p>

        <h3>1.2 Non-Personal Information</h3>
        <p>
          We may also collect non-personal information, such as browser type,
          device information, and website usage data, to enhance our services
          and improve the user experience.
        </p>

        <h2>2. How We Use Your Information</h2>

        <h3>2.1 Order Processing</h3>
        <p>
          We use your personal information to process and fulfill your orders,
          including order confirmation, shipping, and customer support.
        </p>

        <h3>2.2 Account Management</h3>
        <p>
          Creating an account allows you to access exclusive features. We use
          the information provided to manage your account and personalize your
          shopping experience.
        </p>

        <h3>2.3 Marketing and Communication</h3>
        <p>
          With your consent, we may send you promotional emails and updates
          about our products and services. You can opt-out at any time.
        </p>

        <h2>3. Information Sharing</h2>
        <p>
          We do not sell, trade, or rent your personal information to third
          parties. Your data may be shared with trusted partners and service
          providers who assist us in operating our website and conducting
          business.
        </p>

        <h2>4. Security</h2>
        <p>
          We implement security measures to protect your personal information.
          However, no method of transmission over the internet or electronic
          storage is completely secure. We strive to use commercially acceptable
          means to protect your data.
        </p>

        <h2>5. Cookies</h2>
        <p>
          We use cookies to enhance your browsing experience. You can choose to
          disable cookies through your browser settings, but this may affect
          certain functionalities.
        </p>

        <h2>6. Your Choices</h2>
        <p>
          You have the right to access, correct, or delete your personal
          information. You can manage your communication preferences and opt-out
          of marketing emails.
        </p>

        <h2>7. Changes to This Privacy Policy</h2>
        <p>
          We reserve the right to update or modify this Privacy Policy at any
          time. Changes will be effective immediately upon posting to our
          website.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          If you have any questions or concerns regarding this Privacy Policy,
          please contact us at hello@redash.us.
        </p>

        <p>
          By continuing to use Redash, you acknowledge that you have read and
          understood this Privacy Policy.
        </p>
      </div>
    </MainLayout>
  );
};

export default PrivacyPage;
