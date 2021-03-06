import React from 'react'
import connectToStores from 'alt/utils/connectToStores'
import debounce from '../utils/debounce'
import hostsStore from '../stores/hostsStore'
import hostsActions from '../actions/hostsActions'
import HostInfo from '../components/HostInfo'

// InfoHandler Component
const InfoHandler = React.createClass({

  propTypes: {
    connected: React.PropTypes.bool,
    hostInfoLoading: React.PropTypes.bool,
    hostInfo: React.PropTypes.object
  },

  statics: {
    getStores () {
      return [hostsStore]
    },
    getPropsFromStores () {
      return Object.assign(hostsStore.getState())
    }
  },

  componentDidMount () {
    if (this.props.connected) {
      hostsActions.fetchHostInfo()
    }
    this.refreshInterval = setInterval(() => this.fetchHostInfo(true), 1000)
  },

  componentWillUnmount () {
    clearInterval(this.refreshInterval)
  },

  componentWillReceiveProps (nextProps) {
    // Connected to a new server.
    if (this.props.connected !== nextProps.connected) {
      this.fetchHostInfo()
    }
  },

  @debounce(250)
  fetchHostInfo (isRefresh) {
    hostsActions.fetchHostInfo(isRefresh)
  },

  render () {
    return (
      <div className='info'>
        {(!this.props.hostInfo || this.props.hostInfoLoading) ?
          <p>Loading Info</p>
        :/*else*/
          <HostInfo {...this.props}/>
        }
      </div>
    )
  }
})

export default connectToStores(InfoHandler)
