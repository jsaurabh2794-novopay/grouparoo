import { Button } from '@ui-kitten/components'
import React, { Fragment, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { LocalizationContext } from '../../../../translation/Translation'
const UploadOptionBottom = ({ onOpoenCamera, onSelectFile, onCancel }) => {
  const { translations } = useContext(LocalizationContext)
  return (
    <>
      <View style={styles.container}>
        {onOpoenCamera && (
          <Button
            style={styles.button}
            appearance='ghost'
            status='info'
            size='large'
            onPress={onOpoenCamera}
          >
            {translations['upload.option.openCamera']}
          </Button>
        )}
        {onSelectFile && (
          <Button
            style={styles.button}
            appearance='ghost'
            status='info'
            size='large'
            onPress={onSelectFile}
          >
            {translations['upload.option.selectFromFile']}
          </Button>
        )}
        {onCancel && (
          <Button style={styles.button} appearance='outline' onPress={onCancel}>
            {translations['file.cancel']}
          </Button>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-end'
  },
  button: {
    margin: 5
  }
})
export default UploadOptionBottom