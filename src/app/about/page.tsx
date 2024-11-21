'use client'
import React, { useState } from 'react';
import { Box, Tab, Tabs, Divider, Typography } from "@mui/material";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import './style.css';
import { red } from '@mui/material/colors';

const BoxStyle = {
  margin: '10px 0 10px 10px',
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2, maxWidth: '700px' }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function FolderTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="History" {...a11yProps(0)} />
          <Tab label="Now" {...a11yProps(1)} />
          <Tab label="Future" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>

        <Box sx={BoxStyle}>
          <Typography variant="h4" component="div">
            Shopping list version 1
          </Typography>
          <Typography variant="body2" color={red[200]} margin={'2px 0 10px'}>
            Development stopped
          </Typography>

          <Divider sx={{ border: 'solid 1px' }} />

          <Typography color="text.secondary" gutterBottom marginTop={2}>
            As you probably guessed, version 1 came first. <br />
          </Typography>

          <ul>
            <li>
              Fetch products from one database table.
            </li>
            <li>Editing products</li>
            <ol>
              <li>Add new product to database</li>
              <li>Delete product from database</li>
              <li>Rename product in database</li>
            </ol>
            <li>Editing shopping list</li>
            <ol>
              <li>Add new product to the shopping list</li>
              <li>Remove product from the shopping list</li>
              <li>Mark the product as purchased in the shopping list</li>
              <li>Unmark the product as purchased in the shopping list</li>
              <li>Hide/show purchased products in the shopping list</li>
            </ol>
            <li>Database is running in Raspberry Pi with Node Express Javascript</li>
          </ul>

          <Typography color="text.secondary" gutterBottom marginTop={2}>
            The purpose of this exercise was to create a single-page application (SPA) for simple shopping list usage.
          </Typography>
          <Typography color="text.secondary" gutterBottom marginTop={2}>
            But I couldn`t finish it completely because the ideas of a fully functional shopping list program started to fascinate me.
            You could really use this in your daily life.<br />
            In terms of exercise, this really had a purpose.<br />
            Depth and breadth that should be developed. Good learning platform for UI, React, NextJS, API, database...
          </Typography>
          <Typography color="text.secondary" gutterBottom marginTop={2}>
            So I started making version 2 from the so-called beginning. At this point I leaved the old version to be seen.
          </Typography>
          <Typography color="text.primary" gutterBottom marginTop={2}>
            See what`s been done in version 2 and what`s still to come <EmojiEmotionsIcon />
          </Typography>

        </Box>
      </TabPanel>

      <TabPanel value={value} index={1}>

        <Box sx={BoxStyle}>
          <Typography variant="h4" component="div">
            Shopping list version 3
          </Typography>
          <Typography variant="body2" color={red[200]} margin={'2px 0 10px'}>
            Development in progress...
          </Typography>

          <Divider sx={{ border: 'solid 1px' }} />

          <Typography color="text.secondary" gutterBottom marginTop={2}>
            Here is what have been done so far.
          </Typography>
          <Typography color="text.secondary" gutterBottom marginTop={1}>

          </Typography>
        </Box>

        <ul>
          <li>
            New database structure, new tables
            <ul>
              <li>Users</li>
              <li>Products</li>
              <li>Shopping lists</li>
              <li>Shopping list products</li>

            </ul>
          </li>
          <li>Api calls for interact with all tables</li>
          <li>Dynamic routing</li>
          <li>
            Shopping list actions
            <ul>
              <li>Make new shopping list</li>
              <li>Rename shopping list</li>
              <li>Delete shopping list (remove added products from shopping list table)</li>
              <li>Manage products (add, rename, delete)</li>
            </ul>
          </li>
          <li>User login (Password access coming later...)</li>
          <li>Show shopping lists by user</li>
        </ul>

      </TabPanel>

      <TabPanel value={value} index={2}>

        <Box sx={BoxStyle}>
          <Typography variant="h4" component="div">
            Development ideas
          </Typography>

          <Divider sx={{ border: 'solid 1px' }} />

          <Typography color="text.secondary" gutterBottom marginTop={2}>
            New idea of what it should have for great web app
          </Typography>
          <Typography color="text.secondary" gutterBottom marginTop={1}>

          </Typography>
        </Box>

        <ul>
          <li>User login / Adding/deleting new user</li>
          <li>Multiple private shopping lists</li>
          <li>Multiple shared shopping lists with other users</li>
          <li>All data in tables. `Start where you last left off`</li>
          <li>Validation</li>
          <li>Secure for API calls and data injection</li>
          <li>Folder structure and component structure make better</li>
          <li>Autentication</li>
        </ul>

        <Divider sx={{ border: 'solid 1px' }} />

        <Typography color="text.secondary" gutterBottom marginTop={2}>
          A list of features that would be a good addition to webpage for own use
        </Typography>

        <ul>
          <li>Weather information. Make own collection of places you wanna see. </li>
          <li>Map. Some experience of Leaflet already.</li>
          <li>Some web scraping. I wanna see how long queue is in my barber shop now.</li>
        </ul>

      </TabPanel>
    </Box>
  );
}
