import gql from "graphql-tag";

// QUERIES
export const FETCH_COURSES = gql`
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

export const FETCH_COURSE_DETAILS = gql`
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

// MUTATIONS
export const CREATE_COURSEORDER_MUTATION = gql`
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

export const LOGIN_USER_MUTATION = gql`
  mutation login($usernameEmail: String!, $password: String){
    login (usernameEmail: $usernameEmail, password: $password){
      username
      email
      about
      token
      role
    }
  }
`

export const REGISTER_MUTATION = gql`
  mutation register($username: String!, $fullName: String!, $email: String!, $password: String!, $confirmPassword: String!){
    register(username: $username, fullName: $fullName, email: $email, password: $password, confirmPassword: $confirmPassword){
      token
    }
  }
`





