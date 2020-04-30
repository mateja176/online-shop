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
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Attachment } from '@material-ui/icons';
import { useItem } from 'hooks';
import React from 'react';
import { formatCurrency } from 'utils';

export interface DescriptionProps {}

const headerStyle: React.CSSProperties = {
  textTransform: 'uppercase',
  fontWeight: 'bold',
};

const cardWidth = 800;

const bulletStyle: React.CSSProperties = {
  transform: 'scale(2)',
  marginRight: 15,
};

const attachmentIconsStyle: React.CSSProperties = {
  transform: 'rotate(-45deg) scaleX(-1)',
  marginRight: 5,
};

const keywordStyle: React.CSSProperties = {
  color: 'white',
  background: '#ccc',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  marginRight: 10,
};

const cardStyle: React.CSSProperties = {
  width: 800,
};

const priceBreakTableStyle: React.CSSProperties = {
  display: 'inline-block',
  marginTop: 5,
};

export const Description: React.FC<DescriptionProps> = () => {
  const item = useItem();

  return (
    <Box bgcolor="#eee" py={8}>
      <Box width={cardWidth * 2 + 40} ml={5} mb={6}>
        <Typography variant="h6" color="secondary" style={headerStyle}>
          Description
        </Typography>
        <Typography>{item?.article.description_long}</Typography>
      </Box>
      <Box display="flex">
        <Box ml={5}>
          <Card style={cardStyle}>
            <CardContent>
              <Box m={2}>
                <Typography color="secondary" style={headerStyle}>
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
                        <ListItem>
                          <Typography style={bulletStyle}>•</Typography>
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
                    <ListItem>
                      <Attachment style={attachmentIconsStyle} />
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
                    <Chip label={keyword} style={keywordStyle} />
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <Box ml={5}>
          <Card style={cardStyle}>
            <CardContent>
              <Box m={2}>
                <Typography color="secondary" style={headerStyle}>
                  Pricing & shipping
                </Typography>
              </Box>
              <Divider />
              <Box mt={3}>
                <List>
                  <ListItem>
                    <Typography style={bulletStyle}>•</Typography>
                    <Typography color="textSecondary">
                      Minimum order:
                    </Typography>
                    &nbsp;
                    {item?.article.minimum_order_quantity}
                  </ListItem>
                  <ListItem>
                    <Typography style={bulletStyle}>•</Typography>
                    <Typography color="textSecondary">Shipping:</Typography>
                    &nbsp;
                    {item?.article.currency &&
                      formatCurrency(item?.article.currency)(
                        item?.article.transport_costs,
                      )}
                  </ListItem>
                  <ListItem>
                    <Typography style={bulletStyle}>•</Typography>
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
                <Table style={priceBreakTableStyle}>
                  {item?.article.price_breaks &&
                    Object.entries(item?.article.price_breaks).map(
                      ([pieces, price], i) => (
                        <TableRow
                          style={{
                            borderTop: i === 0 ? '1px solid #eee' : 'none',
                          }}
                        >
                          <TableCell align="right">ex {pieces} PCE</TableCell>
                          <TableCell>
                            {formatCurrency(item.article.currency)(price)}/PCE
                          </TableCell>
                        </TableRow>
                      ),
                    )}
                </Table>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};