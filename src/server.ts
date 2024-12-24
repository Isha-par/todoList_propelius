import app from "./app";
import { config } from "./config/env";
import { scheduleTaskEmails, testSendEmail } from "./services/sendMail";

scheduleTaskEmails(); 
// testSendEmail();

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
