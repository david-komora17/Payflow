
    // 1. Function to show Toast (Re-used from payments page)
    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.textContent = message;
        document.body.appendChild(toast);
        const bgColor = type === 'success' ? '#2ecc71' : '#e74c3c';
        toast.style.cssText = `position:fixed; top:20px; right:20px; padding: 15px 25px; border-radius: 5px; color: white; font-weight: bold; z-index: 1000; background-color: ${bgColor};`;
        setTimeout(() => toast.remove(), 3000);
    }

    // 2. Function to Render Table
    function renderTable() {
        const history = JSON.parse(localStorage.getItem('paymentHistory')) || [];
        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML = ""; // Clear existing rows

        history.forEach(item => {
            const row = document.createElement('tr');
            
            // Logic for the Revert button (Only show if status is 'failure')
            const actionButton = item.status === 'failure' 
                ? `<button onclick="revertPayment(${item.id})" style="background: #3498db; color:white; border:none; padding:5px 10px; cursor:pointer;">Revert</button>` 
                : 'N/A';

            row.innerHTML = `
                <td>${item.date}</td>
                <td>${item.recipient}</td>
                <td>${item.amount}</td>
                <td style="color: ${getStatusColor(item.status)}">${item.status.toUpperCase()}</td>
                <td>${actionButton}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Helper for colors
    function getStatusColor(status) {
        if (status === 'success') return '#2ecc71';
        if (status === 'failure') return '#e74c3c';
        if (status === 'reversed') return '#3498db';
        return '#f39c12'; // Scheduled
    }

    // 3. CAPSTONE FEATURE: Transaction Reversal
    window.revertPayment = function(id) {
        let history = JSON.parse(localStorage.getItem('paymentHistory'));
        const index = history.findIndex(t => t.id === id);

        if (index !== -1) {
            history[index].status = 'reversed'; // Update status
            localStorage.setItem('paymentHistory', JSON.stringify(history));
            showToast("Transaction Reverted Successfully!", "success");
            renderTable(); // Refresh the UI instantly
        }
    };

    // Initialize table on load
    window.onload = renderTable;
