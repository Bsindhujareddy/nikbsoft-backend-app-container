const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

const client = new SecretsManagerClient({
  region: "us-east-1" // change if needed
});

async function getSecret() {
  const command = new GetSecretValueCommand({
    SecretId: "nikbsoft-mysql-db-rds-secret-dev"
  });

  const response = await client.send(command);

  if (response.SecretString) {
    return JSON.parse(response.SecretString);
  }
}

module.exports = getSecret;