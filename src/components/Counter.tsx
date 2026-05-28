import { Box, Flex, Text } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCounter } from '../hooks/useCounter'

export function Counter() {
  const { count } = useCounter()

  return (
    <Box textAlign="center" w="full">
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
        <motion.div
          animate={{ color: count < 0 ? '#ff3337' : '#404254' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{ display: 'inline-block' }}
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
                color: 'inherit',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {count}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </Flex>
    </Box>
  )
}
