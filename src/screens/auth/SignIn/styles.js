import { StyleSheet } from 'react-native'
import { theme } from './../../../constants/colors'
import { getSize } from './../../../constants/constant'

const styles = StyleSheet.create({
  safearea: { backgroundColor: theme.colors.white },
  container: {
    backgroundColor: theme.colors.primary,
    // backgroundColor: 'red',
    padding: 15,
    justifyContent: 'center',
    height: '100%',
  },
  childContainer: {
    // shadowColor: theme.colors.darkShalow,
    // shadowOffset: {width: 0, height: 0},
    // shadowOpacity: 0.3,
    borderColor: 'lightgray',
    borderWidth: 0.2,
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  title: {
    color: theme.colors.textGray,
    fontWeight: '400',
    paddingHorizontal: 10,
    fontSize: getSize(16),
  },
  inputField: {
    borderColor: 'black',
    borderWidth: 0.2,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    marginTop: 10,
    height: 40,
    fontSize: getSize(16),
  },
  loginButton: {
    backgroundColor: theme.colors.blue,
    height: 40,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginStart: 10,
  },
  buttonText: { color: theme.colors.white, fontSize: getSize(16) },
  buttonTextBold: {
    color: theme.colors.blue,
    fontSize: getSize(16),
    fontWeight: 'bold',
    marginStart: 30,
  },
  headerTitle: { fontSize: 48, fontWeight: '600', marginBottom: 30 },
  socialContainer: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginBottom: 30,
  },
  socialTouchable: {
    borderRadius: 13,
    borderColor: 'lightgray',
    borderWidth: 0.2,
    height: 30,
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
    // shadowColor: theme.colors.darkShalow,
    // shadowOffset: { width: 0, height: 0.8 },
    // shadowOpacity: 0.4,
    marginEnd: 12,
  },
  socialIcons: { width: 22, height: 22, resizeMode: 'contain' },
  buttonContainer: { flexDirection: 'row', alignItems: 'center' },
})
export default styles
