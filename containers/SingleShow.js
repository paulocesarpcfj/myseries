import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Content, Body, Container, Header, Title, Left, Right, Icon, Accordion, Button,
} from 'native-base';
import tailwind from 'tailwind-rn';
import { Text } from 'react-native';
import { removeShow, markAsWatched } from '../actions/series';

const renderHeader = (season) => (
  <Text style={tailwind('p-3 bg-gray-100 font-bold')}>
    {`Season ${season}`}
  </Text>
);

const renderContent = (episodes, showId, handlePress) => (
  episodes.map((episode, key) => (
    <Button
      key={key}
      full
      transparent
      style={tailwind('p-3 border-t border-solid border-gray-300 justify-between')}
      onPress={() => handlePress(showId, episode.title)}
    >
      <Text>
        {`${episode.number} - ${episode.title}`}
      </Text>
      <Icon
        name="eye"
        style={episode.watch ? tailwind('text-blue-600') : tailwind('text-gray-400')}
      />
    </Button>
  ))
);

const SingleShow = (props) => {
  const selectedShow = props.series.list[props.route.params.id];

  return (
    <Container>
      <Header>
        <Left style={{ flex: 1 }}>
          <Icon
            name="arrow-back"
            onPress={() => props.navigation.navigate('MySeries')}
          />
        </Left>
        <Body style={{ flex: 1, alignItems: 'center' }}>
          <Title>
            {selectedShow.name}
          </Title>
        </Body>
        <Right style={{ flex: 1 }}>
          <Icon
            name="trash"
            onPress={() => {
              props.removeShow(selectedShow.id);

              return props.navigation.navigate('MySeries');
            }}
          />
        </Right>
      </Header>
      <Content padder>
        {selectedShow.episodes.map((episodes, key) => (
          <Accordion
            key={key}
            dataArray={episodes.episodes ? [episodes.episodes[0]] : [episodes[0]]}
            animation
            expanded
            renderHeader={() => renderHeader(key + 1)}
            renderContent={() => renderContent(
              episodes.episodes || episodes, selectedShow.id, props.markAsWatched,
            )}
            style={tailwind('mb-3 border border-solid border-gray-300')}
          />
        ))}
      </Content>
    </Container>
  );
};

SingleShow.propTypes = {
  navigation: PropTypes.object,
  series: PropTypes.object,
  removeShow: PropTypes.func,
  route: PropTypes.object,
  markAsWatched: PropTypes.func,
};

const mapStateToProps = ({ series }) => ({ series });

export default connect(mapStateToProps, { removeShow, markAsWatched })(SingleShow);
