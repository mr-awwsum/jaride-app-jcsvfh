
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform 
} from "react-native";
import { Button } from "@/components/button";
import { IconSymbol } from "@/components/IconSymbol";
import { jamaicaColors } from "@/constants/Colors";
import { commonStyles, colors } from "@/styles/commonStyles";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!isLogin) {
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
      if (!fullName || !phoneNumber) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }
    }

    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Success!', 
        isLogin ? 'Welcome back to Jamaica Ride!' : 'Account created successfully!',
        [
          { text: 'Continue', onPress: () => router.replace('/(index)') }
        ]
      );
    }, 2000);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: isLogin ? "Welcome Back" : "Join Jamaica Ride",
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.background,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      
      <KeyboardAvoidingView 
        style={commonStyles.wrapper}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo/Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>🇯🇲</Text>
            </View>
            <Text style={styles.appName}>Jamaica Ride</Text>
            <Text style={styles.tagline}>
              {isLogin ? 'Welcome back, bredrin!' : 'Join the ride revolution'}
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {!isLogin && (
              <View style={styles.inputContainer}>
                <IconSymbol name="person" color={colors.primary} size={20} />
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor={colors.textSecondary}
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <IconSymbol name="envelope" color={colors.primary} size={20} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={colors.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {!isLogin && (
              <View style={styles.inputContainer}>
                <IconSymbol name="phone" color={colors.primary} size={20} />
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  placeholderTextColor={colors.textSecondary}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <IconSymbol name="lock" color={colors.primary} size={20} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={colors.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {!isLogin && (
              <View style={styles.inputContainer}>
                <IconSymbol name="lock" color={colors.primary} size={20} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor={colors.textSecondary}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>
            )}

            <Button
              onPress={handleAuth}
              loading={isLoading}
              style={styles.authButton}
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>

            <Button
              onPress={() => setIsLogin(!isLogin)}
              variant="outline"
              style={styles.switchButton}
            >
              {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
            </Button>
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>Why choose Jamaica Ride?</Text>
            
            <View style={styles.feature}>
              <IconSymbol name="checkmark.circle.fill" color={colors.success} size={24} />
              <Text style={styles.featureText}>Safe & reliable rides across Jamaica</Text>
            </View>
            
            <View style={styles.feature}>
              <IconSymbol name="dollarsign.circle.fill" color={colors.accent} size={24} />
              <Text style={styles.featureText}>Affordable local rates</Text>
            </View>
            
            <View style={styles.feature}>
              <IconSymbol name="clock.fill" color={colors.primary} size={24} />
              <Text style={styles.featureText}>24/7 availability</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
  },
  appName: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.text,
  },
  authButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 16,
  },
  switchButton: {
    borderColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
  },
  featuresContainer: {
    marginTop: 20,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  featureText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
    flex: 1,
  },
});
