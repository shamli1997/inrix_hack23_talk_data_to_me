import React, {useState} from "react";
import { TextField, Button, Container, Stack } from '@mui/material';
import { Link } from "react-router-dom"

function Settings() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [homeAddress, setHomeAddress] = useState('')
  const [workAddress, setWorkAddress] = useState('')
  const [otherAddress, setOtherAddress] = useState('')

  function handleSubmit(event) {
      event.preventDefault();
      console.log(firstName, lastName, email, homeAddress, workAddress) 
  }
  return (

    
      <>
          <div className="container">
              <h2 class="page-title">Profile</h2>
              <br/>
              <br/>
             

              <div className="main-content formClass">
              <br/>
              <React.Fragment>
            <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="First Name"
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Last Name"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                        fullWidth
                        required
                    />
                </Stack>
                <TextField
                    type="email"
                    variant='outlined'
                    color='secondary'
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Home"
                        onChange={e => setHomeAddress(e.target.value)}
                        value={homeAddress}
                        fullWidth
                        required sx={{mb: 4}}
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Work"
                        onChange={e => setWorkAddress(e.target.value)}
                        value={workAddress}
                        fullWidth
                        required sx={{mb: 4}}
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Other"
                        onChange={e => setOtherAddress(e.target.value)}
                        value={otherAddress}
                        fullWidth
                        sx={{mb: 4}}
                    />
                
                <Button variant="outlined" color="secondary" type="submit">Save</Button>
            </form>
            
     
        </React.Fragment>
              </div>

          </div>

      </>
  );
};

export default Settings;
