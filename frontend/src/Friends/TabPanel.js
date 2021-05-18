import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Box } from '@material-ui/core';

import FriendsListItem from './FriendsListItem';
import DemandeReceive from './DemandeReceive';
import DemandeSent from './DemandeSent';

function TabPanel(props) {
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
        <Box style={{padding: "0"}} p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  mainTab: {
    position: 'fixed',
    width: '100%',
    backgroundColor: '#303030',
    marginTop: '0',
    boxShadow: '0px -4px 0px #151515',
  },
  tabs: {
    width: '33%',
  },
  tabPanel: {
    marginTop: '2.5em',
  },
  games: {
    width: '100%',
  },
}));

function SimpleTabs(props) {

  useEffect(() => {
    
  }, []);

  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="Exemple d'onglets simples" className={classes.mainTab}>
          <Tab label="Mes amies" {...a11yProps(0)} className={classes.tabs} />
          <Tab label="Demandes receive" {...a11yProps(1)} className={classes.tabs} />
          <Tab label="Demandes sent" {...a11yProps(2)} className={classes.tabs} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className={classes.tabPanel}>
        <FriendsListItem />
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tabPanel}>
        <DemandeReceive />
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.tabPanel}>
        <DemandeSent />
      </TabPanel>
    </div>
  );
}

export default SimpleTabs;