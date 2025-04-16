const statesOfIndia = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
    "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand",
    "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim",
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ].sort(); // Alphabetical order
  
  function populateDropdown(selectElement, states) {
    states.forEach(state => {
      const option = document.createElement('option');
      option.value = state;
      option.textContent = state;
      selectElement.appendChild(option);
    });
  }
  
  window.onload = () => {
    const birthSelect = document.querySelector('select[name="birthState"]');
    const residenceSelect = document.querySelector('select[name="residenceState"]');
  
    populateDropdown(birthSelect, statesOfIndia);
    populateDropdown(residenceSelect, statesOfIndia);
  
    const checkbox = document.getElementById('outsideIndia');
    const residenceFields = document.getElementById('residenceFields');
    const outsideAddress = document.getElementById('outsideAddress');
  
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        residenceFields.style.display = 'none';
        outsideAddress.style.display = 'block';
        residenceSelect.required = false;
      } else {
        residenceFields.style.display = 'block';
        outsideAddress.style.display = 'none';
        residenceSelect.required = true;
      }
    });
  };
  
  document.getElementById('infoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const form = e.target;
    const isOutside = document.getElementById('outsideIndia').checked;
  
    // Handle validations manually
    if (!form.name.value.trim()) return alert("Please enter your name.");
    if (!form.age.value) return alert("Please enter your age.");
    if (!form.birthState.value) return alert("Please select a birth state.");
  
    if (!isOutside && !form.residenceState.value) {
      return alert("Please select a residence state or mark 'Outside India'.");
    }
  
    if (isOutside && !form.foreignAddress.value.trim()) {
      return alert("Please enter your foreign address.");
    }
  
    const data = {
      name: form.name.value.trim(),
      age: form.age.value,
      birthState: form.birthState.value,
      residenceState: isOutside ? null : form.residenceState.value,
      foreignAddress: isOutside ? form.foreignAddress.value.trim() : null,
    };
  
    const res = await fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (res.ok) {
      alert('Submitted!');
      form.reset();
      document.getElementById('residenceFields').style.display = 'block';
      document.getElementById('outsideAddress').style.display = 'none';
    } else {
      alert('Something went wrong.');
    }
  });
  