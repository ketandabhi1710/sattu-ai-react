import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
  Box,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

function CredsDropDown() {
  const [selectedValue, setSelectedValue] = useState<any>("");
  const [credentials, setCredentials] = useState<any>([]);
  const [editModalOpen, setEditModalOpen] = useState<any>(false);
  const [editCredential, setEditCredential] = useState<any>({});
  const [editCredentialIndex, setEditCredentialIndex] = useState<any>(null);

  useEffect(() => {
    fetchCredentials();
  }, []);

  const fetchCredentials = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/credentials");
      setCredentials(response.data);
    } catch (error) {
      console.error("Error fetching credentials:", error);
    }
  };

  const handleEdit = (credential: any, index: any) => {
    setEditCredential({ ...credential });
    setEditCredentialIndex(index);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8000/api/credentials/${editCredential._id}`,
        editCredential
      );
      fetchCredentials(); // Refresh credentials after update
      handleEditModalClose(); // Close the modal after update
    } catch (error) {
      console.error("Error updating credential:", error);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setEditCredential({ ...editCredential, [name]: value });
  };

  return (
    <div
      style={{
        marginTop: "2%",
        width: "100%",
        // justifyContent: "center",
        // display: "flex",
      }}
    >
      <FormControl fullWidth>
        <InputLabel>Select</InputLabel>
        <Select
          aria-label="dropdown"
          label="dropdown"
          name="credselect"
          value={selectedValue}
          onChange={handleChange}
        >
          {credentials.map((credential: any, index: any) => (
            <MenuItem key={credential._id} value={credential.url}>
              {credential.url}
              <span onClick={() => handleEdit(credential, index)}> Edit</span>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Modal open={editModalOpen} onClose={handleEditModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <TextField
            fullWidth
            id="edit-username"
            name="username"
            label="Username"
            value={editCredential.username || ""}
            onChange={handleInputChange}
            // mb={2}
          />
          <TextField
            fullWidth
            id="edit-url"
            name="url"
            label="URL"
            value={editCredential.url || ""}
            onChange={handleInputChange}
            // mb={2}
          />
          <TextField
            fullWidth
            id="edit-password"
            name="password"
            label="Password"
            type="password"
            value={editCredential.password || ""}
            onChange={handleInputChange}
            // mb={2}
          />
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default CredsDropDown;
