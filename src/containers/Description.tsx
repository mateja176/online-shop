import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Link,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  useTheme,
  makeStyles,
} from '@material-ui/core';
import { Attachment } from '@material-ui/icons';
import { useItem } from 'hooks';
import React from 'react';
import { imageSize, maxImageSize } from 'styles';
import { formatCurrency } from 'utils';

export interface DescriptionProps {}

const cardWidth = maxImageSize + imageSize;

const cardGridGap = 40;

const cardCount = 2;

const descriptionWidth = cardWidth * cardCount + cardGridGap;

const useStyles = makeStyles(() => ({
  header: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  bullet: {
    transform: 'scale(2)',
    marginRight: 15,
  },

  attachmentIcons: {
    transform: 'rotate(-45deg) scaleX(-1)',
    marginRight: 5,
  },

  keyword: {
    color: 'white',
    background: '#ccc',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginRight: 10,
  },

  card: {
    height: '100%',
  },

  priceBreakTableBody: {
    display: 'inline-block',
    marginTop: 5,
    borderTop: '1px solid #eee',
  },

  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
}));

export const Description: React.FC<DescriptionProps> = () => {
  const item = useItem();

  const classes = useStyles();

  const theme = useTheme();

  return (
    <Box bgcolor={theme.palette.grey[200]} py={8}>
      <Box maxWidth={descriptionWidth} mx={5}>
        <Typography variant="h6" color="secondary" className={classes.header}>
          Description
        </Typography>
        <Typography>{item?.article.description_long}</Typography>
      </Box>
      <Box
        mx={5}
        display="grid"
        maxWidth={descriptionWidth}
        gridTemplateColumns="repeat(auto-fit, minmax(300px, auto))"
        gridGap={cardGridGap}
      >
        <Box mt={5}>
          <Card className={classes.card}>
            <CardContent>
              <Box m={2}>
                <Typography color="secondary" className={classes.header}>
                  Details
                </Typography>
              </Box>
              <Divider />
              <Box mt={3}>
                <Typography variant="h6" color="textSecondary">
                  Features
                </Typography>
                <List>
                  {item?.article.features &&
                    Object.entries(item?.article.features).map(
                      ([name, feature]) => (
                        <ListItem key={name}>
                          <Typography className={classes.bullet}>•</Typography>
                          <Typography color="textSecondary">
                            {name}
                          </Typography>: {feature}
                        </ListItem>
                      ),
                    )}
                </List>
              </Box>
              <Box mt={3}>
                <Typography variant="h6" color="textSecondary">
                  Attachments
                </Typography>
                <List>
                  {item?.article.attachments.map(({ file_label }) => (
                    <ListItem key={file_label}>
                      <Attachment className={classes.attachmentIcons} />
                      <Link color="primary">{file_label}</Link>
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Box mt={3}>
                <Typography variant="h6" color="textSecondary">
                  Keywords
                </Typography>
                <Box display="flex" pt={1}>
                  {item?.article.keywords.map((keyword) => (
                    <Chip
                      key={keyword}
                      label={keyword}
                      className={classes.keyword}
                    />
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box mt={5}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Box m={2}>
                <Typography color="secondary" className={classes.header}>
                  Pricing & shipping
                </Typography>
              </Box>
              <Divider />
              <Box
                flex={1}
                display="flex"
                justifyContent="space-between"
                flexDirection="column"
              >
                <Box mt={3}>
                  <List>
                    <ListItem>
                      <Typography className={classes.bullet}>•</Typography>
                      <Typography color="textSecondary">
                        Minimum order:
                      </Typography>
                      &nbsp;
                      {item?.article.minimum_order_quantity}
                    </ListItem>
                    <ListItem>
                      <Typography className={classes.bullet}>•</Typography>
                      <Typography color="textSecondary">Shipping:</Typography>
                      &nbsp;
                      {item?.article.currency &&
                        formatCurrency(item?.article.currency)(
                          item?.article.transport_costs,
                        )}
                    </ListItem>
                    <ListItem>
                      <Typography className={classes.bullet}>•</Typography>
                      <Typography color="textSecondary">Delivery:</Typography>
                      &nbsp;
                      {item?.article.delivery_time}
                    </ListItem>
                  </List>
                </Box>
                <Box mt={3}>
                  <Typography variant="h6" color="textSecondary">
                    Price breaks
                  </Typography>
                  <Table>
                    <TableBody className={classes.priceBreakTableBody}>
                      {item?.article.price_breaks &&
                        Object.entries(item?.article.price_breaks).map(
                          ([pieces, price]) => (
                            <TableRow key={price}>
                              <TableCell align="right">
                                ex {pieces} PCE
                              </TableCell>
                              <TableCell>
                                {formatCurrency(item.article.currency)(price)}
                                /PCE
                              </TableCell>
                            </TableRow>
                          ),
                        )}
                    </TableBody>
                  </Table>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};
