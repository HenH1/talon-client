import React from 'react';
import { Container, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import EventsContainer from './components/EventsContainer';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  appPage: {
    height: "100vh",
    minWidth: "100%",
    display: "flex",
    padding: " 0 9.35%" // Instead of 200 (calculated the percentage)
  }
});

function App() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme} >
      <Container className={classes.appPage}>
        <EventsContainer />
      </Container>
    </ThemeProvider>
  );
}

export default App;
