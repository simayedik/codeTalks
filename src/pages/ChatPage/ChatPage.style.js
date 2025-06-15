import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  messageContainer: {
    marginVertical: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    maxWidth: '75%',
  },
  currentUser: {
    backgroundColor: '#016147',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  otherUser: {
    backgroundColor: 'rgb(49, 56, 65)',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    color: 'rgb(214, 212, 212)',
  },
  senderText: {
    fontSize: 12,
    color: 'rgb(113, 140, 111)',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  dateText: {
    textAlign: 'right',
    color: '#a3a2a2',
    fontStyle: 'italic',
    fontSize: 12,
  },
});


export  default styles;