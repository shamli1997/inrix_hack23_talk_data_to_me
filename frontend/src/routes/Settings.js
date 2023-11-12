import React, {useEffect, useState} from "react";
import { TextField, Button, Container, Stack } from '@mui/material';
import { Link } from "react-router-dom"
import apiRequest from "../components/apiRequest";

function Settings() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [homeAddress, setHomeAddress] = useState('')
  const [workAddress, setWorkAddress] = useState('')
  const [otherAddress, setOtherAddress] = useState('')
  const [homeAddressZip, setHomeAddressZip] = useState('')
  const [workAddressZip, setWorkAddressZip] = useState('')
  const [otherAddressZip, setOtherAddressZip] = useState('')

  useEffect(()=>{
    apiRequest("http://localhost:8080/profile").then((data)=>{
        setFirstName(data["firstname"])
        setLastName(data["lastname"])
        setEmail(data["email"])
        setHomeAddress(data["home"])
        setHomeAddressZip(data["homezip"])
        setWorkAddress(data["work"])
        setWorkAddressZip(data["workzip"])
        setOtherAddress(data["other"])
        setOtherAddressZip(data["otherzip"])
    })
  },[])

  function handleSubmit(event) {
      event.preventDefault();
      console.log(firstName, lastName, email, homeAddress, workAddress) 
  }
  return (

    
      <>
          <div className="container">
              <h2 className="page-title">Profile</h2>
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
                <Stack spacing="2px" style={{marginBottom:"10px"}}>
                <Stack spacing="7px" direction="row">
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
                        label="Home Zip"
                        onChange={e => {
                            if(/^\d+$/.test(e.target.value) && e.target.value.length <= 5) setHomeAddressZip(e.target.value)
                        }}
                        value={homeAddressZip}
                        fullWidth
                        required sx={{mb: 4}}
                    />
                </Stack>
                <Stack spacing="7px" direction="row">
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
                        label="Work Zip"
                        onChange={e => {
                            if(/^\d+$/.test(e.target.value) && e.target.value.length <= 5) setWorkAddressZip(e.target.value)
                        }}
                        value={workAddressZip}
                        fullWidth
                        required sx={{mb: 4}}
                    />
                </Stack>

                <Stack spacing="7px" direction="row">
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
                    <TextField
                        type="text"
                        variant='outlined'
                        color='secondary'
                        label="Other Zip"
                        onChange={e => {
                            if(/^\d+$/.test(e.target.value) && e.target.value.length <= 5) setOtherAddressZip(e.target.value)
                        }}
                        value={otherAddressZip}
                        fullWidth
                        sx={{mb: 4}}
                    />
                </Stack>
                </Stack>

                
                <Button variant="outlined" color="secondary" type="submit"
                    onClick={()=>{
                        apiRequest("http://localhost:8080/profile","",
                            {
                                firstname: firstName,
                                lastname: lastName,
                                email: email,
                                home: homeAddress,
                                homezip: homeAddressZip,
                                work: workAddress,
                                workzip: workAddressZip,
                                other: otherAddress,
                                otherzip: otherAddressZip
                            }
                        ,"PUT")
                    }}
                >
                    Save
                </Button>
            </form>
            
     
        </React.Fragment>
              </div>

          </div>

      </>
  );
};

export default Settings;
