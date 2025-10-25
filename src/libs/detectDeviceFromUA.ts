/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 14:06:46
 * @Description:
 */

export const detectDeviceFromUA = (userAgent: string) => {
  if (/iPad|Tablet/.test(userAgent)) return "ipad";
  if (/Mobile|Android|iPhone/.test(userAgent)) return "mobile";
  return "desktop";
};
