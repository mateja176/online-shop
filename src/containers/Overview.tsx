import {
  Box,
  IconButton,
  Link,
  makeStyles,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import { useItem } from 'hooks';
import { addToCardSectionId } from 'models/components';
import React from 'react';
import {
  headerHeight,
  imageGridGap,
  maxImageSize,
  thumbnailSize,
} from 'styles';
import { formatCurrency } from 'utils';

export interface OverviewProps {}

const initialImageScale = 1;
const zoomIncrement = 0.1;

/* value is multiplied to get absolute amount in pixels */
const margin = 8;

const useStyles = makeStyles((theme) => ({
  imagePreview: {
    cursor: 'pointer',
  },
}));

export const Overview: React.FC<OverviewProps> = () => {
  const item = useItem();

  const [selectedImage, setSelectedImage] = React.useState('');
  React.useEffect(() => {
    if (!selectedImage && item?.article.images.length) {
      setSelectedImage(item.article.images[0]);
    }
  }, [selectedImage, item]);

  const formatEUR = formatCurrency(item?.article.currency ?? '');

  const classes = useStyles();

  const theme = useTheme();

  const boxShadow: React.CSSProperties['boxShadow'] = `1px 1px ${theme.palette.grey[200]}, -1px -1px ${theme.palette.grey[200]}`;

  const isSmallOrLower = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  const previewImageSize = isSmallOrLower ? maxImageSize : thumbnailSize;

  const [imageScale, setImageScale] = React.useState(initialImageScale);

  const zoomIn = () => {
    setImageScale((scale) => scale + zoomIncrement);
  };

  const zoomOut = () => {
    setImageScale((scale) => scale - zoomIncrement);
  };

  const selectedImageStyle: React.CSSProperties = {
    transform: `scale(${imageScale})`,
    transformOrigin: 'center center',
  };

  return (
    <Box mt={`${headerHeight}px`} mb={margin} display="flex" flexWrap="wrap">
      <Box mt={margin} display="flex" flexWrap="wrap">
        <Box
          display="grid"
          gridGap={imageGridGap}
          mr={`${imageGridGap}px`}
          ml={5}
        >
          {item?.article.images.map((src) => (
            <Box
              key={src}
              className={classes.imagePreview}
              maxWidth={previewImageSize}
              maxHeight={previewImageSize}
              boxShadow={boxShadow}
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={() => {
                setSelectedImage(src);
                setImageScale(initialImageScale);
              }}
            >
              <img src={src} alt="Article" width="100%" height="100%" />
            </Box>
          ))}
        </Box>
        <Box
          width={maxImageSize}
          height={maxImageSize}
          boxShadow={boxShadow}
          position="relative"
          display={isSmallOrLower ? 'none' : 'flex'}
          alignItems="center"
          justifyContent="center"
          order={isSmallOrLower ? -1 : 0}
          ml={isSmallOrLower ? 5 : 0}
          overflow="hidden"
        >
          {selectedImage ? (
            <img src={selectedImage} alt="Article" style={selectedImageStyle} />
          ) : (
            'Select an image from the thumbnails'
          )}
          <Box position="absolute" right={3} bottom={3}>
            <IconButton onClick={zoomOut}>
              <i className="app-icon icon-zoom-out">&#xe802;</i>
            </IconButton>
            <IconButton onClick={zoomIn}>
              <i className="app-icon icon-zoom-in">&#xe803;</i>
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box mt={margin} ml={5} display="flex" flexDirection="column">
        <Box mb={4}>
          <Typography variant="h6">{item?.article.title}</Typography>
          <Box display="flex" mb={2}>
            <Typography color="textSecondary">by</Typography>&nbsp;
            {item?.article.supplier_name && (
              <Link
                color="primary"
                href={item?.article.supplier_link}
                target="__blank"
              >
                {item?.article.supplier_name}
              </Link>
            )}
          </Box>
          <Box display="flex" alignItems="center" mb={3}>
            <Rating
              name="rating"
              precision={0.1}
              value={item?.article.stars ?? 0}
              onChange={console.log}
            />
            <ArrowDropDown fontSize="small" />
          </Box>
        </Box>
        <Box>
          <Box display="flex" alignItems="center">
            <Typography>{formatEUR(item?.article.price)}</Typography>&nbsp;
            <Typography color="textSecondary">
              + {formatEUR(item?.article.transport_costs)} shipping{' '}
            </Typography>
            <Box ml={1} fontSize={20}>
              <i className="app-icon discount">&#xe80b;</i>
            </Box>
          </Box>
          <Typography color="textSecondary">
            all prices incl. {item?.article.vat_percent}% taxes
          </Typography>
        </Box>
        <Box flex={1} display="flex" alignItems="flex-end">
          <Box mt={7}>
            <div id={addToCardSectionId} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
