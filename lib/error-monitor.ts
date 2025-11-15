// AI-Powered Error Monitoring and Auto-Fix System
import { anthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'

interface ErrorLog {
  id: string
  timestamp: number
  endpoint: string
  errorType: string
  message: string
  stack?: string
  requestDetails?: any
  resolved: boolean
  fixAttempted: boolean
  fixSuggestion?: string
}

class ErrorMonitor {
  private errors: Map<string, ErrorLog[]> = new Map()
  private maxErrorsPerEndpoint = 100
  private aiFixEnabled = true

  async logError(endpoint: string, error: Error, requestDetails?: any): Promise<void> {
    const errorLog: ErrorLog = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      endpoint,
      errorType: error.name,
      message: error.message,
      stack: error.stack,
      requestDetails,
      resolved: false,
      fixAttempted: false
    }

    if (!this.errors.has(endpoint)) {
      this.errors.set(endpoint, [])
    }

    const endpointErrors = this.errors.get(endpoint)!
    endpointErrors.push(errorLog)

    if (endpointErrors.length > this.maxErrorsPerEndpoint) {
      endpointErrors.shift()
    }

    const recentSimilarErrors = this.findSimilarErrors(endpoint, error.message, 5)
    
    if (recentSimilarErrors.length >= 3 && this.aiFixEnabled) {
      console.log(`[ERROR-MONITOR] Recurring error detected: ${error.message}`)
      await this.attemptAIFix(errorLog, recentSimilarErrors)
    }
  }

  private findSimilarErrors(endpoint: string, errorMessage: string, minutes: number): ErrorLog[] {
    const endpointErrors = this.errors.get(endpoint) || []
    const cutoffTime = Date.now() - (minutes * 60 * 1000)
    
    return endpointErrors.filter(err => 
      err.timestamp > cutoffTime && 
      err.message.includes(errorMessage.substring(0, 50))
    )
  }

  private async attemptAIFix(error: ErrorLog, similarErrors: ErrorLog[]): Promise<void> {
    if (error.fixAttempted) return

    error.fixAttempted = true

    try {
      const apiKey = process.env.ANTHROPIC_API_KEY
      if (!apiKey) {
        console.log('[ERROR-MONITOR] AI fix disabled: ANTHROPIC_API_KEY not found')
        return
      }

      const errorContext = `
Endpoint: ${error.endpoint}
Error Type: ${error.errorType}
Error Message: ${error.message}
Stack Trace: ${error.stack?.substring(0, 500)}
Request Details: ${JSON.stringify(error.requestDetails, null, 2)}

This error has occurred ${similarErrors.length} times in the last 5 minutes.

Previous occurrences:
${similarErrors.map(e => `- ${new Date(e.timestamp).toISOString()}: ${e.message}`).join('\n')}
`

      const { text } = await generateText({
        model: anthropic('claude-3-5-sonnet-20241022', { apiKey }),
        messages: [
          {
            role: 'user',
            content: `You are an expert debugging AI for a DeFi API platform called Locust Protocol. Analyze this recurring error and provide:

1. Root cause analysis
2. Immediate mitigation steps
3. Code fix suggestions
4. Prevention strategies

Error Context:
${errorContext}

Provide a concise, actionable response focused on fixing the issue.`
          }
        ],
        maxTokens: 1500
      })

      error.fixSuggestion = text
      console.log(`[ERROR-MONITOR] AI Fix Suggestion for ${error.endpoint}:`, text)

      await this.storeFixSuggestion(error)

    } catch (aiError: any) {
      console.error('[ERROR-MONITOR] AI fix generation failed:', aiError.message)
    }
  }

  private async storeFixSuggestion(error: ErrorLog): Promise<void> {
    try {
      const { db } = await import('./database')
      await db.logError({
        endpoint: error.endpoint,
        errorType: error.errorType,
        message: error.message,
        stack: error.stack,
        fixSuggestion: error.fixSuggestion,
        timestamp: error.timestamp
      })
    } catch (dbError) {
      console.error('[ERROR-MONITOR] Failed to store fix suggestion:', dbError)
    }
  }

  getErrorStats(endpoint?: string): any {
    if (endpoint) {
      const errors = this.errors.get(endpoint) || []
      return {
        endpoint,
        totalErrors: errors.length,
        unresolvedErrors: errors.filter(e => !e.resolved).length,
        recentErrors: errors.filter(e => e.timestamp > Date.now() - 3600000).length,
        errors: errors.slice(-10)
      }
    }

    const allStats: any = {}
    this.errors.forEach((errors, endpoint) => {
      allStats[endpoint] = {
        totalErrors: errors.length,
        unresolvedErrors: errors.filter(e => !e.resolved).length,
        recentErrors: errors.filter(e => e.timestamp > Date.now() - 3600000).length
      }
    })

    return allStats
  }

  clearResolvedErrors(endpoint: string): void {
    const errors = this.errors.get(endpoint) || []
    this.errors.set(endpoint, errors.filter(e => !e.resolved))
  }

  markErrorResolved(errorId: string): void {
    this.errors.forEach(errors => {
      const error = errors.find(e => e.id === errorId)
      if (error) {
        error.resolved = true
      }
    })
  }
}

export const errorMonitor = new ErrorMonitor()
