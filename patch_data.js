const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Insert EN contactForm
content = content.replace(
  'navContact: "Contact"\n    }\n  },\n  id: {',
  'navContact: "Contact",\n      contactForm: {\n        nameLabel: "Name",\n        emailLabel: "Email",\n        messageLabel: "Message",\n        submitButton: "Send Message",\n        successToast: "Thank you for your message! I will get back to you soon.",\n        sending: "Sending..."\n      }\n    }\n  },\n  id: {'
);

// Insert ID contactForm
content = content.replace(
  'navContact: "Kontak"\n    }\n  }\n};',
  'navContact: "Kontak",\n      contactForm: {\n        nameLabel: "Nama",\n        emailLabel: "Email",\n        messageLabel: "Pesan",\n        submitButton: "Kirim Pesan",\n        successToast: "Terima kasih atas pesan Anda! Saya akan segera membalasnya.",\n        sending: "Mengirim..."\n      }\n    }\n  }\n};'
);

fs.writeFileSync(filePath, content);
console.log('patched data.ts');
