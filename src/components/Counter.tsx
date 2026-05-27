import { Box, Flex, Text } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCounter } from '../hooks/useCounter'

export function Counter() {
  const { count } = useCounter()

  return (
    <Box textAlign="center">
      <Text
        fontSize="sm"
        fontWeight="500"
        letterSpacing="0.08em"
        textTransform="uppercase"
        color="brand.slate"
        mb={4}
      >
        Current count
      </Text>

      <Flex
        align="center"
        justify="center"
        h="120px"
        overflow="hidden"
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={count}
            initial={{ y: -32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 32, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{
              display: 'inline-block',
              fontSize: '96px',
              fontWeight: 600,
              lineHeight: 1,
              color: '#404254',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {count}
          </motion.span>
        </AnimatePresence>
      </Flex>
    </Box>
  )
}
