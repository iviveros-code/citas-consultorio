import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from "shortid";

const Formulario = ({
  citas,
  setCitas,
  setMostrarForm,
  guardarCitasStorage,
}) => {
  const [paciente, setPaciente] = useState("");
  const [propietario, setPropietario] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [sintomas, setSintomas] = useState("");

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const confirmarFecha = (date) => {
    const opciones = { year: "numeric", month: "long", day: "2-digit" };
    setFecha(date.toLocaleDateString("es-ES", opciones));

    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };
  const confirmarHora = (hora) => {
    const opciones = { hour: "numeric", minute: "2-digit" };
    setHora(hora.toLocaleString("en-US", opciones));
    hideTimePicker();
  };

  const crearNuevaCita = () => {
    if (
      paciente.trim() === "" ||
      propietario.trim() === "" ||
      telefono.trim() === "" ||
      email.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      mostrarAlerta();
      return;
    }
    const cita = {
      paciente,
      propietario,
      telefono,
      email,
      fecha,
      hora,
      sintomas,
    };
    cita.id = shortid.generate();
    console.log(cita);
    const citasNuevo = [...citas, cita];
    setCitas(citasNuevo);
    guardarCitasStorage(JSON.stringify(citasNuevo));
    setMostrarForm(false);
  };

  const mostrarAlerta = () => {
    Alert.alert("Error", "Todos los campos son obligatorios", [
      {
        text: "Ok",
      },
    ]);
  };
  return (
    <>
      <ScrollView style={styles.form}>
        <View>
          <Text style={styles.label}>Paciente:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => setPaciente(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Dueño:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => setPropietario(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Tel Contacto:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => setTelefono(texto)}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => setEmail(texto)}
          />
        </View>
        <Text style={styles.label}>Día:</Text>
        <View>
          <Button title="Seleccionar Día" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmarFecha}
            onCancel={hideDatePicker}
            locale="es_ES"
            headerTextIOS="Elige una fecha"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
          <Text>{fecha}</Text>
        </View>
        <Text style={styles.label}>Hora:</Text>
        <View>
          <Button title="Seleccionar Hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmarHora}
            onCancel={hideTimePicker}
            locale="es_ES"
            headerTextIOS="Elige un horario"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
          <Text>{hora}</Text>
        </View>
        <View>
          <Text style={styles.label}>Síntomas:</Text>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={(texto) => setSintomas(texto)}
          />
        </View>
        <View>
          <TouchableHighlight
            style={styles.btn}
            onPress={() => crearNuevaCita()}
          >
            <Text style={styles.btnTexto}>Crear nueva cita</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};

export default Formulario;

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#f6cd61",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: "#e5e5e5",
    borderWidth: 1,
    borderStyle: "solid",
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
