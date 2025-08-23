import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import SignupStyles from "../../styles/Signup/index.styles";
import { useNavigation } from "@react-navigation/native";
import { signup } from "../../api/auth"; // <-- import API

const SignupPage = () => {
  const [emailaddress, setEmailaddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [fullName, setfullName] = useState("");
  const navigation = useNavigation();

  const handleSignup = async () => {
    if (!emailaddress || !password || !confirmPassword || !fullName || !phonenumber) {
      Alert.alert("Error", "All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    const res = await signup({
      email: emailaddress,
      phoneNumber: phonenumber,
      name: fullName,
      password,
    });

    if (res.success && res.code === "registered") {
      Alert.alert("Success", "Account created successfully");
      navigation.navigate("Login");
    } else {
      Alert.alert("Signup Failed", res.message || "Something went wrong");
    }
  };

  return (
    <View style={SignupStyles.wrapper}>
      <Text style={SignupStyles.initialText}>Welcome to LYMLife!</Text>
      <Text style={SignupStyles.title}>Signup</Text>
      <TextInput
        style={SignupStyles.input}
        placeholder="Enter your full name"
        value={fullName}
        onChangeText={setfullName}
      />
      <TextInput
        style={SignupStyles.input}
        placeholder="Enter your Email"
        value={emailaddress}
        onChangeText={setEmailaddress}
      />
      <TextInput
        style={SignupStyles.input}
        placeholder="Enter your Phone number"
        value={phonenumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={SignupStyles.input}
        placeholder="Enter your Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={SignupStyles.input}
        placeholder="Confirm your Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={SignupStyles.signupBtn} onPress={handleSignup}>
        <Text style={SignupStyles.signupText}>Signup</Text>
      </TouchableOpacity>
      <View style={SignupStyles.loginRow}>
        <Text style={SignupStyles.text}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={SignupStyles.login}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={SignupStyles.orRow}>
        <View style={SignupStyles.hr} />
        <Text style={SignupStyles.orText}>Or</Text>
        <View style={SignupStyles.hr} />
      </View>
      <TouchableOpacity style={SignupStyles.googleLoginBtn}>
        <Image source={require("../../assets/google.png")} style={SignupStyles.google} />
        <Text style={SignupStyles.socialText}>Signup with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupPage;
