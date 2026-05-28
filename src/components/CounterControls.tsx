import { useCallback, useEffect, useRef } from 'react'
import { Button, Flex, Text, Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useCounter } from '../hooks/useCounter'
import { toaster } from '../toaster'
const tapAnimation = {
  whileTap: { scale: 0.94 },
  transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
}

interface KeyHintProps {
  label: string
}

function KeyHint({ label }: KeyHintProps) {
  return (
    <Text
      as="kbd"
      fontSize="10px"
      fontFamily="mono"
      color="brand.slate"
      bg="brand.tint"
      border="1px solid"
      borderColor="#cccccc"
      borderRadius="4px"
      px="5px"
      py="2px"
      lineHeight="1"
      userSelect="none"
    >
      {label}
    </Text>
  )
}

export function CounterControls() {
  const { count, increment, decrement, reset } = useCounter()

  // Mirror count into a ref so callbacks always read the latest value
  // without needing to be recreated on every count change.
  const countRef = useRef(count)
  useEffect(() => {
    countRef.current = count
  }, [count])

  // Track the active toast ID to deduplicate rapid clicks
  const toastIdRef = useRef<string | null>(null)

  const showToast = useCallback((title: string, description: string) => {
    if (toastIdRef.current && toaster.isVisible(toastIdRef.current)) {
      toaster.update(toastIdRef.current, {
        title,
        description,
      })
    } else {
      toastIdRef.current = toaster.create({
        title,
        description,
        duration: 3000,
      })
    }
  }, [])

  const handleIncrement = useCallback(() => {
    increment()
    const next = countRef.current + 1
    showToast('Incremented', `Counter is now ${next}`)
  }, [increment, showToast])

  const handleDecrement = useCallback(() => {
    decrement()
    const next = countRef.current - 1
    showToast('Decremented', `Counter is now ${next}`)
  }, [decrement, showToast])

  const handleReset = useCallback(() => {
    reset()
    showToast('Reset', 'Counter is back to 0')
  }, [reset, showToast])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      if (e.key === '+' || e.key === '=') handleIncrement()
      if (e.key === '-') handleDecrement()
      if (e.key === 'r' || e.key === 'R') handleReset()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleIncrement, handleDecrement, handleReset])

  return (
    <Flex direction="column" align="center" gap={4} w="full">
      {/* Primary action */}
      <Flex direction="column" align="center" gap={2}>
        <motion.div {...tapAnimation}>
          <Button
            size="lg"
            bg="brand.red"
            color="white"
            px={10}
            fontWeight="600"
            fontSize="lg"
            borderRadius="8px"
            _hover={{ bg: '#e02d31' }}
            _focusVisible={{
              outline: '2px solid',
              outlineColor: 'brand.red',
              outlineOffset: '3px',
            }}
            onClick={handleIncrement}
            aria-label={`Increment counter, current value is ${count}`}
          >
            +1
          </Button>
        </motion.div>
        <KeyHint label="+" />
      </Flex>

      {/* Secondary actions */}
      <Flex gap={3}>
        <Flex direction="column" align="center" gap={2}>
          <motion.div {...tapAnimation}>
            <Button
              size="sm"
              variant="outline"
              borderColor="#cccccc"
              color="brand.dark"
              borderRadius="8px"
              fontWeight="500"
              _hover={{ bg: 'brand.tint' }}
              _focusVisible={{
                outline: '2px solid',
                outlineColor: 'brand.purple',
                outlineOffset: '3px',
              }}
              onClick={handleDecrement}
              aria-label={`Decrement counter, current value is ${count}`}
            >
              −1
            </Button>
          </motion.div>
          <KeyHint label="-" />
        </Flex>

        <Flex direction="column" align="center" gap={2}>
          <motion.div {...tapAnimation}>
            <Button
              size="sm"
              variant="ghost"
              color="brand.slate"
              borderRadius="8px"
              fontWeight="500"
              _hover={{ bg: 'brand.tint', color: 'brand.dark' }}
              _focusVisible={{
                outline: '2px solid',
                outlineColor: 'brand.purple',
                outlineOffset: '3px',
              }}
              onClick={handleReset}
              aria-label="Reset counter to zero"
            >
              Reset
            </Button>
          </motion.div>
          <KeyHint label="r" />
        </Flex>
      </Flex>

      <Box mt={1}>
        <Text fontSize="xs" color="brand.neutral" textAlign="center">
          Keyboard shortcuts active
        </Text>
      </Box>
    </Flex>
  )
}
