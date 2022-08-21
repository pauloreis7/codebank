import { extendTheme, theme as chakraTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Lexend, system-ui, sans-serif',
    mono: 'Menlo, monospace'
  },
  colors: {
    gray: {
      ...chakraTheme.colors.gray,
      300: '#e1e1e6',
      600: '#29292e',
      700: '#202024',
      800: '#121214'
    }
  },
  styles: {
    global: {
      body: {
        bg: 'gray.800',
        color: 'gray.50'
      }
    }
  }
})
