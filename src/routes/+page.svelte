<script>
  let question = ""
  let answer = ""
  let isLoading = false

  async function sendQuestion() {
    if (!question) return
    isLoading = true

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: question })
      })
      const data = await response.json()

      if (data.error) {
        answer = `Error: ${data.error}`
      } else {
        answer = data.choices[0].message.content
      }
    } catch (error) {
      answer = "Error fetching the response"
    } finally {
      isLoading = false
      question = ""
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      sendQuestion()
    }
  }

  // Новая функция для клика по карточке
  function handleCardClick(cardQuestion) {
    question = cardQuestion
    sendQuestion() // Сразу отправляем запрос
  }
</script>

<main>
  <section class="container">
    <div class="logo">
    </div>

    <div class="card-grid">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="card" on:click={() => handleCardClick("How could I find the keys?")}>
        How could I find the keys?
      </div>
      <div class="card" on:click={() => handleCardClick("Can I pay with PayPal?")}>
        Can I pay with PayPal?
      </div>
      <div class="card" on:click={() => handleCardClick("Do I need to pay more, if I take my dog with?")}>
        Do I need to pay more, if I take my dog with?
      </div>
    </div>

    <div class="chat-section">
      <input
        bind:value={question}
        placeholder="Type your question here..."
        on:keypress={handleKeyPress}
        class="input-field"
      />
      <button on:click={sendQuestion} disabled={isLoading} class="send-btn">
        {isLoading ? "Loading..." : "Send"}
      </button>

      {#if answer}
        <p class="answer">{answer}</p>
      {/if}
    </div>
  </section>
</main>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: #f7f7f8;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
  }

  .logo img {
    width: 80px;
    margin-bottom: 20px;
  }

  .card-grid {
    display: flex;
    gap: 20px;
    margin-bottom: 40px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .card {
    padding: 20px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
    text-align: center;
  }

  .card:hover {
    background-color: #f0f0f0;
  }

  .chat-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .input-field {
    padding: 10px;
    width: 300px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    transition: border-color 0.3s;
  }

  .input-field:focus {
    border-color: #5a67d8;
    outline: none;
  }

  .send-btn {
    padding: 10px 20px;
    background-color: #5a67d8;
    color: white;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .send-btn:disabled {
    background-color: #9f9f9f;
  }

  .send-btn:hover:not(:disabled) {
    background-color: #434aa8;
  }

  .answer {
    margin-top: 20px;
    padding: 15px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-size: 1rem;
    width: 100%;
    max-width: 500px;
    text-align: center;
  }
</style>