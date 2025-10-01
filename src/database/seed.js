// src/database/seed.js
import User from "../models/user-model.js";
import Reagent from "../models/reagents-model.js";
import { NODE_ENV } from "../config/config-env.js";

const seed = async () => {
  console.log("🚀 Starting seed process...");
  console.log("👉 NODE_ENV:", NODE_ENV);
  console.log("👉 DB_URI:", process.env.DB_URI);

  // if (NODE_ENV === "production") {
  //   console.warn("⚠️ Seeding skipped: NODE_ENV is 'production'");
  //   return { message: "Action not allowed in production" };
  // }

  try {
    console.log("🗑️ Deleting existing Users...");
    const usersDeleted = await User.deleteMany({});
    console.log("✅ Users deleted:", usersDeleted.deletedCount);

    console.log("🗑️ Deleting existing Reagents...");
    const reagentsDeleted = await Reagent.deleteMany({});
    console.log("✅ Reagents deleted:", reagentsDeleted.deletedCount);

    console.log("👤 Creating regular user...");
    const regularUser = await User.create({
      email: "seed@example.com",
      password: "seed12345",
      status: "user",
    });
    console.log("✅ User created with _id:", regularUser._id.toString());

    console.log("🧪 Inserting reagents...");
    const reagents = await Reagent.create([
      {
        casNumber: "7732-18-5",
        reagentName: "Water",
        description: "Distilled water for laboratory use",
        classe: "Solvent",
        quantity: 100,
        composition: [],
        brand: "Sigma-Aldrich",
        manufactureDate: new Date("2024-01-01"),
        expiryDate: new Date("2025-12-31"),
        information: ["High purity", "Deionized"],
        classification: "ACS Reagent Grade",
        local: "Main Storage",
        volume: "1 L",
        weight: "1 kg",
        molecularFormula: "H2O",
        molecularWeight_g_per_mol: "18.015",
        furtherInformations: "Suitable for all aqueous solutions",
        createdBy: regularUser._id,
      },
      {
        casNumber: "7647-14-5",
        reagentName: "Sodium Chloride",
        description: "Common salt for chemical reactions",
        classe: "Inorganic Salt",
        quantity: 50,
        composition: [{ substance: "NaCl", concentration: "100%" }],
        brand: "Merck",
        manufactureDate: new Date("2024-02-01"),
        expiryDate: new Date("2026-01-31"),
        information: ["Analytical grade", "Hygroscopic"],
        classification: "Reagent Grade",
        local: "Shelf B2",
        volume: "500 mL",
        weight: "500 g",
        molecularFormula: "NaCl",
        molecularWeight_g_per_mol: "58.44",
        furtherInformations: "Use in electrolyte solutions",
        createdBy: regularUser._id,
      },
      {
        casNumber: "64-17-5",
        reagentName: "Ethanol",
        description: "Denatured alcohol for extractions",
        classe: "Organic Solvent",
        quantity: 20,
        composition: [{ substance: "C2H5OH", concentration: "99.5%" }],
        brand: "Fisher Scientific",
        manufactureDate: new Date("2024-03-01"),
        expiryDate: new Date("2026-02-28"),
        information: ["Absolute ethanol", "Flammable"],
        classification: "HPLC Grade",
        local: "Flammable Cabinet",
        volume: "1 L",
        weight: "789 g",
        molecularFormula: "C2H6O",
        molecularWeight_g_per_mol: "46.07",
        furtherInformations: "Handle with care due to volatility",
        createdBy: regularUser._id,
      },
      {
        casNumber: "64-19-7",
        reagentName: "Acetic Acid",
        description: "Glacial acetic acid for titrations",
        classe: "Organic Acid",
        quantity: 10,
        composition: [{ substance: "CH3COOH", concentration: "100%" }],
        brand: "Acros Organics",
        manufactureDate: new Date("2024-04-01"),
        expiryDate: new Date("2026-03-31"),
        information: ["Corrosive", "Pungent odor"],
        classification: "Analytical Reagent",
        local: "Acid Storage",
        volume: "500 mL",
        weight: "600 g",
        molecularFormula: "C2H4O2",
        molecularWeight_g_per_mol: "60.05",
        furtherInformations: "Dilute before use",
        createdBy: regularUser._id,
      },
      {
        casNumber: "7439-95-4",
        reagentName: "Magnesium",
        description: "Magnesium turnings for Grignard reactions",
        classe: "Metal",
        quantity: 5,
        composition: [{ substance: "Mg", concentration: "99.9%" }],
        brand: "Alfa Aesar",
        manufactureDate: new Date("2024-05-01"),
        expiryDate: new Date("2027-04-30"),
        information: ["Reactive with water", "Store under inert gas"],
        classification: "Puriss Grade",
        local: "Dry Storage",
        volume: "N/A",
        weight: "100 g",
        molecularFormula: "Mg",
        molecularWeight_g_per_mol: "24.305",
        furtherInformations: "Use in anhydrous conditions",
        createdBy: regularUser._id,
      },
    ]);
    console.log(`✅ Inserted ${reagents.length} reagents`);

    console.log("🎉 Database seeded successfully!");
    return { message: "Database seeded successfully" };
  } catch (error) {
    console.error("❌ Seeding failed:");
    console.error(error.stack || error);
    throw error;
  }
};

export default seed;
