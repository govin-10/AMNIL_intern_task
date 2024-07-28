import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDebounce} from '../../hooks/useDebounce';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {
  clearResults,
  fetchSearchResults,
  setQuery,
} from '../../redux/features/products/searchSlice';
import {COLOR} from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntIcon from 'react-native-vector-icons/AntDesign';

const SearchScreen: React.FC = ({navigation}: any) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  // const [searching, setSearching] = useState<boolean>(false);

  const {results, loading, error} = useSelector(
    (state: RootState) => state.search,
  );
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(setQuery(debouncedSearchTerm));
      dispatch(fetchSearchResults(debouncedSearchTerm));
    } else {
      dispatch(clearResults());
    }
  }, [debouncedSearchTerm, dispatch]);

  const {searchContainer, searchBox, searchBar, itemContainer, itemImage} =
    styles;

  return (
    <View style={searchContainer}>
      <View style={searchBox}>
        <AntIcon name="search1" size={wp(5.5)} color={COLOR.ACTIVE_TAB_ICON} />
        <TextInput style={searchBar} onChangeText={setSearchTerm} />
      </View>

      {loading && <Text>Loading...</Text>}

      {results.length > 0 ? (
        <FlatList
          data={results}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('Details', {id: item.id})}>
                <View style={itemContainer}>
                  <Image source={{uri: item?.images[0]}} style={itemImage} />
                  <View>
                    <Text>{item?.title}</Text>
                    <Text>Rs.{item.price}</Text>
                  </View>
                  <Text>{item.availabilityStatus}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        !loading && <Text>No results found</Text>
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    backgroundColor: COLOR.PRIMARY_BACKGROUND,
    padding: wp(2),
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(1),
    borderWidth: 1,
    borderColor: COLOR.INPUT_BORDER,
    borderRadius: wp(4),
    paddingHorizontal: wp(3),
  },
  searchBar: {
    // borderWidth: 1,
    flex: 1,
    fontSize: wp(4),
    color: COLOR.PRIMARY_TEXT,
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: hp(1),
    // alignItems: 'center',
  },
  itemImage: {
    height: 50,
    width: 50,
  },
});
