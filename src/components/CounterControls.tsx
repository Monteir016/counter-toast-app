import { useCallback, useEffect, useRef } from 'react'
import { Button, Flex, Box, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useCounter } from '../hooks/useCounter'
import { toaster } from '../toaster'

interface ShortcutHintProps {
  keys: string
  label: string
}

function ShortcutHint({ keys, label }: ShortcutHintProps) {
  return (
    <Flex align="center" gap={1}>
      <Box
        as="kbd"
        fontSize="10px"
        fontFamily="mono"
        color="#686a7d"
        border="1px solid #cccccc"
        borderRadius="3px"
        px="5px"
        py="1px"
        lineHeight="1.4"
        userSelect="none"
      >
        {keys}
      </Box>
      <Text fontSize="10px" color="#9697a2">
        {label}
      </Text>
    </Flex>
  )
}

const tapAnimation = {
  whileTap: { scale: 0.94 },
  transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
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
      toaster.update(toastIdRef.current, { title, description })
    } else {
      toastIdRef.current = toaster.create({ title, description, duration: 3000 })
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
    <Flex direction="column" gap={3} w="full">
      {/* Primary action */}
      <motion.div {...tapAnimation} style={{ width: '100%' }}>
        <Button
          w="full"
          size="lg"
          bg="brand.red"
          color="white"
          fontWeight="600"
          fontSize="md"
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

      {/* Secondary actions */}
      <Flex gap={2} w="full">
        <motion.div {...tapAnimation} style={{ flex: 1 }}>
          <Button
            w="full"
            size="md"
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

        <motion.div {...tapAnimation} style={{ flex: 1 }}>
          <Button
            w="full"
            size="md"
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
            onClick={handleReset}
            aria-label="Reset counter to zero"
          >
            Reset
          </Button>
        </motion.div>
      </Flex>

      <Flex justify="center" gap={4} pt={1}>
        <ShortcutHint keys="+" label="increment" />
        <ShortcutHint keys="-" label="decrement" />
        <ShortcutHint keys="r" label="reset" />
      </Flex>
    </Flex>
  )
}
