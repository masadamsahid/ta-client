import {createTheme} from '@mui/material';
import {grey} from '@mui/material/colors'

export const theme = createTheme({
  palette: {
    white: {
      main: grey[100]
    },
    black: {
      main: grey[900]
    },
    dracula: {
      main: 'rgb(6,15,47)'
    }
  }
})