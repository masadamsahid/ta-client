import React from 'react';
import HomeHeroSection from "../components/HomeHeroSection";
import {Container, Typography} from "@mui/material";
import {useQuery} from "@apollo/client";
import gql from 'graphql-tag';

const Home = () => {
  const {loading, data} = useQuery(FETCH_5_LATEST_COURSE,{
    variables: {
      page: 1,
      pageSize: 5,
    }
  })
  console.log(loading, data)

  return (
    <>
      <HomeHeroSection/>
      <Container maxWidth='xl' style={{minHeight: '80vh'}}>
        <Typography variant='h3' fontWeight={300} align='center' maxWidth='75vw' marginX='auto'>
          Kuasai skill masa depan mulai dari sekarang
        </Typography>
      </Container>
    </>
  );
};

const FETCH_5_LATEST_COURSE = gql`
  query ($page: Int, $pageSize: Int){
    getCourses(page:$page, pageSize:$pageSize){
      count
      data {
        id courseCode
        description tutor{
          id username email role about createdAt
        }
        description createdAt
        price
        thumbnailImg
      }
    }
  }
`

export default Home;