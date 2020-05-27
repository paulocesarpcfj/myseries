import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Content, Card, CardItem, Body, Container, Header, Item,
  Input, Icon, Spinner, Left, Button,
} from 'native-base';
import { Text } from 'react-native';
import tailwind from 'tailwind-rn';
import debounce from 'debounce';
import { searchSeries, saveShow } from '../actions/series';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchParams: '', searchResults: [], isLoading: false, emptyList: false,
    };

    this.handleSearch = debounce(this.handleSearch.bind(this), 600);
  }

  handleSearch() {
    this.setState({ isLoading: true, searchResults: [], emptyList: false });

    if (this.state.searchParams && this.state.searchParams.trim()) {
      return this.props.searchSeries(this.state.searchParams)
        .then((res) => this.setState({
          searchResults: res.value,
          isLoading: false,
          emptyList: !res.value.length,
        }));
    }

    return this.setState({ isLoading: false });
  }

  render() {
    return (
      <Container>
        <Header searchBar>
          <Left style={{ flex: null }}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('MySeries')}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Item>
            <Input
              placeholder="Search"
              onChangeText={(value) => {
                this.setState({ searchParams: value });

                return this.handleSearch();
              }}
              onKeyPress={(evt) => {
                if (evt.keyCode === 13) {
                  return this.handleSearch();
                }

                return evt;
              }}
            />
            <Icon
              name="search"
              onPress={() => this.handleSearch()}
            />
          </Item>
        </Header>
        <Content>
          {this.state.isLoading && <Spinner color="blue" />}

          {this.state.emptyList && (
            <Text style={tailwind('w-full text-center my-3')}>No series found</Text>
          )}

          {this.state.searchResults.map((result, key) => (
            <Card key={key}>
              <CardItem
                button
                onPress={() => (
                  this.props.saveShow(result.show.ids.trakt, result.show.title)
                    .then((res) => (
                      this.props.navigation.navigate('SingleShow', { id: res.value.showId })
                    ))
                )}
              >
                <Body style={tailwind('flex flex-row items-center')}>
                  <Text style={tailwind('font-bold mx-3')}>
                    {result.show.title}
                  </Text>
                </Body>
              </CardItem>
            </Card>
          ))}
        </Content>
      </Container>
    );
  }
}

Search.propTypes = {
  navigation: PropTypes.object,
  searchSeries: PropTypes.func,
  saveShow: PropTypes.func,
};

export default connect(null, { searchSeries, saveShow })(Search);
