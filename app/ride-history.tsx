
import React from "react";
import { Stack, router } from "expo-router";
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable,
  ScrollView,
  FlatList
} from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { commonStyles, colors } from "@/styles/commonStyles";

export default function RideHistoryScreen() {
  const rideHistory = [
    {
      id: "1",
      date: "Today, 2:30 PM",
      pickup: "Half Way Tree",
      destination: "New Kingston",
      fare: "J$850",
      driver: "Marcus Brown",
      status: "completed",
      rating: 5
    },
    {
      id: "2",
      date: "Yesterday, 8:15 AM",
      pickup: "Spanish Town",
      destination: "Kingston Mall",
      fare: "J$1,200",
      driver: "Jennifer Clarke",
      status: "completed",
      rating: 4
    },
    {
      id: "3",
      date: "Dec 15, 6:45 PM",
      pickup: "Norman Manley Airport",
      destination: "New Kingston Hotel",
      fare: "J$2,500",
      driver: "David Williams",
      status: "completed",
      rating: 5
    },
    {
      id: "4",
      date: "Dec 14, 11:20 AM",
      pickup: "University of the West Indies",
      destination: "Cross Roads",
      fare: "J$650",
      driver: "Michelle Thompson",
      status: "completed",
      rating: 4
    },
    {
      id: "5",
      date: "Dec 13, 4:30 PM",
      pickup: "Portmore Mall",
      destination: "Downtown Kingston",
      fare: "J$950",
      driver: "Andrew Campbell",
      status: "cancelled",
      rating: 0
    }
  ];

  const renderRideItem = ({ item }: { item: typeof rideHistory[0] }) => (
    <Pressable style={styles.rideItem}>
      <View style={styles.rideHeader}>
        <Text style={styles.rideDate}>{item.date}</Text>
        <View style={[
          styles.statusBadge,
          item.status === 'completed' ? styles.completedBadge : styles.cancelledBadge
        ]}>
          <Text style={[
            styles.statusText,
            item.status === 'completed' ? styles.completedText : styles.cancelledText
          ]}>
            {item.status === 'completed' ? 'Completed' : 'Cancelled'}
          </Text>
        </View>
      </View>

      <View style={styles.routeContainer}>
        <View style={styles.routeItem}>
          <IconSymbol name="location" color={colors.primary} size={16} />
          <Text style={styles.locationText}>{item.pickup}</Text>
        </View>
        
        <View style={styles.routeLine} />
        
        <View style={styles.routeItem}>
          <IconSymbol name="location.fill" color={colors.accent} size={16} />
          <Text style={styles.locationText}>{item.destination}</Text>
        </View>
      </View>

      <View style={styles.rideFooter}>
        <View style={styles.driverInfo}>
          <Text style={styles.driverName}>{item.driver}</Text>
          {item.status === 'completed' && (
            <View style={styles.ratingContainer}>
              {[...Array(5)].map((_, index) => (
                <IconSymbol
                  key={index}
                  name={index < item.rating ? "star.fill" : "star"}
                  color={index < item.rating ? colors.accent : colors.border}
                  size={12}
                />
              ))}
            </View>
          )}
        </View>
        <Text style={styles.fareText}>{item.fare}</Text>
      </View>
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Ride History",
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
        <FlatList
          data={rideHistory}
          renderItem={renderRideItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  rideItem: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  rideDate: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedBadge: {
    backgroundColor: colors.success + '20',
  },
  cancelledBadge: {
    backgroundColor: colors.error + '20',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  completedText: {
    color: colors.success,
  },
  cancelledText: {
    color: colors.error,
  },
  routeContainer: {
    marginBottom: 16,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: colors.border,
    marginLeft: 8,
    marginBottom: 8,
  },
  locationText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
    fontWeight: '500',
  },
  rideFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fareText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  separator: {
    height: 12,
  },
  headerButton: {
    padding: 8,
  },
});
