import {
  AppBar,
  Badge,
  Box,
  Button,
  FormLabel,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  AddShoppingCart,
  FavoriteBorder,
  InsertDriveFile,
  ShoppingCart,
} from '@material-ui/icons';
import clsx from 'clsx';
import React from 'react';

export interface HeaderProps {
  title: string;
}

export interface HeaderStyleProps {
  hasYOffset: boolean;
}

const headerHeight = 70;

const shadowColor = '#ccc';

const useStyles = makeStyles(() => ({
  header: ({ hasYOffset }: HeaderStyleProps) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    height: headerHeight,
    boxShadow: hasYOffset
      ? `0px 3px 6px ${shadowColor}`
      : `0px 1px 0px ${shadowColor}`,
  }),
  iconButton: {
    width: headerHeight,
    height: headerHeight,
    borderRadius: 0,
  },
  cartButton: {
    borderLeft: '1px solid #eee',
  },
  ellipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  countInput: {
    textAlign: 'right',
  },
  label: {
    marginLeft: 10,
    display: 'inline-block',
  },
  formLabel: {
    display: 'flex',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
  },
}));

const initialAnimationState: Keyframe = {
  transform: 'scale(1)',
};

const keyframes: Keyframe[] = [
  initialAnimationState,
  { transform: 'scale(1.2)' },
  initialAnimationState,
];

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const [numberOfItems, setNumberOfItems] = React.useState(0);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setNumberOfItems(Number(value));
  };

  const countBadgeRef = React.useRef<HTMLDivElement | null>(null);

  const [itemCount, setCount] = React.useState(0);
  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    setCount(numberOfItems);

    countBadgeRef.current?.animate(keyframes, { duration: 400 });
  };

  const [yOffset, setYOffset] = React.useState(0);

  React.useEffect(() => {
    const eventType: keyof WindowEventMap = 'scroll';
    const handleScroll = () => {
      setYOffset(window.pageYOffset);
    };

    window.addEventListener(eventType, handleScroll);

    return () => {
      window.removeEventListener(eventType, handleScroll);
    };
  }, []);

  const classes = useStyles({ hasYOffset: yOffset > 0 });

  return (
    <AppBar position="fixed" color="transparent" className={classes.header}>
      <Box flex={1} ml={4}>
        <Typography variant="h6" className={classes.ellipsis}>
          {title}
        </Typography>
      </Box>
      <Box mr={5}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Box mr={4}>
            <FormLabel className={classes.formLabel}>
              <TextField
                type="number"
                variant="outlined"
                size="small"
                value={numberOfItems}
                onChange={handleChange}
                inputProps={{
                  className: classes.countInput,
                }}
              />
              <Typography className={classes.label}>PCE</Typography>
            </FormLabel>
          </Box>
          <Button
            type="submit"
            startIcon={<AddShoppingCart />}
            color="secondary"
            variant="contained"
          >
            Add to cart
          </Button>
        </form>
      </Box>
      <IconButton className={classes.iconButton}>
        <FavoriteBorder />
      </IconButton>
      <IconButton className={classes.iconButton}>
        <InsertDriveFile />
      </IconButton>
      <IconButton className={clsx(classes.iconButton, classes.cartButton)}>
        <Badge
          ref={countBadgeRef}
          badgeContent={itemCount}
          color="secondary"
        >
          <ShoppingCart />
        </Badge>
      </IconButton>
    </AppBar>
  );
};
