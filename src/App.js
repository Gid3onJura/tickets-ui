import React from 'react';
import './App.css';
import Button from '@mui/material/Button'
import SaveIcon from '@material-ui/icons/Save'
import { TextField } from '@material-ui/core';

import { createTheme, ThemeProvider } from '@mui/material/styles';


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

async function saveTicket() {
  try {
    const result = await fetch('http://localhost:3333', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(testData)
    }).then(res => {
      return res.json()
    })
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }
  catch (error) {
    console.log(error);
  }
}

function TicketForm() {
  return (
    <div className='ticketForm'>
      <TextField
        variant='filled'
        type='text'
        label='Titel'
      />
      <TextField
        variant='filled'
        type='date'
        label='Datum'
      />
      <TextField
        variant='filled'
        type='text'
        label='Ort'
      />
      <TextField
        variant='filled'
        type='text'
        label='Name'
      />
      <TextField
        variant='filled'
        type='text'
        label='Nachname'
      />
      <Button
        startIcon={<SaveIcon />}
        variant='contained'
        size='large'
        onClick={() => saveTicket()}
      >
        Ticket
      </Button>
    </div>
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
