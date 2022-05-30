import React from 'react';
import {Box, Container, Stack, Typography} from "@mui/material";
import CTAIllustration from '../assets/home-CTA-illustration.png'

const Home = () => {
  return (
    <Container maxWidth="xl" sx={{minHeight:'80vh', display:'flex', alignItems:'center'}}>
      <Stack direction='row' gap={3} alignItems='center' marginX='auto'>
        <Stack sx={{maxWidth: '500px'}}>
          <Typography variant='h4' fontWeight={500} width='auto'>
            Belajar apa saja, di mana saja!
          </Typography>
          <Typography variant='p' fontWeight={200} width='auto' lineHeight={1.5}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus amet blanditiis dignissimos dolores ea fugit illo in iure nulla quas reiciendis repellendus repudiandae tempore, temporibus?
          </Typography>
        </Stack>
        <img src={CTAIllustration} width='600px'/>
      </Stack>
    </Container>
  );
};

export default Home;