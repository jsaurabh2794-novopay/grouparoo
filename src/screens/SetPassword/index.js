import React, { useContext } from 'react'
import { View } from 'react-native'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  Button,
  Input,
  Text,
  StyleService,
  useStyleSheet,
  Spinner
} from '@ui-kitten/components'
import ScreenTitle from '../components/ScreenTitle'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { LocalizationContext } from '../../components/Translation'
import styleConstants from '../styleConstants'

const registerUser = async (dispatch, { password, formData }) => {
  const registerResoponse = await dispatch.authentication.registerOrUpdateUser({
    formData,
    password
  })
  return registerResoponse
}

const SetPassword = ({ navigation, route }) => {
  const { formData } = route.params
  const dispatch = useDispatch()
  const createAccount = useRequest(registerUser, {
    manual: true
  })
  const [userPassword, setUserPassword] = React.useState()
  const [disabled, setDisabled] = React.useState(false)
  const { translations } = useContext(LocalizationContext)
  const title = route.params?.title || translations['auth.Password']

  const styles = useStyleSheet(themedStyles)
  const onSignInButtonPress = async () => {
    setDisabled(true)
    await createAccount.run(dispatch, {
      password: userPassword,
      formData
    })
    setDisabled(false)
  }
  const loadingIndicator = props => {
    if (!createAccount.loading) {
      return null
    }
    return (
      <View style={[props.style, styles.indicator]}>
        <Spinner size='small' status='basic' />
      </View>
    )
  }
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <ScreenTitle title={title} description={translations['auth.setPassword.desc']} />
          <Input
            style={styles.passwordInput}
            secureTextEntry
            placeholder={translations['form.password']}
            label={translations['form.password']}
            value={userPassword}
            caption={() => (<Text appearance='hint' style={styles.captionText}>{translations['auth.password.criteria']}</Text>)}
            size='large'
            onChangeText={setUserPassword}
          />
        </View>
        <View style={styles.bottomButtonContainer}>
          <Button
            status='primary'
            style={styles.registerButton}
            onPress={onSignInButtonPress}
            accessoryRight={loadingIndicator}
            disabled={disabled}
          >
            {translations['auth.signInButton']}
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 16,
    justifyContent: 'space-between'
  },
  registerButton: {
    marginTop: 16,
    marginBottom: 0
  },
  content: {
    ...styleConstants.content
  },
  formContainer: {
    flex: 1,
    marginTop: 32
  },
  passwordInput: {
    marginTop: 16
  },
  captionText: {
    fontSize: 12,
    fontWeight: '400'
  },
  indicator: {
    alignItems: 'center'
  },
  bottomButtonContainer: {
    paddingTop: 32,
    justifyContent: 'flex-end'
  }
})

export default SetPassword