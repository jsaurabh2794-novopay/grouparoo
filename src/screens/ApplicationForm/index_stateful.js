import React from 'react'
import { connect } from 'react-redux'
import store from '../../store'
import isUndefined from 'lodash.isundefined'
import ApplicationFormNative from './ApplicationFormNative'
import apiService from '../../apiService'
import LoadingSpinner from '../components/LoadingSpinner'

class ApplicationForm extends React.PureComponent {
  async componentDidMount () {
    const { currentLoanApplication, activeLoanApplications } = this.props
    if (isUndefined(currentLoanApplication)) {
      // If there is already one active loan application then set it as current
      if (activeLoanApplications.length === 1) {
        await this.props.setCurrentLoanApplication(activeLoanApplications[0])
      } else {
        try {
          console.log('CALLED')
          await this.props.createLoanApplication()
        } catch (err) {
          console.log(err.stack)
          console.log('CANNOT_CREATE_LOAN_APPLICATION_ID')
        }
      }
    }
  }

  render () {
    const { currentLoanApplication, loading } = this.props
    if (loading) {
      return (
        <LoadingSpinner />
      )
    }
    if (!isUndefined(currentLoanApplication)) {
      return (
        <ApplicationFormNative
          currentLoanApplication={currentLoanApplication}
        />
      )
    } else {
      return <LoadingSpinner />
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  const currentLoanApplication = store.select.loanApplications.getCurrentLoanApplication(state)
  const activeLoanApplications = store.select.loanApplications.getActiveLoanApplications(state)
  const loading = state.loading.models.loanApplications || state.loading.models.customer
  return {
    currentLoanApplication,
    activeLoanApplications,
    loading
  }
}

const mapDispatchToProps = (dispatch) => ({
  createLoanApplication: async () => {
    const executionId = await apiService.appApi.loanApplication.createLoanApplicationId.execute()
    const loanApplicationId = await apiService.appApi.loanApplication.createLoanApplicationId.get(executionId)
    dispatch.loanApplications.createLoanApplication({ loanApplicationId })
  },
  setCurrentLoanApplication: (loanApplicationId) => dispatch.laonApplications.setCurrentLoanApplication(loanApplicationId)
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationForm)