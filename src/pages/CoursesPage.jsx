import React, {useState} from 'react';
import {Container, Grid, Pagination, Stack, Typography} from "@mui/material";
import {useQuery} from "@apollo/client";
import gql from "graphql-tag";
import CourseCard from "../components/CourseCard";

const CoursesPage = () => {

  const [page,setPage] = useState(1);
  const [courses,setCourses] = useState([]);

  const {loading, data: {getCourses: {data,count} = {} } = {} } = useQuery(FETCH_5_LATEST_COURSE,{
    variables: {
      page: page,
      pageSize: 8,
    }
  })
  console.log(count, 'course:\n', courses);
  console.log(loading, data);

  return (
    <Container maxWidth="xl" sx={{minHeight:'85vh', display:'flex', justifyContent: 'center'}}>
      <Stack alignItems='center' width='100%'>
        <Typography variant='h3' fontWeight={300} mt={4}>
          Sambut skill masa depanmu!
        </Typography>

        <Grid
          container
          columns={10}
          gap={2}
          justifyContent="center"
          mx='auto'
          mt={3}
          mb={3}
        >
          {data?.map((course) => (
            <Grid item xs={12} sm={2} key={course.id}>
              <CourseCard course={course}/>
            </Grid>
          ))}
        </Grid>

        <Pagination
          count={Math.ceil(count/10)}
          onChange={(e,value) => setPage(value)}
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