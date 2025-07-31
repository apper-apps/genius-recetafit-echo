const WEBHOOK_URL = "https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTZhMDYzMjA0MzA1MjZhNTUzMjUxMzQi_pc";

const webhookService = {
  async sendData(data) {
    try {
      // Add a small delay to simulate processing
      await new Promise(resolve => setTimeout(resolve, 300));

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Try to parse response if it's JSON, otherwise just return success
      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        // If response is not JSON, that's okay for webhooks
        result = { success: true, status: response.status };
      }

      return result;
    } catch (error) {
      console.error("Error sending webhook data:", error);
      
      // For demo purposes, we'll not throw an error so the user experience isn't affected
      // In production, you might want to handle this differently
      console.warn("Webhook failed but continuing with user flow");
      return { success: false, error: error.message };
    }
  }
};

export default webhookService;