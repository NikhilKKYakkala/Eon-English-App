import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../services/firebase";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import PropTypes from "prop-types";

export const PasswordResetScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error] = useState("");

  const resetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email); // Use sendPasswordResetEmail correctly
      setLoading(false);
      Alert.alert(
        "Success",
        "Please check your email for further instructions.",
      );
    } catch (e) {
      setLoading(false);
      console.error(e);
      Alert.alert("Error", e.message || "Password reset failed.");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Recover Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={resetPassword} style={styles.button}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Reset</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

PasswordResetScreen.propTypes = {
  navigation: PropTypes.any,
};

export default PasswordResetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-center",
    alignItems: "center",
    paddingTop: 200,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#CCCCCC",
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#2D93F5",
    width: "100%",
    padding: 15,
    borderRadius: 7,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginTop: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "800",
    color: "#CCCCCC",
    paddingBottom: 30,
    width: "80%",
    textAlign: "center",
  },
});
