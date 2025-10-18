"use server";

import { getUser } from "@civic/auth-web3/nextjs";

/**
 * Server Actions Example - Civic Auth Integration
 *
 * This file demonstrates how to use Civic Auth's getUser() function
 * in Next.js Server Actions to protect server-side operations.
 *
 * Server Actions are async functions that run on the server and can be
 * called directly from Client Components.
 */

/**
 * Get authenticated user data
 *
 * @returns User data including wallet address
 * @throws Error if user is not authenticated
 */
export async function getUserData() {
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized: You must be signed in to access user data");
  }

  const walletAddress = (user as any).walletAddress || (user as any).ethWalletAddress;

  return {
    id: user.id,
    walletAddress,
    name: user.name || null,
    email: user.email || null,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Update user preferences
 *
 * @param preferences - User preferences object
 * @returns Success message with updated data
 * @throws Error if user is not authenticated
 */
export async function updateUserPreferences(preferences: Record<string, unknown>) {
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized: You must be signed in to update preferences");
  }

  const walletAddress = (user as any).walletAddress || (user as any).ethWalletAddress;

  // In a real application, you would update the database here
  // Example: await db.userPreferences.update({ userId: user.id, preferences })

  return {
    success: true,
    message: "Preferences updated successfully",
    data: {
      userId: user.id,
      walletAddress,
      preferences,
    },
    timestamp: new Date().toISOString(),
  };
}

/**
 * Create a new deal (example business logic)
 *
 * @param dealData - Deal creation data
 * @returns Created deal information
 * @throws Error if user is not authenticated or validation fails
 */
export async function createDeal(dealData: { title: string; amount: string; description?: string }) {
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized: You must be signed in to create a deal");
  }

  // Validate input
  if (!dealData.title || !dealData.amount) {
    throw new Error("Validation Error: Title and amount are required");
  }

  // In a real application, you would:
  // 1. Validate the deal data
  // 2. Create the deal in the database
  // 3. Interact with smart contracts if needed
  // 4. Return the created deal

  const walletAddress = (user as any).walletAddress || (user as any).ethWalletAddress;

  const deal = {
    id: `deal-${Date.now()}`,
    title: dealData.title,
    amount: dealData.amount,
    description: dealData.description || "",
    seller: walletAddress,
    sellerName: user.name || "Anonymous",
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  return {
    success: true,
    message: "Deal created successfully",
    data: deal,
  };
}

/**
 * Submit a bid on a deal (example business logic)
 *
 * @param dealId - ID of the deal to bid on
 * @param bidAmount - Bid amount
 * @returns Bid submission result
 * @throws Error if user is not authenticated or validation fails
 */
export async function submitBid(dealId: string, bidAmount: string) {
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized: You must be signed in to submit a bid");
  }

  // Validate input
  if (!dealId || !bidAmount) {
    throw new Error("Validation Error: Deal ID and bid amount are required");
  }

  // In a real application, you would:
  // 1. Validate the bid amount
  // 2. Check if the deal exists and is active
  // 3. Encrypt the bid using FHEVM
  // 4. Submit to smart contract
  // 5. Store in database

  const walletAddress = (user as any).walletAddress || (user as any).ethWalletAddress;

  const bid = {
    id: `bid-${Date.now()}`,
    dealId,
    bidAmount,
    bidder: walletAddress,
    bidderName: user.name || "Anonymous",
    status: "submitted",
    submittedAt: new Date().toISOString(),
  };

  return {
    success: true,
    message: "Bid submitted successfully",
    data: bid,
  };
}

/**
 * Get user's deals
 *
 * @returns List of deals created by the authenticated user
 * @throws Error if user is not authenticated
 */
export async function getUserDeals() {
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized: You must be signed in to view your deals");
  }

  const walletAddress = (user as any).walletAddress || (user as any).ethWalletAddress;

  // In a real application, you would query the database
  // Example: const deals = await db.deals.findMany({ where: { seller: walletAddress } })

  // Mock data for demonstration
  const deals = [
    {
      id: "deal-1",
      title: "Invoice #1234",
      amount: "10000",
      seller: walletAddress,
      status: "active",
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    },
    {
      id: "deal-2",
      title: "Invoice #1235",
      amount: "5000",
      seller: walletAddress,
      status: "settled",
      createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    },
  ];

  return {
    success: true,
    data: {
      deals,
      count: deals.length,
      walletAddress,
    },
  };
}

/**
 * Get user's bids
 *
 * @returns List of bids submitted by the authenticated user
 * @throws Error if user is not authenticated
 */
export async function getUserBids() {
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized: You must be signed in to view your bids");
  }

  const walletAddress = (user as any).walletAddress || (user as any).ethWalletAddress;

  // In a real application, you would query the database
  // Example: const bids = await db.bids.findMany({ where: { bidder: walletAddress } })

  // Mock data for demonstration
  const bids = [
    {
      id: "bid-1",
      dealId: "deal-3",
      dealTitle: "Invoice #1236",
      bidAmount: "9500",
      bidder: walletAddress,
      status: "pending",
      submittedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    },
  ];

  return {
    success: true,
    data: {
      bids,
      count: bids.length,
      walletAddress,
    },
  };
}

/**
 * Delete user account (example of destructive action)
 *
 * @returns Deletion confirmation
 * @throws Error if user is not authenticated
 */
export async function deleteUserAccount() {
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized: You must be signed in to delete your account");
  }

  const walletAddress = (user as any).walletAddress || (user as any).ethWalletAddress;

  // In a real application, you would:
  // 1. Delete user data from database
  // 2. Revoke any active sessions
  // 3. Clean up associated resources
  // 4. Log the deletion for audit purposes

  return {
    success: true,
    message: "Account deleted successfully",
    data: {
      userId: user.id,
      walletAddress,
      deletedAt: new Date().toISOString(),
    },
  };
}
