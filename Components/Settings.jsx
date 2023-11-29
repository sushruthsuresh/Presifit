import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { List, Divider } from 'react-native-paper';

const SettingsSection = ({ title, options }) => {
  return (
    <View style={styles.section}>
      <List.Section>
        <List.Subheader style={styles.sectionTitle}>{title}</List.Subheader>
        {options.map((option, index) => (
          <TouchableOpacity key={index} style={styles.option}>
            <List.Item title={option} />
          </TouchableOpacity>
        ))}
      </List.Section>
      <Divider />
    </View>
  );
};

const Settings = () => {
  const profileOptions = ['Edit Profile', 'Change Password'];
  const appOptions = ['Notifications', 'Theme', 'Language'];
  const accountOptions = ['Logout', 'Delete Account'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <SettingsSection title="Profile" options={profileOptions} />
        <SettingsSection title="App Preferences" options={appOptions} />
        <SettingsSection title="Account Settings" options={accountOptions} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a8dadc',
    marginBottom:50
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  section: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 16,
    paddingBottom: 8,
    color: '#444',
  },
  option: {
    paddingLeft: 16,
  },
});

export default Settings;
