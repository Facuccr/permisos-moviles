import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";

export type EstadoPermiso =
  | "cargando"
  | "concedido"
  | "preguntable"
  | "bloqueado";

export interface PermissionResponse {
  status: string;
  granted: boolean;
  canAskAgain: boolean;
}

export function usePermiso(consultarFn: () => Promise<PermissionResponse>) {
  const [estado, setEstado] = useState<EstadoPermiso>("cargando");
  const appState = useRef(AppState.currentState);

  const evaluarPermiso = useCallback(async () => {
    const respuesta = await consultarFn();
    if (respuesta.granted) {
      setEstado("concedido");
    } else if (respuesta.canAskAgain) {
      setEstado("preguntable");
    } else {
      setEstado("bloqueado");
    }
  }, [consultarFn]);

  useEffect(() => {
    evaluarPermiso();

    const subscription = AppState.addEventListener(
      "change",
      (nextAppState: AppStateStatus) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          evaluarPermiso();
        }
        appState.current = nextAppState;
      },
    );

    return () => {
      subscription.remove();
    };
  }, [evaluarPermiso]);

  return estado;
}
