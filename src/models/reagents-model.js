import mongoose from "mongoose";
import sanitizeHtml from "sanitize-html";

const reagentSchema = mongoose.Schema({
  casNumber: {
    type: String,
    required: [true, "CAS Number is required"],
    trim: true,
  },
  reagentName: {
    type: String,
    required: [true, "Reagent name is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  classe: {
    type: String,
    required: [true, "class is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [1, "Quantity must be at least 1"],
  },
  composition: [
    {
      substance: { type: String, required: false },
      concentration: { type: String, required: false },
    },
  ],
  brand: {
    type: String,
    required: [true, "brand is required"],
  },
  manufactureDate: {
    type: Date,
    required: [false, "Manufacture date is required"],
  },
  expiryDate: {
    type: Date,
    required: [false, "expire date is required"],
  },
  information: [String],
  classification: {
    type: String,
    required: [true, "classification is required"],
  },
  local: {
    type: String,
    required: [true, "Location is required"],
  },
  volume: {
    type: String,
    required: [true, "volume is required"],
  },
  weight: {
    type: String,
    required: [true, "Weight is required"],
  },
  molecularFormula: {
    type: String,
    required: [true, "Molecular formula is required"],
  },
  molecularWeight_g_per_mol: {
    type: String,
    required: [true, "Molecular weight is required"],
  },
  furtherInformations: {
    type: String,
    default: "",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
});

reagentSchema.index({ casNumber: 1, createdBy: 1 }, { unique: true });

reagentSchema.pre("save", function (next) {
  this.casNumber = sanitizeHtml(this.casNumber, {
    allowedTags: [],
    allowedAttributes: {},
  });
  this.reagentName = sanitizeHtml(this.reagentName, {
    allowedTags: [],
    allowedAttributes: {},
  });
  this.description = sanitizeHtml(this.description, {
    allowedTags: [],
    allowedAttributes: {},
  });
  this.classe = sanitizeHtml(this.classe, {
    allowedTags: [],
    allowedAttributes: {},
  });
  this.brand = sanitizeHtml(this.brand, {
    allowedTags: [],
    allowedAttributes: {},
  });
  this.classification = sanitizeHtml(this.classification, {
    allowedTags: [],
    allowedAttributes: {},
  });
  this.local = sanitizeHtml(this.local, {
    allowedTags: [],
    allowedAttributes: {},
  });
  if (this.composition && Array.isArray(this.composition)) {
    this.composition = this.composition.map(item => {
      item.substance = sanitizeHtml(item.substance, {
        allowedTags: [],
        allowedAttributes: {},
      });
      item.concentration = sanitizeHtml(item.concentration, {
        allowedTags: [],
        allowedAttributes: {},
      });
      delete item._id;
      return item;
    });
  }
  this.information = this.information.map(info =>
    sanitizeHtml(info, { allowedTags: [], allowedAttributes: {} })
  );
  this.volume = sanitizeHtml(this.volume, {
    allowedTags: [],
    allowedAttributes: {},
  });
  this.weight = sanitizeHtml(this.weight, {
    allowedTags: [],
    allowedAttributes: {},
  });
  this.molecularFormula = sanitizeHtml(this.molecularFormula, {
    allowedTags: [],
    allowedAttributes: {},
  });
  this.molecularWeight_g_per_mol = sanitizeHtml(
    this.molecularWeight_g_per_mol,
    { allowedTags: [], allowedAttributes: {} }
  );
  this.furtherInformations = sanitizeHtml(this.furtherInformations, {
    allowedTags: [],
    allowedAttributes: {},
  });

  next();
});

reagentSchema.post("save", function (doc, next) {
  next();
});

const Reagent = mongoose.model("Reagent", reagentSchema);

export default Reagent;
