import React, { useContext } from 'react'
import { View } from 'react-native'
import { StyleService, Text, useStyleSheet } from '@ui-kitten/components'
import { LocalizationContext } from '../../../../translation/Translation'
const TitleField = ({ title, hasErrors, required }) => {
  const styles = useStyleSheet(themedStyles)
  const { translations } = useContext(LocalizationContext)
  return (
    <View style={styles.titleContainer}>
      <Text category='label' style={styles.textStyle}>
        {title}{required ? '' : translations['forms.optional']}
      </Text>
      {/* {hasErrors === true
        ? (
          <Text category='p1' appearance='default' status='danger'>
            {translations['form.required']}
          </Text>
          )
        : null} */}
    </View>
  )
}

const themedStyles = StyleService.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 4,
    color: 'color-basic-600'
  },
  textStyle: {
    color: 'color-basic-600'
  }
})

export default TitleField