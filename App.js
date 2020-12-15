/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useRef, useEffect} from 'react';
import {
  TouchableHighlight,
  Animated,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App = (props) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const [modalShown, setModalShown] = useState(false);
  const [message, setMessage] = useState('Success!');
  const [toastColor, setToastColor] = useState('green');

  let animation = animatedValue.interpolate({
    inputRange: [0, 0.3, 1],
    outputRange: [-400, -10, 0],
    useNativeDriver: false, // <-- Add this
  });

  useEffect(() => {
    // showToast(message, 'success');
  });

  const setToastType = (messages = 'Success!', type = 'success') => {
    let color;
    if (type === 'error') {
      color = 'red';
    }
    if (type === 'warning') {
      color = '#ec971f';
    }
    if (type === 'success') {
      color = 'green';
    }
    setToastColor(color);
    setMessage(messages);
  };

  const showToast = (messages, type) => {
    if (modalShown) {
      return;
    }

    setToastType(messages, type);
    setModalShown(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 450,
      useNativeDriver: false, // <-- Add this
    }).start(closeToast());
  };

  const closeToast = () => {
    setTimeout(() => {
      setModalShown(false);
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 350,
        useNativeDriver: false, // <-- Add this
      }).start();
    }, 2000);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'stretch',
                backgroundColor: 'grey',
                borderWidth: 1,
              }}>
              <Animated.View
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginHorizontal: 25,
                  borderWidth: 2,
                  borderColor: toastColor,
                  borderRadius: 20,
                  transform: [{translateX: animation}],
                  minHeight: 50,
                  maxWidth: 300,
                  backgroundColor: toastColor,
                  justifyContent: 'space-between',
                  zIndex: 10000,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginHorizontal: 30,
                    borderWidth: 1,
                    borderColor: 'grey',
                  }}>
                  {message}
                </Text>
                <TouchableHighlight
                  onPress={() => closeToast()}
                  style={{
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: 'grey',
                    top: -10,
                    width: 20,
                    marginRight: 10,
                  }}>
                  <Text>x</Text>
                </TouchableHighlight>
              </Animated.View>
            </View>
            <View style={styles.sectionContainer}>
              <TouchableHighlight
                style={{
                  backgroundColor: 'red',
                }}
                onPress={() => {
                  showToast(
                    'Error Error Error Error Error Error Error Error Error Message',
                    'error',
                  );
                }}>
                <Text style={styles.modalContentStyle}>
                  {'Show Error Message'}
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  backgroundColor: 'green',
                }}
                onPress={() => {
                  showToast('success Message', 'success');
                }}>
                <Text style={styles.modalContentStyle}>
                  {'Show success Message'}
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  backgroundColor: '#ec971f',
                }}
                onPress={() => {
                  showToast('warning Message', 'warning');
                }}>
                <Text style={styles.modalContentStyle}>
                  {'Show warning Message'}
                </Text>
              </TouchableHighlight>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
