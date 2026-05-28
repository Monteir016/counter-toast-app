import { Box, Flex, Separator, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Toaster } from '@chakra-ui/react'
import { CounterProvider } from './context/CounterProvider'
import { Counter } from './components/Counter'
import { CounterControls } from './components/CounterControls'
import { CounterToast } from './components/CounterToast'
import { toaster } from './toaster'
import yendouLogo from './assets/yendou.png'

function YendouLogo() {
  return (
    <img
      src={yendouLogo}
      alt="Yendou"
      height={32}
      style={{ height: '32px', width: 'auto' }}
    />
  )
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 280, damping: 28 },
  },
}

const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' as const },
  },
}

function App() {
  return (
    <CounterProvider>
      <Flex
        direction="column"
        align="center"
        justify="center"
        minH="100svh"
        bg="#f4f4f4"
        px={4}
        gap={8}
      >
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <YendouLogo />
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <Box
            bg="white"
            borderRadius="16px"
            border="1px solid"
            borderColor="#e8e8e8"
            boxShadow="0px 4px 6px -1px rgba(64, 66, 84, 0.06), 0px 12px 32px -4px rgba(64, 66, 84, 0.08)"
            p={10}
            w="full"
            maxW="400px"
          >
            <Flex direction="column" align="center" gap={8}>
              <Counter />

              <Separator borderColor="#e8e8e8" />

              <CounterControls />
            </Flex>
          </Box>
        </motion.div>

        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          style={{ transitionDelay: '0.15s' }}
        >
          <Text fontSize="xs" color="#9697a2" textAlign="center">
            Pre-award infrastructure for mid-cap CROs
          </Text>
        </motion.div>
      </Flex>

      <Toaster toaster={toaster}>
        {(toast) => (
          <CounterToast
            title={String(toast.title ?? '')}
            description={String(toast.description ?? '')}
          />
        )}
      </Toaster>
    </CounterProvider>
  )
}

export default App
