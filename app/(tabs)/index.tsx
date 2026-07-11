import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  Alert
} from "react-native";
import styles from "./home_style";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Person = {
  person_id: number;
  name: string;
  salary: string;
};

export default function HomeTab() {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [persons, setPersons] = useState<Person[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const router = useRouter();

  const API_URL = "http://192.168.1.7:5000"; // <-- replace with your computer’s IP

  useEffect(() => {
    const loadUserId = async () => {
      const storedUserId = await AsyncStorage.getItem("user_id");
      if (storedUserId) {
        setUserId(storedUserId);
        fetchPersons(storedUserId);
      }
    };
    loadUserId();
  }, []);

  const fetchPersons = async (user_id: string) => {
    try {
      const res = await axios.get(`${API_URL}/api/person/${user_id}`);
      setPersons(res.data);
    } catch (err) {
      console.error("Error fetching persons:", err);
    }
  };

  const handleAddPerson = async () => {
    if (!name || !salary) return;
    if (!userId) {
      console.error("User ID not found");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/person/add`, {
        user_id: userId,
        name,
        salary
      });
      fetchPersons(userId);
      setName("");
      setSalary("");
      setModalVisible(false);
    } catch (err) {
      console.error("Error adding person:", err);
    }
  };

  // ===== Delete Person =====
  const handleDeletePerson = (person_id: number) => {
    Alert.alert(
      "पुष्टि करें",
      "क्या आप इस व्यक्ति को हटाना चाहते हैं?",
      [
        { text: "रद्द करें", style: "cancel" },
        {
          text: "OK",
          onPress: async () => {
            try {
              await axios.delete(`${API_URL}/api/person/delete/${person_id}`);
              if (userId) fetchPersons(userId);
            } catch (err) {
              console.error("Error deleting person:", err);
            }
          }
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6a1b9a" />

      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/surgyan.jpeg")}
          style={styles.logo}
        />
        <Text style={styles.headerText}>मेरा हाज़िरी ऐप</Text>
      </View>

      {/* Add Person Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ व्यक्ति जोड़ें</Text>
      </TouchableOpacity>

      {/* Persons List */}
      <FlatList
        data={persons}
        keyExtractor={(item) => item.person_id.toString()}
        style={styles.personList}
        renderItem={({ item }) => (
          <View style={styles.personBox}>
            <Text style={styles.personName}>{item.name}</Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                style={styles.personButton}
                onPress={() =>
                  router.push({
                    pathname: "/(tabs)/person/yearSelection",
                    params: { name: item.name,person_id: item.person_id.toString() },
                  })
                }
              >
                <Text style={styles.personButtonText}>देखें</Text>
              </TouchableOpacity>

              {/* Delete Button */}
              <TouchableOpacity
                style={[styles.personButton, { backgroundColor: "red" }]}
                onPress={() => handleDeletePerson(item.person_id)}
              >
                <Text style={styles.personButtonText}>हटाएँ</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Add Person Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>व्यक्ति जोड़ें</Text>
            <TextInput
              placeholder="नाम दर्ज करें"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <TextInput
              placeholder="वेतन दर्ज करें"
              value={salary}
              onChangeText={setSalary}
              style={styles.input}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.modalAddButton} onPress={handleAddPerson}>
              <Text style={styles.modalAddButtonText}>जोड़ें</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancelButtonText}>रद्द करें</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
