import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Platform, Linking } from 'react-native';
import Purchases from 'react-native-purchases';

export type BillingResult = {
  message: string;
  ready?: boolean;
  activePlan?: string | null;
  catalog?: { plan: string; period: string; price: string; productId: string }[];
};
let configured = false;
let busy = false;
const tiers = ['essentials', 'plus'] as const;
export async function subscriptionAction(action: string, plan?: string, period = 'monthly'): Promise<BillingResult> {
  const unavailable = (message: string): BillingResult => ({ message, ready: false, catalog: [] });
  if (!['catalog', 'purchase', 'restore', 'manage'].includes(action)) return unavailable('Unsupported subscription action.');
  if (Platform.OS !== 'ios' && Platform.OS !== 'android') return unavailable('Use the iOS or Android app to subscribe.');
  if (Constants.executionEnvironment === ExecutionEnvironment.StoreClient) return unavailable('Expo Go previews the app only. Store purchases require a signed development build.');
  if (process.env.EXPO_PUBLIC_BILLING_RELEASE_READY !== 'true') return unavailable('Subscriptions are being prepared. No purchase or charge was created.');
  const apiKey = Platform.OS === 'ios' ? process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY : process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY;
  if (!apiKey) return unavailable('Store billing has not been connected yet.');
  if (busy) return { message: 'A subscription action is already in progress.' };
  busy = true;
  try {
    if (!configured) { Purchases.configure({ apiKey }); configured = true; }
    const activePlan = (info: Awaited<ReturnType<typeof Purchases.getCustomerInfo>>) => ['premium', 'plus', 'essentials'].find(tier => info.entitlements.active[tier]) || null;
    if (action === 'catalog' || action === 'purchase') {
      const offerings = await Purchases.getOfferings();
      const catalog: NonNullable<BillingResult['catalog']> = [];
      for (const tier of tiers) {
        const offering = offerings.all[tier];
        for (const billingPeriod of ['monthly', 'annual'] as const) {
          const storePackage = billingPeriod === 'annual' ? offering?.annual : offering?.monthly;
          if (storePackage) catalog.push({ plan: tier, period: billingPeriod, price: storePackage.product.priceString, productId: storePackage.product.identifier });
        }
      }
      if (action === 'catalog') {
        const info = await Purchases.getCustomerInfo();
        return { message: catalog.length ? 'Prices supplied by your store. Choose a plan and billing period.' : 'Store products are not configured yet.', catalog, ready: catalog.length > 0, activePlan: activePlan(info) };
      }
      const tier = plan?.toLowerCase();
      if (!tiers.includes(tier as typeof tiers[number]) || !['monthly', 'annual'].includes(period)) return { message: 'This plan is not available for purchase.' };
      const offering = offerings.all[tier!];
      const storePackage = period === 'annual' ? offering?.annual : offering?.monthly;
      if (!storePackage) return { message: 'This plan and billing period are not available from your store yet.' };
      const purchase = await Purchases.purchasePackage(storePackage);
      const active = activePlan(purchase.customerInfo);
      return { message: active ? `Store subscription verified: ${active}.` : 'The store has not confirmed an active subscription yet. Pending purchases do not unlock a plan.', activePlan: active, catalog, ready: true };
    }
    const info = action === 'restore' ? await Purchases.restorePurchases() : await Purchases.getCustomerInfo();
    if (action === 'manage') {
      const url = info.managementURL || (Platform.OS === 'ios' ? 'https://apps.apple.com/account/subscriptions' : 'https://play.google.com/store/account/subscriptions');
      const parsed = new URL(url);
      if (parsed.protocol !== 'https:' || !['apps.apple.com', 'play.google.com'].includes(parsed.hostname)) return { message: 'Open subscriptions in your store account to manage your plan.' };
      await Linking.openURL(url);
      return { message: 'Manage renewal or cancellation in your store account.', activePlan: activePlan(info) };
    }
    const active = activePlan(info);
    return { message: active ? `Purchases restored: ${active}.` : 'No active Invoingo subscription was found for this store account.', activePlan: active };
  } catch (error) {
    if (error && typeof error === 'object' && 'userCancelled' in error && error.userCancelled) return { message: 'Purchase cancelled. Your plan has not changed.' };
    return { message: 'Store billing is unavailable. Check your connection and store account, then try again.' };
  } finally { busy = false; }
}
