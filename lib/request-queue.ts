type QueueItem = {
  id: string
  fn: () => Promise<any>
  resolve: (value: any) => void
  reject: (error: any) => void
  retries: number
  maxRetries: number
}

class RequestQueue {
  private queue: QueueItem[] = []
  private processing: boolean = false
  private requestsPerSecond: number = 5
  private lastRequestTime: number = 0
  private concurrentRequests: number = 0
  private maxConcurrent: number = 3
  private serviceName: string
  private circuitBreaker: any

  constructor(requestsPerSecond: number = 5, maxConcurrent: number = 3, serviceName: string, circuitBreaker: any) {
    this.requestsPerSecond = requestsPerSecond
    this.maxConcurrent = maxConcurrent
    this.serviceName = serviceName
    this.circuitBreaker = circuitBreaker
  }

  async add<T>(fn: () => Promise<T>, maxRetries: number = 3): Promise<T> {
    return new Promise((resolve, reject) => {
      const id = `${Date.now()}-${Math.random()}`
      this.queue.push({
        id,
        fn,
        resolve,
        reject,
        retries: 0,
        maxRetries,
      })
      this.processQueue()
    })
  }

  private async processQueue() {
    if (this.processing || this.queue.length === 0) return
    if (this.concurrentRequests >= this.maxConcurrent) return

    this.processing = true

    while (this.queue.length > 0 && this.concurrentRequests < this.maxConcurrent) {
      const item = this.queue.shift()!
      this.concurrentRequests++
      
      this.processItem(item).finally(() => {
        this.concurrentRequests--
        if (this.queue.length > 0) {
          this.processing = false
          this.processQueue()
        }
      })
    }

    this.processing = false
  }

  private async processItem(item: QueueItem) {
    // Rate limiting: wait if needed
    const now = Date.now()
    const timeSinceLastRequest = now - this.lastRequestTime
    const minInterval = 1000 / this.requestsPerSecond
    
    if (timeSinceLastRequest < minInterval) {
      await new Promise(resolve => setTimeout(resolve, minInterval - timeSinceLastRequest))
    }

    const startTime = Date.now()

    try {
      this.lastRequestTime = Date.now()
      
      const result = await this.circuitBreaker.execute(item.fn)
      
      const responseTime = Date.now() - startTime
      
      aiRouter.recordRequest(this.serviceName, true, responseTime)
      
      item.resolve(result)
    } catch (error: any) {
      const responseTime = Date.now() - startTime
      
      aiRouter.recordRequest(this.serviceName, false, responseTime)
      
      // Retry logic with exponential backoff
      if (item.retries < item.maxRetries) {
        console.log(`[v0] ${this.serviceName} request failed, retrying (${item.retries + 1}/${item.maxRetries})...`)
        item.retries++
        const backoffTime = Math.min(Math.pow(2, item.retries) * 1000, 10000) // Max 10s
        await new Promise(resolve => setTimeout(resolve, backoffTime))
        this.queue.unshift(item) // Add back to front of queue
      } else {
        console.error(`[v0] ${this.serviceName} request failed after ${item.maxRetries} retries:`, error.message)
        item.reject(error)
      }
    }
  }

  getQueueLength(): number {
    return this.queue.length
  }

  getConcurrentRequests(): number {
    return this.concurrentRequests
  }
}

import { oneInchCircuit, jupiterCircuit, moralisCircuit, claudeCircuit } from './circuit-breaker'
import { aiRouter } from './ai-router'

export const oneInchQueue = new RequestQueue(5, 3, '1inch', oneInchCircuit)
export const jupiterQueue = new RequestQueue(10, 5, 'Jupiter', jupiterCircuit)
export const moralisQueue = new RequestQueue(5, 3, 'Moralis', moralisCircuit)
export const claudeQueue = new RequestQueue(2, 2, 'Claude', claudeCircuit)
