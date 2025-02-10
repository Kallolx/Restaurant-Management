"use client";

import { AccountContent } from "@/components/account/account-content";

export default function AccountPage() {
  return (
    <div className="">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-medium">Account</h1>
      </div>

      {/* Main Content */}
      <div className="pt-3">
        <AccountContent />
      </div>
    </div>
  );
}
