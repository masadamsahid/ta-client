import React from 'react';
import {Button, ButtonGroup, Container, Stack, Typography} from "@mui/material";
import CTAIllustration from "../assets/home-CTA-illustration.png";
import {ArrowForward, ArrowForwardIos} from "@mui/icons-material";

const HomeHeroSection = () => {
  return (
    <Container maxWidth="xl" sx={{minHeight:'85vh', display:'flex', alignItems:'center'}}>
      <Stack direction='row' gap={10} alignItems='center' marginX='auto'>
        <Stack sx={{maxWidth: '350px'}} marginX='auto'>
          <Typography variant='h4' fontWeight={700} width='auto' mb={3}>
            Belajar apa saja,<br/>
            di mana saja
          </Typography>
          <Typography variant='p' fontWeight={300} width='auto' lineHeight={1.5} marginBottom={2}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem cupiditate debitis, est itaque iure placeat.
          </Typography>
          <ButtonGroup>
            <Button>
              Lihat kelas
            </Button>
            <Button variant='contained' disableElevation>
              <ArrowForward/>
            </Button>
          </ButtonGroup>
        </Stack>
        <img src={CTAIllustration} width='500px'/>
      </Stack>
    </Container>
  );
};

export default HomeHeroSection;