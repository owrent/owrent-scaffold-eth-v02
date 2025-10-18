import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@civic/auth-web3/nextjs";

/**
 * API Route Example - Civic Auth Integration
 *
 * This API route demonstrates how to protect endpoints with authentication
 * and return user data including wallet address.
 *
 * GET /api/user
 * Returns authenticated user information or 401 if not authenticated.
 */
export async function GET() {
  try {
    // Get authenticated user from server-side session
    const user = await getUser();

    // Return 401 if not authenticated
    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "You must be signed in to access this endpoint",
          code: "AUTH_REQUIRED",
        },
        { status: 401 },
      );
    }

    // Return user data including wallet address
    const walletAddress = (user as any).walletAddress || (user as any).ethWalletAddress;

    return NextResponse.json(
      {
        success: true,
        data: {
          // Spread user properties first
          ...user,
          // Then override/add specific properties
          walletAddress,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch (error) {
    // Handle unexpected errors
    console.error("Error in /api/user:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "An unexpected error occurred while fetching user data",
        code: "INTERNAL_ERROR",
      },
      { status: 500 },
    );
  }
}

/**
 * POST /api/user
 * Example of a protected POST endpoint that could update user preferences.
 *
 * This demonstrates how to handle authenticated POST requests.
 */
export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const user = await getUser();

    // Return 401 if not authenticated
    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "You must be signed in to perform this action",
          code: "AUTH_REQUIRED",
        },
        { status: 401 },
      );
    }

    // Parse request body
    const body = await request.json();

    // Example: Validate and process user data update
    // In a real application, you would update a database here
    const { preferences } = body;

    // Return success response with user data
    const walletAddress = (user as any).walletAddress || (user as any).ethWalletAddress;

    return NextResponse.json(
      {
        success: true,
        message: "User preferences updated successfully",
        data: {
          userId: user.id,
          walletAddress,
          preferences: preferences || {},
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in POST /api/user:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "An unexpected error occurred while updating user data",
        code: "INTERNAL_ERROR",
      },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/user
 * Example of a protected DELETE endpoint.
 *
 * This demonstrates how to handle authenticated DELETE requests.
 */
export async function DELETE() {
  try {
    // Get authenticated user
    const user = await getUser();

    // Return 401 if not authenticated
    if (!user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "You must be signed in to perform this action",
          code: "AUTH_REQUIRED",
        },
        { status: 401 },
      );
    }

    // Example: Delete user data or perform cleanup
    // In a real application, you would delete from database here

    const walletAddress = (user as any).walletAddress || (user as any).ethWalletAddress;

    return NextResponse.json(
      {
        success: true,
        message: "User data deleted successfully",
        data: {
          userId: user.id,
          walletAddress,
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in DELETE /api/user:", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: "An unexpected error occurred while deleting user data",
        code: "INTERNAL_ERROR",
      },
      { status: 500 },
    );
  }
}
