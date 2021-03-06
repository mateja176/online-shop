import {
  AppBar,
  Badge,
  Box,
  IconButton,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import clsx from 'clsx';
import {
  AddToCartForm,
  AddToCartFormProps,
  initialNumberOfItems,
} from 'components';
import { useItem } from 'hooks';
import { addToCardSectionId } from 'models/components';
import React from 'react';
import { createPortal } from 'react-dom';
import { headerHeight } from 'styles';

export interface HeaderProps {}

const maxItemCount = 999;

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
    alignItems: 'center',
  },
  heart: {
    color: theme.palette.secondary.main,
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

  const [numberOfItems, setNumberOfItems] = React.useState(
    initialNumberOfItems,
  );
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
      setCount((count) => count + numberOfItems);

      setNumberOfItems(initialNumberOfItems);

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

  const showTitle = !isExtraSmallOrLower;

  const addToCartFormProps: AddToCartFormProps = {
    isSmallOrLower,
    numberOfItems,
    className: classes.form,
    formLabelClass: classes.formLabel,
    labelClass: classes.label,
    inputClass: classes.countInput,
    handleChange,
    handleFormClick,
    handleSubmit,
  };

  const [isFavorite, setIsFavorite] = React.useState(false);

  const toggleIsFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <AppBar position="fixed" className={classes.header}>
      <Tooltip title={item?.article.title || ''} placement="bottom-start">
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
          >
            {item?.article.title}
          </Typography>
        </Box>
      </Tooltip>
      <Box
        ml="auto"
        mr={isSmallOrLower ? 1 : 4}
        style={getSectionStyle(isIntersectingHeader || isExtraSmallOrLower)}
      >
        <AddToCartForm
          {...addToCartFormProps}
          submitButton={
            isSmallOrLower ? (
              <IconButton
                type="submit"
                disabled={!numberOfItems}
                color="secondary"
              >
                <i className="app-icon icon-cart-in">&#xe809;</i>
              </IconButton>
            ) : undefined
          }
        />
      </Box>
      {addToCardSectionRef.current &&
        !isExtraSmallOrLower &&
        createPortal(
          <AddToCartForm {...addToCartFormProps} />,
          addToCardSectionRef.current,
        )}
      <IconButton className={classes.iconButton} onClick={toggleIsFavorite}>
        {isFavorite ? (
          <i className={clsx('app-icon', 'icon-heart', classes.heart)}>
            &#xe800;
          </i>
        ) : (
          <i className="app-icon icon-heart-empty">&#xe801;</i>
        )}
      </IconButton>
      <IconButton className={classes.iconButton}>
        <i className="app-icon icon-compare">&#xe80a;</i>
      </IconButton>
      <Tooltip title={itemCount > maxItemCount ? itemCount.toString() : ''}>
        <IconButton className={clsx(classes.iconButton, classes.cartButton)}>
          <Badge
            ref={countBadgeRef}
            badgeContent={itemCount}
            color="secondary"
            max={maxItemCount}
          >
            <i className="app-icon icon-cart">&#xe804;</i>
          </Badge>
        </IconButton>
      </Tooltip>
    </AppBar>
  );
};
