/**
 * Format number to VND currency format
 * @param amount - The amount to format
 * @returns Formatted string in VND format (e.g., "1.000.000 VNĐ")
 */
export const formatToVND = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ' VNĐ';
}; 