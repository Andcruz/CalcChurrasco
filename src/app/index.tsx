import { AnimatedIcon } from '@/components/animated-icon';
import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import * as Device from 'expo-device';
import { useState } from 'react';
import { Platform, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  const [homens, setHomens] = useState('');
  const [mulheres, setMulheres] = useState('');
  const [criancas, setCrianças] = useState('');

  const totalCarne =
  Number(homens) * 400 +
  Number(mulheres) * 300 +
  Number(criancas) * 200;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          <ThemedText type="title" style={styles.title}>
            Calculadora de Churrasco
          </ThemedText>
        </ThemedView>

        <ThemedText type="code" style={styles.code}>
          Calcule a quantidade ideal para o seu churrasco!
        </ThemedText>

       <ThemedText>Quantidade de homens:</ThemedText>
    
        <TextInput
          placeholder="Digite a quantidade"
          keyboardType="numeric"
          returnKeyType="done"
          onSubmitEditing={() => {}}
          value={homens}
          onChangeText={setHomens}
        />
          
       <ThemedText>Quantidade de mulheres:</ThemedText> 
    
        <TextInput placeholder="Digite a quantidade"
          keyboardType="numeric"
          returnKeyType="done"
          
          value={mulheres}
          onChangeText={setMulheres}
        />
          
       <ThemedText>Quantidade de crianças:</ThemedText>
        <TextInput placeholder="Digite a quantidade"
          keyboardType="numeric"
          returnKeyType="done"
          onSubmitEditing={() => {}}
          value={criancas}
          onChangeText={setCrianças}
        />
           <ThemedText>
    Total de carne: {(totalCarne / 1000).toFixed(2)} kg
  </ThemedText>

        <ThemedView type="backgroundElement" style={styles.stepContainer}>
          <HintRow
            title="Try editing"
            hint={<ThemedText type="code">src/app/index.tsx</ThemedText>}
          />
          <HintRow title="Dev tools" hint={getDevMenuHint()} />
          <HintRow
            title="Fresh start"
            hint={<ThemedText type="code">npm run reset-project</ThemedText>}
          />
        </ThemedView>

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
