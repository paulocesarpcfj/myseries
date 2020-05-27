import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Content, Card, CardItem, Body, Container, Header, Title, Left, Right, Icon,
} from 'native-base';
import { Text } from 'react-native';
import tailwind from 'tailwind-rn';

const MySeries = (props) => (
  <Container>
    <Header>
      <Left style={{ flex: 1 }} />
      <Body style={{ flex: 1, alignItems: 'center' }}>
        <Title>
          Series Watcher
        </Title>
      </Body>
      <Right style={{ flex: 1 }}>
        <Icon
          name="add"
          onPress={() => props.navigation.navigate('Search')}
        />
      </Right>
    </Header>
    <Content>
      {Object.values((props.series || {}).list || {}).map((result, key) => (
        <Card key={key}>
          <CardItem
            button
            onPress={() => props.navigation.navigate('SingleShow', { id: result.id })}
          >
            <Body style={tailwind('flex flex-row items-center')}>
              <Text style={tailwind('font-bold mx-3')}>
                {result.name}
              </Text>
            </Body>
          </CardItem>
        </Card>
      ))}
    </Content>
  </Container>
);

MySeries.propTypes = {
  navigation: PropTypes.object,
  series: PropTypes.object,
};

const mapStateToProps = ({ series }) => ({ series });

export default connect(mapStateToProps)(MySeries);
