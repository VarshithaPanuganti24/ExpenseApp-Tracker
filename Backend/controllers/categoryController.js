import Category from "../models/Category.js";

// GET all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 }); // sort alphabetically
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const addCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });

  try {
    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ message: "Category already exists" });

    const category = new Category({ name });
    const saved = await category.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT (Update category)
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: "Name is required" });

  try {
    const updated = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true } // return updated doc + validate schema
    );

    if (!updated) return res.status(404).json({ message: "Category not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE (Remove category)
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Category.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Category not found" });

    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// GET single category by ID
export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// // ADD new category (optional, for admin use)
// export const addCategory = async (req, res) => {
//   try {
//     const newCategory = new Category(req.body);
//     await newCategory.save();
//     res.status(201).json(newCategory);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };
