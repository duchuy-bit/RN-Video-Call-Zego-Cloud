//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
  ZegoUIKitPrebuiltCallService,
  ZegoSendCallInvitationButton,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import * as ZIM from 'zego-zim-react-native';
import * as ZPNs from 'zego-zpns-react-native';

// create a component
const JoinRoom = () => {
  const navigation = useNavigation();

  const [textInput, setTextInput] = useState('');
  const [userName, setUserName] = useState('');
  const [userIdInvite, setUserIdInvite] = useState('');

  const [userId, setUserId] = useState(
    String(Math.floor(Math.random() * 100000)),
  );

  const touchGenerate = () => {
    const tam = String(
      Math.floor(Math.random() * 10000) +
        '-' +
        Math.floor(Math.random() * 1000) +
        '-' +
        Math.floor(Math.random() * 10000),
    );

    setTextInput(tam);
  };

  const touchJoinCall = () => {
    if (textInput == '') {
      return;
    }

    navigation.navigate('CallingPage', {
      userName: userName,
      callID: textInput,
    });
  };

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
    //   if (userId === "")
    onUserLogin(userId, userName);
    return () => {
      onUserLogout();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={{width: '90%'}}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 16,
            textAlign: 'center',
            marginBottom: 20,
          }}>
          Your ID: {userId}
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: 'grey',
            marginBottom: 20,
            color: 'black',
            fontSize: 16,
          }}
          placeholder="Enter User Name"
          placeholderTextColor={'grey'}
          value={userName}
          onChangeText={text => setUserName(text)}
        />

        <TextInput
          style={{
            borderWidth: 1,
            borderColor: 'grey',
            marginBottom: 20,
            color: 'black',
            fontSize: 16,
          }}
          placeholder="User ID Invite"
          placeholderTextColor={'grey'}
          value={userIdInvite}
          onChangeText={text => setUserIdInvite(text)}
        />
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: 'grey',
            marginBottom: 20,
            color: 'black',
            fontSize: 16,
          }}
          placeholder="Id Room"
          placeholderTextColor={'grey'}
          value={textInput}
          onChangeText={text => setTextInput(text)}
        />
        {/* <Button title="Join Call" onPress={() => touchJoinCall()} /> */}
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            // backgroundColor: 'pink',
          }}>
          <ZegoSendCallInvitationButton
            invitees={[
              {userID: userIdInvite.toString(), userName: 'varUserName'},
            ]}
            isVideoCall={true}
            resourceID={'call_video'} // Please fill in the resource ID name that has been configured in the ZEGOCLOUD's console here.
          />
        </View>

        <TouchableOpacity onPress={() => touchGenerate()}>
          <Text
            style={{
              color: 'blue',
              fontWeight: 'bold',
              fontSize: 16,
              textAlign: 'center',
              marginTop: 20,
            }}>
            Generate Meeting Id
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

//make this component available to the app
export default JoinRoom;
