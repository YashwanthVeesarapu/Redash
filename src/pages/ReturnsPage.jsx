import React from "react";
import MainLayout from "../layouts/MainLayout";

const ReturnsPage = () => {
  return (
    <MainLayout>
      <div className="returns">
        <h1>Return Information</h1>
        <p>
          We want you to be completely satisfied with your purchase from Redash.
          If for any reason you are not satisfied, we are here to help with our
          return policy.
        </p>

        <h2>1. Returns</h2>

        <p>
          You have 30 calendar days to return an item from the date you received
          it.
        </p>

        <h3>1.1 Eligibility</h3>
        <p>
          To be eligible for a return, your item must be unused and in the same
          condition that you received it. It must also be in the original
          packaging.
        </p>

        <h3>1.2 Non-Returnable Items</h3>
        <p>
          Several types of goods are exempt from being returned. Perishable
          goods, personalized items, and gift cards cannot be returned.
        </p>

        <h2>2. Refunds</h2>

        <h3>2.1 Processing Time</h3>
        <p>
          Once we receive your item, we will inspect it and notify you that we
          have received your returned item. We will immediately notify you on
          the status of your refund after inspecting the item.
        </p>

        <h3>2.2 Refund Method</h3>
        <p>
          If your return is approved, we will initiate a refund to your credit
          card (or original method of payment). You will receive the credit
          within a certain number of days, depending on your card issuer's
          policies.
        </p>

        <h2>3. Shipping</h2>

        <p>
          You will be responsible for paying your own shipping costs for
          returning your item. Shipping costs are non-refundable.
        </p>

        <h2>4. Contact Us</h2>

        <p>
          If you have any questions on how to return your item to us, contact us
          at returns@redash.us.
        </p>

        <p>
          We reserve the right to update or modify our return policy at any
          time. Changes will be effective immediately upon posting to our
          website.
        </p>

        <p>Thank you for shopping at Redash!</p>
      </div>
    </MainLayout>
  );
};

export default ReturnsPage;
