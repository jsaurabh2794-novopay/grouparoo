/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the UI Kitten customermobileapp
 * https://github.com/akveo/react-native-ui-kitten
 *
 * Documentation: https://akveo.github.io/react-native-ui-kitten/docs
 *
 * @format
 */

import React from 'react'

import { Provider } from 'react-redux'
import { AppearanceProvider } from 'react-native-appearance'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
// import ErrorBoundary from 'react-native-error-boundary'

import { EvaIconsPack } from '@ui-kitten/eva-icons'
import * as eva from '@eva-design/eva'
import RNOtpVerify from 'react-native-otp-verify'
import { useRequest } from 'ahooks'
import customMappingsEva from './src/themes/customMappingsEva.json'
import appTheme from './src/themes/blue600.json'
import MainApp from './src/MainApp'
import { LocalizationProvider } from './src/components/Translation'
import store from './src/store'
import { AppStorage } from './src/services/app-storage.service'
import { checkNotificationPermissions } from './src/services/push.notifications'
const initialSetup = async () => {
  const enabled = await checkNotificationPermissions()
  await AppStorage.toggleFirstTime()
  await AppStorage.togglePermissionRequested()
  await AppStorage.toggleIntroScreen()
  return enabled
}
const App = props => {
  // Check for notification permissions and get the fcm token for the app
  const { loading, data } = useRequest(() => initialSetup())
  // This will print the message hash to be appended.
  // see https://developers.google.com/identity/sms-retriever/verify
  RNOtpVerify.getHash()
    .then(hash => {
      console.log('Use this hash to construct otp message', hash)
      console.log('A sample message -')
      console.log(`
      <#> Dear User,
      1091 is your OTP for logging into NovoLaon. (Remaining Time: 5 minutes and 0 seconds)
       ${hash[0]}
    `)
    })
    .catch(error => console.log(error))
  return (
    <>
      <IconRegistry icons={[EvaIconsPack]} />
      <AppearanceProvider>
        <Provider store={store}>
          <ApplicationProvider
            {...eva}
            theme={{ ...eva.light, ...appTheme }}
            customMapping={customMappingsEva}
          >
            <SafeAreaProvider>
              <LocalizationProvider>
                <MainApp {...props} notificationsEnabled={data} loading={loading} />
              </LocalizationProvider>
            </SafeAreaProvider>
          </ApplicationProvider>
        </Provider>
      </AppearanceProvider>
    </>
  )
}

export default App