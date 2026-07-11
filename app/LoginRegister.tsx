import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "./register_login_style";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [isForget, setIsForget] = useState(false); // Forget password mode
  const [showPassword, setShowPassword] = useState(false); // Toggle password

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState(""); 

  const router = useRouter();

  // 🔹 Login
  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("कृपया ईमेल और पासवर्ड दर्ज करें।");
      return;
    }

    try {
      const res = await fetch("http://192.168.1.7:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        await AsyncStorage.setItem("user_id", data.user.id.toString());
        router.replace("/(tabs)");
      }
    } catch (err) {
      console.error(err);
      setError("लॉगिन में त्रुटि हुई। कृपया पुनः प्रयास करें।");
    }
  };

  // 🔹 Register
  const handleRegister = async () => {
    setError("");
    if (!name || !email || !password || !confirmPassword) {
      setError("कृपया सभी फ़ील्ड भरें।");
      return;
    }
    if (password !== confirmPassword) {
      setError("पासवर्ड मेल नहीं खा रहे हैं।");
      return;
    }

    try {
      const res = await fetch("http://192.168.1.7:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        alert("पंजीकरण सफल!");
        setIsLogin(true);
      }
    } catch (err) {
      console.error(err);
      setError("पंजीकरण में त्रुटि हुई। कृपया पुनः प्रयास करें।");
    }
  };

  // 🔹 Forget password (Step 1: check email)
  const handleCheckEmail = async () => {
    setError("");
    if (!email) {
      setError("कृपया ईमेल दर्ज करें।");
      return;
    }

    try {
      const res = await fetch("http://192.168.1.7:5000/api/auth/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.exists) {
        alert("ईमेल सही है, कृपया नया पासवर्ड दर्ज करें।");
        setIsForget(true);
      } else {
        setError("ईमेल मौजूद नहीं है।");
      }
    } catch (err) {
      console.error(err);
      setError("त्रुटि हुई। कृपया पुनः प्रयास करें।");
    }
  };

  // 🔹 Forget password (Step 2: update password)
  const handleChangePassword = async () => {
    setError("");
    if (!newPassword || !confirmNewPassword) {
      setError("कृपया नया पासवर्ड दर्ज करें।");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError("नया पासवर्ड मेल नहीं खा रहा।");
      return;
    }

    try {
      const res = await fetch("http://192.168.1.7:5000/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();

      if (data.success) {
        alert("पासवर्ड सफलतापूर्वक बदल दिया गया!");
        setIsForget(false);
        setIsLogin(true);
      } else {
        setError("पासवर्ड बदलने में समस्या आई।");
      }
    } catch (err) {
      console.error(err);
      setError("त्रुटि हुई। कृपया पुनः प्रयास करें।");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/surgyan.jpeg")}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>
        {isForget ? "पासवर्ड बदलें" : isLogin ? "लॉगिन पेज" : "खाता बनाएँ"}
      </Text>

      {/* Name (for register) */}
      {!isLogin && !isForget && (
        <TextInput
          style={styles.input}
          placeholder="पूरा नाम"
          value={name}
          onChangeText={setName}
        />
      )}

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="ईमेल"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Normal login/register password */}
      {!isForget && (
        <>
          <View style={{ flexDirection: "row", alignItems: "center", width: "100%" }}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="पासवर्ड"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={{ marginLeft: 10, color: "#1E90FF", fontWeight: "bold" }}>
                {showPassword ? "Hide" : "Show"}
              </Text>
            </TouchableOpacity>
          </View>

          {!isLogin && (
            <TextInput
              style={styles.input}
              placeholder="पासवर्ड पुष्टि करें"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          )}
        </>
      )}

      {/* Forget Password Step 2 */}
      {isForget && (
        <>
          <TextInput
            style={styles.input}
            placeholder="नया पासवर्ड"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="नया पासवर्ड पुष्टि करें"
            secureTextEntry
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
          />
        </>
      )}
       {/* Forget password link */}
      {isLogin && !isForget && (
        <View style={styles.forgetContainer}>
          <Text style={styles.forgetLink} onPress={handleCheckEmail}>
            पासवर्ड भूल गए?
          </Text>
        </View>
      )}

      {/* Error */}
      {error ? <Text style={errorStyles.errorText}>{error}</Text> : null}

      {/* Buttons */}
      {!isForget ? (
        <TouchableOpacity
          style={[
            styles.button,
            isLogin ? styles.loginButton : styles.registerButton,
          ]}
          onPress={isLogin ? handleLogin : handleRegister}
        >
          <Text style={styles.buttonText}>{isLogin ? "लॉगिन" : "रजिस्टर"}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={handleChangePassword}
        >
          <Text style={styles.buttonText}>पासवर्ड बदलें</Text>
        </TouchableOpacity>
      )}

    

      {/* Toggle Login/Register */}
      {!isForget && (
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>
            {isLogin ? "खाता नहीं है? " : "पहले से खाता है? "}
          </Text>
          <Text style={styles.link} onPress={() => setIsLogin(!isLogin)}>
            {isLogin ? "यहाँ रजिस्टर करें" : "यहाँ लॉगिन करें"}
          </Text>
        </View>
      )}
    </View>
  );
}

const errorStyles = StyleSheet.create({
  errorText: {
    color: "red",
    marginTop: 5,
    textAlign: "center",
  },
});
