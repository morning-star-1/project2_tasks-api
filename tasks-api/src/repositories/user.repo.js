const crypto = require("crypto");

class InMemoryUserRepo {
  constructor() {
    this.usersByEmail = new Map(); // email -> user
  }

  async create({ email, passwordHash }) {
    const id = crypto.randomUUID();
    const user = { id, email, passwordHash, createdAt: new Date().toISOString() };
    this.usersByEmail.set(email, user);
    return user;
  }

  async findByEmail(email) {
    return this.usersByEmail.get(email) || null;
  }

  async findById(id) {
    for (const user of this.usersByEmail.values()) {
      if (user.id === id) return user;
    }
    return null;
  }
}

const userRepo = new InMemoryUserRepo();
module.exports = { userRepo };
