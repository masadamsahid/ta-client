import React from 'react';
import {Box, Container, Divider, Stack, Typography} from "@mui/material";
import {Instagram, LinkedIn, YouTube} from "@mui/icons-material";

const Footer = () => {

  return (
    <Container maxWidth="xl" sx={{display:'flex', alignItems:'center', backgroundColor:'#444', padding:4, color:'#fff'}}>
      <Stack direction='row' width='100%' justifyContent='space-between' alignItems='center'>
        <Box maxWidth='300px'>
          <Typography variant='h4' fontWeight={600}>
            GAMADEMY
          </Typography>
          <Typography variant='p' fontWeight={200} lineHeight={1.4} textAlign='justify'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque eaque harum laudantium magnam, nam officiis quas repellat sequi sint vitae!
          </Typography>
        </Box>
        <Stack>
          <Typography variant='h5' mb='10px' textAlign='right'>
            Follow Us
          </Typography>
          <Stack
            direction='row'
            justifyContent='end'
            gap={3}
          >
            <YouTube color='white' fontSize='large'/>
            <Instagram color='white' fontSize='large'/>
            <LinkedIn color='white' fontSize='large'/>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Footer;