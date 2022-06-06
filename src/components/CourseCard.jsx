import React, {useState} from 'react';
import {Avatar, Button, Card, CardActions, CardContent, CardMedia, Chip, Tooltip, Typography} from "@mui/material";

const DEFAULT_THUMBNAIL = 'https://res.cloudinary.com/grand-canyon-university/image/fetch/w_750,h_564,c_fill,g_faces,q_auto/https://www.gcu.edu/sites/default/files/2020-09/programming.jpg'

const CourseCard = ({course}) => {
  const [tutorChipHover,setTutorChipHover] = useState(false);
  return (
    <Card sx={{height:'100%', display:'flex', flexDirection:'column'}}>
      <CardMedia
        component='img'
        height='140px'
        image={course?.thumbnailImg || DEFAULT_THUMBNAIL}
      />
      <CardContent sx={{flexGrow:1}}>
        <Tooltip
          arrow
          followCursor
          placement='top-start'
          title={course.title}
        >
          <Typography variant="h6" component="div">
            {course.title.slice(0, 24)}
          </Typography>
        </Tooltip>
      </CardContent>
      <CardActions sx={{justifyContent: "space-between"}}>
        <Chip
          color='warning'
          variant={tutorChipHover ? 'filled' : 'outlined'}
          size='small'
          label={course.tutor.username}
          avatar={<Avatar children={course.tutor.username[0]} color='primary'/>}
          onMouseEnter={()=>setTutorChipHover(true)}
          onMouseLeave={()=>setTutorChipHover(false)}
        />
        <Button size="small" sx={{textTransform:'none'}} disableElevation>
          Lihat Kelas
        </Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;