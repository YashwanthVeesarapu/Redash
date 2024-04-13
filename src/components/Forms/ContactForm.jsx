import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";

const ContactForm = ({ contactInfo }) => {
  const [email, setEmail] = useState(contactInfo.email);
  const [phone, setPhone] = useState(contactInfo.phone);

  return (
    <form>
      <h3>Contact Info</h3>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            name="Email"
            fullWidth
            placeholder="Email"
            label="Email"
            required
            autoComplete="email"
            value={email}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="Phone"
            fullWidth
            placeholder="Phone"
            label="Phone"
            autoComplete="tel"
            value={phone}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default ContactForm;
