import React from 'react';
import HomeHeroSection from "../components/HomeHeroSection";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Paper, Tooltip,
  Typography
} from "@mui/material";
import {useQuery} from "@apollo/client";
import gql from 'graphql-tag';

const DEFAULT_THUMBNAIL = 'https://res.cloudinary.com/grand-canyon-university/image/fetch/w_750,h_564,c_fill,g_faces,q_auto/https://www.gcu.edu/sites/default/files/2020-09/programming.jpg'

const Home = () => {
  const {loading, data: {getCourses: {data:recentCourses} = {} } = {} } = useQuery(FETCH_5_LATEST_COURSE,{
    variables: {
      page: 1,
      pageSize: 5,
    }
  })
  console.log(loading, recentCourses)

  return (
    <>
      <HomeHeroSection/>
      <Container maxWidth='xl' style={{minHeight: '80vh'}}>
        <Typography variant='h3' fontWeight={300} align='center' maxWidth='75vw' marginX='auto' marginBottom={15}>
          Kuasai skill masa depan mulai dari sekarang
        </Typography>

        <Typography variant='h5' fontWeight={300} align='center' maxWidth='75vw' marginX='auto'>
          Kelas Terbaru
        </Typography>
        <Divider sx={{maxWidth: '75%', marginX: 'auto'}}/>

        <Grid maxWidth='80%' container columns={12} spacing={2} justifyContent="center" mx='auto' mt={3}>
          {recentCourses?.map((course) => (
            <Grid item xs={12} sm={4} key={course.id}>
              <Card>
                <CardMedia
                  component='img'
                  height='140px'
                  image={course?.thumbnailImg || DEFAULT_THUMBNAIL}
                />
                <CardContent sx={{maxHeight: '60px'}}>
                  {course.title.length > 20 ? (
                    <Tooltip title={course.title}>
                      <Typography variant="h6" component="div">
                        {course.title.slice(0,24)} ...
                      </Typography>
                    </Tooltip>
                  ) : (
                    <Typography variant="h6" component="div">
                      {course.title}
                    </Typography>
                  )}
                </CardContent>
                <CardActions sx={{justifyContent: 'end'}}>
                  <Button fullWidth size="small" variant='contained' sx={{textTransform:'none'}} disableElevation>
                    Rp. {course.price}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

const FETCH_5_LATEST_COURSE = gql`
  query ($page: Int, $pageSize: Int){
    getCourses(page:$page, pageSize:$pageSize){
      count
      data {
        id courseCode title description
        description createdAt price thumbnailImg
        
        tutor {
          id username email role about createdAt
        }
        
        topics {
          id orderNo topicTitle
        }
        
      }
    }
  }
`

export default Home;