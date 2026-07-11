import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },

  // ---------- Home Page Styles ----------
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#ece6efff",
    elevation: 4,
  },
  logo: { height: 50, width: 50, borderRadius: 20, marginTop: 20 },
  headerText: {
    color: "#8e24aa",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: "#8e24aa",
    padding: 15,
    marginTop: 40,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
  },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  personList: { paddingHorizontal: 15 },
  personBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ecddf4ff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    elevation: 2,
  },
  personName: { fontSize: 16, fontWeight: "bold", color: "#6a1b9a" },
  personButton: {
    backgroundColor: "#b14cf0ff",
    padding: 15,
    borderRadius: 8,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,

    // Android shadow
    elevation: 8,
  },
  personButtonText: { color: "#fff", fontWeight: "bold" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#ece6efff",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalAddButton: {
    backgroundColor: "#6a1b9a",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  modalAddButtonText: { color: "#fff", fontWeight: "bold" },
  modalCancelButton: {
    backgroundColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  modalCancelButtonText: { color: "#333" },
  footer: {
    backgroundColor: "#6a1b9a",
    padding: 10,
    alignItems: "center",
  },
  footerText: { color: "#fff", fontSize: 14 },

  // ---------- User Page Styles ----------
  profileContainer: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#ecddf4ff",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderRadius:25
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#caaef0ff",
  },
  userName: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: "bold",
    color: "#8e24aa",
  },
  section: {
    marginTop: 15,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#4a148c",
  },
 
  infoBox: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    color: "#333",
  },
  addPhotoBtn: {
  marginTop: 10,
  backgroundColor: "#6a1b9a",
  paddingVertical: 8,
  paddingHorizontal: 20,
  borderRadius: 10,
},
formRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    width: 90,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    flex: 1,
    fontSize: 16,
    color: "#555",
  },
  inputBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#fff",
  },

});
