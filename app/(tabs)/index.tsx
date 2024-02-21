import { Button, StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';

export default function TabOneScreen() {
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

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

    // Received notifications while the app is in the foreground
    notificationListener.current = Notifications.addNotificationReceivedListener(
      async (notification) => {
        console.log('Received notification:', notification);
        const count = await Notifications.getBadgeCountAsync();
        console.log('Badge count:', count);
        await Notifications.setBadgeCountAsync(count + 1);
      }
    );

    // Tap on the notification to open the app
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log('Tapped on the notification:', response);
        Notifications.dismissAllNotificationsAsync();
        Notifications.setBadgeCountAsync(0);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current!);
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
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
