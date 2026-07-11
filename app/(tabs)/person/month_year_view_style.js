import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Common container style
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f5f5f5",
  },
  logoBanner: {
  width: "100%",      // full width
  height: 80,         // adjust for small height
  resizeMode: "contain", // keeps aspect ratio
  marginBottom: 10,
  backgroundColor: "#fff", // optional if logo has transparency
},


  // Common title style
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
    color: "#4a148c",
  },

  // ViewPerson month row style
  monthRow: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  monthText: {
    fontSize: 18,
    color: "#4a148c",
    fontWeight: "600",
  },

  // MonthDetails table styles
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    alignItems: "center",
    elevation: 2,
  },
  tableHeader: { backgroundColor: "#ddd" },
  cell: { flex: 1, textAlign: "center" },
  cellHeader: { flex: 1, fontWeight: "bold", textAlign: "center" },
  totalMoney: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "right",
    marginBottom: 20,
    color: "#4a148c",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    textAlign: "center",
    backgroundColor: "#fff",
  },
  totalsContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 2,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#6a1b9a",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  // YearSelection page styles
  yearContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f3e5f5",
  },
  yearRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#fff",
  padding: 12,
  marginBottom: 10,
  borderRadius: 8,
  elevation: 2,
},

yearButton: {
  flex: 1,
  backgroundColor: "#6a1b9a",
  padding: 12,
  borderRadius: 8,
  alignItems: "center",
  marginRight: 10,
},

yearButtonText: {
  color: "#fff",
  fontSize: 18,
  fontWeight: "bold",
},

deleteButton: {
  backgroundColor: "#e53935",
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 8,
},

deleteButtonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
},
yearText: {
  fontSize: 22,
  fontWeight: "600",
  textAlign: "center",
  marginVertical: 8,
  color: "#444",
},


});
