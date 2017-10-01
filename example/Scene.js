import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, Button } from 'react-native'
import { Link, withRouter } from 'react-router-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    backgroundColor: 'transparent'
  }
})

const BackButton = withRouter(({history}) => (<Button title='Back' onPress={() => history.goBack()} />))

export class Scene extends Component {
  static propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }

  render () {
    const { text, backgroundColor, linkTo, disableBack } = this.props

    return <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.text}>
        This is scene {text}
      </Text>
      {linkTo && <Link component={Button} to={linkTo} title={`Go to ${linkTo}`} />}
      {disableBack || <BackButton />}
    </View>
  }
}
