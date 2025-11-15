// Circuit breaker pattern to prevent cascading failures
type CircuitState = 'CLOSED' | 'OPEN' | 'HALF_OPEN'

interface CircuitBreakerOptions {
  failureThreshold: number // Number of failures before opening circuit
  resetTimeout: number // Time in ms before attempting to close circuit
  monitoringWindow: number // Time window for failure tracking
}

class CircuitBreaker {
  private state: CircuitState = 'CLOSED'
  private failures: number[] = []
  private lastFailureTime: number = 0
  private name: string
  private options: CircuitBreakerOptions

  constructor(name: string, options?: Partial<CircuitBreakerOptions>) {
    this.name = name
    this.options = {
      failureThreshold: options?.failureThreshold || 5,
      resetTimeout: options?.resetTimeout || 60000, // 1 minute
      monitoringWindow: options?.monitoringWindow || 120000, // 2 minutes
    }
  }

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    // Check if circuit is open
    if (this.state === 'OPEN') {
      const timeSinceLastFailure = Date.now() - this.lastFailureTime
      
      if (timeSinceLastFailure >= this.options.resetTimeout) {
        console.log(`[Circuit Breaker: ${this.name}] Transitioning to HALF_OPEN`)
        this.state = 'HALF_OPEN'
      } else {
        throw new Error(`Circuit breaker ${this.name} is OPEN. Service temporarily unavailable.`)
      }
    }

    try {
      const result = await fn()
      
      // Success - close circuit if it was half-open
      if (this.state === 'HALF_OPEN') {
        console.log(`[Circuit Breaker: ${this.name}] Transitioning to CLOSED after successful call`)
        this.state = 'CLOSED'
        this.failures = []
      }
      
      return result
    } catch (error) {
      this.recordFailure()
      throw error
    }
  }

  private recordFailure() {
    const now = Date.now()
    this.lastFailureTime = now
    this.failures.push(now)

    // Remove old failures outside monitoring window
    this.failures = this.failures.filter(
      time => now - time < this.options.monitoringWindow
    )

    // Check if we should open the circuit
    if (this.failures.length >= this.options.failureThreshold) {
      if (this.state !== 'OPEN') {
        console.log(`[Circuit Breaker: ${this.name}] OPENING circuit after ${this.failures.length} failures`)
        this.state = 'OPEN'
      }
    }
  }

  getState(): CircuitState {
    return this.state
  }

  getFailureCount(): number {
    return this.failures.length
  }

  reset() {
    this.state = 'CLOSED'
    this.failures = []
  }
}

// Create circuit breakers for each service
export const oneInchCircuit = new CircuitBreaker('1inch', {
  failureThreshold: 5,
  resetTimeout: 60000,
  monitoringWindow: 120000,
})

export const jupiterCircuit = new CircuitBreaker('Jupiter', {
  failureThreshold: 5,
  resetTimeout: 60000,
  monitoringWindow: 120000,
})

export const moralisCircuit = new CircuitBreaker('Moralis', {
  failureThreshold: 5,
  resetTimeout: 60000,
  monitoringWindow: 120000,
})

export const claudeCircuit = new CircuitBreaker('Claude', {
  failureThreshold: 3,
  resetTimeout: 120000,
  monitoringWindow: 180000,
})
