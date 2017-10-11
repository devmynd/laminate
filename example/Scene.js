import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated, Dimensions, View, StyleSheet, Text, Button } from 'react-native'
import { Link, Route, withRouter } from 'react-router-native'
import { WithStackAnimation, WithOuterRouter } from 'laminate'

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    position: 'absolute',
    top: '10%',
    height: '90%',
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

    const { width } = Dimensions.get('window')

    return <WithStackAnimation>
      {({interpolateAnimation, index}) => (
        <Animated.View
          style={[
            styles.container,
            {
              backgroundColor,

              left: interpolateAnimation({ inputRange: [0, 1, 2], outputRange: [width, width * 0.1, 0]})
            }
          ]}
        >
          <Route>
            {({location}) => (
              <WithOuterRouter>
                <Route>
                  {({location: outerLocation}) => (
                    <Text style={styles.text}>
                      This is scene {text}: {location.pathname} {outerLocation.pathname}
                    </Text>
                  )}
                </Route>
              </WithOuterRouter>
            )}
          </Route>
          {linkTo && <Link component={Button} to={linkTo} title={`Go to ${linkTo}`} />}
          {disableBack || <BackButton />}
          <WithOuterRouter>
            <Route>
              {({location}) => (
                <Link title={`Open drawer: ${location.pathname}`} to={`${location.pathname}/drawer`} component={Button} />
              )}
            </Route>
          </WithOuterRouter>
        </Animated.View>
      )}
    </WithStackAnimation>

  }
}