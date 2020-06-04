import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from "react-native";
import RenderItem from "../components/RenderItem";
import Formulario from "../components/Formulario";
import AsyncStorage from "@react-native-community/async-storage";

const Citas = () => {
  const [mostrarForm, setMostrarForm] = useState(false);
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const obtenerCitasStorage = async () => {
      try {
        const citasStorage = await AsyncStorage.getItem("citas");
        if (citasStorage) {
          setCitas(JSON.parse(citasStorage));
        }
      } catch (error) {
        console.log(error);
      }
    };
    obtenerCitasStorage();
  }, []);

  const eliminarPaciente = (id) => {
    const citasFiltradas = citas.filter((cita) => cita.id !== id);
    setCitas(citasFiltradas);
    guardarCitasStorage(JSON.stringify(citasFiltradas));
  };

  const mostrarFormulario = () => {
    setMostrarForm(!mostrarForm);
  };

  const guardarCitasStorage = async (citasJSON) => {
    try {
      await AsyncStorage.setItem("citas", citasJSON);
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Administrador de Citas</Text>
      <View>
        <TouchableHighlight
          style={styles.btn}
          onPress={() => mostrarFormulario()}
        >
          <Text style={styles.btnTexto}>
            {mostrarForm ? "Ver Citas" : "Crear Nueva Cita"}
          </Text>
        </TouchableHighlight>
      </View>
      <View>
        {mostrarForm ? (
          <Formulario
            citas={citas}
            setCitas={setCitas}
            setMostrarForm={setMostrarForm}
            guardarCitasStorage={guardarCitasStorage}
          />
        ) : (
          <>
            <Text
              style={{
                fontSize: 16,
                color: "#fff",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {citas.length > 0 ? "Administra tus citas" : "No hay citas"}
            </Text>
            <FlatList
              data={citas}
              renderItem={({ item }) => (
                <RenderItem item={item} eliminarPaciente={eliminarPaciente} />
              )}
              keyExtractor={(index) => index.id}
            />
          </>
        )}
      </View>
    </View>
  );
};
export default Citas;

const styles = StyleSheet.create({
  titulo: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  btn: {
    padding: 10,
    backgroundColor: "#e5e5e5",
    marginVertical: 10,
  },
  btnTexto: {
    textAlign: "center",
  },
});
