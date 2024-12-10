let customers = [];
let crnCounter = 1;

// Function to dynamically add dependents
document.getElementById('addDependent').addEventListener('click', () => {
  const dependentsFieldset = document.getElementById('dependentsFieldset');
  const dependentCount = dependentsFieldset.querySelectorAll('.dependent').length;
  const newDependentId = `dependent${dependentCount + 1}`;

  const dependentDiv = document.createElement('div');
  dependentDiv.classList.add('dependent');
  dependentDiv.id = newDependentId;

  dependentDiv.innerHTML = `
    <label for="${newDependentId}Name">Dependent ${dependentCount + 1} Name:</label>
    <input type="text" class="dependentName"><br>

    <label for="${newDependentId}DOB">Dependent ${dependentCount + 1} DOB:</label>
    <input type="date" class="dependentDOB"><br>
  `;

  dependentsFieldset.appendChild(dependentDiv);
});

// Function to handle form submission
document.getElementById('customerForm').addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form reload

  // Collect form data
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const ssn = document.getElementById('ssn').value;
  const dob = document.getElementById('dob').value;
  const spouseName = document.getElementById('spouseName').value || null;
  const spouseSSN = document.getElementById('spouseSSN').value || null;
  const spouseDOB = document.getElementById('spouseDOB').value || null;

  // Collect dependents data
  const dependents = [];
  document.querySelectorAll('.dependent').forEach((dep) => {
    const depName = dep.querySelector('.dependentName').value;
    const depDOB = dep.querySelector('.dependentDOB').value;
    if (depName && depDOB) {
      dependents.push({ name: depName, dob: depDOB });
    }
  });

  // Create a customer object
  const customer = {
    crn: crnCounter++,
    name,
    address,
    phone,
    email,
    ssn,
    dob,
    spouse: spouseName ? { name: spouseName, ssn: spouseSSN, dob: spouseDOB } : null,
    dependents,
  };

  // Add the customer to the array
  customers.push(customer);

  // Confirmation message
  alert(`Customer added successfully! CRN: ${customer.crn}`);

  // Clear the form
  document.getElementById('customerForm').reset();

  // Optionally clear dependent fields
  const dependentsFieldset = document.getElementById('dependentsFieldset');
  dependentsFieldset.innerHTML = ''; // Reset dependents fieldset
});

// Function to retrieve and display all data
document.getElementById('retrieveData').addEventListener('click', () => {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = ''; // Clear previous output

  if (customers.length === 0) {
    outputDiv.innerHTML = '<p>No data available.</p>';
    return;
  }

  customers.forEach((customer) => {
    const customerDiv = document.createElement('div');
    customerDiv.classList.add('customer-entry');
    customerDiv.innerHTML = `
      <h3>Customer CRN: ${customer.crn}</h3>
      <p><strong>Name:</strong> ${customer.name}</p>
      <p><strong>Address:</strong> ${customer.address}</p>
      <p><strong>Phone:</strong> ${customer.phone}</p>
      <p><strong>Email:</strong> ${customer.email}</p>
      <p><strong>SSN:</strong> ${customer.ssn}</p>
      <p><strong>Date of Birth:</strong> ${customer.dob}</p>
      ${customer.spouse ? `
        <h4>Spouse Information:</h4>
        <p><strong>Name:</strong> ${customer.spouse.name}</p>
        <p><strong>SSN:</strong> ${customer.spouse.ssn}</p>
        <p><strong>DOB:</strong> ${customer.spouse.dob}</p>
      ` : '<p><strong>Spouse:</strong> None</p>'}
      <h4>Dependents:</h4>
      <ul>
        ${customer.dependents.map(dep => `<li>${dep.name} (DOB: ${dep.dob})</li>`).join('')}
      </ul>
    `;
    customerDiv.style.border = '1px solid #ccc';
    customerDiv.style.margin = '10px 0';
    customerDiv.style.padding = '10px';

    outputDiv.appendChild(customerDiv);
  });
});

