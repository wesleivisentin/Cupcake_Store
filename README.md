# Cupcake Store

Aplicativo completo para auxiliar na gestão e pedidos de uma confeitaria especializada em cupcakes. O administrador cadastra os sabores e itens do cardápio, enquanto o cliente realiza pedidos e acompanha o status.


<img src="https://github.com/user-attachments/assets/9cd7335f-948b-4709-abdb-ab45646c2752" alt="image" width="300" />
<img src="https://github.com/user-attachments/assets/5f624160-bd67-4da0-ab1a-63cfeef0ba29" alt="image" width="300" />
<img src="https://github.com/user-attachments/assets/1a9fe8ea-1b83-4cea-a3eb-bdf496c3e512" alt="image" width="300" />
<img src="https://github.com/user-attachments/assets/48e78060-de06-4f82-8292-6c9adb9ee932" alt="image" width="300" />
<img src="https://github.com/user-attachments/assets/ff97f0d3-7a29-4d59-aebb-88061cf5b71b" alt="image" width="300" />





## Tecnologias Utilizadas
- React Native com Bare Workflow
- Typescript
- Expo
- Firebase Cloud Firestore (banco de dados em tempo real)
- Firebase Cloud Auth (autenticação)
- Firebase Storage (armazenamento de imagens)
- Styled Components (estilização)

## Funcionalidades
- Autenticação de usuários (clientes e administradores)
- Cadastro de itens do cardápio (sabores, preços, disponibilidade)
- Upload de imagens para os itens do cardápio
- Realização de pedidos pelos clientes
- Gerenciamento de pedidos (status: em preparo, pronto, entregue)
- Recuperação de senha via e-mail
- Notificações de status do pedido
- Organização de rotas e telas

## Como Executar

1. **Clonar o Repositório**
    ```bash
    git clone https://github.com/wesleivisentin/Cupcake_Store.git
    cd Cupcake_Store
    ```

2. **Instalar Dependências**
    ```bash
    npm install
    ```

3. **Rodar no Emulador ou Dispositivo Físico**
    Para Android:
    ```bash
    npx react-native run-android
    ```

4. **Gerar o APK para Distribuição**
    ```bash
    cd android
    ./gradlew assembleRelease
    ```
    O APK será gerado em:
    ```arduino
    android/app/build/outputs/apk/release
    ```

## Estrutura de Pastas
    ```plaintext
    src/
    ├── assets/            # Imagens e recursos estáticos
    ├── components/        # Componentes reutilizáveis
    ├── screens/           # Telas principais do app
    ├── services/          # Configuração de APIs e Firebase
    ├── styles/            # Estilos globais e temas
    └── utils/             # Funções utilitárias
    ```

## Contribuição
Sinta-se à vontade para abrir issues ou enviar pull requests para melhorias ou novas funcionalidades.

1. Faça um fork do repositório.
2. Crie uma branch para a funcionalidade:
    ```bash
    git checkout -b nova-funcionalidade
    ```
3. Faça suas alterações e commite:
    ```bash
    git commit -m "Adiciona nova funcionalidade"
    ```
4. Envie para o repositório remoto:
    ```bash
    git push origin nova-funcionalidade
    ```
5. Abra um pull request.

## Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais informações.

## Autor
Weslei Visentin  

