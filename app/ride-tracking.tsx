
import React, { useState, useEffect } from "react";
import { Stack, router } from "expo-router";
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable,
  Alert,
  Dimensions 
} from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { Button } from "@/components/button";
import { commonStyles, colors } from "@/styles/commonStyles";

const { width } = Dimensions.get('window');

export default function RideTrackingScreen() {
  const [rideStatus, setRideStatus] = useState("searching"); // searching, found, arriving, onboard, completed
  const [driverInfo, setDriverInfo] = useState({
    name: "Marcus Brown",
    rating: 4.8,
    vehicle: "Toyota Corolla",
    plateNumber: "JA 1234",
    eta: "3 min",
    phone: "+1876-555-0123"
  });
  const [rideDetails, setRideDetails] = useState({
    pickup: "Half Way Tree",
    destination: "New Kingston",
    fare: "J$850",
    distance: "5.2 km"
  });

  useEffect(() => {
    // Simulate ride progression
    const statusProgression = ["searching", "found", "arriving", "onboard"];
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < statusProgression.length - 1) {
        currentIndex++;
        setRideStatus(statusProgression[currentIndex]);
        console.log('Ride status updated to:', statusProgression[currentIndex]);
      } else {
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusMessage = () => {
    switch (rideStatus) {
      case "searching":
        return "Finding your driver...";
      case "found":
        return "Driver found!";
      case "arriving":
        return `${driverInfo.name} is on the way`;
      case "onboard":
        return "Enjoy your ride!";
      default:
        return "Ride in progress";
    }
  };

  const getStatusColor = () => {
    switch (rideStatus) {
      case "searching":
        return colors.accent;
      case "found":
        return colors.success;
      case "arriving":
        return colors.primary;
      case "onboard":
        return colors.success;
      default:
        return colors.primary;
    }
  };

  const handleCancelRide = () => {
    Alert.alert(
      'Cancel Ride',
      'Are you sure you want to cancel this ride?',
      [
        { text: 'No', style: 'cancel' },
        { 
          text: 'Yes, Cancel', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Ride Cancelled', 'Your ride has been cancelled.', [
              { text: 'OK', onPress: () => router.back() }
            ]);
          }
        }
      ]
    );
  };

  const handleCallDriver = () => {
    Alert.alert('Call Driver', `Calling ${driverInfo.name} at ${driverInfo.phone}`);
  };

  const handleCompleteRide = () => {
    Alert.alert(
      'Ride Complete!',
      `Thank you for riding with Jamaica Ride!\nFare: ${rideDetails.fare}`,
      [
        { text: 'Rate Driver', onPress: () => router.push('/rate-driver') },
        { text: 'Done', onPress: () => router.replace('/(index)') }
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Your Ride",
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.background,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={styles.headerButton}
            >
              <IconSymbol name="chevron.left" color={colors.background} size={24} />
            </Pressable>
          ),
        }}
      />
      
      <View style={commonStyles.wrapper}>
        {/* Map Placeholder */}
        <View style={styles.mapContainer}>
          <Text style={styles.mapPlaceholderText}>
            🗺️ Live Tracking
          </Text>
          <Text style={styles.mapNotice}>
            In a real app, this would show live tracking of your driver&apos;s location and route to your pickup point.
          </Text>
        </View>

        {/* Status Bar */}
        <View style={[styles.statusBar, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>{getStatusMessage()}</Text>
          {rideStatus === "searching" && (
            <View style={styles.loadingDots}>
              <View style={[styles.dot, styles.dot1]} />
              <View style={[styles.dot, styles.dot2]} />
              <View style={[styles.dot, styles.dot3]} />
            </View>
          )}
        </View>

        {/* Driver Info */}
        {rideStatus !== "searching" && (
          <View style={styles.driverCard}>
            <View style={styles.driverAvatar}>
              <Text style={styles.driverInitials}>
                {driverInfo.name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
            
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>{driverInfo.name}</Text>
              <View style={styles.ratingContainer}>
                <IconSymbol name="star.fill" color={colors.accent} size={16} />
                <Text style={styles.rating}>{driverInfo.rating}</Text>
              </View>
              <Text style={styles.vehicleInfo}>
                {driverInfo.vehicle} • {driverInfo.plateNumber}
              </Text>
            </View>

            <View style={styles.driverActions}>
              <Text style={styles.eta}>{driverInfo.eta}</Text>
              <Pressable style={styles.callButton} onPress={handleCallDriver}>
                <IconSymbol name="phone.fill" color={colors.background} size={20} />
              </Pressable>
            </View>
          </View>
        )}

        {/* Ride Details */}
        <View style={styles.rideDetailsCard}>
          <Text style={styles.cardTitle}>Trip Details</Text>
          
          <View style={styles.locationRow}>
            <IconSymbol name="location" color={colors.primary} size={20} />
            <View style={styles.locationInfo}>
              <Text style={styles.locationLabel}>Pickup</Text>
              <Text style={styles.locationText}>{rideDetails.pickup}</Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <IconSymbol name="location.fill" color={colors.accent} size={20} />
            <View style={styles.locationInfo}>
              <Text style={styles.locationLabel}>Destination</Text>
              <Text style={styles.locationText}>{rideDetails.destination}</Text>
            </View>
          </View>

          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Estimated Fare</Text>
            <Text style={styles.fareAmount}>{rideDetails.fare}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {rideStatus === "onboard" ? (
            <Button
              onPress={handleCompleteRide}
              style={styles.completeButton}
            >
              Complete Ride
            </Button>
          ) : (
            <Button
              onPress={handleCancelRide}
              variant="outline"
              style={styles.cancelButton}
            >
              Cancel Ride
            </Button>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: 300,
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
  statusBar: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.background,
    textAlign: 'center',
  },
  loadingDots: {
    flexDirection: 'row',
    marginLeft: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.background,
    marginHorizontal: 2,
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.7,
  },
  dot3: {
    opacity: 1,
  },
  driverCard: {
    backgroundColor: colors.card,
    margin: 16,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  driverAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  driverInitials: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.background,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  vehicleInfo: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  driverActions: {
    alignItems: 'center',
  },
  eta: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
  },
  callButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rideDetailsCard: {
    backgroundColor: colors.card,
    margin: 16,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationInfo: {
    marginLeft: 12,
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  locationText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  fareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  fareLabel: {
    fontSize: 16,
    color: colors.text,
  },
  fareAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  actionButtons: {
    padding: 16,
    marginTop: 'auto',
  },
  completeButton: {
    backgroundColor: colors.success,
    borderRadius: 12,
    paddingVertical: 16,
  },
  cancelButton: {
    borderColor: colors.error,
    borderRadius: 12,
    paddingVertical: 16,
  },
  headerButton: {
    padding: 8,
  },
});
