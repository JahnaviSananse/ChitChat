import { StyleSheet } from 'react-native'
import { theme } from '../../constants/colors'
import { getSize } from '../../constants/constant'

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    height: '100%',
    width: '100%',
    // alignItems: 'center',
  },
  itemContainer: {
    height: 70,
    borderColor: theme.colors.gray,
    // borderWidth: 0.2,
    marginBottom: 10,
    flexDirection: 'row',
    shadowColor: theme.colors.darkShalow,
    shadowOffset: { width: 0, height: 0 },
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomColor: theme.colors.gray,
    borderBottomWidth: 1,
  },
  input: {
    padding: 10,
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: 8,
    height: 44,
    marginBottom: 20,
  },
  headerTitleText: { fontSize: 22, color: theme.colors.white },
  itemIcon: { width: 60, height: 60, borderRadius: 50 },
  itemDetail: { width: '80%', marginHorizontal: 10 },
  itemTitle: { fontSize: getSize(16), fontWeight: '500' },
  itemDescription: {
    color: theme.colors.blue,
    fontSize: getSize(12),
    marginEnd: 10,
  },
  itemDescriptionContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    marginTop: 5,
  },
  itemTagsContainer: { flexDirection: 'row' },
  itemTag: {
    fontSize: getSize(12),
    color: theme.colors.textGray,
    marginEnd: 10,
  },
  headerIcon: { width: 24, height: 24 },
  headerIconMed: { width: 20, height: 20, marginStart: 15 },
  closeIcon: { width: 20, height: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  contactTitle: { fontWeight: 'bold', fontSize: 20 },
  childContainer: { paddingTop: 20 },
  chooseContainer: {
    borderColor: theme.colors.blue,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
  },
  chooseText: { fontSize: 16, fontWeight: '600' },
})
export default styles
