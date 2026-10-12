import { useRef, useState } from 'react';
import { ActivityIndicator, Linking, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { WebView } from 'react-native-webview';
import { subscriptionAction } from './billing';

export default function App() {
  const web = useRef<WebView>(null);
  const [base, setBase] = useState(process.env.EXPO_PUBLIC_PREVIEW_URL || '');
  const [source, setSource] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [back, setBack] = useState(false);
  function openPreview(landing = false) {
    try {
      const url = new URL(base.trim());
      if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error('Enter the preview server’s HTTP or HTTPS address.');
      if (['localhost', '127.0.0.1', '0.0.0.0'].includes(url.hostname)) throw new Error('Use the computer’s Wi-Fi address. Localhost on your phone points to the phone itself.');
      setSource(landing ? url.origin + '/' : `${url.origin}/mobile.html?embedded=1&platform=${Platform.OS === 'android' ? 'android' : 'ios'}#welcome`);
      setMessage('');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Check the preview address.'); }
  }
  return <SafeAreaProvider><SafeAreaView style={styles.shell} edges={['top', 'bottom']}><StatusBar style="dark" />
    {source ? <>
      <View style={styles.toolbar}><Pressable accessibilityRole="button" accessibilityLabel={back ? 'Go back' : 'Preview menu'} style={styles.tool} onPress={() => back ? web.current?.goBack() : setSource(null)}><Text style={styles.toolText}>{back ? '‹ Back' : '‹ Menu'}</Text></Pressable><Text style={styles.smallBrand}>invoingo.</Text><Pressable accessibilityRole="button" accessibilityLabel="Reload preview" style={styles.tool} onPress={() => web.current?.reload()}><Text style={styles.toolText}>Reload ↻</Text></Pressable></View>
      <WebView ref={web} style={styles.web} source={{ uri: source }} domStorageEnabled startInLoadingState
        onMessage={async event => {
          try {
            if (new URL(event.nativeEvent.url).origin !== new URL(source).origin) return;
            const request = JSON.parse(event.nativeEvent.data);
            if (request.type !== 'invoingo.subscription') return;
            const message = await subscriptionAction(request.action, request.plan);
            const result = JSON.stringify({ type: 'invoingo.subscription.result', message });
            web.current?.injectJavaScript(`window.dispatchEvent(new MessageEvent('message',{data:${JSON.stringify(result)}}));true;`);
          } catch { setMessage('Subscription request could not be opened.'); }
        }}
        onNavigationStateChange={state => setBack(state.canGoBack)}
        onShouldStartLoadWithRequest={request => {
          if (request.url === 'about:blank' || request.url.startsWith(new URL(source).origin + '/')) return true;
          if (/^(https?:|mailto:|sms:|whatsapp:)/.test(request.url)) Linking.openURL(request.url).catch(() => setMessage('This link could not be opened.'));
          return false;
        }}
        renderLoading={() => <View style={styles.loading}><ActivityIndicator color="#163300" /><Text style={styles.copy}>Opening your workday…</Text></View>}
        renderError={() => <View style={styles.error}><Text style={styles.subheading}>Let’s reconnect.</Text><Text style={styles.copy}>Keep your computer’s preview server running and connect your phone to the same Wi-Fi. Check the address in the preview menu.</Text><Pressable accessibilityRole="button" style={styles.action} onPress={() => setSource(null)}><Text style={styles.actionText}>Change preview address</Text></Pressable></View>} />
      {message ? <Text style={styles.errorMessage}>{message}</Text> : null}
    </> : <ScrollView contentContainerStyle={styles.setup} keyboardShouldPersistTaps="handled">
      <Text style={styles.brand}>↗ invoingo.</Text><Text style={styles.eyebrow}>THE EXPO GO PREVIEW</Text><Text style={styles.heading}>{'GOOD WORK.\nON THE GO.'}</Text><Text style={styles.copy}>Explore all 23 screens, including MioBot on your own phone. The demo uses fictional data and saves changes in this device’s preview.</Text>
      <Text style={styles.label}>Computer’s preview address</Text><TextInput accessibilityLabel="Preview server address" style={styles.input} value={base} onChangeText={setBase} autoCapitalize="none" autoCorrect={false} keyboardType="url" placeholder="http://192.168.1.10:4185" placeholderTextColor="#687160" />
      {message ? <Text accessibilityRole="alert" style={styles.errorMessage}>{message}</Text> : null}
      <Pressable accessibilityRole="button" style={styles.action} onPress={() => openPreview()}><Text style={styles.actionText}>Explore the mobile app ↗</Text></Pressable><Pressable accessibilityRole="button" style={styles.secondary} onPress={() => openPreview(true)}><Text style={styles.toolText}>View the landing page ↗</Text></Pressable>
      <Text style={styles.note}>Keep the preview server running on your computer. Connect both devices to the same Wi-Fi. This is an Expo preview of the working web app; App Store and Play Store builds are still in development.</Text>
    </ScrollView>}
  </SafeAreaView></SafeAreaProvider>;
}
const styles = StyleSheet.create({
  shell:{flex:1,backgroundColor:'#e2f6d5'},web:{flex:1,backgroundColor:'#fff'},setup:{padding:28,paddingTop:38,flexGrow:1},brand:{fontSize:34,fontWeight:'900',color:'#163300',letterSpacing:-2},eyebrow:{fontSize:12,letterSpacing:1.5,fontWeight:'700',color:'#163300',marginTop:46},heading:{fontSize:44,lineHeight:47,fontWeight:'900',letterSpacing:-2.5,color:'#163300',marginTop:20},copy:{fontSize:16,lineHeight:23,color:'#56624e',marginTop:20},label:{fontSize:14,fontWeight:'700',color:'#163300',marginTop:34,marginBottom:10},input:{backgroundColor:'#fff',borderRadius:14,padding:16,fontSize:16,color:'#163300',borderWidth:1,borderColor:'#bcccaf'},action:{backgroundColor:'#163300',borderRadius:40,padding:18,alignItems:'center',marginTop:22,minHeight:52},actionText:{fontSize:16,fontWeight:'700',color:'#9fe870'},secondary:{alignItems:'center',padding:18,minHeight:48},toolText:{color:'#163300',fontSize:14,fontWeight:'600'},note:{fontSize:12,lineHeight:18,color:'#56624e',marginTop:26},toolbar:{height:52,flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:12,backgroundColor:'#e2f6d5'},tool:{padding:12,minHeight:44},smallBrand:{fontSize:22,letterSpacing:-1,fontWeight:'900',color:'#163300'},loading:{position:'absolute',top:0,right:0,bottom:0,left:0,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'},error:{flex:1,padding:30,justifyContent:'center',backgroundColor:'#fff'},subheading:{fontSize:32,color:'#163300',fontWeight:'900'},errorMessage:{fontSize:14,lineHeight:19,color:'#9c341f',paddingVertical:10}
});
