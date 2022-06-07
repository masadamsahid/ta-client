import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {
  Avatar, Badge,
  Button,
  Card, CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography
} from "@mui/material";
import ReactMarkdown from "react-markdown";

import supportedPaymentImg from '../assets/supported-payment.png';

const CourseDetailPage = () => {

  const {courseCode} = useParams();
  console.log(courseCode)

  const [paymentBtnHovered,setPaymentBtnHovered] = useState(false);

  const {loading, data: {getCourse: course} = {}} = useQuery(FETCH_COURSE_DETAILS, {
    variables: {
      courseCode
    }
  });
  console.log(loading, course);

  return (
    <Container maxWidth="xl" sx={{minHeight: '85vh', display: 'flex', justifyContent: 'center'}}>
      <Grid container gap={4} justifyContent='center' my={3} columns={16}>
        <Grid item xs={12} sm={8}>
          <Stack gap={2}>
            <Card>
              <CardMedia
                component='img'
                height='350px'
                image={course?.thumbnailImg}
              />
              <CardContent>
                <Typography variant='h3' fontWeight={600}>
                  {course?.title}
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <ReactMarkdown>
                  {course?.description}
                </ReactMarkdown>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
        <Grid item sm={4}>
          <Stack gap={2}>
            <Card>
              <CardHeader
                title={course?.tutor.fullName}
                subheader={course?.tutor.username}
                avatar={<Avatar color='rgba(34,21,0,1)' children={course?.tutor.username[0].toUpperCase()}/>}
              />
              <CardContent>
                <Typography
                  variant='caption'
                  children={course?.tutor.about}
                />
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant='h5' component='div' align='center'>
                  Sudah siap belajar?
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant={paymentBtnHovered ? 'contained' : 'outlined'}
                  onMouseEnter={()=>setPaymentBtnHovered(true)}
                  onMouseLeave={()=>setPaymentBtnHovered(false)}
                  disableElevation
                >
                  {paymentBtnHovered ? 'BELI KELAS' : `Rp. ${course?.price},-`}
                </Button>
              </CardActions>
            </Card>
            <Card>
              <CardContent>
                <Typography variant='h6' component='div' align='center'>
                  Payment Methods
                </Typography>
              </CardContent>
              <CardMedia component='img' image={supportedPaymentImg}/>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

const FETCH_COURSE_DETAILS = gql`
  query getCourse ($courseCode: String){
    getCourse(courseCode: $courseCode){
      id title courseCode description price
      tutor {
        id username about email createdAt fullName
      }
      topics{
        id topicTitle orderNo videoUrl body createdAt lastUpdated
      }
      thumbnailImg
      createdAt
    }
  }
`

export default CourseDetailPage;