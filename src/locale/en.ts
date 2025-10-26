/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-07 07:53:42
 * @Description:
 */

import meta_en from "./meta/en.json";
import meta_home_landing_en from "./meta/home/landing/en.json";

import home_en from "./home/en.json";

const en = {
  meta: meta_en,
  meta_home_landing: meta_home_landing_en,

  ...home_en,
};

export default en;
