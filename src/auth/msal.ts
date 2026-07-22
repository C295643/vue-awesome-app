import { PublicClientApplication, EventType, type AuthenticationResult } from '@azure/msal-browser'
import { msalConfig } from './msalConfig'

export const msalInstance = new PublicClientApplication(msalConfig)

export async function initializeMsal() {
  await msalInstance.initialize()

  const response = await msalInstance.handleRedirectPromise()
  if (response?.account) {
    msalInstance.setActiveAccount(response.account)
  } else if (!msalInstance.getActiveAccount()) {
    const [firstAccount] = msalInstance.getAllAccounts()
    if (firstAccount) {
      msalInstance.setActiveAccount(firstAccount)
    }
  }

  msalInstance.addEventCallback((event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const result = event.payload as AuthenticationResult
      if (result.account) {
        msalInstance.setActiveAccount(result.account)
      }
    }
  })
}
