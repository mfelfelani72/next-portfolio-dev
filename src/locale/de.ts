/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-07 07:53:42
 * @Description:
 */

import meta_de from "./meta/de.json";
import meta_home_landing_de from "./meta/home/landing/de.json";

import home_de from "./home/de.json";

const en = {
  meta: meta_de,
  meta_home_landing: meta_home_landing_de,

  ...home_de,
};

export default en;
