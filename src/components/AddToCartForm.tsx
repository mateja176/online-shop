import {
  Box,
  Button,
  FormLabel,
  TextField,
  Typography,
} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
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
  buttonText?: string;
}

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
  buttonText = 'Add to cart',
}) => (
  <form onSubmit={handleSubmit} className={className}>
    <Box mr={isSmallOrLower ? 2 : 4}>
      <FormLabel className={formLabelClass}>
        <TextField
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
    <Button
      type="submit"
      startIcon={<AddShoppingCart />}
      color="secondary"
      variant="contained"
      disabled={numberOfItems === 0}
    >
      {buttonText}
    </Button>
  </form>
);