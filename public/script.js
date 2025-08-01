function getDomainFromEmail(email) {
  return email.split('@')[1];
}

async function checkBreach() {
  const emailInput = document.getElementById("emailInput").value;
  const domain = getDomainFromEmail(emailInput);
  const resultDiv = document.getElementById("result");

  if (!emailInput || !domain) {
    resultDiv.innerHTML = "⚠️ Please enter a valid email.";
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/api/check-domain?domain=${domain}`);
    const data = await res.json();

    const matchedEmails = data.breachedAccounts.filter(entry => entry.email === emailInput);

    if (matchedEmails.length > 0) {
      resultDiv.innerHTML = `❌ Oh no! Your email <strong>${emailInput}</strong> was found in a data breach (Source: ${matchedEmails[0].source}).`;
    } else {
      resultDiv.innerHTML = `✅ Good news! Your email <strong>${emailInput}</strong> was NOT found in any known breach.`;
    }
  } catch (error) {
    resultDiv.innerHTML = "⚠️ Error checking breach. Please try again later.";
    console.error(error);
  }
}
