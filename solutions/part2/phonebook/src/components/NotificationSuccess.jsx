const NotificationSuccess = ({ message }) => {
  const style = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (message === null) {
    return null;
  }

  return <div style={style}>{message}</div>;
};

export default NotificationSuccess;
