import express from "express";
import Foods from "../model/Foods.js";

const router = express.Router();

router.get("/get-all", async (req, res) => {
  try {
    const foods = await Foods.find().sort({ createdAt: -1 });

    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const food = new Foods({
      food: req.body.food,
      price: req.body.price,
      img: req.body.img,
    });

    await food.save();

    res.status(200).json({ message: "Berhasil disimpan" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/detail/:id", async (req, res) => {
  try {
    const food = await Foods.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    let food = await Foods.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.status(200).json({ message: "Berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const food = await Foods.findById(req.params.id);

    await food.deleteOne();

    res.status(200).json({ message: "Berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
