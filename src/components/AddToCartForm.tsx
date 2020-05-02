import {
  Box,
  Button,
  FormLabel,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';

export interface AddToCartFormProps {
  numberOfItems: number;
  isSmallOrLower: boolean;
  handleChange: React.ChangeEventHandler;
  handleFormClick: React.FormEventHandler;
  handleSubmit: React.FormEventHandler;
  className: string;
  formLabelClass: string;
  labelClass: string;
  inputClass: string;
  submitButton?: React.ReactNode;
}

export const initialNumberOfItems = 1;

export const AddToCartForm: React.FC<AddToCartFormProps> = ({
  numberOfItems,
  isSmallOrLower,
  handleChange,
  handleFormClick,
  handleSubmit,
  className,
  formLabelClass,
  labelClass,
  inputClass,
  submitButton = (
    <Button
      type="submit"
      startIcon={<i className="app-icon icon-cart-in">&#xe809;</i>}
      color="secondary"
      variant="contained"
      disabled={!numberOfItems}
    >
      Add to cart
    </Button>
  ),
}) => (
  <form onSubmit={handleSubmit} className={className}>
    <Box mr={isSmallOrLower ? 2 : 4}>
      <FormLabel className={formLabelClass}>
        <TextField
          placeholder={initialNumberOfItems.toString()}
          type="number"
          variant="outlined"
          size="small"
          value={numberOfItems}
          onChange={handleChange}
          inputProps={{
            className: inputClass,
          }}
          onClick={handleFormClick}
        />
        {!isSmallOrLower && <Typography className={labelClass}>PCE</Typography>}
      </FormLabel>
    </Box>
    {submitButton}
  </form>
);
