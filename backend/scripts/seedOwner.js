/**
 * @file seedOwner.js
 * @description One-time script to create the initial owner account.
 *
 * Run once:   node scripts/seedOwner.js
 * After running, delete or gitignore this file.
 *
 * The owner role cannot be created through the admin API —
 * this script is the only way to bootstrap the first super-user.
 */

require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const connectDB = require("../db");
const User = require("../models/User");

async function seed() {
  await connectDB();

  const existing = await User.findOne({ role: "owner" });
  if (existing) {
    console.log("✓ Owner already exists:", existing.email);
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash("ChangeMe123!", 12);

  const owner = await User.create({
    name: "Salon Owner",
    email: "owner@theexperts.in",
    passwordHash,
    role: "owner",
  });

  console.log("✓ Owner created:", owner.email);
  console.log("  Password: ChangeMe123!");
  console.log("  ⚠  Change this password immediately after first login.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("✗ Seed failed:", err);
  process.exit(1);
});
