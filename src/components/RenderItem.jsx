import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
} from "react-native";

const RenderItem = ({ item, eliminarPaciente }) => {
  const dialogoEliminar = (id) => {
    console.log("eliminando", id);

    eliminarPaciente(id);
  };
  return (
    <View style={styles.cita}>
      <View>
        <Text style={styles.label}>Paciente:</Text>
        <Text style={styles.texto}>{item.paciente}</Text>
      </View>
      <View>
        <Text style={styles.label}>Propietario:</Text>
        <Text style={styles.texto}>{item.propietario}</Text>
      </View>
      <View>
        <Text style={styles.label}>Síntomas:</Text>
        <Text style={styles.texto}>{item.sintomas}</Text>
      </View>
      <View>
        <Text style={styles.label}>Visita:</Text>
        <Text style={styles.texto}>
          {item.fecha} - {item.hora}
        </Text>
      </View>
      <View>
        <Text style={styles.label}>Teléfono Contacto:</Text>
        <Text style={styles.texto}>{item.telefono}</Text>
      </View>
      <View>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.texto}>{item.email}</Text>
      </View>
      <View>
        <TouchableHighlight
          style={styles.btn}
          onPress={() => dialogoEliminar(item.id)}
        >
          <Text style={styles.btnTexto}>Eliminar &times;</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
export default RenderItem;

const styles = StyleSheet.create({
  cita: {
    backgroundColor: "#3da4ab",
    borderBottomColor: "#e5e5e5",
    borderStyle: "solid",
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
  },
  texto: { fontSize: 18 },
  btn: {
    padding: 10,
    backgroundColor: "#e5e5e5",
    marginVertical: 10,
  },
  btnTexto: {
    textAlign: "center",
  },
});
