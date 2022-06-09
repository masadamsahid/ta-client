import React, {useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import gql from "graphql-tag";
import {
  Avatar, Badge,
  Button,
  Card, CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container, Divider,
  Grid, LinearProgress,
  Stack,
  Typography
} from "@mui/material";
import ReactMarkdown from "react-markdown";

import supportedPaymentImg from '../assets/supported-payment.png';
import {useSelector} from "react-redux";

const DEFAULT_THUMBNAIL = 'https://res.cloudinary.com/grand-canyon-university/image/fetch/w_750,h_564,c_fill,g_faces,q_auto/https://www.gcu.edu/sites/default/files/2020-09/programming.jpg'

const CourseDetailPage = () => {
  const navigate = useNavigate()

  const {courseCode} = useParams();

  const {selfUser} = useSelector(store => store.auth)

  const [paymentBtnHovered,setPaymentBtnHovered] = useState(false);

  const {loading, refetch, data: {getCourse: course} = {}} = useQuery(FETCH_COURSE_DETAILS, {
    notifyOnNetworkStatusChange:true,
    variables: {
      courseCode
    },
    onError(err){
      console.log(err.message)
    }
  });

  const [createOrder, {loading:orderLoading, data : {createCourseOrder: courseOrder} = {}}] = useMutation(CREATE_COURSEORDER_MUTATION,{
    variables:{
      courseCode
    },
    onError(err){
      console.log(err.message)
    },
    update(){
      refetch();
    }
  });

  function handleCreateCourseOrder(){
    createOrder();
  }

  function handleRedirectLogin() {
    navigate('/login');
  }

  return (
    <Container maxWidth="xl" sx={{minHeight: '85vh', display: 'flex', justifyContent: 'center'}}>
      {loading && course === undefined ? (
        <Stack justifyContent='center' width='60%'>
          <Typography variant='h4' mb={4} align='center'>
            Loading
          </Typography>
          <LinearProgress/>
        </Stack>
      ):(
        <Grid container gap={4} justifyContent='center' my={3} columns={16}>
          <Grid item xs={12} sm={8}>
            <Stack gap={2}>
              <Card>
                <CardMedia
                  component='img'
                  height='350px'
                  image={course?.thumbnailImg || DEFAULT_THUMBNAIL}
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
                {orderLoading ? (
                  <CardContent>
                    <LinearProgress/>
                  </CardContent>
                ): (
                  <>
                    <CardContent>
                      <Typography variant='h5' component='div' align='center'>
                        Sudah siap belajar?
                      </Typography>
                    </CardContent>
                    <CardContent sx={{py:0}}>
                      <Typography variant='body2' component='div' align='center'>
                        {course?.courseOrder ? (
                          course.courseOrder.courseAccess ? 'Kamu sudah membeli kelas ini' : 'Selesaikan pembayaran untuk mendapatkan akses kelas'
                        ) : (
                          'Klik tombol berikut untuk melakukan pembayaran'
                        )}
                      </Typography>
                    </CardContent>
                    <CardActions sx={ course?.courseOrder?.courseAccess !== true ? ({flexDirection:'column',gap:1}) : ({}) }>
                      {course?.courseOrder === null ? (
                        <Button
                          fullWidth
                          variant={paymentBtnHovered ? 'contained' : 'outlined'}
                          onMouseEnter={()=>setPaymentBtnHovered(true)}
                          onMouseLeave={()=>setPaymentBtnHovered(false)}
                          onClick={selfUser ? handleCreateCourseOrder : handleRedirectLogin}
                          disableElevation
                        >
                          {paymentBtnHovered ? 'BELI KELAS' : `Rp. ${course?.price},-`}
                        </Button>
                      ):(
                        course?.courseOrder.courseAccess ? (
                          <Button
                            as={Link}
                            className='text-link'
                            fullWidth
                            variant={paymentBtnHovered ? 'contained' : 'outlined'}
                            onMouseEnter={()=>setPaymentBtnHovered(true)}
                            onMouseLeave={()=>setPaymentBtnHovered(false)}
                            disableElevation
                            sx={{textAlign:'center'}}
                            to={`/learning/${courseCode}/1`}
                          >
                            MULAI BELAJAR
                          </Button>
                        ) : (
                          <>
                            <Button
                              className='text-link'
                              fullWidth
                              variant='contained'
                              sx={{textAlign:'center'}}
                              href={course?.courseOrder.redirectUrl}
                              target='_blank'
                              disabled={loading}
                              disableElevation
                            >
                              Lanjutkan pembayaran
                            </Button>
                            <Divider sx={{width:'85%'}}/>
                            <Typography variant='caption' component='div'>
                              Sudah menyelesaikan pembayaran?
                            </Typography>
                            <Button
                              color='warning'
                              variant={paymentBtnHovered ? 'contained' : 'outlined'}
                              onMouseEnter={()=>setPaymentBtnHovered(true)}
                              onMouseLeave={()=>setPaymentBtnHovered(false)}
                              sx={{textAlign:'center'}}
                              onClick={()=>refetch()}
                              disabled={loading}
                              disableElevation
                            >
                              Konfirmasi
                            </Button>
                          </>
                        )
                      )}
                    </CardActions>
                  </>
                )}
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
      )}
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
      courseOrder{
        id
        orderId
        midtransStatus
        courseAccess
        amount
        createdAt
        updatedAt
        midtransToken
        redirectUrl
      }
    }
  }
`

const CREATE_COURSEORDER_MUTATION = gql`
  mutation createCourseOrder($courseCode: String!){
    createCourseOrder(courseCode:$courseCode) {
      id
      orderId
      midtransStatus
      courseAccess
      amount
      createdAt
      updatedAt
      midtransToken
      redirectUrl
    }
  }

`

export default CourseDetailPage;