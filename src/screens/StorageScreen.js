import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const StorageScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [storageData, setStorageData] = useState([
    {
      id: 1,
      name: 'Battery Bank 1',
      voltage: 48.2,
      chargeCurrent: 12.5,
      dischargeCurrent: 0.0,
      stateOfCharge: 85.5,
      energyStored: 42.8,
      temperature: 28.5,
      status: 'Charging',
    },
    {
      id: 2,
      name: 'Battery Bank 2',
      voltage: 47.8,
      chargeCurrent: 0.0,
      dischargeCurrent: 8.2,
      stateOfCharge: 72.3,
      energyStored: 36.2,
      temperature: 31.2,
      status: 'Discharging',
    },
    {
      id: 3,
      name: 'Battery Bank 3',
      voltage: 49.1,
      chargeCurrent: 15.2,
      dischargeCurrent: 0.0,
      stateOfCharge: 92.1,
      energyStored: 46.1,
      temperature: 26.8,
      status: 'Charging',
    },
  ]);

  // Auto-update data every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStorageData(prevData => 
        prevData.map(battery => ({
          ...battery,
          voltage: +(47.5 + Math.random() * 2).toFixed(1), // 47.5-49.5V
          chargeCurrent: battery.status === 'Charging' ? +(Math.random() * 20).toFixed(1) : 0,
          dischargeCurrent: battery.status === 'Discharging' ? +(Math.random() * 15).toFixed(1) : 0,
          stateOfCharge: +Math.max(20, Math.min(100, battery.stateOfCharge + (Math.random() - 0.5) * 2)).toFixed(1),
          energyStored: +(30 + Math.random() * 20).toFixed(1), // 30-50 kWh
          temperature: +(25 + Math.random() * 10).toFixed(1), // 25-35°C
          status: Math.random() > 0.7 ? (battery.status === 'Charging' ? 'Discharging' : 'Charging') : battery.status,
        }))
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const getParameterIcon = (parameter) => {
    const icons = {
      voltage: 'flash',
      chargeCurrent: 'trending-up',
      dischargeCurrent: 'trending-down',
      stateOfCharge: 'battery-half',
      energyStored: 'speedometer',
      temperature: 'thermometer',
    };
    return icons[parameter] || 'information-circle';
  };

  const getParameterColor = (parameter) => {
    const colors = {
      voltage: '#3b82f6',
      chargeCurrent: '#10b981',
      dischargeCurrent: '#f59e0b',
      stateOfCharge: '#8b5cf6',
      energyStored: '#06b6d4',
      temperature: '#ef4444',
    };
    return colors[parameter] || '#6b7280';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Charging': return '#10b981';
      case 'Discharging': return '#f59e0b';
      case 'Idle': return '#6b7280';
      case 'Fault': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getBatteryIcon = (soc) => {
    if (soc >= 90) return 'battery-full';
    if (soc >= 75) return 'battery-three-quarters';
    if (soc >= 50) return 'battery-half';
    if (soc >= 25) return 'battery-quarter';
    return 'battery-dead';
  };

  const renderStorageCard = (battery) => {
    const parameters = [
      { key: 'voltage', label: 'Voltage', value: `${battery.voltage} V`, unit: 'V' },
      { key: 'chargeCurrent', label: 'Charge Current', value: `${battery.chargeCurrent} A`, unit: 'A' },
      { key: 'dischargeCurrent', label: 'Discharge Current', value: `${battery.dischargeCurrent} A`, unit: 'A' },
      { key: 'stateOfCharge', label: 'State of Charge', value: `${battery.stateOfCharge}%`, unit: '%' },
      { key: 'energyStored', label: 'Energy Stored', value: `${battery.energyStored} kWh`, unit: 'kWh' },
      { key: 'temperature', label: 'Temperature', value: `${battery.temperature}°C`, unit: '°C' },
    ];

    return (
      <View key={battery.id} style={styles.storageCard}>
        <LinearGradient
          colors={['#8b5cf6', '#7c3aed']}
          style={styles.cardHeader}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.headerContent}>
            <View style={styles.titleContainer}>
              <Ionicons name={getBatteryIcon(battery.stateOfCharge)} size={28} color="#ffffff" />
              <Text style={styles.batteryTitle}>{battery.name}</Text>
            </View>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(battery.status) }
            ]}>
              <Text style={styles.statusText}>{battery.status}</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.parametersContainer}>
          <View style={styles.parametersGrid}>
            {parameters.map((param, index) => (
              <View key={index} style={styles.parameterCard}>
                <View style={styles.parameterHeader}>
                  <Ionicons
                    name={getParameterIcon(param.key)}
                    size={20}
                    color={getParameterColor(param.key)}
                  />
                  <Text style={styles.parameterLabel}>{param.label}</Text>
                </View>
                <Text style={[styles.parameterValue, { color: getParameterColor(param.key) }]}>
                  {param.value}
                </Text>
              </View>
            ))}
          </View>

          {/* Battery Level Indicator */}
          <View style={styles.batteryLevelContainer}>
            <Text style={styles.batteryLevelTitle}>Battery Level</Text>
            <View style={styles.batteryLevelBar}>
              <LinearGradient
                colors={battery.stateOfCharge > 50 ? ['#10b981', '#34d399'] : ['#f59e0b', '#fbbf24']}
                style={[styles.batteryLevelFill, { width: `${battery.stateOfCharge}%` }]}
              />
            </View>
            <Text style={styles.batteryLevelText}>{battery.stateOfCharge}% Charged</Text>
          </View>
        </View>
      </View>
    );
  };

  const totalEnergyStored = storageData.reduce((sum, battery) => sum + battery.energyStored, 0);
  const avgStateOfCharge = (storageData.reduce((sum, battery) => sum + battery.stateOfCharge, 0) / storageData.length).toFixed(1);

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#8b5cf6', '#7c3aed']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Energy Storage Monitoring</Text>
        <Text style={styles.headerSubtitle}>Real-time battery storage performance</Text>
        
        {/* Summary Stats */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{totalEnergyStored.toFixed(1)} kWh</Text>
            <Text style={styles.summaryLabel}>Total Energy</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{avgStateOfCharge}%</Text>
            <Text style={styles.summaryLabel}>Avg SOC</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{storageData.filter(b => b.status === 'Charging').length}</Text>
            <Text style={styles.summaryLabel}>Charging</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
          <Ionicons name="refresh" size={20} color="#ffffff" />
          <Text style={styles.refreshText}>Refresh Data</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Storage Systems List */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.cardsContainer}>
          {storageData.map(renderStorageCard)}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#e2e8f0',
    marginBottom: 25,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 5,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#e2e8f0',
    textAlign: 'center',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'center',
  },
  refreshText: {
    color: '#ffffff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
  },
  cardsContainer: {
    padding: 20,
    paddingTop: 30,
  },
  storageCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  batteryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  parametersContainer: {
    padding: 20,
  },
  parametersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  parameterCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#8b5cf6',
  },
  parameterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  parameterLabel: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 8,
    fontWeight: '500',
  },
  parameterValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  batteryLevelContainer: {
    marginTop: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 15,
    padding: 20,
  },
  batteryLevelTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    textAlign: 'center',
  },
  batteryLevelBar: {
    height: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  batteryLevelFill: {
    height: '100%',
    borderRadius: 6,
  },
  batteryLevelText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default StorageScreen;