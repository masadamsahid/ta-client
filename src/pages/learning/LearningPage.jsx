import React, {useState} from 'react';
import {Link, Navigate, useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {
  Accordion, AccordionDetails, AccordionSummary,
  AppBar, Avatar,
  Box,
  Container, Divider, LinearProgress,
  List,
  ListItem,
  ListItemAvatar, ListItemButton, ListItemText,
  Stack,
  styled,
  Toolbar,
  Typography
} from "@mui/material";

import {FETCH_COURSE_DETAILS} from "../../utils/apollo";
import {Article, ExpandMore, Movie} from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import {useSelector} from "react-redux";

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'start'
})

const LearningPage = () => {
  const {courseCode, orderNo} = useParams();
  const {selfUser} = useSelector(store => store.auth)

  const {loading, refecth, data: {getCourse: course = {}} = {}} = useQuery(FETCH_COURSE_DETAILS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      courseCode
    },
  });
  console.log(loading, refecth, course);

  // const [selectedTopicOrderNo, setSelectedTopicOrderNo] = useState(parseInt(orderNo))
  const [expandBody, setExpandBody] = useState(true);

  function handleListItemClick() {
    setExpandBody(true);
  }

  if (course){
    if (selfUser?.role !== 'admin' && selfUser?.username !== course?.tutor?.username){
      if (!course?.courseOrder?.courseAccess){
        return <Navigate to='/'/>
      }
    }
  }

  if (!selfUser) return <Navigate to='/login'/>

  return (
    <>
      <AppBar position='static' color='white'>
        <StyledToolbar>
          <Link to='/' className='text-link'>
            <Typography variant='h6' color='black' noWrap xs={{flexGrow: 1}} fontWeight={700}>
              GAMADEMY
            </Typography>
          </Link>
        </StyledToolbar>
      </AppBar>
      {loading ? (
        <Stack mx='auto' justifyContent='center' width='60%' height='70vh'>
          <Typography variant='h4' mb={4} align='center'>
            Loading
          </Typography>
          <LinearProgress/>
        </Stack>
      ) : (
        <Box
          width='100%'
          display='flex'
          alignItems='center'
          overflow='auto'
        >
          <Stack
            width='20%'
            height='90vh'
            sx={{overflowY: 'auto', boxShadow: '0 4px 8px #000', bgcolor: 'rgba(255,255,255,.2)'}}
            justifyContent='start'
          >
            <List>
              {course?.topics?.map((topic) => (
                <>
                  <ListItemButton
                    key={topic.id}
                    onClick={handleListItemClick}
                    as={Link}
                    to={`/learning/${courseCode}/${topic.orderNo}`}
                    className='text-link'
                  >
                    <ListItemAvatar>
                      <Avatar sx={{bgcolor: 'rgba(0,0,0,0.4)'}} variant='rounded'>
                        {course?.topics?.videoId ? <Movie/> : <Article/>}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`Topic - ${topic.orderNo}`}
                      secondary={topic.topicTitle}
                    />
                  </ListItemButton>
                  <Divider key={`${topic.id}-${topic.orderNo}`}/>
                </>
              ))}
            </List>
          </Stack>
          <Box width='80%' height='90vh' overflow='auto' alignContent='center'>
            <Box display='flex' justifyContent='center'>
              <iframe
                style={{margin: "2em 0", borderRadius: '10px'}}
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${course?.topics?.filter(t => t.orderNo === parseInt(orderNo))[0]?.videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>
            </Box>
            {course?.topics?.filter(topic => topic.orderNo === parseInt(orderNo))[0]?.body && (
              <Box display='flex' justifyContent='center'>
                <Accordion sx={{width: '90%'}} expanded={expandBody} onChange={() => setExpandBody(!expandBody)}>
                  <AccordionSummary expandIcon={<ExpandMore/>}>
                    <Typography variant='h6' fontWeight={700}>
                      {expandBody ? '' : 'Modul'}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ReactMarkdown>
                      {course?.topics?.filter(topic => topic.orderNo === parseInt(orderNo))[0]?.body}
                    </ReactMarkdown>
                  </AccordionDetails>
                </Accordion>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default LearningPage;