import React from 'react'

const NotificationMsg = ({ notificationMsg }) => {
  const bannerStyle = {
    backgroundColor: '#d3d3d3',
    width: '50%',
    fontSize: '30px',
  }
  return <div style={bannerStyle}>{notificationMsg}</div>
}

export default NotificationMsg
