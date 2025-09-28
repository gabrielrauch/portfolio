import bcrypt from "bcryptjs";

export async function hashPassword(
  password: string,
  rounds: number = 10,
): Promise<string> {
  try {
    return await bcrypt.hash(password, rounds);
  } catch (error) {
    console.error("Password hashing failed:", error);
    throw new Error("Password hashing failed");
  }
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error("Password comparison failed:", error);
    return false;
  }
}
