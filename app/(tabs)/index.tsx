import { Button, StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

export default function TabOneScreen() {

  useEffect(() => {
    Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    }).then((status) => {
      console.log('Notification permissions status:', status);
    });
  }, [])

  const scheduleNotifications = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'You have a new message 📬',
        body: 'Hello, world!',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 }, // This works even when the app is in the background or killed
    });
  }

  return (
    <View style={styles.container}>
      <Button title="Schedule Notification" onPress={scheduleNotifications} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
