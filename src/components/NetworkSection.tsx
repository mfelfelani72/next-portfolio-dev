/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 16:37:52
 * @Description:
 */

"use client";
import React from "react";

export default function NetworkSection() {
  return (
    <section id="network" className="mt-8 bg-white rounded-xl p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-rose-700">Network & Infra</h2>
      <div className="mt-2 text-sm text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-slate-50 p-3 rounded-md">
          <div className="font-semibold">Cisco & Routing</div>
          <p className="mt-1 text-xs text-gray-600">
            BGP, OSPF, VLANs, Access-Lists, NAT — templating and automating configs with Ansible.
          </p>
        </div>
        <div className="bg-slate-50 p-3 rounded-md">
          <div className="font-semibold">Observability</div>
          <p className="mt-1 text-xs text-gray-600">
            Prometheus + Grafana stacks, alerting, tracing basics and SLO-driven incident handling.
          </p>
        </div>
      </div>
    </section>
  )
}

