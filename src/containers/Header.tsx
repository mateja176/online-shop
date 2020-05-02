import {
  AppBar,
  Badge,
  Box,
  Button,
  FormLabel,
  IconButton,
  makeStyles,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import {
  AddShoppingCart,
  FavoriteBorder,
  InsertDriveFile,
  ShoppingCart,
} from '@material-ui/icons';
import clsx from 'clsx';
import { useItem } from 'hooks';
import { addToCardSectionId } from 'models/components';
import React from 'react';
import { createPortal } from 'react-dom';
import { Transition } from 'react-transition-group';

export interface HeaderProps {}

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
    background: 'white',
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
    whiteSpace: 'nowrap',
  },
  countInput: {
    textAlign: 'right',
    width: 35,
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

export const Header: React.FC<HeaderProps> = () => {
  const item = useItem();

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
    if (numberOfItems !== 0) {
      setNumberOfItems(0);

      setCount(numberOfItems);

      countBadgeRef.current?.animate(keyframes, { duration: 400 });
    }
  };

  React.useEffect(() => {
    setCount((count) => item?.cart.items || count);
  }, [item]);

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

  const handleFormClick: React.MouseEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    // * using currentTarget is type safe however causes a runtime error
    (target as HTMLInputElement).select();
  };

  const addToCardSectionRef = React.useRef<Element | null>(null);

  React.useEffect(() => {
    const section = document.getElementById(addToCardSectionId);
    addToCardSectionRef.current = section;
  }, []);

  const isMediumOrHigher = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md'),
  );

  const [isIntersectingHeader, setIsIntersectingHeader] = React.useState(false);

  React.useEffect(() => {
    const eventType: keyof WindowEventMap = 'scroll';
    const handleScroll = () => {
      if (addToCardSectionRef.current) {
        const { top } = addToCardSectionRef.current.getBoundingClientRect();
        const isIntersecting = top < 70;
        setIsIntersectingHeader(isIntersecting);
      }
    };

    window.addEventListener(eventType, handleScroll);

    return () => {
      window.removeEventListener(eventType, handleScroll);
    };
  }, []);

  const addToCartForm = (
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
            onClick={handleFormClick}
          />
          <Typography className={classes.label}>PCE</Typography>
        </FormLabel>
      </Box>
      <Button
        type="submit"
        startIcon={<AddShoppingCart />}
        color="secondary"
        variant="contained"
        disabled={numberOfItems === 0}
      >
        Add to cart
      </Button>
    </form>
  );

  return (
    <AppBar position="fixed" className={classes.header}>
      {isMediumOrHigher && (
        <Box flex={1} ml={4} minWidth="34%">
          <Typography
            variant="h5"
            color="secondary"
            className={classes.ellipsis}
            title={item?.article.title}
          >
            {item?.article.title}
          </Typography>
        </Box>
      )}
      <Box ml="auto" mr={4}>
        <Transition in={isIntersectingHeader} timeout={300} unmountOnExit>
          {(state) => (
            <Box
              style={{
                transition: 'opacity 300ms',
                opacity: state === 'exiting' || state === 'entering' ? 0 : 1,
              }}
            >
              {addToCartForm}
            </Box>
          )}
        </Transition>
      </Box>
      {addToCardSectionRef.current &&
        !isIntersectingHeader &&
        createPortal(addToCartForm, addToCardSectionRef.current)}
      <IconButton className={classes.iconButton}>
        <FavoriteBorder />
      </IconButton>
      <IconButton className={classes.iconButton}>
        <InsertDriveFile />
      </IconButton>
      <IconButton className={clsx(classes.iconButton, classes.cartButton)}>
        <Badge ref={countBadgeRef} badgeContent={itemCount} color="secondary">
          <ShoppingCart />
        </Badge>
      </IconButton>
    </AppBar>
  );
};
