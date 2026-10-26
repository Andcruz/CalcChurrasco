
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput } from 'react-native';


export default function HomeScreen() {
  const [homens, setHomens] = useState('');
  const [mulheres, setMulheres] = useState('');
  const [criancas, setCrianças] = useState('');

  const totalCarne =
    Number(homens) * 400 +
    Number(mulheres) * 300 +
    Number(criancas) * 200;

  const totalCerveja = (Number(homens) + Number(mulheres)) * 1.5;

  const totalRefrigerante = (Number(homens) + Number(mulheres) + Number(criancas)) * 600;

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={{ flex: 1, width: '100%' }}>
        <ScrollView style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <ThemedView style={styles.heroSection}>

            <Image source={require('../../assets/images/LogoChurrasCalc.png')}
              style={styles.logo}
              resizeMode="contain" />

          </ThemedView>

          <ThemedText style={{ color: '#FFFFFF' }}>
            Quantidade de homens:
          </ThemedText>

          <TextInput
            style={styles.input}
            placeholder="Digite a quantidade"
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={() => { }}
            value={homens}
            onChangeText={setHomens}
          />

          <ThemedText style={{ color: '#FFFFFF' }}>
            Quantidade de mulheres:
          </ThemedText>

          <TextInput
            style={styles.input}
            placeholder="Digite a quantidade"
            keyboardType="numeric"
            returnKeyType="done"

            value={mulheres}
            onChangeText={setMulheres}
          />

          <ThemedText style={{ color: '#FFFFFF' }}>
            Quantidade de crianças:
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Digite a quantidade"
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={() => { }}
            value={criancas}
            onChangeText={setCrianças}
          />
          <ThemedView style={styles.resultCard}>
            <ThemedText
              type="subtitle"
              style={{ color: '#FF7A00' }}
            >
              Resultado do churrasco
            </ThemedText>

            <ThemedText>
              Total de carne:{' '}
              <ThemedText style={styles.resultValue}>
                {(totalCarne / 1000).toFixed(2)} kg
              </ThemedText>
            </ThemedText>

            <ThemedText>
              Total de cerveja:{' '}
              <ThemedText style={styles.resultValue}>
                {totalCerveja.toFixed(2)} litros
              </ThemedText>
            </ThemedText>

            <ThemedText>
              Total de refrigerante:{' '}
              <ThemedText style={styles.resultValue}>
                {(totalRefrigerante / 1000).toFixed(2)} litros
              </ThemedText>
            </ThemedText>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </ThemedView>
  );
}



const styles = StyleSheet.create({
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingBottom: 100,
  },
  logo: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginBottom: 5,
  },

  input: {
    color: '#FFFFFF',
    backgroundColor: '#252525',
    width: '90%',
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 16,
  },

  resultCard: {
    width: '90%',
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#383838',
    borderLeftWidth: 4,
    borderLeftColor: '#FF7A00',
    borderRadius: 14,
    padding: 20,
    gap: 18,
    marginTop: 24,
    marginBottom: 20,
  },
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    width: '100%',
  },

  heroSection: {
    alignItems: 'center',
    paddingVertical: 10,
    gap: 8,
  },
  title: {
    textAlign: 'center',
    color: '#FF7A00',
  },
  code: {
    textAlign: 'center',
    color: '#BBBBBB',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },

  resultValue: {
    color: '#FF7A00',
    fontSize: 22,
    fontWeight: 'bold',
  },

}
);
