// src/pages/Profile.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Box,
  Alert,
  Divider,
  CircularProgress,
} from '@mui/material';
import { Person, Security, LocationOn } from '@mui/icons-material';
import { authService } from '../services/authService';
import { setUser } from '../store/authSlice';
import { toast } from 'react-toastify';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    phone_number: user?.phone_number || '',
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      postal_code: user?.address?.postal_code || '',
      country: user?.address?.country || '',
    },
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileChange = (field, value) => {
    if (field.startsWith('address.')) {
      const addressField = field.split('.')[1];
      setProfileData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    try {
      const response = await authService.updateProfile(profileData);
      dispatch(setUser(response.user));
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('New password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    try {
      await authService.changePassword(user.id, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setIsChangingPassword(false);
      toast.success('Password changed successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
        My Profile
      </Typography>

      <Grid container spacing={4}>
        {/* Profile Information */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Person sx={{ mr: 1 }} />
              <Typography variant="h5">Profile Information</Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Username"
                  value={profileData.username}
                  onChange={(e) => handleProfileChange('username', e.target.value)}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={profileData.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={profileData.phone_number}
                  onChange={(e) => handleProfileChange('phone_number', e.target.value)}
                  disabled={!isEditing}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <LocationOn sx={{ mr: 1 }} />
              <Typography variant="h6">Address Information</Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Street Address"
                  value={profileData.address.street}
                  onChange={(e) => handleProfileChange('address.street', e.target.value)}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  value={profileData.address.city}
                  onChange={(e) => handleProfileChange('address.city', e.target.value)}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="State"
                  value={profileData.address.state}
                  onChange={(e) => handleProfileChange('address.state', e.target.value)}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Postal Code"
                  value={profileData.address.postal_code}
                  onChange={(e) => handleProfileChange('address.postal_code', e.target.value)}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Country"
                  value={profileData.address.country}
                  onChange={(e) => handleProfileChange('address.country', e.target.value)}
                  disabled={!isEditing}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              {isEditing ? (
                <>
                  <Button
                    variant="contained"
                    onClick={handleUpdateProfile}
                    disabled={isLoading}
                  >
                    {isLoading ? <CircularProgress size={24} /> : 'Save Changes'}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setIsEditing(false)}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Security Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Security sx={{ mr: 1 }} />
              <Typography variant="h6">Security</Typography>
            </Box>

            {!isChangingPassword ? (
              <Button
                variant="outlined"
                fullWidth
                onClick={() => setIsChangingPassword(true)}
              >
                Change Password
              </Button>
            ) : (
              <Box>
                <TextField
                  fullWidth
                  label="Current Password"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleChangePassword}
                    disabled={isLoading}
                  >
                    {isLoading ? <CircularProgress size={20} /> : 'Update'}
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setIsChangingPassword(false)}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            )}
          </Paper>

          {/* Account Info */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Account Information
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Member since: {new Date(user?.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Account type: {user?.role === 'admin' ? 'Administrator' : 'Customer'}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;

