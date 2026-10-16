import * as Notifications from "expo-notifications";
import { Button, Platform, StyleSheet, View } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    } as Notifications.NotificationBehavior;
  },
});

export default function Recordatorio() {
  const programarNotificacion = async () => {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("recordatorios", {
        name: "Recordatorios",
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }

    const { status, canAskAgain } = await Notifications.getPermissionsAsync();
    let permisoConcedido = status === "granted";

    if (!permisoConcedido && canAskAgain) {
      const { status: nuevoStatus } =
        await Notifications.requestPermissionsAsync();
      permisoConcedido = nuevoStatus === "granted";
    }

    if (permisoConcedido) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "¡Recordatorio listo!",
          body: "Pasaron 10 segundos desde que tocaste el botón.",
        },
        trigger: {
          seconds: 10,
          repeats: false,
        } as Notifications.NotificationTriggerInput,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Avisame en 10 segundos" onPress={programarNotificacion} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
