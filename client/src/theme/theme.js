import { extendTheme } from '@chakra-ui/react'

const extTheme = extendTheme({
  styles: {
    global: {
      body: {
        minHeight: '100vh',
        backgroundColor: '#121212',
        color: '#e1e9f7',
        margin: 0,
      },
    },
  },
  colors: {
    primary: {
      300: '#BA68C8',
    },
  },
});

export default extTheme;