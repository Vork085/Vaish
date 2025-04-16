const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.static('public'));
app.use(express.json());

const dataFile = path.join(__dirname, 'data.json');
function readData() {
  if (!fs.existsSync(dataFile)) return [];
  return JSON.parse(fs.readFileSync(dataFile));
}

app.post('/submit', (req, res) => {
  const newEntry = req.body;
  const data = readData();
  data.push(newEntry);
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  res.status(200).json({ message: 'Data saved!' });
});

app.get('/data', (req, res) => {
  const data = readData();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
