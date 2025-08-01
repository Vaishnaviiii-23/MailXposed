function getDomainFromEmail(email) {
  if (!email.includes('@')) return null;
  return email.split('@')[1];
}

async function checkBreach() {
  const emailInput = document.getElementById("emailInput").value.trim();
  const domain = getDomainFromEmail(emailInput);
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = ""; // Clear previous result

  if (!emailInput || !domain) {
    resultDiv.innerHTML = "⚠️ Please enter a valid email address.";
    return;
  }

  try {
    const response = await fetch(`https://mailxposed.onrender.com/api/check-domain?domain=${domain}`);
    
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.breachedAccounts)) {
      resultDiv.innerHTML = "⚠️ Unexpected response from server.";
      return;
    }

    const match = data.breachedAccounts.find(entry => entry.email === emailInput);

    if (match) {
      resultDiv.innerHTML = `❌ Oh no! Your email <strong>${emailInput}</strong> was found in a data breach (Source: <strong>${match.source}</strong>).`;
    } else {
      resultDiv.innerHTML = `✅ Good news! Your email <strong>${emailInput}</strong> was NOT found in any known breach.`;
    }

  } catch (error) {
    resultDiv.innerHTML = "⚠️ Error checking breach. Please try again later.";
    console.error("Fetch error:", error);
  }
}
