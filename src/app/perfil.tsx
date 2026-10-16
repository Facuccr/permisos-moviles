import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Button, Image, StyleSheet, View } from "react-native";

export default function Perfil() {
  const [imagen, setImagen] = useState<string | null>(null);

  const seleccionarFoto = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagen(resultado.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Elegir Foto de Perfil" onPress={seleccionarFoto} />
      {imagen && <Image source={{ uri: imagen }} style={styles.imagen} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  imagen: { width: 200, height: 200, borderRadius: 100, marginTop: 20 },
});
