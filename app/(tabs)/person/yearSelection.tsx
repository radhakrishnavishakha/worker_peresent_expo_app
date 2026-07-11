import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert, Image } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { styles } from "./month_year_view_style";

export default function YearSelection() {
  const { name, person_id } = useLocalSearchParams<{ name: string; person_id: string }>();
  const router = useRouter();

  const API_URL = "http://192.168.1.7:5000"; // <-- replace with your backend IP
  const currentYear = new Date().getFullYear();

  // You can adjust startYear/endYear as you like.
  // Here it generates years from 2024 up to currentYear + 2 (so future years appear too).
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    const startYear = 2024;
    const endYear = currentYear + 2;
    const arr: number[] = [];
    for (let y = startYear; y <= endYear; y++) arr.push(y);
    setYears(arr);
  }, [currentYear]);

  const handleDelete = (yearToDelete: number) => {
    Alert.alert(
      "Confirm Delete",
      `${yearToDelete} साल का डेटा हटाया जाएगा। क्या आप सुनिश्चित हैं?`,
      [
        { text: "रद्द करें", style: "cancel" },
        {
          text: "हटाएं",
          style: "destructive",
          onPress: async () => {
            try {
              // Call backend to delete all attendance rows (or month JSON) for this person and year
              await axios.delete(`${API_URL}/api/attendance/delete/${person_id}/${yearToDelete}`);

              // Remove year from UI immediately
              setYears((prev) => prev.filter((y) => y !== yearToDelete));

              Alert.alert("सफलता", `${yearToDelete} का डेटा हटा दिया गया है।`);
            } catch (err) {
              console.error("Delete error:", err);
              Alert.alert("त्रुटि", "डेटा हटाने में समस्या हुई।");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/images/surgyan.jpeg")} style={styles.logoBanner} />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.yearText}>साल चुनें</Text>

      <FlatList
        data={years}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <View style={styles.yearRow}>
            <TouchableOpacity
              style={styles.yearButton}
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/person/viewperson",
                  params: { name, year: item.toString(), person_id },
                })
              }
            >
              <Text style={styles.yearButtonText}>{item}</Text>
            </TouchableOpacity>

            {/* Show delete only for past years (before current year) */}
            {item < currentYear && (
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item)}>
                <Text style={styles.deleteButtonText}>हटाएं</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}
