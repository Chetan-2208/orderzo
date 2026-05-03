"use client";

import Link from 'next/link'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 px-4 py-12 mt-auto">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-3">
              <Logo variant="lockup" size={36} color="white" />
            </div>
            <p className="text-sm text-gray-400 mb-4 max-w-md">
              The digital order book for every Indian dukan. Order. Bill. Done.
            </p>
            <p className="text-xs text-gray-500">
              Built for every kind of small business across India.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/support" className="hover:text-white transition-colors">Help & Support</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="text-xs text-gray-500">
              <p>© 2026 Orderzo Technologies Pvt Ltd. All rights reserved.</p>
              <p className="mt-1">Registered in India · Hyderabad, Telangana</p>
            </div>
            <div className="text-xs text-gray-500 flex flex-wrap gap-x-4 gap-y-1">
              <a href="mailto:info@orderzo.io" className="hover:text-white transition-colors">info@orderzo.io</a>
              <a href="mailto:support@orderzo.io" className="hover:text-white transition-colors">support@orderzo.io</a>
              <span>·</span>
              <span>orderzo.io</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
