import React, { useState } from 'react';
import uuid from 'react-uuid';
import './App.css';
import SaveIcon from '@material-ui/icons/Save'
import ListIcon from '@mui/icons-material/List';
import { TextField } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Grid } from '@mui/material';


const theme = createTheme({
  palette: {
    primary: {
      main: '#f9ac66',
    },
    neutral: {
      main: '#ed6b5b',
      contrastText: '#fff',
    },
  },
});

const testData = {
  "eventTitle": "Eldorado",
  "eventDate": "2022-09-22",
  "eventCity": "Köln",
  "barcode": "3fh6kgk3",
  "firstName": "Tim",
  "lastName": "Muster"
};

function TicketForm() {

  function saveTicket(event) {
    event.preventDefault();
    const barcode = uuid().slice(-8);
    console.log(barcode);
    const data = {
      eventTitle,
      eventDate,
      eventCity,
      barcode: '3fh6kgk3',
      lastName,
      firstName
    }
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };
      fetch('http://192.168.0.7:3333/ticket', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
    }
    catch (error) {
      console.log(error);
    }
  }

  function getTickets() {
    try {
      fetch('http://192.168.0.7:3333/ticket')
        .then(response => response.json())
        .then(data => console.log(data));
    }
    catch (error) {
      console.log(error);
    }
  }

  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventCity, setEventCity] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <form onSubmit={saveTicket} >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={8}>
          <TextField
            variant='filled'
            type='text'
            label='Titel'
            name='eventTitle'
            onInput={e => setEventTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            variant='filled'
            type='date'
            label='Datum'
            name='eventDate'
            onInput={e => setEventDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            variant='filled'
            type='text'
            label='Ort'
            name='eventCity'
            onInput={e => setEventCity(e.target.value)}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            variant='filled'
            type='text'
            label='Name'
            name='lastname'
            onInput={e => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            variant='filled'
            type='text'
            label='Vorname'
            name='firstname'
            onInput={e => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={8}>
          <Button
            startIcon={<SaveIcon />}
            variant='contained'
            size='large'
            onClick={() => saveTicket()}
            type='submit'
          >
            Ticket
          </Button>
          <Button
            startIcon={<ListIcon />}
            variant='contained'
            size='large'
            onClick={() => getTickets()}
          >
            Laden
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

function TicketList() {
  return (
    <div className='ticketList'>

    </div>
  )
}


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <div className='ticketManagerContaier'>
            <TicketForm />
            <TicketList />
          </div>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
