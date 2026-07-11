import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import styles from "./home_style";

export default function UserPage() {
  // User info (in Hindi)
  const [user, setUser] = useState({
    name: "अनिल लाल चन्द जांगिड़",
    email: "Aniljangir@gmail.com",
    phone: "",
    address: "",
    profilePhoto: { uri: "https://via.placeholder.com/120" },
  });

  const [submitted, setSubmitted] = useState(false);

  // Pick photo
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUser({ ...user, profilePhoto: { uri: result.assets[0].uri } });
    }
  };

  // Handle submit
  const handleSubmit = () => {
    if (user.phone.trim() && user.address.trim()) {
      setSubmitted(true);
    } else {
      alert("कृपया मोबाइल और पता दर्ज करें");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Status Bar */}
      <StatusBar barStyle="light-content" backgroundColor="#6a1b9a" />

      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/surgyan.jpeg")}
          style={styles.logo}
        />
        <Text style={styles.headerText}>मेरा हाज़िरी ऐप</Text>
      </View>

      {/* Profile */}
      <View style={styles.profileContainer}>
        <Image source={user.profilePhoto} style={styles.profileImage} />
        <TouchableOpacity style={styles.addPhotoBtn} onPress={pickImage}>
          <Text style={{ color: "white", fontWeight: "bold" }}>+ फोटो जोड़ें</Text>
        </TouchableOpacity>
        <Text style={styles.userName}>{user.name}</Text>
      </View>

      {/* User Info */}
      <ScrollView style={styles.infoBox}>
        <Text style={styles.infoText}>📧 ईमेल: {user.email}</Text>

        {/* Mobile input */}
        <View style={styles.formRow}>
          <Text style={styles.label}>📱 मोबाइल:</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="मोबाइल नंबर दर्ज करें"
            keyboardType="phone-pad"
            value={user.phone}
            onChangeText={(text) => setUser({ ...user, phone: text })}
          />
        </View>

        <View style={styles.formRow}>
          <Text style={styles.label}>🏠 पता:</Text>
          <TextInput
            style={[styles.inputBox, { height: 60 }]}
            placeholder="पता दर्ज करें"
            multiline
            value={user.address}
            onChangeText={(text) => setUser({ ...user, address: text })}
          />
        </View>

        {/* Submit / Update button */}
        <TouchableOpacity style={styles.modalAddButton} onPress={handleSubmit}>
          <Text style={styles.modalAddButtonText}>
            {submitted ? "अपडेट करें" : "जमा करें"}
          </Text>
        </TouchableOpacity>

        
      </ScrollView>
    </SafeAreaView>
  );
}
