// AI-powered intelligent request routing and load balancing
interface ServiceMetrics {
  name: string
  successRate: number // 0-1
  avgResponseTime: number // ms
  currentLoad: number // 0-1
  lastUpdated: number
  totalRequests: number
  successfulRequests: number
  failedRequests: number
}

class AIRouter {
  private metrics: Map<string, ServiceMetrics> = new Map()
  private requestHistory: Map<string, { success: boolean; responseTime: number; timestamp: number }[]> = new Map()
  private historyLimit: number = 100

  constructor() {
    // Initialize metrics for each service
    this.initializeService('1inch')
    this.initializeService('Jupiter')
    this.initializeService('Moralis')
    this.initializeService('Claude')
  }

  private initializeService(name: string) {
    this.metrics.set(name, {
      name,
      successRate: 1.0,
      avgResponseTime: 0,
      currentLoad: 0,
      lastUpdated: Date.now(),
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
    })
    this.requestHistory.set(name, [])
  }

  // Record request outcome for AI learning
  recordRequest(service: string, success: boolean, responseTime: number) {
    const history = this.requestHistory.get(service) || []
    const metrics = this.metrics.get(service)
    
    if (!metrics) return

    // Add to history
    history.push({ success, responseTime, timestamp: Date.now() })
    
    // Limit history size
    if (history.length > this.historyLimit) {
      history.shift()
    }
    
    this.requestHistory.set(service, history)

    // Update metrics
    metrics.totalRequests++
    if (success) {
      metrics.successfulRequests++
    } else {
      metrics.failedRequests++
    }

    // Calculate success rate from recent history (last 50 requests)
    const recentHistory = history.slice(-50)
    const recentSuccesses = recentHistory.filter(r => r.success).length
    metrics.successRate = recentSuccesses / recentHistory.length

    // Calculate average response time from recent successful requests
    const recentSuccessful = recentHistory.filter(r => r.success)
    if (recentSuccessful.length > 0) {
      metrics.avgResponseTime = recentSuccessful.reduce((sum, r) => sum + r.responseTime, 0) / recentSuccessful.length
    }

    metrics.lastUpdated = Date.now()
    this.metrics.set(service, metrics)

    console.log(`[AI Router] ${service} - Success Rate: ${(metrics.successRate * 100).toFixed(1)}%, Avg Response: ${metrics.avgResponseTime.toFixed(0)}ms`)
  }

  // Update current load for a service
  updateLoad(service: string, load: number) {
    const metrics = this.metrics.get(service)
    if (metrics) {
      metrics.currentLoad = Math.max(0, Math.min(1, load))
      metrics.lastUpdated = Date.now()
      this.metrics.set(service, metrics)
    }
  }

  // AI-powered routing decision
  selectBestService(services: string[], requirementType: 'speed' | 'reliability' | 'balanced' = 'balanced'): string {
    const availableMetrics = services
      .map(name => this.metrics.get(name))
      .filter((m): m is ServiceMetrics => m !== undefined)

    if (availableMetrics.length === 0) {
      return services[0] // Fallback to first service
    }

    // Calculate score for each service based on requirements
    const scoredServices = availableMetrics.map(metrics => {
      let score = 0

      switch (requirementType) {
        case 'speed':
          // Prioritize response time
          score = (1 - metrics.currentLoad) * 0.4 +
                  metrics.successRate * 0.3 +
                  (1 / (metrics.avgResponseTime + 1)) * 0.3
          break
        
        case 'reliability':
          // Prioritize success rate
          score = metrics.successRate * 0.6 +
                  (1 - metrics.currentLoad) * 0.3 +
                  (1 / (metrics.avgResponseTime + 1)) * 0.1
          break
        
        case 'balanced':
        default:
          // Balanced approach
          score = metrics.successRate * 0.4 +
                  (1 - metrics.currentLoad) * 0.3 +
                  (1 / (metrics.avgResponseTime + 1)) * 0.3
          break
      }

      return { name: metrics.name, score, metrics }
    })

    // Sort by score (highest first)
    scoredServices.sort((a, b) => b.score - a.score)

    const selected = scoredServices[0]
    console.log(`[AI Router] Selected ${selected.name} (score: ${selected.score.toFixed(3)})`)
    
    return selected.name
  }

  // Get health report for all services
  getHealthReport(): Record<string, ServiceMetrics> {
    const report: Record<string, ServiceMetrics> = {}
    this.metrics.forEach((metrics, name) => {
      report[name] = { ...metrics }
    })
    return report
  }

  // Check if service is healthy
  isServiceHealthy(service: string): boolean {
    const metrics = this.metrics.get(service)
    if (!metrics) return false
    
    // Service is healthy if success rate > 70% and load < 90%
    return metrics.successRate > 0.7 && metrics.currentLoad < 0.9
  }
}

// Global AI router instance
export const aiRouter = new AIRouter()
