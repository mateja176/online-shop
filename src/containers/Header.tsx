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
import { headerHeight } from 'styles';

export interface HeaderProps {}

export interface HeaderStyleProps {
  hasYOffset: boolean;
}

const useStyles = makeStyles((theme) => ({
  header: ({ hasYOffset }: HeaderStyleProps) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    height: headerHeight,
    boxShadow: hasYOffset
      ? `0px 3px 6px ${theme.palette.grey[400]}`
      : `0px 1px 0px ${theme.palette.grey[400]}`,
    background: 'white',
  }),
  iconButton: {
    width: headerHeight,
    height: headerHeight,
    borderRadius: 0,
  },
  cartButton: {
    borderLeft: `1px solid ${theme.palette.grey[200]}`,
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

const addToCartButtonText = 'Add to cart';

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

  const isSmallOrLower = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  const isExtraSmallOrLower = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('xs'),
  );

  const [isIntersectingHeader, setIsIntersectingHeader] = React.useState(false);

  React.useEffect(() => {
    const eventType: keyof WindowEventMap = 'scroll';
    const handleScroll = () => {
      if (addToCardSectionRef.current) {
        const {
          top,
          height,
        } = addToCardSectionRef.current.getBoundingClientRect();
        const isIntersecting = top < headerHeight - height;
        setIsIntersectingHeader(isIntersecting);
      }
    };

    window.addEventListener(eventType, handleScroll);

    return () => {
      window.removeEventListener(eventType, handleScroll);
    };
  }, []);

  const getSectionStyle = (isShown: boolean): React.CSSProperties => ({
    width: isShown ? 'auto' : 0,
    overflow: 'hidden',
    transition: 'opacity 300ms',
    opacity: isShown ? 1 : 0,
  });

  const showTitle = !isExtraSmallOrLower || !isIntersectingHeader;

  const AddToCartForm: React.FC<{ buttonText: string }> = ({ buttonText }) => (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Box mr={isSmallOrLower ? 2 : 4}>
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
          {!isSmallOrLower && (
            <Typography className={classes.label}>PCE</Typography>
          )}
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

  return (
    <AppBar position="fixed" className={classes.header}>
      <Box
        flex={1}
        ml={4}
        minWidth={showTitle ? '34%' : 0}
        style={getSectionStyle(showTitle)}
      >
        <Typography
          variant="h5"
          color="secondary"
          className={classes.ellipsis}
          title={item?.article.title}
        >
          {item?.article.title}
        </Typography>
      </Box>
      <Box
        ml="auto"
        mr={isSmallOrLower ? 1 : 4}
        style={getSectionStyle(isIntersectingHeader)}
      >
        <AddToCartForm buttonText={isSmallOrLower ? '' : addToCartButtonText} />
      </Box>
      {addToCardSectionRef.current &&
        createPortal(
          <AddToCartForm buttonText={addToCartButtonText} />,
          addToCardSectionRef.current,
        )}
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
