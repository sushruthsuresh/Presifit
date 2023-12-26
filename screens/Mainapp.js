import React, { useEffect, useState } from 'react';
import { Accelerometer } from 'expo-sensors';
import { View, Text,StyleSheet, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CircularProgress from "react-native-circular-progress-indicator";
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Goals, Leaderboard, Community, Settings, Events, Rewards, Consultation, Company } from '../Components';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Logout from './Logout';


const THRESHOLD = 1.5;
const STEP_DELAY = 500;
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const user = "Charlie";
const goal = 1000;
const screenOptions = {
  tabBarShowLabel: true,
  tabBarHideOnKeyboard: true,
  headerShown: true,
  tabBarStyle: {
    position: 'absolute',
    bottom: 2,
    left: 2,
    right: 2,
    elevation: 0,
    height: 50,
    backgroundColor: "#fff",
    
  }
}

export default function MainApp() {
  const [isAppReady, setAppReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAppReady(true);
    }, 1000);
  }, []);

  if (!isAppReady) {
    return (
      <View style={styles.splashScreenContainer}>

        <Image source={require('../images/run.jpg')} style={styles.logo} />
        <Text style={styles.loadingText}>Presifit</Text>
        <FontAwesome style={styles.arrow} name="arrow-circle-right" size={50} color="black" />

      </View>
    );
  }


  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Presifit" component={TabNavigator} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="Consultation" component={Consultation} />
        <Drawer.Screen name="Events" component={Events} />
        <Drawer.Screen name="About us" component={Company} />
        <Drawer.Screen name="Logout" component={Logout} />
        {/* <Drawer.Screen name="ProfileScreen" component={ProfileScreen} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={StepCounterScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return <Ionicons name={"home"}
              size={focused ? 28 : 24} color={focused ? "black" : "grey"}
            />
          }
        }}
      />

      <Tab.Screen name="Community"
        component={Community}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return <Ionicons name="people-sharp" size={focused ? 28 : 24} color={focused ? "black" : "grey"} />
          }
        }} />

      <Tab.Screen name="Leaderboard"
        component={Leaderboard}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return <MaterialIcons name="leaderboard" size={focused ? 28 : 24} color={focused ? "black" : "grey"} />
          }
        }} />

      <Tab.Screen name="Your Goals"
        component={Goals}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return <FontAwesome5 name="tasks" size={focused ? 28 : 24} color={focused ? "black" : "grey"} />
          }
        }} />
        
        <Tab.Screen name="Rewards"
        component={Rewards}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return <MaterialCommunityIcons name={focused ? "gift-open-outline" : "gift-outline"} size={focused ? 28 : 24} color={focused ? "black" : "grey"} />
          },
        }}
      />
    </Tab.Navigator>
  );
}

const StepCounterScreen = () => {
  const [stepCount, setStepCount] = useState(0);
  const Dist = stepCount / 1300;
  const DistanceCovered = Dist.toFixed(2);
  const cal = DistanceCovered * 60;
  const caloriesBurnt = cal.toFixed(2);

  useEffect(() => {
    let lastStepTime = new Date().getTime();

    const handleSensorData = (data) => {
      const { x, y, z } = data;

      const acceleration = Math.sqrt(x * x + y * y + z * z);
      if (acceleration > THRESHOLD) {
        const currentTime = new Date().getTime();
        if (currentTime - lastStepTime > STEP_DELAY) {
          setStepCount((prevCount) => prevCount + 1);
          lastStepTime = currentTime;
        }
      }
    };

    const startAccelerometer = async () => {
      await Accelerometer.setUpdateInterval(100);
      Accelerometer.addListener(handleSensorData);
    };

    startAccelerometer();

    return () => {
      Accelerometer.removeAllListeners();
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
      <Text style={{ fontSize: 32, fontWeight: '600', color: "#0466c8" }}>Hey, {user}</Text>
      <Text style={{ fontSize: 24, marginTop: 30,marginLeft:"auto",marginRight:"auto", color: "#0466c8" }}>“Once you learn to quit, it becomes a habit.” – Vince Lombardi</Text>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress
          value={stepCount}
          maxValue={goal}
          radius={120}
          textColor={"#0466c8"}
          activeStrokeColor={"#bfd200"}
          inActiveStrokeColor={"#84dcc6"}
          activeStrokeSecondaryColor={'#168aad'}
          inActiveStrokeOpacity={0.5}
          inActiveStrokeWidth={40}
          activeStrokeWidth={40}
          title={"Step Count"}
          titleColor={"#0466c8"}
          titleStyle={{ fontWeight: "600", fontSize: 20 }}
        />
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Distance Covered</Text>
            <Text style={styles.cardText}>{DistanceCovered} km</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Calories Burned</Text>
            <Text style={styles.cardText}>{caloriesBurnt} calories</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({

  splashScreenContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    // width: 500,
    height: 700,
    resizeMode: 'contain',
    marginTop:40,

  },
  loadingText: {
    position: "absolute",
    paddingBottom: 20,
    fontSize: 40,
    marginTop: 70,
    fontWeight: 'bold',
    flex: 1,
    justifyContent: "flex-end"
  },
  arrow: {
    // position:"absolute",
    // marginBottom: 50,
    justifyContent: "flex-start",
    flex: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 70,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '45%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 5
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0466c8',
  },
  cardText: {
    fontSize: 28,
    color: '#333',
  },
});




