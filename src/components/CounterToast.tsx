import { Box, Flex, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'

interface CounterToastProps {
  title: string
  description: string
}

function CheckCircleIcon() {
  return (
    <Box as="span" flexShrink={0} display="inline-flex">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="#74C898" strokeWidth="1.5" />
      <path
        d="M8.5 12.5l2.5 2.5 4.5-4.5"
        stroke="#74C898"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    </Box>
  )
}

export function CounterToast({ title, description }: CounterToastProps) {
  return (
    <motion.div
      initial={{ y: 16, opacity: 0, scale: 0.96 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Outer box provides the gradient border via background + padding */}
      <Box
        position="relative"
        borderRadius="8px"
        p="1px"
        background={`
          radial-gradient(53.57% 282.15% at 2.14% 50%, rgba(116, 200, 152, 0.65) 0%, rgba(116, 200, 152, 0.1) 100%),
          #6F7076
        `}
        boxShadow="0px 0px 0px 1px rgba(40, 41, 50, 0.04), 0px 2px 2px -1px rgba(40, 41, 50, 0.04), 0px 4px 4px -2px rgba(40, 41, 50, 0.04), 0px 8px 8px -4px rgba(40, 41, 50, 0.06), 0px 16px 32px rgba(40, 41, 50, 0.06)"
      >
        {/* Inner box is the actual toast surface */}
        <Flex
          direction="row"
          align="center"
          gap="8px"
          px="20px"
          pl="16px"
          py="12px"
          borderRadius="7px"
          background="radial-gradient(53.57% 282.15% at 2.14% 50%, rgba(116, 200, 152, 0.15) 0%, rgba(116, 200, 152, 0.03) 100%), #46474F"
          minW="240px"
        >
          <CheckCircleIcon />

          <Flex direction="column" gap="2px">
            <Text
              fontFamily="'Inter', sans-serif"
              fontWeight="600"
              fontSize="14px"
              lineHeight="16px"
              color="#FFFFFF"
            >
              {title}
            </Text>
            <Text
              fontFamily="'Inter', sans-serif"
              fontWeight="500"
              fontSize="14px"
              lineHeight="16px"
              color="#FFFFFF"
            >
              {description}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </motion.div>
  )
}
