import React, {useEffect, useState} from 'react';
import {Container, Grid, LinearProgress, Pagination, Stack, Typography} from "@mui/material";
import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import CourseCard from "../components/CourseCard";

const CoursesPage = () => {

  const [page,setPage] = useState(1);
  const [courses,setCourses] = useState([]);

  const {loading, refetch, data: {getCourses: {data,count} = {} } = {} } = useQuery(FETCH_5_LATEST_COURSE,{
    notifyOnNetworkStatusChange: true,
    variables: {
      page: page,
      pageSize: 8,
    }
  })

  useEffect(()=>{
    refetch();
  },[page])

  console.log(count, 'course:\n', courses);
  console.log(loading, data);

  return (
    <Container maxWidth="xl" sx={{minHeight:'85vh', display:'flex', justifyContent: 'center'}}>
      <Stack
        width='100%'
        alignItems='center'
        justifyContent='space-between'
        gap={2}
        my={2}
      >
        <Typography variant='h3' fontWeight={300}>
          Sambut skill masa depanmu!
        </Typography>

        {loading ? (
          <Stack width='60%'>
            <Typography variant='h4'align='center'>
              Loading
            </Typography>
            <LinearProgress/>
          </Stack>
        ):(
          <Grid
            container
            columns={10}
            gap={2}
            justifyContent="center"
            mx='auto'
          >
            {data?.map((course) => (
              <Grid item xs={12} sm={2} key={course.id}>
                <CourseCard course={course}/>
              </Grid>
            ))}
          </Grid>
        )}

        <Pagination
          page={page}
          count={Math.ceil(count/8)}
          disabled={loading}
          onChange={(e,value) => setPage(value)}
          color='primary'
        />
      </Stack>
    </Container>
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

export default CoursesPage;