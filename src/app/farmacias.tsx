import * as Location from "expo-location";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Farmacias() {
  const [ubicacion, setUbicacion] = useState<Location.LocationObject | null>(
    null,
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [esAproximada, setEsAproximada] = useState<boolean>(false);

  const buscarFarmacias = async () => {
    const { status, android, ios } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMsg("Buscador por barrio activo: Centro, Sur, Norte");
      return;
    }

    const aproximada =
      android?.accuracy === "coarse" || ios?.accuracy === "reduced";
    setEsAproximada(aproximada);

    const location = await Location.getCurrentPositionAsync({});
    setUbicacion(location);
    setErrorMsg(null);
  };

  return (
    <View style={styles.container}>
      <Button title="Buscar Farmacias Cerca" onPress={buscarFarmacias} />
      {errorMsg && <Text style={styles.texto}>{errorMsg}</Text>}
      {ubicacion && (
        <View style={styles.resultados}>
          <Text style={styles.texto}>Farmacia Central</Text>
          {!esAproximada && <Text style={styles.texto}>A 350 metros</Text>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  texto: { marginTop: 10, fontSize: 16 },
  resultados: { marginTop: 20, alignItems: "center" },
});
