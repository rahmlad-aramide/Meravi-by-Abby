/**
 * Formats a number as a price string with currency symbol and thousands separators.
 * @param {number | string} price - The price to format.
 * @param {string} currencySymbol - The currency symbol to use.
 * @returns {string} - The formatted price string.
 */
const formatPrice = (price: number | string, currencySymbol: string = '₦'): string => {
    // Ensure price is a number
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
    if (isNaN(numericPrice)) {
      return `${currencySymbol}0.00`;
    }
  
    // Format the price with fixed decimals and thousands separators
    return `${currencySymbol}${numericPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };
  
  export default formatPrice;
  