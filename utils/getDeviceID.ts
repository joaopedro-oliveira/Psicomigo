import * as SecureStore from "expo-secure-store";

export default async function getDeviceID(): Promise<string> {
  let deviceId = await SecureStore.getItemAsync("deviceId");

  if (!deviceId) {
    deviceId = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0; // Generate random hex digit
      const v = c === "x" ? r : (r & 0x3) | 0x8; // Adjust for 'y' position
      return v.toString(16); // Convert to hex string
    }); //or generate uuid
    await SecureStore.setItemAsync("deviceId", deviceId);
  }

  return deviceId;
}
