import {
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
import {SkeletonLoader} from '../../components';
import {useFocusEffect} from '@react-navigation/native';

const SearchScreen: React.FC = ({navigation}: any) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  // const [searching, setSearching] = useState<boolean>(false);

  const {results, loading, error} = useSelector(
    (state: RootState) => state.search,
  );
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(setQuery(debouncedSearchTerm));
      dispatch(fetchSearchResults(debouncedSearchTerm));
    } else {
      dispatch(clearResults());
    }
  }, [debouncedSearchTerm, dispatch]);

  //arko screen ma switch huda search results clear garna khojeko, state lai clear gardera, but UX ramro nahune rachha,lol
  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Clear search term and results when the screen is unfocused
  //     return () => {
  //       setSearchTerm('');
  //       dispatch(clearResults());
  //     };
  //   }, [dispatch]),
  // );

  const {
    searchContainer,
    searchBox,
    searchBar,
    itemContainer,
    itemLeft,
    itemImage,
    itemName,
    itemPrice,
    stockInfo,
  } = styles;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={searchContainer}>
        <View style={searchBox}>
          <AntIcon
            name="search1"
            size={wp(5.5)}
            color={COLOR.ACTIVE_TAB_ICON}
          />
          <TextInput style={searchBar} onChangeText={setSearchTerm} />
        </View>

        {loading ? (
          <SkeletonLoader screenType="searchLoader" />
        ) : results.length > 0 ? (
          <FlatList
            data={results}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Details', {id: item.id})}>
                  <View style={itemContainer}>
                    <View style={itemLeft}>
                      <Image
                        source={{uri: item?.images[0]}}
                        style={itemImage}
                      />
                      <View>
                        <Text style={itemName}>{item?.title}</Text>
                        <Text style={itemPrice}>Rs.{item.price}</Text>
                      </View>
                    </View>
                    <Text
                      style={[
                        stockInfo,
                        {
                          backgroundColor:
                            item.availabilityStatus === 'In Stock'
                              ? 'green'
                              : item.availabilityStatus === 'Low Stock'
                              ? 'orange'
                              : 'red',
                        },
                      ]}>
                      {item.availabilityStatus}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          !loading && (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: wp(7),
                  color: COLOR.PRIMARY_TEXT,
                  fontWeight: 'bold',
                }}>
                Search to get started...
              </Text>
            </View>
          )
        )}
      </View>
    </TouchableWithoutFeedback>
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
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  itemLeft: {
    flexDirection: 'row',
    gap: 10,
  },
  itemImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  itemName: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: COLOR.PRIMARY_TEXT,
  },
  itemPrice: {
    fontSize: wp(3),
    fontWeight: 'bold',
    color: COLOR.PRIMARY_TEXT,
  },
  stockInfo: {
    alignSelf: 'flex-start',
    borderRadius: 5,
    padding: 5,
    color: 'white',
  },
});
