import { ref } from 'vue'
import type { AccountInfo } from '@azure/msal-browser'
import { EventType } from '@azure/msal-browser'
import { msalInstance } from './msal'
import { loginRequest } from './msalConfig'

const account = ref<AccountInfo | null>(msalInstance.getActiveAccount())

msalInstance.addEventCallback((event) => {
  if (
    (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) &&
    msalInstance.getActiveAccount()
  ) {
    account.value = msalInstance.getActiveAccount()
  }
  if (event.eventType === EventType.LOGOUT_SUCCESS) {
    account.value = null
  }
})

export function useAuth() {
  const login = () => msalInstance.loginRedirect(loginRequest)
  const logout = () => msalInstance.logoutRedirect()

  return { account, login, logout }
}
