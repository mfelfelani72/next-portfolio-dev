/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-07 07:54:08
 * @Description:
 */

import meta_fa from "./meta/fa.json";
import meta_home_landing_fa from "./meta/home/landing/fa.json";

import home_fa from "./home/fa.json";

const fa = {
  meta: meta_fa,
  meta_home_landing: meta_home_landing_fa,

  ...home_fa,
};

export default fa;
