import { type NextRequest, NextResponse } from "next/server"
import { aiRouter } from "@/lib/ai-router"
import { oneInchCircuit, jupiterCircuit, moralisCircuit, claudeCircuit } from "@/lib/circuit-breaker"
import { oneInchQueue, jupiterQueue, moralisQueue, claudeQueue } from "@/lib/request-queue"

export async function GET(request: NextRequest) {
  const healthReport = aiRouter.getHealthReport()
  
  const circuitStates = {
    '1inch': {
      state: oneInchCircuit.getState(),
      failures: oneInchCircuit.getFailureCount(),
      queueLength: oneInchQueue.getQueueLength(),
      concurrent: oneInchQueue.getConcurrentRequests(),
    },
    'Jupiter': {
      state: jupiterCircuit.getState(),
      failures: jupiterCircuit.getFailureCount(),
      queueLength: jupiterQueue.getQueueLength(),
      concurrent: jupiterQueue.getConcurrentRequests(),
    },
    'Moralis': {
      state: moralisCircuit.getState(),
      failures: moralisCircuit.getFailureCount(),
      queueLength: moralisQueue.getQueueLength(),
      concurrent: moralisQueue.getConcurrentRequests(),
    },
    'Claude': {
      state: claudeCircuit.getState(),
      failures: claudeCircuit.getFailureCount(),
      queueLength: claudeQueue.getQueueLength(),
      concurrent: claudeQueue.getConcurrentRequests(),
    },
  }

  const overallHealth = Object.values(healthReport).every(m => m.successRate > 0.7)

  return NextResponse.json({
    status: overallHealth ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    services: healthReport,
    circuits: circuitStates,
    message: 'Locust Protocol Health Status - Real-time monitoring of all API services'
  }, {
    status: overallHealth ? 200 : 503,
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  })
}
