exports.generateOrderId = () => {
    // Get current date in YYYYMMDD format
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');
  
    const dateString = `${year}${month}${day}`;
  
    // Generate a four-digit random number
    const randomNum = Math.floor(1000 + Math.random() * 9000);
  
    // Combine to generate the order ID in format CBOYYYYMMDDXXXX
    return `CBO${dateString}${randomNum}`;
  }
  