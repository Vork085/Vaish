const statesOfIndia = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
    "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand",
    "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim",
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ].sort();
  
  function populateFilterDropdown(id) {
    const dropdown = document.getElementById(id);
    statesOfIndia.forEach(state => {
      const option = document.createElement('option');
      option.value = state;
      option.textContent = state;
      dropdown.appendChild(option);
    });
  }
  
  function renderTable(data) {
    const tbody = document.getElementById('dataBody');
    tbody.innerHTML = '';
  
    data.forEach(entry => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.age}</td>
        <td>${entry.birthState}</td>
        <td>
  ${entry.residenceState 
    ? entry.residenceState 
    : entry.foreignAddress 
      ? `Outside India: ${entry.foreignAddress}` 
      : '—'}
</td>
      `;
      tbody.appendChild(tr);
    });
  }
  
  function applyFilters(data) {
    const nameFilter = document.getElementById('nameFilter').value.toLowerCase();
    const birthStateFilter = document.getElementById('birthStateFilter').value;
    const residenceStateFilter = document.getElementById('residenceStateFilter').value;
  
    return data.filter(entry => {
      const matchesName = entry.name.toLowerCase().includes(nameFilter);
      const matchesBirth = birthStateFilter ? entry.birthState === birthStateFilter : true;
      const matchesResidence = residenceStateFilter
        ? (entry.residenceState === residenceStateFilter)
        : true;
  
      return matchesName && matchesBirth && matchesResidence;
    });
  }
  
  async function fetchAndRender() {
    const res = await fetch('/data');
    const data = await res.json();
  
    const filteredData = applyFilters(data);
    renderTable(filteredData);
  }
  
  window.onload = () => {
    populateFilterDropdown('birthStateFilter');
    populateFilterDropdown('residenceStateFilter');
  
    document.getElementById('nameFilter').addEventListener('input', fetchAndRender);
    document.getElementById('birthStateFilter').addEventListener('change', fetchAndRender);
    document.getElementById('residenceStateFilter').addEventListener('change', fetchAndRender);
  
    fetchAndRender();
};

async function fetchAndRender() {
  const res = await fetch('/data');
  const data = await res.json();

  const filteredData = applyFilters(data);
  renderTable(filteredData);

  // ✅ Hide loading overlay here, after rendering
  document.getElementById('loadingOverlay').style.display = 'none';
  document.getElementById('mainContent').style.display = 'block';
}