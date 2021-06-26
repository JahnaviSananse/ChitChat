import { StyleSheet } from 'react-native'
import { theme } from '../../constants/colors'
import { getSize, SCREEN_HEIGHT } from '../../constants/constant'

const styles = StyleSheet.create({
  itemContainer: {
    height: 60,
    borderColor: theme.colors.gray,
    // borderWidth: 0.2,
    marginBottom: 10,
    flexDirection: 'row',
    shadowColor: theme.colors.darkShalow,
    shadowOffset: { width: 0, height: 0 },
    alignItems: 'center',
  },
  headerTitleText: { fontSize: 22, color: theme.colors.white },
  itemIcon: { width: '15%', height: '90%', borderRadius: 50 },
  itemDetail: { width: '50%', margin: 10 },
  itemTitle: { fontSize: getSize(16), fontWeight: '500', marginBottom: 5 },
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
  empty: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: SCREEN_HEIGHT / 1.3,
  },
  redDot: {
    backgroundColor: 'red',
    height: 10,
    width: 10,
    borderRadius: 5,
    position: 'absolute',
    right: 0,
    top: 5,
  },
  messageCount: {
    position: 'absolute',
    right: 10,
    top: 12,
    fontSize: 12,
    fontWeight: 'bold',
  },
})
export default styles
