import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Platform, Linking } from 'react-native';
import Purchases from 'react-native-purchases';
import RevenueCatUI, { PAYWALL_RESULT } from 'react-native-purchases-ui';

let configured = false;
let busy = false;
export async function subscriptionAction(action: string, plan?: string): Promise<string> {
  if (!['purchase', 'restore', 'manage'].includes(action)) return 'Unsupported subscription action.';
  if (Platform.OS !== 'ios' && Platform.OS !== 'android') return 'Use the iOS or Android app to subscribe.';
  if (Constants.executionEnvironment === ExecutionEnvironment.StoreClient) return 'Expo Go previews the app only. Store purchases require a signed development build.';
  if (process.env.EXPO_PUBLIC_BILLING_RELEASE_READY !== 'true') return 'Subscriptions are being prepared. No purchase or charge was created.';
  const apiKey = Platform.OS === 'ios' ? process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY : process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY;
  if (!apiKey) return 'Store billing has not been connected yet.';
  if (busy) return 'A subscription action is already in progress.';
  busy = true;
  try {
    if (!configured) { Purchases.configure({ apiKey }); configured = true; }
    if (action === 'purchase') {
      if (!['Essentials', 'Plus'].includes(plan || '')) return 'This plan is not available for purchase yet.';
      const offerings = await Purchases.getOfferings();
      const offering = offerings.all[plan!.toLowerCase()];
      if (!offering?.availablePackages.length) return 'This plan is not available from the store yet.';
      const result = await RevenueCatUI.presentPaywall({ offering, displayCloseButton: true });
      if (result === PAYWALL_RESULT.CANCELLED) return 'Purchase cancelled. Your plan has not changed.';
      if (result === PAYWALL_RESULT.ERROR) return 'The store could not complete the purchase. Please try again.';
    }
    const info = action === 'restore' ? await Purchases.restorePurchases() : await Purchases.getCustomerInfo();
    if (action === 'manage') {
      const url = info.managementURL || (Platform.OS === 'ios' ? 'https://apps.apple.com/account/subscriptions' : 'https://play.google.com/store/account/subscriptions');
      const parsed = new URL(url);
      if (parsed.protocol !== 'https:' || !['apps.apple.com','play.google.com'].includes(parsed.hostname)) return 'Open subscriptions in your store account to manage your plan.';
      await Linking.openURL(url); return 'Manage renewal or cancellation in your store account.';
    }
    const active = ['premium','plus','essentials'].find(tier => info.entitlements.active[tier]);
    return active ? `Store subscription verified: ${active}.` : 'No active Invoingo subscription was found for this store account.';
  } catch { return 'Store billing is unavailable. Check your connection and store account, then try again.'; }
  finally { busy = false; }
}
