
import React from "react";
import { Stack, router } from "expo-router";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView,
  Dimensions,
  Image
} from "react-native";
import { Button } from "@/components/button";
import { IconSymbol } from "@/components/IconSymbol";
import { commonStyles, colors } from "@/styles/commonStyles";

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const features = [
    {
      icon: "car.fill",
      title: "Safe Rides",
      description: "Verified drivers and secure rides across Jamaica"
    },
    {
      icon: "dollarsign.circle.fill",
      title: "Fair Prices",
      description: "Transparent pricing with no hidden fees"
    },
    {
      icon: "clock.fill",
      title: "24/7 Service",
      description: "Available anytime, anywhere in Jamaica"
    }
  ];

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      
      <ScrollView style={commonStyles.wrapper} contentContainerStyle={styles.container}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.flagEmoji}>🇯🇲</Text>
          </View>
          
          <Text style={styles.appTitle}>Jamaica Ride</Text>
          <Text style={styles.tagline}>Your trusted ride partner across the island</Text>
          
          {/* Illustration placeholder */}
          <View style={styles.illustrationContainer}>
            <Text style={styles.illustrationEmoji}>🚗</Text>
            <Text style={styles.illustrationText}>Ready to ride?</Text>
          </View>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={styles.featureIcon}>
                <IconSymbol name={feature.icon as any} color={colors.primary} size={24} />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* CTA Buttons */}
        <View style={styles.ctaSection}>
          <Button
            onPress={() => router.push('/auth')}
            style={styles.primaryButton}
          >
            Get Started
          </Button>
          
          <Button
            onPress={() => router.replace('/(index)')}
            variant="outline"
            style={styles.secondaryButton}
          >
            Continue as Guest
          </Button>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    boxShadow: '0px 8px 24px rgba(0, 150, 57, 0.3)',
    elevation: 8,
  },
  flagEmoji: {
    fontSize: 48,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  illustrationContainer: {
    alignItems: 'center',
    padding: 40,
  },
  illustrationEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  illustrationText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  featuresSection: {
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  ctaSection: {
    marginBottom: 32,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 18,
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(0, 150, 57, 0.3)',
    elevation: 4,
  },
  secondaryButton: {
    borderColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 18,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
});
