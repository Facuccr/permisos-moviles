import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button, Text, View, Linking, StyleSheet } from 'react-native';

export default function Escanear() {
  const [permiso, pedirPermiso] = useCameraPermissions();

  if (!permiso) {
    return (
      <View style={styles.container}>
        <Text>Cargando</Text>
      </View>
    );
  }

  if (permiso.granted) {
    return <CameraView style={styles.camera} facing="back" />;
  }

  if (permiso.canAskAgain) {
    return (
      <View style={styles.container}>
        <Text>Usamos la cámara para leer el QR de tu receta.</Text>
        <Button title="Continuar" onPress={pedirPermiso} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>La cámara está desactivada para esta app.</Text>
      <Button title="Abrir Ajustes" onPress={() => Linking.openSettings()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  camera: { flex: 1 },
});