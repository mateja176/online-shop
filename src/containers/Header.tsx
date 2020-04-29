import { AppBar, Box, IconButton, Typography } from '@material-ui/core';
import {
  FavoriteBorder,
  InsertDriveFile,
  ShoppingCart,
} from '@material-ui/icons';
import React from 'react';

export interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <AppBar position="fixed">
      <Box flex={1}>
        <Typography variant="h6">
          Lorem 1psum Dolor Sit Amet 4552 laboris nisi ut aliquip ex ea commodo
          consequat
        </Typography>
      </Box>
      <IconButton>{FavoriteBorder}</IconButton>
      <IconButton>{InsertDriveFile}</IconButton>
      <IconButton>{ShoppingCart}</IconButton>
    </AppBar>
  );
};
