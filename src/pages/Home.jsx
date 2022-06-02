import React from 'react';
import HomeHeroSection from "../components/HomeHeroSection";
import {Container, Typography} from "@mui/material";

const Home = () => {
  return (
    <>
      <HomeHeroSection/>
      <Container maxWidth='xl' style={{minHeight: '80vh'}}>
        <Typography variant='h5' align='center'>
          Kuasai skill masa depan mulai dari sekarang
        </Typography>
      </Container>
    </>
  );
};

export default Home;