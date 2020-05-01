import { Box, IconButton, Link, Typography } from '@material-ui/core';
import { ArrowDropDown, LocalOffer, ZoomIn } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import { useItem } from 'hooks';
import { addToCardSectionId } from 'models/components';
import React from 'react';
import { formatCurrency } from 'utils';

export interface OverviewProps {}

const shadowColor = '#eee';

const boxShadow: React.CSSProperties['boxShadow'] = `1px 1px ${shadowColor}, -1px -1px ${shadowColor}`;

const imagePreviewStyle: React.CSSProperties = {
  cursor: 'pointer',
};

const margin = 8;

export const Overview: React.FC<OverviewProps> = () => {
  const item = useItem();

  const [selectedImage, setSelectedImage] = React.useState('');
  React.useEffect(() => {
    if (!selectedImage && item?.article.images.length) {
      setSelectedImage(item.article.images[0]);
    }
  }, [selectedImage, item]);

  const formatEUR = formatCurrency(item?.article.currency ?? '');

  return (
    <Box mt="70px" mb={margin} display="flex" flexWrap="wrap">
      <Box mt={margin} display="flex">
        <Box display="grid" gridGap={21} mr="21px" ml={5}>
          {item?.article.images.map((src) => (
            <Box
              key={src}
              width={186}
              height={186}
              boxShadow={boxShadow}
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={() => {
                setSelectedImage(src);
              }}
              style={imagePreviewStyle}
            >
              <img src={src} alt="Article" width={186} height={186} />
            </Box>
          ))}
        </Box>
        <Box
          width={600}
          height={600}
          boxShadow={boxShadow}
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {selectedImage ? (
            <img src={selectedImage} alt="Article" />
          ) : (
            'Select an image from the thumbnails'
          )}
          <Box position="absolute" right={3} bottom={3}>
            <IconButton>
              <ZoomIn />
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
              <Link color="primary" href={item?.article.supplier_link}>
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
            <Box ml={2}>
              <LocalOffer />
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
