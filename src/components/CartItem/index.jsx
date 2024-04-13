import React from "react";
import "./styles.scss";
import { Button, FormGroup, InputLabel, MenuItem, Select } from "@mui/material";
import { changeCartQty, removeCartItem } from "../../redux/actions";
import { useDispatch } from "react-redux";

const CartItem = ({ p }) => {
  const dispatch = useDispatch();
  return (
    <div className="cart-item">
      <img src={p.img} />
      <div className="cart-item-info">
        <div>
          <h2>{p.name} </h2>
          <h3>{p.brand}</h3>
          <p>
            {p.color.charAt(0).toUpperCase() + p.color.slice(1)} |{" "}
            {p.size.toUpperCase()}
          </p>
        </div>

        <div className="ci-b-section">
          <FormGroup className="qty-select">
            <InputLabel id="qty-label">Quantity</InputLabel>
            <Select
              id="qty"
              labelId="qty-label"
              value={p.quantity}
              onChange={(e) =>
                dispatch(
                  changeCartQty({
                    id: p.id,
                    quantity: e.target.value,
                  })
                )
              }
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormGroup>

          <Button onClick={() => dispatch(removeCartItem(p.id))}>Remove</Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
