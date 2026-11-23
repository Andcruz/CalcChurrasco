
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { Picker } from '@react-native-picker/picker';
import { Checkbox } from 'expo-checkbox';
import { useState } from 'react';
import { Image, Keyboard, Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';


type ItemAdicional = {
  id: string;
  nome: string;
  quantidade: number;
  categoria: string;
  comprado: boolean;
};
export default function HomeScreen() {
  const [homens, setHomens] = useState('');
  const [mulheres, setMulheres] = useState('');
  const [criancas, setCrianças] = useState('');
  const [carneComprada, setCarneComprada] = useState(false);
  const [carvaoComprado, setCarvaoComprado] = useState(false);
  const [cervejaComprada, setCervejaComprada] = useState(false);
  const [refrigeranteComprado, setRefrigeranteComprado] = useState(false);
  const [itensAdicionais, setItensAdicionais] = useState<ItemAdicional[]>([]);
  const [nomeItem, setNomeItem] = useState('');
  const [quantidadeItem, setQuantidadeItem] = useState('');
  const [categoriaItem, setCategoriaItem] = useState('Carne');
  const itensComprados =
    [carneComprada, cervejaComprada, refrigeranteComprado]
      .filter(Boolean).length +
    itensAdicionais.filter(item => item.comprado).length;

  const adicionarItem = () => {
    if (nomeItem.trim() === '' || quantidadeItem.trim() === '') {
      return;
    }

    const novoItem = {
      id: Date.now().toString(),
      nome: nomeItem,
      quantidade: Number(quantidadeItem),
      categoria: categoriaItem,
      comprado: false,
    };

    setItensAdicionais([...itensAdicionais, novoItem]);

    setNomeItem('');
    setQuantidadeItem('');
    Keyboard.dismiss();
  };

  const totalCarne =
    Number(homens) * 360 +
    Number(mulheres) * 300 +
    Number(criancas) * 180;

  const totalCarneAdicional = itensAdicionais
    .filter(item => item.categoria === 'Carne')
    .reduce((total, item) => total + Number(item.quantidade), 0);

  const totalCarneFinal = totalCarne + totalCarneAdicional;

  const totalCarvao = Math.ceil(totalCarneFinal / 1000);

  const totalCerveja = (Number(homens) + Number(mulheres)) * 1.5;

  const totalRefrigerante =
    (Number(homens) + Number(mulheres) + Number(criancas)) * 300;

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >

        <ThemedView style={{ width: '100%', alignItems: 'center' }}>
          <ThemedView style={styles.heroSection}>

            <Image source={require('../../assets/images/LogoChurrasCalc.png')}
              style={styles.logo}
              resizeMode="contain" />

          </ThemedView>

        </ThemedView>

        <ThemedText style={{ color: '#FFFFFF' }}>
          Quantidade de homens:
        </ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Digite a quantidade"
          keyboardType="numeric"
          returnKeyType="done"
          onSubmitEditing={() => Keyboard.dismiss()}
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
          onSubmitEditing={() => Keyboard.dismiss()}
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
              {(totalCarneFinal / 1000).toFixed(2)} kg
            </ThemedText>
          </ThemedText>
          
          <ThemedText>
            Total de carvão:{' '}
            <ThemedText style={styles.resultValue}>
              {totalCarvao} kg
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
        <ThemedView style={styles.shoppingCard}>
          <ThemedText type="subtitle" style={{ color: '#FF7A00' }}>
            Lista de compras
          </ThemedText>
          <ThemedText style={{ color: '#BBBBBB' }}>
            Itens comprados: {itensComprados} de {3 + itensAdicionais.length}
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Nome do produto"
            placeholderTextColor="#999999"
            value={nomeItem}
            onChangeText={setNomeItem}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantidade em gramas"
            placeholderTextColor="#999999"
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={() => Keyboard.dismiss()}
            value={quantidadeItem}
            onChangeText={setQuantidadeItem}
          />
          <Picker
            selectedValue={categoriaItem}
            onValueChange={(itemValue) => setCategoriaItem(itemValue)}
            style={{
              width: '90%',
              backgroundColor: '#252525',
              color: '#FFFFFF',
            }}
          >
            <Picker.Item label="Carne" value="Carne" />
            <Picker.Item label="Acompanhamento" value="Acompanhamento" />
            <Picker.Item label="Bebida" value="Bebida" />
            <Picker.Item label="Outros" value="Outros" />
          </Picker>
          <Pressable
            style={styles.addButton}
            onPress={adicionarItem}
            accessible={true}
          >
            <ThemedText style={{ color: '#FFFFFF', fontWeight: 'bold' }}>
              + Adicionar item
            </ThemedText>
          </Pressable>

          <ThemedView style={styles.shoppingItem}>
            <Checkbox
              value={carneComprada}
              onValueChange={setCarneComprada}
              color="#FF7A00"
            />
            <ThemedText
              style={{
                textDecorationLine: carneComprada ? 'line-through' : 'none',
                opacity: carneComprada ? 0.5 : 1,
              }}
            >
              Carne — {(totalCarneFinal / 1000).toFixed(2)} kg
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.shoppingItem}>
            <Checkbox
              value={cervejaComprada}
              onValueChange={setCervejaComprada}
              color="#FF7A00"
            />
            <ThemedText
              style={{
                textDecorationLine: cervejaComprada ? 'line-through' : 'none',
                opacity: cervejaComprada ? 0.5 : 1,
              }}
            >
              Cerveja — {totalCerveja.toFixed(2)} litros
            </ThemedText>


          </ThemedView>

          <ThemedView style={styles.shoppingItem}>
            <Checkbox
              value={refrigeranteComprado}
              onValueChange={setRefrigeranteComprado}
              color="#FF7A00"
            />
            <ThemedText
              style={{
                textDecorationLine: refrigeranteComprado ? 'line-through' : 'none',
                opacity: refrigeranteComprado ? 0.5 : 1,
              }}
            >
              Refrigerante — {(totalRefrigerante / 1000).toFixed(2)} litros
            </ThemedText>

          </ThemedView>
          {['Carne', 'Acompanhamento', 'Bebida', 'Outros'].map((categoria) => {
            const produtos = itensAdicionais.filter(
              (item) => item.categoria === categoria
            );

            if (produtos.length === 0) return null;

            return (
              <ThemedView key={categoria} style={{ width: '100%', gap: 8 }}>
                <ThemedText
                  style={{ color: '#FF7A00', fontWeight: 'bold', marginTop: 10 }}
                >
                  {categoria}
                </ThemedText>

                {produtos.map((item) => (
                  <ThemedView key={item.id} style={styles.shoppingItem}>
                    <Checkbox
                      value={item.comprado}
                      onValueChange={(valor) => {
                        setItensAdicionais(
                          itensAdicionais.map((produto) =>
                            produto.id === item.id
                              ? { ...produto, comprado: valor }
                              : produto
                          )
                        );
                      }}
                      color="#FF7A00"
                    />

                    <ThemedText
                      style={{
                        textDecorationLine: item.comprado ? 'line-through' : 'none',
                        opacity: item.comprado ? 0.5 : 1,
                      }}
                    >
                      {item.nome} — {item.quantidade} {
                        item.categoria === 'Bebida'
                          ? 'L'
                          : item.categoria === 'Outros'
                            ? 'un.'
                            : 'g'
                      }
                    </ThemedText>
                  </ThemedView>
                ))}
              </ThemedView>
            );
          })}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}



const styles = StyleSheet.create({
  shoppingCard: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 14,
    marginTop: 15,
    gap: 12,
    alignItems: 'center',
  },

  shoppingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    gap: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#FF7A00',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
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
