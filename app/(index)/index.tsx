
import React, { useState, useEffect } from "react";
import { Stack, router } from "expo-router";
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  TextInput, 
  ScrollView,
  Alert,
  Dimensions 
} from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { Button } from "@/components/button";
import { jamaicaColors } from "@/constants/Colors";
import { commonStyles, colors } from "@/styles/commonStyles";
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedRideType, setSelectedRideType] = useState("standard");
  const [estimatedFare, setEstimatedFare] = useState(0);
  const [userLocation, setUserLocation] = useState(null);
  const [isRequestingRide, setIsRequestingRide] = useState(false);

  const rideTypes = [
    {
      id: "standard",
      name: "JamRide",
      description: "Affordable rides",
      price: "J$800",
      icon: "car",
      multiplier: 1.0
    },
    {
      id: "premium",
      name: "JamLux",
      description: "Premium comfort",
      price: "J$1200",
      icon: "car.fill",
      multiplier: 1.5
    },
    {
      id: "shared",
      name: "JamShare",
      description: "Share & save",
      price: "J$600",
      icon: "person.2",
      multiplier: 0.75
    }
  ];

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required to use this app');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
      console.log('User location:', location);
    } catch (error) {
      console.log('Error getting location:', error);
    }
  };

  const calculateFare = () => {
    if (pickupLocation && destination) {
      const baseRate = 800; // Base rate in JMD
      const selectedType = rideTypes.find(type => type.id === selectedRideType);
      const fare = Math.round(baseRate * (selectedType?.multiplier || 1.0));
      setEstimatedFare(fare);
    }
  };

  useEffect(() => {
    calculateFare();
  }, [pickupLocation, destination, selectedRideType]);

  const handleRequestRide = () => {
    if (!pickupLocation || !destination) {
      Alert.alert('Missing Information', 'Please enter both pickup and destination locations');
      return;
    }

    setIsRequestingRide(true);
    
    // Simulate ride request
    setTimeout(() => {
      setIsRequestingRide(false);
      Alert.alert(
        'Ride Requested!', 
        `Your ${rideTypes.find(t => t.id === selectedRideType)?.name} is on the way!\nEstimated fare: J$${estimatedFare}`,
        [
          { text: 'Track Ride', onPress: () => router.push('/ride-tracking') }
        ]
      );
    }, 2000);
  };

  const renderRideType = (rideType: typeof rideTypes[0]) => (
    <Pressable
      key={rideType.id}
      style={[
        styles.rideTypeCard,
        selectedRideType === rideType.id && styles.selectedRideType
      ]}
      onPress={() => setSelectedRideType(rideType.id)}
    >
      <View style={styles.rideTypeIcon}>
        <IconSymbol 
          name={rideType.icon as any} 
          size={24} 
          color={selectedRideType === rideType.id ? colors.background : colors.primary} 
        />
      </View>
      <View style={styles.rideTypeInfo}>
        <Text style={[
          styles.rideTypeName,
          selectedRideType === rideType.id && styles.selectedText
        ]}>
          {rideType.name}
        </Text>
        <Text style={[
          styles.rideTypeDescription,
          selectedRideType === rideType.id && styles.selectedTextSecondary
        ]}>
          {rideType.description}
        </Text>
      </View>
      <Text style={[
        styles.rideTypePrice,
        selectedRideType === rideType.id && styles.selectedText
      ]}>
        {rideType.price}
      </Text>
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Jamaica Ride",
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.background,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <Pressable
              onPress={() => router.push('/profile')}
              style={styles.headerButton}
            >
              <IconSymbol name="person.circle" color={colors.background} size={24} />
            </Pressable>
          ),
        }}
      />
      
      <ScrollView style={commonStyles.wrapper} showsVerticalScrollIndicator={false}>
        {/* Map Placeholder */}
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>
            🗺️ Map View
          </Text>
          <Text style={styles.mapNotice}>
            Note: react-native-maps is not supported in Natively right now.
            In a real app, this would show an interactive map with your location and nearby drivers.
          </Text>
        </View>

        {/* Location Inputs */}
        <View style={styles.locationContainer}>
          <View style={styles.inputContainer}>
            <IconSymbol name="location" color={colors.primary} size={20} />
            <TextInput
              style={styles.locationInput}
              placeholder="Pickup location"
              placeholderTextColor={colors.textSecondary}
              value={pickupLocation}
              onChangeText={setPickupLocation}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <IconSymbol name="location.fill" color={colors.accent} size={20} />
            <TextInput
              style={styles.locationInput}
              placeholder="Where to?"
              placeholderTextColor={colors.textSecondary}
              value={destination}
              onChangeText={setDestination}
            />
          </View>
        </View>

        {/* Ride Types */}
        <View style={styles.rideTypesContainer}>
          <Text style={styles.sectionTitle}>Choose your ride</Text>
          {rideTypes.map(renderRideType)}
        </View>

        {/* Fare Estimate */}
        {estimatedFare > 0 && (
          <View style={styles.fareContainer}>
            <Text style={styles.fareLabel}>Estimated Fare</Text>
            <Text style={styles.fareAmount}>J${estimatedFare}</Text>
          </View>
        )}

        {/* Request Ride Button */}
        <View style={styles.buttonContainer}>
          <Button
            onPress={handleRequestRide}
            loading={isRequestingRide}
            disabled={!pickupLocation || !destination}
            style={styles.requestButton}
          >
            {isRequestingRide ? 'Requesting Ride...' : 'Request Ride'}
          </Button>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Pressable 
            style={styles.quickAction}
            onPress={() => router.push('/ride-history')}
          >
            <IconSymbol name="clock" color={colors.primary} size={24} />
            <Text style={styles.quickActionText}>History</Text>
          </Pressable>
          
          <Pressable 
            style={styles.quickAction}
            onPress={() => router.push('/saved-places')}
          >
            <IconSymbol name="heart" color={colors.primary} size={24} />
            <Text style={styles.quickActionText}>Saved</Text>
          </Pressable>
          
          <Pressable 
            style={styles.quickAction}
            onPress={() => router.push('/help')}
          >
            <IconSymbol name="questionmark.circle" color={colors.primary} size={24} />
            <Text style={styles.quickActionText}>Help</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  mapPlaceholder: {
    height: height * 0.4,
    backgroundColor: colors.backgroundAlt,
    margin: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  mapPlaceholderText: {
    fontSize: 24,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  mapNotice: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 16,
  },
  locationContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  locationInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.text,
  },
  rideTypesContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  rideTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.border,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  selectedRideType: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  rideTypeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rideTypeInfo: {
    flex: 1,
  },
  rideTypeName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  rideTypeDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  rideTypePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  selectedText: {
    color: colors.background,
  },
  selectedTextSecondary: {
    color: colors.backgroundAlt,
  },
  fareContainer: {
    backgroundColor: colors.accent,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  fareLabel: {
    fontSize: 14,
    color: colors.black,
    marginBottom: 4,
  },
  fareAmount: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.black,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  requestButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  quickAction: {
    alignItems: 'center',
    padding: 16,
  },
  quickActionText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 8,
    fontWeight: '500',
  },
  headerButton: {
    padding: 8,
  },
});
