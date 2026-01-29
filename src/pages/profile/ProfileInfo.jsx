import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useProfile from "../../hooks/useProfile";
import useUpdateProfileInfo from "../../hooks/useUpdateProfileInfo";
import useChangeEmail from "../../hooks/useChangeEmail";
import useChangePassword from "../../hooks/useChangePassword";
import Swal from "sweetalert2";

import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Divider,
  TextField,
  Button,
} from "@mui/material";

export default function ProfileInfo() {
  const { t } = useTranslation();

  const { data, isLoading, isError } = useProfile();
  const updateProfile = useUpdateProfileInfo();
  const changeEmail = useChangeEmail();
  const changePassword = useChangePassword();

  /* ================= STATES ================= */

  const [editBasic, setEditBasic] = useState(false);

  const [basicForm, setBasicForm] = useState({
    fullName: "",
    phoneNumber: "",
    city: "",
  });

  const [email, setEmail] = useState("");

  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  /* ================= INIT ================= */

  useEffect(() => {
    if (data) {
      setBasicForm({
        fullName: data.fullName || "",
        phoneNumber: data.phoneNumber || "",
        city: data.city || "",
      });
    }
  }, [data]);

  /* ================= LOADING / ERROR ================= */

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <Typography color="error.main">
          {t("Error loading profile")}
        </Typography>
      </Box>
    );
  }

  /* ================= HELPERS ================= */

  const isValidEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  /* ================= HANDLERS ================= */

  const handleSaveBasic = () => {
    if (!basicForm.fullName.trim()) {
      Swal.fire(t("Error"), t("Full name is required"), "error");
      return;
    }

    // no changes
    if (
      basicForm.fullName === data.fullName &&
      basicForm.phoneNumber === data.phoneNumber &&
      basicForm.city === data.city
    ) {
      Swal.fire(t("Info"), t("No changes detected"), "info");
      return;
    }

    updateProfile.mutate(basicForm, {
      onSuccess: () => {
        Swal.fire(t("Success"), t("Profile updated successfully"), "success");
        setEditBasic(false);
      },
      onError: () => {
        Swal.fire(t("Error"), t("Failed to update profile"), "error");
      },
    });
  };

  const handleChangeEmail = () => {
    if (!email.trim()) {
      Swal.fire(t("Error"), t("Email is required"), "error");
      return;
    }

    if (!isValidEmail(email)) {
      Swal.fire(t("Error"), t("Invalid email format"), "error");
      return;
    }

    changeEmail.mutate(
      { newEmail: email },
      {
        onSuccess: () => {
          Swal.fire(t("Success"), t("Email updated successfully"), "success");
          setEmail("");
        },
        onError: () => {
          Swal.fire(t("Error"), t("Failed to update email"), "error");
        },
      }
    );
  };

  const handleChangePassword = () => {
    if (!passwords.current || !passwords.next || !passwords.confirm) {
      Swal.fire(t("Error"), t("All password fields are required"), "error");
      return;
    }

    if (passwords.next.length < 6) {
      Swal.fire(
        t("Error"),
        t("Password must be at least 6 characters"),
        "error"
      );
      return;
    }

    if (passwords.next !== passwords.confirm) {
      Swal.fire(t("Error"), t("Passwords do not match"), "error");
      return;
    }

    changePassword.mutate(
      {
        CurrentPassword: passwords.current,
        NewPassword: passwords.next,
        ConfirmNewPassword: passwords.confirm,
      },
      {
        onSuccess: () => {
          Swal.fire(t("Success"), t("Password changed successfully"), "success");
          setPasswords({ current: "", next: "", confirm: "" });
        },
        onError: () => {
          Swal.fire(t("Error"), t("Failed to change password"), "error");
          setPasswords({ current: "", next: "", confirm: "" });
        },
      }
    );
  };

  /* ================= UI ================= */

  return (
    <Box>
      <Typography variant="h5" fontWeight={800} mb={1}>
        {t("Profile Information")}
      </Typography>

      <Typography color="text.secondary" mb={4}>
        {t("View and manage your personal information")}
      </Typography>

      <Divider sx={{ mb: 4 }} />

      {/* ===== BASIC INFO ===== */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {editBasic ? (
            <TextField
              fullWidth
              label={t("Full Name")}
              value={basicForm.fullName}
              onChange={(e) =>
                setBasicForm({ ...basicForm, fullName: e.target.value })
              }
            />
          ) : (
            <InfoItem label={t("Full Name")} value={data.fullName} />
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          {editBasic ? (
            <TextField
              fullWidth
              label={t("Phone Number")}
              value={basicForm.phoneNumber}
              onChange={(e) =>
                setBasicForm({ ...basicForm, phoneNumber: e.target.value })
              }
            />
          ) : (
            <InfoItem label={t("Phone Number")} value={data.phoneNumber} />
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          {editBasic ? (
            <TextField
              fullWidth
              label={t("City")}
              value={basicForm.city}
              onChange={(e) =>
                setBasicForm({ ...basicForm, city: e.target.value })
              }
            />
          ) : (
            <InfoItem
              label={t("City")}
              value={data.city || t("Not specified")}
              muted={!data.city}
            />
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <InfoItem label={t("Email")} value={data.email} />
        </Grid>
      </Grid>

      {/* ===== ACTIONS ===== */}
      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        {editBasic ? (
          <>
            <Button
              variant="contained"
              onClick={handleSaveBasic}
              disabled={updateProfile.isLoading}
            >
              {t("Save")}
            </Button>
            <Button variant="outlined" onClick={() => setEditBasic(false)}>
              {t("Cancel")}
            </Button>
          </>
        ) : (
          <Button variant="outlined" onClick={() => setEditBasic(true)}>
            {t("Edit Information")}
          </Button>
        )}
      </Box>

      {/* ===== CHANGE EMAIL ===== */}
      <Divider sx={{ my: 5 }} />

      <Typography variant="h6" fontWeight={700} mb={2}>
        {t("Change Email")}
      </Typography>

      <TextField
        fullWidth
        sx={{ maxWidth: 400 }}
        label={t("New Email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button
        sx={{ mt: 2 }}
        variant="contained"
        onClick={handleChangeEmail}
        disabled={changeEmail.isLoading}
      >
        {t("Update Email")}
      </Button>

      {/* ===== CHANGE PASSWORD ===== */}
      <Divider sx={{ my: 5 }} />

      <Typography variant="h6" fontWeight={700} mb={2}>
        {t("Change Password")}
      </Typography>

      <Grid container spacing={2} maxWidth={400}>
        <Grid item xs={12}>
          <TextField
            type="password"
            fullWidth
            label={t("Current Password")}
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            type="password"
            fullWidth
            label={t("New Password")}
            value={passwords.next}
            onChange={(e) =>
              setPasswords({ ...passwords, next: e.target.value })
            }
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            type="password"
            fullWidth
            label={t("Confirm Password")}
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords({ ...passwords, confirm: e.target.value })
            }
          />
        </Grid>
      </Grid>

      <Button
        sx={{ mt: 2 }}
        variant="contained"
        color="error"
        onClick={handleChangePassword}
        disabled={changePassword.isLoading}
      >
        {t("Update Password")}
      </Button>
    </Box>
  );
}

function InfoItem({ label, value, muted }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary" fontWeight={600}>
        {label}
      </Typography>
      <Typography
        sx={{
          mt: 0.5,
          fontWeight: 700,
          color: muted ? "text.secondary" : "text.primary",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
