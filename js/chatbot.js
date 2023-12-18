const API_KEY = "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";

        async function getCompletion(prompt) {
            const response = await fetch(`https://api.openai.com/v1/completions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: "text-davinci-003",
                    prompt: prompt,
                    max_tokens: 10000,
                }),
            });

            const data = await response.json();
            return data;
        }

        document.getElementById("enviarBtn").addEventListener("click", async function () {
            // Obtener el mensaje del usuario
            var userMessage = document.getElementById("userMessage").value;

            // Agregar el mensaje del usuario al chat a la derecha
            appendUserMessage(userMessage);

            // Llamar a la API de OpenAI y manejar la respuesta
            const response = await getCompletion(userMessage);

            // Extraer la respuesta del bot y mostrarla en el chat a la izquierda
            var botResponse = response.choices[0].text;
            appendBotMessage(botResponse);
        });

        function appendUserMessage(message) {
            // Agregar el mensaje del usuario al chat a la derecha
            var chatContainer = document.getElementById("chatContainer");
            var userMessageElement = document.createElement("div");
            userMessageElement.className = "chat-message user";
            userMessageElement.innerHTML = "<p class='text-right'>" + message + "</p>";
            chatContainer.appendChild(userMessageElement);

            // Limpiar el campo de entrada del usuario
            document.getElementById("userMessage").value = "";
        }

        function appendBotMessage(message) {
            // Agregar el mensaje del bot al chat a la izquierda
            var chatContainer = document.getElementById("chatContainer");
            var botMessageElement = document.createElement("div");
            botMessageElement.className = "chat-message bot";
            botMessageElement.innerHTML = "<p>" + message + "</p>";
            chatContainer.appendChild(botMessageElement);
        }