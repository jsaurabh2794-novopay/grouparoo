import { Button, Card, CheckBox, Modal, Text } from '@ui-kitten/components'
import isEmpty from 'lodash.isempty'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { defaultProps, useFormContext } from '..'

const TermsAndConditionsWidget = (props) => {
  const [isConsentValid, setisConsentValid] = useState(true)
  const [consent, setConsent] = useState(props.value === 'Yes')
  const { theme } = useFormContext()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (props.required && (!isEmpty(props.rawErrors) || !props.value)) {
      setisConsentValid(false)
    } else {
      setisConsentValid(true)
      props.onChange('Yes')
    }
  }, [props.rawErrors, props.value, props.required])

  return (
    <>
      <View style={styles.conatiner}>
        <CheckBox
          checked={consent}
          onChange={(nextChecked) => {
            setConsent((prev) => {
              if (!prev) {
                props.onChange('Yes')
              } else {
                props.onChange(undefined)
              }
              return nextChecked
            })
          }}
        >
          {(evaProps) => (
            <Text {...evaProps} style={{ marginLeft: 5, marginRight: 4 }}>
              I agree to
            </Text>
          )}
        </CheckBox>
        <TouchableOpacity
          onPress={() => {
            setVisible(true)
          }}
        >
          <Text style={styles.termsAndConditions}>Terms & Condition*.</Text>
        </TouchableOpacity>
      </View>
      {/* Term & Condition Model */}
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled>
          <View style={styles.container}>
            <Text style={styles.title}>Terms and conditions</Text>
            <ScrollView
              style={styles.tcContainer}
            >
              <Text style={styles.tcP}>
                Welcome to our website. If you continue to browse and use this
                website, you are agreeing to comply with and be bound by the
                following terms and conditions of use, which together with our
                privacy policy govern [business name]’s relationship with you in
                relation to this website. If you disagree with any part of these
                terms and conditions, please do not use our website.
              </Text>
              <Text style={styles.tcP}>
                The term ‘Novopay’ or ‘us’ or ‘we’ refers to the owner
                of the website whose registered office is [address]. Our company
                registration number is [company registration number and place of
                registration]. The term ‘you’ refers to the user or viewer of
                our website.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'} The content of the pages of this website is for your
                general information and use only. It is subject to change
                without notice.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'} This website uses cookies to monitor browsing
                preferences. If you do allow cookies to be used, the following
                personal information may be stored by us for use by third
                parties: [insert list of information].
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'} Neither we nor any third parties provide any warranty
                or guarantee as to the accuracy, timeliness, performance,
                completeness or suitability of the information and materials
                found or offered on this website for any particular purpose. You
                acknowledge that such information and materials may contain
                inaccuracies or errors and we expressly exclude liability for
                any such inaccuracies or errors to the fullest extent permitted
                by law.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'} Your use of any information or materials on this
                website is entirely at your own risk, for which we shall not be
                liable. It shall be your own responsibility to ensure that any
                products, services or information available through this website
                meet your specific requirements.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'} This website contains material which is owned by or
                licensed to us. This material includes, but is not limited to,
                the design, layout, look, appearance and graphics. Reproduction
                is prohibited other than in accordance with the copyright
                notice, which forms part of these terms and conditions.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'} All trademarks reproduced in this website, which are
                not the property of, or licensed to the operator, are
                acknowledged on the website. Unauthorised use of this website
                may give rise to a claim for damages and/or be a criminal
                offence.
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'} From time to time, this website may also include
                links to other websites. These links are provided for your
                convenience to provide further information. They do not signify
                that we endorse the website(s). We have no responsibility for
                the content of the linked website(s).
              </Text>
              <Text style={styles.tcL}>
                {'\u2022'} Your use of this website and any dispute arising out
                of such use of the website is subject to the laws of England,
                Northern Ireland, Scotland and Wales.
              </Text>
              <Text style={styles.tcP}>
                The use of this website is subject to the following terms of use
              </Text>
            </ScrollView>
          </View>
          <Button onPress={() => setVisible(false)}>CLOSE</Button>
        </Card>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  conatiner: {
    marginTop: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  title: {
    fontSize: 22,
    alignSelf: 'center'
  },
  termsAndConditions: {
    marginTop: 2,
    fontWeight: 'bold'
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  tcP: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12
  },
  tcP: {
    marginTop: 10,
    fontSize: 12
  },
  tcL: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12
  },
  tcContainer: {
    marginTop: 15,
    marginBottom: 15
  }
})
export default TermsAndConditionsWidget