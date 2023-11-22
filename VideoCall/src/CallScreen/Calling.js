import * as React from 'react';
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
  ZegoUIKitPrebuiltCallService,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
// import React, {Component} from 'react';
import {View, Text, StyleSheet, LogBox} from 'react-native';

import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';

export default function CallingPage({route}) {
  const {callID, userName} = route?.params;

  const userId = String(Math.floor(Math.random() * 100000));

  console.log(userId, '   callID:   ', callID);

  const onUserLogin = async (userID, userName, props) => {
    return ZegoUIKitPrebuiltCallService.init(
      1751469271, // You can get it from ZEGOCLOUD's console
      'cc0b6fc3af3d8e6765cd60d9c891be807836ed9d869600113fdbfd1a08575b66', // You can get it from ZEGOCLOUD's console
      userID, // It can be any valid characters, but we recommend using a phone number.
      userName,
      [ZIM, ZPNs],
      {
        ringtoneConfig: {
          incomingCallFileName: 'zego_incoming.mp3',
          outgoingCallFileName: 'zego_outgoing.mp3',
        },
        notifyWhenAppRunningInBackgroundOrQuit: true,
        androidNotificationConfig: {
          channelID: 'ZegoUIKit',
          channelName: 'ZegoUIKit',
        },
      },
    );
  };

  const onUserLogout = async () => {
    return ZegoUIKitPrebuiltCallService.uninit();
  };

  React.useEffect(() => {
    return () => {};
  }, []);

  return (
    <View style={styles.container}>
      {/* <ZegoUIKitPrebuiltCall
        appID={1751469271}
        appSign={
          'cc0b6fc3af3d8e6765cd60d9c891be807836ed9d869600113fdbfd1a08575b66'
        }
        userID={userId} // userID can be something like a phone number or the user id on your own user system.
        userName={userName}
        callID={'123456789'} // callID can be any unique string.
        config={{
          // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
          onOnlySelfInRoom: () => {
            // props.navigation.navigate('HomePage');
          },
          onHangUp: () => {
            // props.navigation.navigate('HomePage');
          },
        }}
      /> */}
    </View>
  );
}
// // define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
