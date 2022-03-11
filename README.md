Teste prático - DTI

Descrição do teste:
Criar uma api para um jogo multiplayer de Jogo da Velha.

🛠️ Abrir e rodar o projeto:
1. Baixe o código em seu computador.
2.Abra um terminal no endereço do código baixado
3. No terminal, digite: npm i express node cors uuid (Esse comando baixará as depências usadas)
4. Ainda no terminal, digite: npm start
5. Teste o jogo em aplicativo que permita testar APIs, como Postman e Insomnia
6. Use o método GET na URL http://localhost:9000/game para criar um novo jogo
7. Use o método POST na URL http://localhost:9000/game/:id/movement para fazer os movimentos dos player. Onde ":id" é a id retornada em /game
8. Retorne o movimento do player e o player em formato JSON, como o seguinte exemplo: 
    {
        "id" : "fbf7d720-df90-48c4-91f7-9462deafefb8",
        "player": "X",
        "position": {
            "x": 0,
            "y": 1
        }
    }
6. Divirta-se!

✔️ Técnicas e tecnologias utilizadas

- JavaScript
- Express
- Node.js
- Cors
