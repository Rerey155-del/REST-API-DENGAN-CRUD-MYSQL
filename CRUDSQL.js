const express = require("express");
const apk = express();
const koneksi = require("./koneksi"); // Pastikan koneksi ini benar

const bodyParser = require("body-parser");

// middleware
apk.use(bodyParser.json());

apk.get("/", (req, res) => {
  const query = "SELECT * FROM user";

  koneksi.query(query, (err, result) => {
    if (err) {
      res.status(400).json({ message: "upss......sorry" });
    } else {
      res.status(200).json(result); // Menampilkan hasil query
    }
  });
});

// Tambahkan data
apk.post("/tambah", (req, res) => {
  const { nomor, nama, email } = req.body; // Ambil data dari body request
  const tambahkan = "INSERT INTO user (nomor, nama, email) VALUES (?,?,?)";

  koneksi.query(tambahkan, [nomor, nama, email], (err, result) => {
    if (err) {
      return res.status(500).send("error dalam penginputan data");
    } else {
      res.status(200).send("data berhasil ditambahkan");
    }
  });
});

apk.put("/ubahData/:nomor", (req, res) => {
  const { nomor } = req.params;
  const { nama, email } = req.body;

  // validasi input
  if (!nama || !email) {
    return res.status(400).send("Mohon isi semua field");
  }

  const updateData = "update user set nama=?, email=? where nomor=?";
  koneksi.query(updateData, [nama, email, nomor], (err, res) => {
    if (err) {
      console.log("error dalam melakukan update data");
    } else {
      res.status(200).send("data berhasil diubah");
    }
  });
});

apk.patch("/ubahEmail/:nomor", (req, res) => {
  const { nomor } = req.params;
  const { email } = req.body;
  // validasi input email

  if (!email) {
    res.status(400).send({ message: "Email harus diisi" });
  }

  const updateEmail = "UPDATE user SET email=? WHERE nomor=?";
  koneksi.query(updateEmail, [email, nomor], (err, res) => {
    if (err) {
      console.log("error dalam melakukan update email", err);
      return res.status(500).send("error dalam melakukan update email");
    } else {
      res.status(200).send("email berhasil diubah");
    }
  });
});

// menghapus data berdasarkan nomor id
apk.delete("/hapus/:nomor", (req, res) => {
  const { nomor } = req.params;
  const kueriHapus = "DELETE FROM user WHERE nomor = ?";

  koneksi.query(kueriHapus, [nomor], (err, result) => {
    if (err) {
      console.log("error dalam melakukan hapus data", err);
    } else {
      res.status(200).send("data berhasil dihapus ya sayang");
    }
  });
});

// Jalankan server
apk.listen(3000, () => {
  console.log("Jalankan API-nya pada http://localhost:3000/");
});
